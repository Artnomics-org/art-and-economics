import React, { useCallback } from 'react'
import Page from '../../components/Page'
import IconLongArrow from '../../assets/img/icon-long-arrow.svg'
import { NFTsWrapper, Title, IconArrow, NFTsBody, NFTsHeader, CreateNFTButton } from './components/styleds'
import NFTCards from './components/NFTCards'
import { useHistory } from 'react-router'

const NFTs: React.FC = () => {
  const router = useHistory()
  const handleCreateNftClick = useCallback(() => {
    router.push('/market/new')
  }, [router])
  return (
    <Page>
      <NFTsWrapper>
        <IconArrow src={IconLongArrow} alt="icon arrow" />
        <NFTsBody>
          <NFTsHeader>
            <Title>nft art market</Title>
            <CreateNFTButton onClick={handleCreateNftClick}>Create new nft</CreateNFTButton>
          </NFTsHeader>
          <NFTCards />
        </NFTsBody>
      </NFTsWrapper>
    </Page>
  )
}

export default NFTs
