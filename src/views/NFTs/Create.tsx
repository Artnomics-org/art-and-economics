import React, { useState, useCallback, useEffect, useContext, ChangeEvent } from 'react'
import { useDropzone } from 'react-dropzone'
import { useHistory } from 'react-router'
import CryptoJS from 'crypto-js'
import { Input, Spinner, useNumberInput, useToast } from '@chakra-ui/react'
import { BlackButton } from '../../components/Button'
import { BlackInternalLink } from '../../components/Link'
import Page from '../../components/Page'
import { useLogin } from '../../hooks/nfts'
import NFTCard, { NFTCardProps } from './components/NFTCard'
import {
  CreateWrapper,
  CreateBody,
  LoadingTitle,
  StyledLoadingWrapper,
  LoadingText,
  CreateLeft,
  CreateRight,
  CreateTitle,
  CreateDrag,
  CreateButtonWrapper,
  CreateInputWrapper,
  CreateInputLabel,
  CreateNumberInputWrapper,
  CreateNumberInputButton,
} from './components/styleds'
import NFTContentCard from './components/NFTContentCard'
import NFTLabelInfo from './components/NFTLabelInfo'
import { arrayBufferToWordArray } from '../../utils'
import { isMediaContentExisted, PostMedia } from '../../backend/media'
import { uploadFileToIpfs, UploadFileToIpfsParams } from '../../backend/storage'
import { MediaData } from '../../types/Media'
import { useActiveWeb3React } from '../../hooks/wallet'
import { mintMediaToken } from '../../utils/nft'
import { Signer } from 'ethers'
import { ChainId } from '@haneko/uniswap-sdk'
import { ThemeContext } from 'styled-components/macro'
import { UserRole } from '../../types/User'

type FileWithPreview = {
  preview: string
} & File

type MintParams = MediaData & {
  creatorShare: number
  chainId: ChainId
  wallet: Signer
}

const InitCardProps: NFTCardProps = {
  img: {
    low: '',
    medium: '',
    high: '',
  },
  title: 'NFT Title',
  creator: 'Your Name',
  price: '0.1',
}

const Create: React.FC = () => {
  const { account, chainId, library } = useActiveWeb3React()
  const signer = library?.getSigner(account)
  const { isRegistered, registeredLoading, userDataByWallet } = useLogin()
  const needReg = !isRegistered && !registeredLoading
  const isArtist = userDataByWallet.role === UserRole.Artist || userDataByWallet.role === UserRole.SuperAdmin
  const [nftPreview, setNftPreview] = useState<NFTCardProps>(InitCardProps)
  const router = useHistory()
  const toast = useToast()
  const theme = useContext(ThemeContext)

  const [isUploading, setIsUploading] = useState(false)
  const [isTokenMinting, setIsTokenMinting] = useState(false)

  const [inputDesc, setInputDesc] = useState('')
  const [inputTitle, setInputTitle] = useState('')

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, valueAsNumber } = useNumberInput({
    step: 1,
    defaultValue: 0,
    min: 0,
    max: 100,
  })
  const handleIncrement = getIncrementButtonProps()
  const handleDecrement = getDecrementButtonProps()
  const handleNumberInput = getInputProps()

  const [imageFiles, setImageFiles] = useState<FileWithPreview[]>([])
  const [imageOversize, setImageOversize] = useState(false)
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0].size > 70 * 1024 * 1024) {
        setImageOversize(true)
        return
      }
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      )
      setImageFiles(files)
      setNftPreview({ ...nftPreview, img: { low: files[0].preview, medium: files[0].preview, high: files[0].preview } })
    },
    [nftPreview],
  )
  const { getRootProps, getInputProps: getDragProps } = useDropzone({
    maxFiles: 1,
    accept: 'image/jpeg, image/png, image/gif, image/webp',
    onDrop,
  })

  const isCanCreate = !!imageFiles.length && !!inputTitle && !!inputDesc

  const handleTitleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      console.log('handleTitleChange:value:', ev.target.value)
      setInputTitle(ev.target.value)
      setNftPreview({ ...nftPreview, title: ev.target.value })
    },
    [nftPreview],
  )
  const handleDescChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    console.log('handleDescChange:value:', ev.target.value)
    setInputDesc(ev.target.value)
  }, [])

  const handleFileHashCheck = useCallback(async (file: File) => {
    const promise = new Promise<boolean>((res, rej) => {
      const reader = new FileReader()
      reader.onload = async () => {
        const buffer = reader.result as ArrayBuffer
        const hash = CryptoJS.SHA256(arrayBufferToWordArray(buffer))
        const hashHex = hash.toString(CryptoJS.enc.Hex)
        console.log('handleFileHashCheck:onload:buffer:', buffer, 'hashHex:', hashHex)

        try {
          const { data } = await isMediaContentExisted({ contentHash: `0x${hashHex}` })
          console.log('handleFileHashCheck:isMediaContentExisted:data:', data)
          if (data.code === 200 && data.data) res(data.data.isExist)
        } catch (error) {
          console.error('handleFileHashCheck:error:', error)
          rej(false)
        }
      }
      reader.onerror = () => {
        console.error('handleFileHashCheck:onerror:', reader.error)
        rej(false)
      }
      reader.readAsArrayBuffer(file)
    })
    return await promise
  }, [])
  const handleUploadFile = useCallback(
    async (param: UploadFileToIpfsParams) => {
      try {
        setIsUploading(true)
        const { data } = await uploadFileToIpfs(param)
        if (data && data.code === 200) {
          setIsUploading(false)
          console.log('handleUploadFile:uploadFileToIpfs:data:', data)
          toast({
            title: 'Success',
            description: 'Your file upload successfully.',
            status: 'success',
            duration: 3000,
            position: 'top-right',
            isClosable: true,
          })
          return { uploadStatus: true, mediaData: data.data.MediaData }
        }
      } catch (error) {
        setIsUploading(false)
        console.error('handleUploadFile:error:', error)
        toast({
          title: 'Error',
          description: 'Your file upload failed.',
          status: 'error',
          duration: 5000,
          position: 'top-right',
          isClosable: true,
        })
        return { uploadStatus: false, mediaData: null }
      }
    },
    [toast],
  )
  const handleMintToken = useCallback(
    async (data: MintParams) => {
      if (!signer) {
        toast({
          title: 'Error',
          description: 'No Signer detected.',
          status: 'error',
          duration: 5000,
          position: 'top-right',
          isClosable: true,
        })
        return
      }

      try {
        const { tokenURI, metadataURI, contentHash, metadataHash, creatorShare, chainId, wallet } = data
        setIsTokenMinting(true)
        const mint = await mintMediaToken(
          tokenURI,
          metadataURI,
          contentHash,
          metadataHash,
          creatorShare,
          chainId,
          wallet,
        )
        toast({
          title: 'Minting',
          description: 'Minting your token, please wait a moment.',
          status: 'info',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        })
        if (typeof mint === 'object' && mint.wait) {
          const res = await mint.wait(4)
          console.log('handleMintToken:mint.wait:res:', res)

          if (res && res.transactionHash) {
            const resMedia = await PostMedia({
              txHash: res.transactionHash,
              tags: [],
            })
            if (resMedia && resMedia.status >= 200 && resMedia.status < 300) {
              setIsTokenMinting(false)
              toast({
                title: 'Success',
                description: 'Your token mint successfully.',
                status: 'success',
                duration: 3000,
                position: 'top-right',
                isClosable: true,
              })
              setTimeout(() => router.push('/market'), 3500)
            }
          }
        }
      } catch (error) {
        console.error('handleMintToken:error:', error)
        setIsTokenMinting(false)
        toast({
          title: 'Error',
          description: `Your token mint failed: ${error}`,
          status: 'error',
          duration: 5000,
          position: 'top-right',
          isClosable: true,
        })
      }
    },
    [router, signer, toast],
  )

  const handleCreateClick = useCallback(async () => {
    const file = imageFiles[0]
    const existed = await handleFileHashCheck(file)
    if (existed) {
      toast({
        title: 'File already existed',
        description: 'Please choose another file',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const fileInfo: UploadFileToIpfsParams = {
      file,
      name: inputTitle,
      description: inputDesc,
    }
    const { uploadStatus: upload, mediaData } = await handleUploadFile(fileInfo)

    if (upload) {
      const mint: MintParams = {
        ...mediaData,
        creatorShare: valueAsNumber,
        chainId,
        wallet: signer,
      }
      await handleMintToken(mint)
    }

    console.log(
      'handleCreateClick:images:',
      imageFiles,
      'title:',
      inputTitle,
      'desc:',
      inputDesc,
      'royalty:',
      valueAsNumber,
      'existed:',
      existed,
      'upload:',
      upload,
    )
  }, [
    chainId,
    handleFileHashCheck,
    handleMintToken,
    handleUploadFile,
    imageFiles,
    inputDesc,
    inputTitle,
    signer,
    toast,
    valueAsNumber,
  ])

  useEffect(() => {
    if (userDataByWallet) {
      setNftPreview({ ...InitCardProps, creator: userDataByWallet.username })
    }
  }, [userDataByWallet])

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      imageFiles.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [imageFiles],
  )

  if (!isArtist) {
    return (
      <Page>
        <CreateWrapper>
          <CreateBody>
            <StyledLoadingWrapper>
              <LoadingTitle error>Sorry</LoadingTitle>
              <LoadingText>Only artist can create NFT</LoadingText>
              <BlackInternalLink to="/market">Go To Market</BlackInternalLink>
            </StyledLoadingWrapper>
          </CreateBody>
        </CreateWrapper>
      </Page>
    )
  }

  return (
    <Page>
      <CreateWrapper>
        <CreateBody>
          {needReg && (
            <StyledLoadingWrapper>
              <LoadingTitle error>Sorry</LoadingTitle>
              <LoadingText>You need to register to create NFT</LoadingText>
              <BlackInternalLink to="/register">Go To Register</BlackInternalLink>
            </StyledLoadingWrapper>
          )}
          {!needReg && (
            <>
              <CreateLeft>
                <CreateTitle>NFT Information</CreateTitle>
                <CreateDrag {...getRootProps()} error={imageOversize}>
                  <input {...getDragProps()} />
                  {imageOversize && (
                    <>
                      <p>Image is too big</p>
                      <p>Max size: 70MB</p>
                    </>
                  )}
                  {!!imageFiles.length && !imageOversize && (
                    <>
                      <p>You select: {imageFiles[0].name}</p>
                      <p>File size: {imageFiles[0].size} bytes</p>
                    </>
                  )}
                  {!imageFiles.length && !imageOversize && (
                    <>
                      <p>Drag &apos;n&apos; drop image files here, or click to select files</p>
                      <p>.png, .jpeg, .jpg, .webp, and .gif are supported</p>
                    </>
                  )}
                </CreateDrag>
                <CreateInputWrapper>
                  <CreateInputLabel htmlFor="title">Title</CreateInputLabel>
                  <Input
                    id="title"
                    isRequired
                    borderRadius={0}
                    colorScheme="blackAlpha"
                    placeholder="Please enter NFT title"
                    onChange={handleTitleChange}
                  />
                </CreateInputWrapper>
                <CreateInputWrapper>
                  <CreateInputLabel htmlFor="description">Description</CreateInputLabel>
                  <Input
                    id="description"
                    isRequired
                    borderRadius={0}
                    colorScheme="blackAlpha"
                    placeholder="Please enter NFT description"
                    onChange={handleDescChange}
                  />
                </CreateInputWrapper>
                <CreateInputWrapper>
                  <CreateInputLabel htmlFor="royalty">Resale royalty</CreateInputLabel>
                  <CreateNumberInputWrapper>
                    <CreateNumberInputButton {...handleIncrement}>+</CreateNumberInputButton>
                    <Input
                      {...handleNumberInput}
                      id="royalty"
                      isRequired
                      borderRadius={0}
                      colorScheme="blackAlpha"
                      placeholder="Please enter NFT resale royalty"
                    />
                    <CreateNumberInputButton {...handleDecrement}>-</CreateNumberInputButton>
                  </CreateNumberInputWrapper>
                </CreateInputWrapper>
              </CreateLeft>
              <CreateRight>
                <CreateTitle>Preview NFT</CreateTitle>
                <NFTCard {...nftPreview} />
                <NFTContentCard title="RESALE ROYALTY">
                  <NFTLabelInfo title="Creator">{valueAsNumber}%</NFTLabelInfo>
                </NFTContentCard>
                <CreateButtonWrapper>
                  <BlackButton disabled={!isCanCreate || isUploading || isTokenMinting} onClick={handleCreateClick}>
                    {(isUploading || isTokenMinting) && <Spinner size="sm" color={theme.color.white} marginRight={4} />}
                    Create
                  </BlackButton>
                  <BlackButton onClick={() => router.goBack()}>Back</BlackButton>
                </CreateButtonWrapper>
              </CreateRight>
            </>
          )}
        </CreateBody>
      </CreateWrapper>
    </Page>
  )
}

export default Create
