import React, { useState, useEffect, useCallback } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import Page from '../../components/Page'
import { User } from '../../types/User'
import {
  MediaSelectButton,
  MediaSelectWrapper,
  UserAvatar,
  UserBanner,
  UserBio,
  UserBody,
  UserEditButton,
  UserInfo,
  UserInfoContainer,
  UserInfoLeft,
  UserInfoMobile,
  UserInfoRight,
  UserInfoWrapper,
  UserName,
  UserNftWrapper,
  UserNick,
  UserWrapper,
} from './components/styleds'
import { useLogin } from '../../hooks/nfts'
import { getUser } from '../../backend/user'
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
  const router = useHistory()
  const { userDataByWallet, caughtError } = useLogin()
  const [isMe, setIsMe] = useState(false)
  const [userInfo, setUserInfo] = useState<User>(null)
  const [createdMedia, setCreatedMedia] = useState<NFTProps[]>([])
  const [ownedMedia, setOwnedMedia] = useState<NFTProps[]>([])

  const createdNFTCards: NFTCardProps[] = createdMedia.map(
    (media) => ({
      id: media.id,
      title: media?.title,
      description: media?.description,
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
      description: media?.description,
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
  const handleMediaSelectChange = useCallback((value: 'owned' | 'created') => {
    console.log('handleMediaSelectChange:value:', value)
    setMediaType(value)
  }, [])

  const handleCardClick = useCallback(
    (id: string | number) => {
      router.push(`/market/${id}`)
    },
    [router],
  )

  const fetchUserData = useCallback(async () => {
    try {
      const userInfo = await getUser(name)
      setUserInfo(userInfo)
    } catch (error) {
      console.log('UserView:useEffect:fetchUserData:error:', error)
      router.push('/market')
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
      router.push('/market')
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
              <UserAvatar src={userInfo?.avatar} alt="Avatar" />
              <UserInfoMobile>
                <UserNick>{userInfo?.nickname}</UserNick>
                <UserName>@{userInfo?.username}</UserName>
              </UserInfoMobile>
            </UserInfoLeft>
            <UserInfoRight>
              <UserInfo>
                <UserInfoContainer mb={20}>
                  <UserNick>{userInfo?.nickname}</UserNick>
                  <UserName>@{userInfo?.username}</UserName>
                </UserInfoContainer>
                <UserBio>{userInfo?.bio}</UserBio>
                {isMe && <UserEditButton to="/user/edit">Edit Profile</UserEditButton>}
              </UserInfo>
              <MediaSelectWrapper>
                <MediaSelectButton active={mediaType === 'owned'} onClick={() => handleMediaSelectChange('owned')}>
                  Collection
                </MediaSelectButton>
                <MediaSelectButton active={mediaType === 'created'} onClick={() => handleMediaSelectChange('created')}>
                  Creations
                </MediaSelectButton>
              </MediaSelectWrapper>
            </UserInfoRight>
          </UserInfoWrapper>
        </UserBanner>
        <UserBody>
          <UserNftWrapper>
            {mediaType === 'owned' &&
              ownedNFTCards.map(
                (item, index) => (
                  <NFTCard
                    img={item.img}
                    title={item.title}
                    description={item.description}
                    creator={item.creator}
                    price={item.price}
                    currency={item.currency}
                    key={`${item.title}-${item.price}-${index}`}
                    onClick={() => handleCardClick(item.id)}
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
                    description={item.description}
                    creator={item.creator}
                    price={item.price}
                    currency={item.currency}
                    key={`${item.title}-${item.price}-${index}`}
                    onClick={() => handleCardClick(item.id)}
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
