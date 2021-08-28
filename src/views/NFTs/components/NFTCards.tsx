import React from 'react'
import styled from 'styled-components/macro'
import ImageNFT from '../../../assets/img/image-nft.png'
import ImageNFT2x from '../../../assets/img/image-nft@2x.png'
import ImageNFT3x from '../../../assets/img/image-nft@3x.png'
import NFTCard, { NFTCardProps } from './NFTCard'

const nftList: NFTCardProps[] = [
  {
    img: {
      low: ImageNFT,
      medium: ImageNFT2x,
      high: ImageNFT3x,
    },
    title: "LES FEMMES D'ALGER, PABLO RUIZ PICASSO",
    creator: '피카소의 알제의 연인들',
    price: 1.23,
  },
  {
    img: {
      low: ImageNFT,
      medium: ImageNFT2x,
      high: ImageNFT3x,
    },
    title: "LES FEMMES D'ALGER, PABLO RUIZ PICASSO",
    creator: '피카소의 알제의 연인들',
    price: 1.23,
  },
  {
    img: {
      low: ImageNFT,
      medium: ImageNFT2x,
      high: ImageNFT3x,
    },
    title: "LES FEMMES D'ALGER, PABLO RUIZ PICASSO",
    creator: '피카소의 알제의 연인들',
    price: 0,
  },
  {
    img: {
      low: ImageNFT,
      medium: ImageNFT2x,
      high: ImageNFT3x,
    },
    title: "LES FEMMES D'ALGER, PABLO RUIZ PICASSO",
    creator: '피카소의 알제의 연인들',
    price: 0.0,
  },
  {
    img: {
      low: ImageNFT,
      medium: ImageNFT2x,
      high: ImageNFT3x,
    },
    title: "LES FEMMES D'ALGER, PABLO RUIZ PICASSO",
    creator: '피카소의 알제의 연인들',
    price: 1.23,
  },
  {
    img: {
      low: ImageNFT,
      medium: ImageNFT2x,
      high: ImageNFT3x,
    },
    title: "LES FEMMES D'ALGER, PABLO RUIZ PICASSO",
    creator: '피카소의 알제의 연인들',
    price: 1.23,
  },
]

const NFTCards: React.FC = () => {
  return (
    <StyledCardWrapper>
      {nftList.map((item, index) => (
        <NFTCard
          img={item.img}
          title={item.title}
          creator={item.creator}
          price={item.price}
          key={`${item.title}-${item.price}-${index}`}
        />
      ))}
    </StyledCardWrapper>
  )
}

const StyledCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  justify-content: space-evenly;
`

export default NFTCards
