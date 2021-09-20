import { Link } from 'react-router-dom'
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
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    height: 180px;
    margin-bottom: -180px;
  }
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
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    font-size: 24px;
    margin-top: calc(180px / 2 - 36px / 2);
    margin-bottom: calc(180px / 2 - 36px / 2);
  }
`

export const IconArrow = styled.img`
  object-fit: contain;
  height: 160px;
  position: absolute;
  right: 30px;
  bottom: 100px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    display: none;
  }
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
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100vw;
    height: 100vw;
    padding: 20px;
  }
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
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    flex-direction: column;
    justify-content: unset;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 40px;
  }
`

export const NFTBodyLeft = styled.div`
  flex: 1;
  margin-right: 40px;
  #timeline-main-wrapper {
    padding-left: 0;
    padding-right: 0;
    & > div {
      padding: 0;
    }
    .timeline-card-content {
      margin-top: 0;
      margin-bottom: 0;
    }
    .timeline-vertical-circle > div {
      transform: scale(1.1);
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    margin-right: 0px;
  }
`

export const NFTBodyRight = styled.div`
  width: 370px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
  }
`

export const NFTTitle = styled.h2`
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 36px;
  font-weight: 500;
  word-break: break-word;
  color: ${(props) => props.theme.color.text[500]};
  margin: 0;
  margin-bottom: 30px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
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
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    padding-left: 20px;
    padding-right: 20px;
  }
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
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    margin-top: 20px;
    margin-bottom: 40px;
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const CreateBody = styled.div`
  max-width: ${(props) => props.theme.siteWidth}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    flex-direction: column;
    justify-content: unset;
  }
`

export const CreateLeft = styled.div`
  flex: 1;
  min-width: 600px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    min-width: 0;
  }
`

export const CreateRight = styled.div`
  min-width: 498px;
  margin-left: 80px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    min-width: 0;
    margin-left: 0px;
  }
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
  word-wrap: break-word;
  word-break: break-word;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    align-items: flex-start;
  }
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

export const RegisterWrapper = styled.div`
  margin: 100px auto;
  max-width: ${(props) => props.theme.siteWidth}px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    margin: 40px auto;
    max-width: 100%;
  }
`

export const RegisterTitle = styled.h1<{ size?: number }>`
  font-size: ${(props) => props.size || 40}px;
  font-weight: 500;
  margin-bottom: 20px;
`

export const RegisterSubtitle = styled.h2<{ size?: number }>`
  font-size: ${(props) => props.size || 24}px;
  font-weight: 500;
  margin-bottom: 20px;
`

export const RegisterWarnText = styled.h2`
  font-size: 24px;
  font-weight: 500;
`

export const RegisterErrorText = styled.span`
  color: ${(props) => props.theme.color.red[500]};
  font-size: 10px;
`

export const RegisterBody = styled.div`
  padding: 30px 40px 40px;
  border: 2px solid ${(props) => props.theme.color.grey[500]};
  border-radius: 16px;
  width: 500px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    padding: 0;
    padding-left: 20px;
    padding-right: 20px;
    border: none;
    width: 100%;
  }
`

export const RegisterSpacer = styled.div`
  width: 100%;
  height: 20px;
`

export const UserEditWrapper = styled.div`
  max-width: ${(props) => props.theme.siteWidth}px;
  padding-top: 100px;
  padding-bottom: 100px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    padding: 40px 20px;
  }
`

export const UserEditBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    flex-direction: column-reverse;
    justify-content: unset;
  }
`

export const UserEditLeft = styled.div`
  flex: 1;
  width: 460px;
  margin-right: 40px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    mrgin-right: 0;
  }
`

export const UserEditRight = styled.div`
  width: 300px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
  }
`

export const UserEditTitle = styled.h1`
  color: ${(props) => props.theme.color.text[500]};
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 30px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    text-align: left;
  }
`

export const UserEditCardWrapper = styled.div`
  margin: 0;
  min-width: 0;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid ${(props) => props.theme.color.grey[400]};
  margin-bottom: 30px;
`

export const UserEditCardTitle = styled.h2`
  color: ${(props) => props.theme.color.text[400]};
  font-size: 20px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 20px;
`

export const UserEditAvatarWrapper = styled.div<{ error?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 256px;
  height: 256px;
  border-radius: 50%;
  color: ${({ error, theme }) => (error ? theme.color.red[500] : theme.color.text[500])};
  border: 1px solid ${({ error, theme }) => (error ? theme.color.red[500] : theme.color.grey[400])};
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    margin: 0 auto;
  }
`

export const UserEditAvatarUploading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
`

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const UserBanner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.color.grey[500]};
  padding-top: 60px;
  padding-bottom: 60px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    padding: 20px;
  }
`

export const UserBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    padding-top: 20px;
    padding-bottom: 20px;
  }
`

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: ${(props) => (props.theme.siteWidth / 3) * 2}px;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    flex-direction: column;
    justify-content: unset;
  }
`

export const UserInfoLeft = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    margin-bottom: 20px;
  }
`

export const UserInfoRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
  }
`

export const UserInfoContainer = styled.div<{ mb: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => props.mb}px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    margin-bottom: 20px;
  }
`

export const UserAvatar = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  pointer-events: none;
  border: 2px solid ${(props) => props.theme.color.white};
  margin-right: 20px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 80px;
    height: 80px;
  }
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const UserSocial = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    grid-template-columns: repeat(4, 40px);
  }
`

export const UserNick = styled.h4`
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.theme.color.white};
  margin-bottom: 10px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    font-size: 16px;
    margin-bottom: 8px;
  }
`

export const UserName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.color.white};
  margin-bottom: 20px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`

export const UserBio = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.color.white};
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    font-size: 10px;
  }
`

export const UserSocialItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 2px solid ${(props) => props.theme.color.white};
  text-decoration: none;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    padding: 10px;
    svg {
      width: 16px;
      height: 16px;
    }
  }
`

export const UserEditButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  color: ${(props) => props.theme.color.white};
  border: 2px solid ${(props) => props.theme.color.white};
  text-decoration: none;
  cursor: pointer;
  &:hover,
  &:active {
    color: ${(props) => props.theme.color.text[500]};
    background-color: ${(props) => props.theme.color.white};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    padding: 10px;
    font-size: 14px;
  }
`

export const MediaSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const UserNftWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  max-width: ${(props) => props.theme.siteWidth}px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    flex-direction: column;
    justify-content: unset;
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const BidsWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.siteWidth / 2}px;
  padding-top: 60px;
  padding-bottom: 60px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const TableWrapper = styled.div`
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    overflow-x: scroll;
  }
`

export const BidTitle = styled.h3`
  font-size: 32px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${(props) => props.theme.color.text[500]};
  margin-bottom: 20px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    font-size: 24px;
  }
`

export const NFTViewBuyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 180px;
  margin-bottom: 20px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    margin-right: 0px;
  }
`
