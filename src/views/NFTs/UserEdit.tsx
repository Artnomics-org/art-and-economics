import React, { useState, useCallback, useEffect } from 'react'
import { Input, Spinner, useToast } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { useHistory } from 'react-router'
import Page from '../../components/Page'
import NFTLabelInfo from './components/NFTLabelInfo'
import {
  RegisterErrorText,
  RegisterSpacer,
  UserEditAvatarUploading,
  UserEditAvatarWrapper,
  UserEditBody,
  UserEditCardTitle,
  UserEditCardWrapper,
  UserEditLeft,
  UserEditRight,
  UserEditTitle,
  UserEditWrapper,
} from './components/styleds'
import { BlackButton } from '../../components/Button'
import { useLogin } from '../../hooks/nfts'
import { uploadFile } from '../../backend/storage'
import { User } from '../../types/User'
import { updateUser } from '../../backend/user'

const UserEdit: React.FC = () => {
  const { isRegistered, userDataByWallet } = useLogin()
  const router = useHistory()
  const toast = useToast()

  const [inputNickname, setInputNickname] = useState('')
  const [inputBio, setInputBio] = useState('')
  const [inputTwitter, setInputTwitter] = useState('')
  const [inputTelegram, setInputTelegram] = useState('')
  const [inputFacebook, setInputFacebook] = useState('')
  const [inputMedium, setInputMedium] = useState('')

  const [isNicknameError, setIsNicknameError] = useState(false)
  const [isBioError, setIsBioError] = useState(false)

  const handleNicknameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNickname(e.target.value)
    setIsNicknameError(false)
    if (!e.target.value) {
      setIsNicknameError(true)
    }
  }, [])
  const handleBioChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputBio(e.target.value)
    setIsBioError(false)
    if (!e.target.value) {
      setIsBioError(true)
    }
  }, [])
  const handleTwitterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTwitter(e.target.value)
  }, [])
  const handleTelegramChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTelegram(e.target.value)
  }, [])
  const handleFacebookChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFacebook(e.target.value)
  }, [])
  const handleMediumChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMedium(e.target.value)
  }, [])

  const [isAvatarUploading, setIsAvatarUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const handleUploadAvatar = useCallback(
    async (file: File) => {
      try {
        setIsAvatarUploading(true)
        const { data } = await uploadFile(file)
        if (data && data.data && data.data.url) {
          const url = data.data.url
          setAvatarUrl(url)
          setAvatarPreview(url)
          setIsAvatarUploading(false)
          toast({
            title: 'Success',
            description: 'Your avatar upload successfully.',
            status: 'success',
            duration: 3000,
            position: 'top-right',
            isClosable: true,
          })
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Your avatar upload failed.',
          status: 'error',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        })
        setAvatarUrl('')
        setAvatarPreview(userDataByWallet?.avatar)
      } finally {
        setIsAvatarUploading(false)
      }
    },
    [toast, userDataByWallet?.avatar],
  )

  const [avatarPreview, setAvatarPreview] = useState('')
  const [imageOversize, setImageOversize] = useState(false)
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles[0].size > 3 * 1024 * 1024) {
        setImageOversize(true)
        setAvatarPreview(avatarPreview)
        return
      }
      setImageOversize(false)
      setAvatarPreview(URL.createObjectURL(acceptedFiles[0]))
      await handleUploadAvatar(acceptedFiles[0])
    },
    [avatarPreview, handleUploadAvatar],
  )
  const { getRootProps, getInputProps: getDragProps } = useDropzone({
    maxFiles: 1,
    accept: 'image/jpeg, image/png, image/gif, image/webp',
    onDrop,
  })

  const handleSaveClick = useCallback(async () => {
    if (inputNickname === '') {
      setIsNicknameError(true)
      return
    }
    if (inputBio === '') {
      setIsBioError(true)
      return
    }

    try {
      const payload: User = {
        ...userDataByWallet,
        ...{ nickname: inputNickname, bio: inputBio },
        ...{ avatar: avatarUrl || userDataByWallet?.avatar },
        ...{
          twitter: inputTwitter || userDataByWallet?.twitter,
          telegram: inputTelegram || userDataByWallet?.telegram,
          facebook: inputFacebook || userDataByWallet?.facebook,
          medium: inputMedium || userDataByWallet?.medium,
        },
      }
      if (payload.username) delete payload.username
      const { data } = await updateUser(Number(userDataByWallet?.id), payload)
      if (data && data.code === 200) {
        toast({
          title: 'Success',
          description: 'Your profile updated successfully.',
          status: 'success',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        })
        setTimeout(() => router.goBack(), 3500)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Your profile update failed.',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
    }
  }, [
    avatarUrl,
    inputBio,
    inputFacebook,
    inputMedium,
    inputNickname,
    inputTelegram,
    inputTwitter,
    router,
    toast,
    userDataByWallet,
  ])

  useEffect(() => {
    if (userDataByWallet) {
      if (!isRegistered) {
        router.push('/')
      }
      console.log(userDataByWallet)
      setInputNickname(userDataByWallet?.nickname)
      setInputBio(userDataByWallet?.bio)
      setInputTwitter(userDataByWallet?.twitter)
      setInputTelegram(userDataByWallet?.telegram)
      setInputFacebook(userDataByWallet?.facebook)
      setInputMedium(userDataByWallet?.medium)
      setAvatarPreview(userDataByWallet?.avatar)
    }
  }, [isRegistered, router, userDataByWallet])

  return (
    <Page>
      <UserEditWrapper>
        <UserEditTitle>Edit your profile</UserEditTitle>
        <UserEditBody>
          <UserEditLeft>
            <UserEditCardWrapper>
              <UserEditCardTitle>Basic Info</UserEditCardTitle>
              <NFTLabelInfo title="Username" size={16} />
              <Input id="username" disabled={true} variant="filled" defaultValue={userDataByWallet?.username} />
              <RegisterSpacer />
              <NFTLabelInfo title="Nickname" size={16} />
              <Input
                id="nickname"
                placeholder="Enter your nickname"
                value={inputNickname}
                isInvalid={isNicknameError}
                onChange={handleNicknameChange}
              />
              {isNicknameError && <RegisterErrorText>Required</RegisterErrorText>}
              <RegisterSpacer />
              <NFTLabelInfo title="Bio" size={16} />
              <Input
                id="bio"
                placeholder="Enter a bio"
                value={inputBio}
                isInvalid={isBioError}
                onChange={handleBioChange}
              />
              {isBioError && <RegisterErrorText>Required</RegisterErrorText>}
            </UserEditCardWrapper>
            <UserEditCardWrapper>
              <UserEditCardTitle>Social Info</UserEditCardTitle>
              <NFTLabelInfo title="Twitter" size={16} />
              <Input
                id="twitter"
                placeholder="Enter your Twitter username"
                value={inputTwitter}
                onChange={handleTwitterChange}
              />
              <RegisterSpacer />
              <NFTLabelInfo title="Telegram" size={16} />
              <Input
                id="telegram"
                placeholder="Enter your Telegram username"
                value={inputTelegram}
                onChange={handleTelegramChange}
              />
              <RegisterSpacer />
              <NFTLabelInfo title="Facebook" size={16} />
              <Input
                id="facebook"
                placeholder="Enter your Facebook username"
                value={inputFacebook}
                onChange={handleFacebookChange}
              />
              <RegisterSpacer />
              <NFTLabelInfo title="Medium" size={16} />
              <Input
                id="medium"
                placeholder="Enter your Medium url"
                value={inputMedium}
                onChange={handleMediumChange}
              />
            </UserEditCardWrapper>
          </UserEditLeft>
          <UserEditRight>
            <UserEditCardWrapper>
              <UserEditCardTitle>Avatar</UserEditCardTitle>
              <UserEditAvatarWrapper {...getRootProps()} error={imageOversize}>
                <input {...getDragProps()} />
                {imageOversize && <p>Maximum: 3MB</p>}
                {!imageOversize && <img src={avatarPreview} alt="avatar" />}
                {isAvatarUploading && (
                  <UserEditAvatarUploading>
                    <Spinner size="xl" color="#ffffff" />
                  </UserEditAvatarUploading>
                )}
              </UserEditAvatarWrapper>
            </UserEditCardWrapper>
          </UserEditRight>
        </UserEditBody>
        <BlackButton disabled={isAvatarUploading} onClick={handleSaveClick}>
          Save
        </BlackButton>
      </UserEditWrapper>
    </Page>
  )
}

export default UserEdit
