import React, { useState, useCallback, useEffect, ChangeEvent } from 'react'
import { useDropzone } from 'react-dropzone'
import { useHistory } from 'react-router'
import { Input, useNumberInput } from '@chakra-ui/react'
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
import { useTimeout } from 'ahooks'

type FileWithPreview = {
  preview: string
} & File

const Create: React.FC = () => {
  const { isRegistered, registeredLoading } = useLogin()
  const needReg = !isRegistered && !registeredLoading
  const [nftPreview, setNftPreview] = useState<NFTCardProps>({
    img: {
      low: '',
      medium: '',
      high: '',
    },
    title: 'NFT Title',
    creator: 'Your Name',
    price: '0.1',
  })
  const router = useHistory()

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

  const handleCreateClick = useCallback(() => {
    console.log(
      'handleCreateClick:images:',
      imageFiles,
      'title:',
      inputTitle,
      'desc:',
      inputDesc,
      'royalty:',
      valueAsNumber,
    )
  }, [imageFiles, inputDesc, inputTitle, valueAsNumber])

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      imageFiles.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [imageFiles],
  )

  return (
    <Page>
      <CreateWrapper>
        <CreateBody>
          {needReg && (
            <StyledLoadingWrapper>
              <LoadingTitle error>Sorry</LoadingTitle>
              <LoadingText>You need to register to create NFTs</LoadingText>
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
                  <BlackButton disabled={!isCanCreate} onClick={handleCreateClick}>
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
