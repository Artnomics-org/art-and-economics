import styled from 'styled-components/macro'
import ImageNFTBg from '../../../assets/img/image-nft-bg.png'
import ImageNFTBg2x from '../../../assets/img/image-nft-bg@2x.png'
import ImageNFTBg3x from '../../../assets/img/image-nft-bg@3x.png'

export const NFTsWrapper = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
`

export const Banner = styled.div`
  width: 100vw;
  height: 290px;
  position: static;
  margin-bottom: -290px;
  background-color: ${(props) => props.theme.color.bg};
  background-image: linear-gradient(rgba(233, 233, 233, 0.79), rgba(233, 233, 233, 0.79)),
    -webkit-image-set(url(${ImageNFTBg}) 1x, url(${ImageNFTBg2x}) 2x, url(${ImageNFTBg3x}) 3x);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

export const NFTsBody = styled.div`
  max-width: ${(props) => props.theme.siteWidth}px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
`

export const Title = styled.h1`
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 36px;
  text-align: center;
  color: ${(props) => props.theme.color.grey[600]};
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

export const NFTImageView = styled.div`
  min-width: 0px;
  background-color: ${(props) => props.theme.color.grey[400]};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  width: 100%;
  padding: 40px 75px;
`

export const NFTImage = styled.img`
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  min-width: 0px;
  filter: drop-shadow(rgba(0, 0, 0, 0.33) 0px 10px 10px);
  transition: transform 0.2s cubic-bezier(0.65, 0, 0.35, 1) 0s;
  &:hover {
    transform: scale(1.1);
  }
`

export const NFTBodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 60px;
`

export const NFTBodyLeft = styled.div`
  flex: 1;
`

export const NFTBodyRight = styled.div`
  width: 370px;
`

export const NFTTitle = styled.h2`
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 36px;
  font-weight: 500;
  word-break: break-word;
  color: ${(props) => props.theme.color.text[500]};
  margin: 0;
  margin-bottom: 30px;
`

export const NFTDescription = styled.p`
  line-height: 1.5;
  font-weight: 400;
  font-size: 16px;
  color: ${(props) => props.theme.color.text[500]};
  width: 100%;
  max-width: 100%;
  word-break: break-word;
  white-space: pre-wrap;
  margin: 0;
  margin-bottom: 30px;
`

export const StyledLoadingWrapper = styled.div`
  margin: 160px auto;
  max-width: 500px;
`

export const LoadingTitle = styled.h1<{ error?: boolean }>`
  font-size: 32px;
  font-weight: 500;
  color: ${({ error, theme }) => (error ? theme.color.red[500] : theme.color.text[500])};
`

export const LoadingText = styled.p`
  font-size: 20px;
  margin-bottom: 30px;
`

export const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  /* align-items: center; */
`

export const LinkButton = styled.a`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  padding: 14px 20px;
  /* margin: 0px 20px; */
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  appearance: none;
  color: ${(props) => props.theme.color.text[600]};
  background-color: ${(props) => props.theme.color.bg};
  border: 2px solid ${(props) => props.theme.color.grey[500]};
  flex: 1 0 auto;
  &:first-child {
    margin-bottom: 10px;
  }
  &:hover {
    border-color: ${(props) => props.theme.color.text[600]};
  }
`

export const CreateWrapper = styled.div`
  margin: 100px auto;
`

export const CreateBody = styled.div`
  max-width: ${(props) => props.theme.siteWidth}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const CreateLeft = styled.div`
  flex: 1;
  min-width: 600px;
`

export const CreateRight = styled.div`
  min-width: 498px;
  margin-left: 80px;
`

export const CreateTitle = styled.h2`
  color: ${(props) => props.theme.color.text[500]};
  font-weight: 500;
  font-size: 32px;
  text-transform: uppercase;
  margin-bottom: 30px;
`

export const CreateDrag = styled.div<{ error?: boolean }>`
  padding: 40px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ error, theme }) => (error ? theme.color.red[500] : theme.color.text[500])};
  border: 2px solid ${({ theme, error }) => (error ? theme.color.red[500] : theme.color.grey[400])};
  margin-bottom: 30px;
  cursor: pointer;
`

export const CreateButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`

export const CreateInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  .chakra-input {
    border-color: ${(props) => props.theme.color.grey[500]};
    border-width: 2px;
    &:hover,
    &:focus {
      border-color: ${(props) => props.theme.color.text[500]};
    }
    &:focus {
      box-shadow: 0 0 0 1px ${(props) => props.theme.color.text[500]};
    }
  }
`

export const CreateInputLabel = styled.label`
  font-size: 16px;
  color: ${(props) => props.theme.color.text[500]};
  text-transform: uppercase;
  margin-bottom: 10px;
`

export const CreateNumberInputWrapper = styled.div`
  display: grid;
  column-gap: 20px;
  grid-template-columns: auto 1fr auto;
  flex-direction: row;
  justify-content: space-around;
`

export const CreateNumberInputButton = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  appearance: none;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.grey[600]};
  border: 2px solid ${(props) => props.theme.color.grey[600]};
  width: 40px;
  height: 40px;
  &:hover {
    background-color: ${(props) => props.theme.color.black};
    border: 2px solid ${(props) => props.theme.color.black};
  }
  &:active {
    background-color: ${(props) => props.theme.color.grey[600]};
    border: 2px solid ${(props) => props.theme.color.grey[600]};
  }
  &:disabled {
    background-color: ${(props) => props.theme.color.grey[500]};
    border: 2px solid ${(props) => props.theme.color.grey[500]};
    cursor: not-allowed;
    pointer-events: none;
  }
`
