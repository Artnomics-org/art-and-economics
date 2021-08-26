import React from 'react'
import Page from '../../components/Page'
import IconLongArrow from '../../assets/img/icon-long-arrow.svg'
import { NFTsWrapper, Title, IconArrow, NFTsBody, Banner } from './components/styleds'
import NFTCards from './components/NFTCards'

const NFTs: React.FC = () => {
  return (
    <Page>
      <NFTsWrapper>
        <Banner />
        <IconArrow src={IconLongArrow} alt="icon arrow" />
        <NFTsBody>
          <Title>nft art market</Title>
          <NFTCards />
        </NFTsBody>
      </NFTsWrapper>
    </Page>
  )
}

export default NFTs
