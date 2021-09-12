import React, { useState, useContext, useEffect, useCallback } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { Twitter, Telegram, Facebook, Medium } from '@icons-pack/react-simple-icons'
import { Select } from '@chakra-ui/react'
import Page from '../../components/Page'
import { User } from '../../types/User'
import {
  MediaSelectWrapper,
  UserAvatar,
  UserBanner,
  UserBio,
  UserBody,
  UserEditButton,
  UserInfo,
  UserInfoContainer,
  UserInfoLeft,
  UserInfoRight,
  UserInfoWrapper,
  UserName,
  UserNftWrapper,
  UserNick,
  UserSocial,
  UserSocialItem,
  UserWrapper,
} from './components/styleds'
import { ThemeContext } from 'styled-components/macro'
import { useLogin } from '../../hooks/nfts'
import { getUser } from '../../backend/user'
import { getSocialLink } from '../../utils'
import NFTCard, { NFTCardProps } from './components/NFTCard'
import { Media, MediaMetadata } from '../../types/Media'
import { getMediaBids, getMediaById, getMediaMetadata } from '../../backend/media'
import { BidLog } from '../../types/Bid'

interface UserViewProps {
  name: string
}

interface NFTProps extends Media {
  meta: MediaMetadata
  bids: BidLog[]
}

const UserView: React.FC<RouteComponentProps<UserViewProps>> = ({
  match: {
    params: { name },
  },
}) => {
  const theme = useContext(ThemeContext)
  const router = useHistory()
  const { userDataByWallet, caughtError } = useLogin()
  const [isMe, setIsMe] = useState(false)
  const [userInfo, setUserInfo] = useState<User>(null)
  const [createdMedia, setCreatedMedia] = useState<NFTProps[]>([])
  const [ownedMedia, setOwnedMedia] = useState<NFTProps[]>([])

  const hasSocial = !!(userInfo?.twitter || userInfo?.telegram || userInfo?.facebook || userInfo?.medium)
  const createdNFTCards: NFTCardProps[] = createdMedia.map(
    (media) => ({
      id: media.id,
      title: media?.title,
      creator: media?.creator?.username,
      price: media?.bids[0]?.amount || 0,
      currency: media?.bids[0]?.currency,
      img: {
        low: media.tokenURI,
        medium: media.tokenURI,
        high: media.tokenURI,
      },
    }),
    [],
  )
  const ownedNFTCards: NFTCardProps[] = ownedMedia.map(
    (media) => ({
      id: media.id,
      title: media?.title,
      creator: media?.creator?.username,
      price: media?.bids[0]?.amount || 0,
      currency: media?.bids[0]?.currency,
      img: {
        low: media.tokenURI,
        medium: media.tokenURI,
        high: media.tokenURI,
      },
    }),
    [],
  )

  const [mediaType, setMediaType] = useState<'owned' | 'created'>('owned')
  const handleMediaSelectChange = useCallback((ev: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('handleMediaSelectChange:value:', ev.target.value)
    setMediaType(ev.target.value as 'owned' | 'created')
  }, [])

  const fetchUserData = useCallback(async () => {
    try {
      const userInfo = await getUser(name)
      setUserInfo(userInfo)
    } catch (error) {
      console.log('UserView:useEffect:fetchUserData:error:', error)
      router.push('/')
    }
  }, [name, router])
  const fetchMediaData = useCallback(async () => {
    if (!userInfo) return
    if (userInfo.createdMedia) {
      const getMedia = userInfo.createdMedia.map(async (item) => {
        if (typeof item === 'number') return await getMediaById(item)
        return await getMediaById(item.id)
      })
      const medias = await Promise.all(getMedia)
      const getMetaBids = medias.map(async (media) => {
        const meta = await getMediaMetadata(media.metadataURI)
        const bids = await getMediaBids(media.id)
        return { ...media, meta, bids }
      })
      const created = await Promise.all(getMetaBids)
      setCreatedMedia(created)
      console.log('UserView:useEffect:fetchMediaData:created:', created)
    }
    if (userInfo.ownedMedia) {
      const getMedia = userInfo.ownedMedia.map(async (item) => {
        return await getMediaById(item)
      })
      const medias = await Promise.all(getMedia)
      const getMetaBids = medias.map(async (media) => {
        const meta = await getMediaMetadata(media.metadataURI)
        const bids = await getMediaBids(media.id)
        return { ...media, meta, bids }
      })
      const owned = await Promise.all(getMetaBids)
      setOwnedMedia(owned)
      console.log('UserView:useEffect:fetchMediaData:owned:', owned)
    }
  }, [userInfo])

  useEffect(() => {
    if (caughtError) {
      router.push('/')
      return
    }
  }, [caughtError, router])

  useEffect(() => {
    if (!userInfo) {
      if (userDataByWallet && userDataByWallet.username === name) {
        console.log('UserView:useEffect:userDataByWallet:', userDataByWallet, userDataByWallet.username === name)
        setUserInfo(userDataByWallet)
        setIsMe(true)
      } else {
        fetchUserData()
      }
    }
  }, [fetchUserData, name, userDataByWallet, userInfo])

  useEffect(() => {
    if (userInfo) fetchMediaData()
  }, [fetchMediaData, userInfo])

  return (
    <Page>
      <UserWrapper>
        <UserBanner>
          <UserInfoWrapper>
            <UserInfoLeft>
              <UserInfoContainer mb={hasSocial ? 40 : 0}>
                <UserAvatar src={userInfo?.avatar} alt="Avatar" />
                <UserInfo>
                  <UserNick>{userInfo?.nickname}</UserNick>
                  <UserName>@{userInfo?.username}</UserName>
                  <UserBio>{userInfo?.bio}</UserBio>
                </UserInfo>
              </UserInfoContainer>
              <UserSocial>
                {userInfo?.twitter && (
                  <UserSocialItem
                    href={getSocialLink(userInfo?.twitter, 'twitter')}
                    target="__blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter size={24} color={theme.color.white} />
                  </UserSocialItem>
                )}
                {userInfo?.telegram && (
                  <UserSocialItem
                    href={getSocialLink(userInfo?.telegram, 'tetegram')}
                    target="__blank"
                    rel="noopener noreferrer"
                  >
                    <Telegram size={24} color={theme.color.white} />
                  </UserSocialItem>
                )}
                {userInfo?.facebook && (
                  <UserSocialItem
                    href={getSocialLink(userInfo?.facebook, 'facebook')}
                    target="__blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook size={24} color={theme.color.white} />
                  </UserSocialItem>
                )}
                {userInfo?.medium && (
                  <UserSocialItem
                    href={getSocialLink(userInfo?.medium, 'medium')}
                    target="__blank"
                    rel="noopener noreferrer"
                  >
                    <Medium size={24} color={theme.color.white} />
                  </UserSocialItem>
                )}
              </UserSocial>
            </UserInfoLeft>
            <UserInfoRight>{isMe && <UserEditButton to="/user/edit">Edit Profile</UserEditButton>}</UserInfoRight>
          </UserInfoWrapper>
        </UserBanner>
        <UserBody>
          <MediaSelectWrapper>
            <Select
              id="media-select"
              size="lg"
              variant="filled"
              defaultValue="owned"
              onChange={handleMediaSelectChange}
            >
              <option value="owned">Collection</option>
              <option value="created">Creations</option>
            </Select>
          </MediaSelectWrapper>
          <UserNftWrapper>
            {mediaType === 'owned' &&
              ownedNFTCards.map(
                (item, index) => (
                  <NFTCard
                    img={item.img}
                    title={item.title}
                    creator={item.creator}
                    price={item.price}
                    currency={item.currency}
                    key={`${item.title}-${item.price}-${index}`}
                  />
                ),
                [],
              )}
            {mediaType === 'created' &&
              createdNFTCards.map(
                (item, index) => (
                  <NFTCard
                    img={item.img}
                    title={item.title}
                    creator={item.creator}
                    price={item.price}
                    currency={item.currency}
                    key={`${item.title}-${item.price}-${index}`}
                  />
                ),
                [],
              )}
          </UserNftWrapper>
        </UserBody>
      </UserWrapper>
    </Page>
  )
}

export default UserView
