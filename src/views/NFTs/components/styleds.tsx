import styled from 'styled-components/macro'
import ImageNFTBg from '../../../assets/img/image-nft-bg.png'
import ImageNFTBg2x from '../../../assets/img/image-nft-bg@2x.png'
import ImageNFTBg3x from '../../../assets/img/image-nft-bg@3x.png'

export const NFTsWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.bg};
  background-image:
    linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    -webkit-image-set(url(${ImageNFTBg}) 1x, url(${ImageNFTBg2x}) 2x, url(${ImageNFTBg3x}) 3x);
  background-size: 100% 40%;
  background-repeat: no-repeat;
  background-position: top;
`

export const NFTsBody = styled.div`
  max-width: ${props => props.theme.siteWidth}px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
`

export const Title = styled.h1`
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 36px;
  text-align: center;
  color: ${props => props.theme.color.grey[600]};
  text-transform: uppercase;
  margin-top: 104px;
  margin-bottom: 88px;
`

export const IconArrow = styled.img`
  object-fit: contain;
  height: 160px;
  position: absolute;
  right: 30px;
  bottom: 100px;
`
