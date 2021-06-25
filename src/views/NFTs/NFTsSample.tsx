import React from 'react'
import Page from '../../components/Page'
import IconLongArrow from '../../assets/img/icon-long-arrow.svg'
import { NFTsWrapper, Title, IconArrow, NFTsBody } from './components/styleds'
import NFTCards from './components/NFTCardsSample'

const NFTsSample: React.FC = () => {
  return (
    <Page>
      <NFTsWrapper>
        <IconArrow src={IconLongArrow} alt="icon arrow" />
        <NFTsBody>
          <Title>nft art market</Title>
          <NFTCards />
        </NFTsBody>
      </NFTsWrapper>
    </Page>
  )
}

export default NFTsSample
