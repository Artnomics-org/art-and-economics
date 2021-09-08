import React, { useContext, useCallback, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ThemeContext } from 'styled-components/macro'
import { Input, useToast } from '@chakra-ui/react'
import Page from '../../components/Page'
import { useLogin } from '../../hooks/nfts'
import NFTLabelInfo from './components/NFTLabelInfo'
import {
  RegisterWarnText,
  RegisterTitle,
  RegisterWrapper,
  RegisterSubtitle,
  RegisterBody,
  RegisterSpacer,
  RegisterErrorText,
} from './components/styleds'
import { BlackButton } from '../../components/Button'

const Register: React.FC = () => {
  const { isRegistered, register } = useLogin()
  const theme = useContext(ThemeContext)
  const toast = useToast()
  const router = useHistory()
  const [isWrongUsername, setIsWrongUsername] = useState(false)
  const [isWrongNickname, setIsWrongNickname] = useState(false)
  const [isWrongBio, setIsWrongBio] = useState(false)
  const [inputUsername, setInputUsername] = useState('')
  const [inputNickname, setInputNickname] = useState('')
  const [inputBio, setInputBio] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const usernameError = `Only numbers, characters a-z(lower case) '-' and the length is 5-20 are acceptable.`
  const nicknameError = `Nickname is required`
  const bioError = `Bio is required`

  const handleUsernameChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputUsername(ev.target.value)
    setIsWrongUsername(false)
  }, [])
  const handleNicknameChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputNickname(ev.target.value)
    setIsWrongNickname(false)
  }, [])
  const handleBioChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputBio(ev.target.value)
    setIsWrongBio(false)
  }, [])

  const handleRegisterClick = useCallback(async () => {
    const usernamePattern = /^(?=[a-z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
    if (!inputUsername || !usernamePattern.test(inputUsername)) {
      setIsWrongUsername(true)
      return
    }
    if (inputNickname === '') {
      setIsWrongNickname(true)
      return
    }
    if (inputBio === '') {
      setIsWrongBio(true)
      return
    }

    try {
      setIsButtonDisabled(true)
      const token = await register({ username: inputUsername, nickname: inputNickname, bio: inputBio })
      if (token) {
        toast({
          title: 'Success',
          description: 'You have registered successfully.',
          status: 'success',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        })
        setTimeout(() => {
          router.push('/market')
        }, 3500)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsButtonDisabled(false)
      toast({
        title: 'Error',
        description: error?.message || 'Please try again',
        status: 'error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      })
    }
  }, [inputBio, inputNickname, inputUsername, register, router, toast])

  return (
    <Page>
      <RegisterWrapper>
        {isRegistered && (
          <>
            <RegisterTitle>Opps!</RegisterTitle>
            <RegisterWarnText>
              You are registered!{' '}
              <Link to="/market" style={{ color: theme.color.green[500] }}>
                Go to market
              </Link>
            </RegisterWarnText>
          </>
        )}
        {!isRegistered && (
          <RegisterBody>
            <RegisterTitle size={24}>Register Collector</RegisterTitle>
            <RegisterSubtitle size={16}>Create and sell your unique digital artworks.</RegisterSubtitle>
            <NFTLabelInfo title="Username" />
            <Input
              id="username"
              placeholder="john-done (Required)"
              isInvalid={isWrongUsername}
              onChange={handleUsernameChange}
            />
            {isWrongUsername && <RegisterErrorText>{usernameError}</RegisterErrorText>}
            <RegisterSpacer />
            <NFTLabelInfo title="Nickname" />
            <Input
              id="nickname"
              placeholder="John Done (Required)"
              isInvalid={isWrongNickname}
              onChange={handleNicknameChange}
            />
            {isWrongNickname && <RegisterErrorText>{nicknameError}</RegisterErrorText>}
            <RegisterSpacer />
            <NFTLabelInfo title="Bio" />
            <Input id="bio" placeholder="Bio is required" isInvalid={isWrongBio} onChange={handleBioChange} />
            {isWrongBio && <RegisterErrorText>{bioError}</RegisterErrorText>}
            <RegisterSpacer />
            <BlackButton disabled={isButtonDisabled} onClick={handleRegisterClick}>
              Register
            </BlackButton>
          </RegisterBody>
        )}
      </RegisterWrapper>
    </Page>
  )
}

export default Register
