import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useHistory } from 'react-router'
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
} from './components/styleds'

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
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: 'image/jpeg, image/png, image/gif, image/webp',
    onDrop,
  })

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
          {!needReg && ( // TODO: remove bang!
            <StyledLoadingWrapper>
              <LoadingTitle error>Sorry</LoadingTitle>
              <LoadingText>You need to register to create NFTs</LoadingText>
              <BlackInternalLink to="/register">Go To Register</BlackInternalLink>
            </StyledLoadingWrapper>
          )}
          {true && ( // TODO: change to !needReg
            <>
              <CreateLeft>
                <CreateTitle>NFT Information</CreateTitle>
                <CreateDrag {...getRootProps()} error={imageOversize}>
                  <input {...getInputProps()} />
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
              </CreateLeft>
              <CreateRight>
                <CreateTitle>Preview NFT</CreateTitle>
                <NFTCard {...nftPreview} />
                <CreateButtonWrapper>
                  <BlackButton>Create</BlackButton>
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
