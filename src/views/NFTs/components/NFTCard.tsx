import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import { useToken } from '../../../hooks/token'
import { getBalanceNumber } from '../../../utils'

export interface NFTCardProps {
  img: {
    low: string
    medium: string
    high: string
  }
  title: string
  description: string
  creator: string
  price: string | number
  currency?: string
  id?: string | number
  onClick?: () => void
}

const NFTCard: React.FC<NFTCardProps> = ({ img, title, description, creator, price, currency, onClick }) => {
  const token = useToken(currency)
  const _price = price ? getBalanceNumber(String(price), token?.decimals || 18).toFixed(2) : 'No Price'
  const _currency = token ? token.symbol : ''
  const handleCardClick = useCallback(() => {
    if (onClick) onClick()
  }, [onClick])
  return (
    <StyledCard onClick={handleCardClick}>
      {!img?.low && <StyledImgHolder />}
      {img?.low && <StyledImg src={img.low} srcSet={`${img.medium} 2x, ${img.high} 3x`} alt="NFT Cover" />}
      <StyledContentWrapper>
        <StyledContent>
          <StyledTitle>{title}</StyledTitle>
          <StyledDetails>{description}</StyledDetails>
        </StyledContent>
        <StyledFooter>
          <StyledProfile>{creator}</StyledProfile>
          <StyledPrice>
            {_price}
            {_currency}
          </StyledPrice>
        </StyledFooter>
      </StyledContentWrapper>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  display: flex;
  color: ${(props) => props.theme.color.text[400]};
  margin: 24px 0;
  flex: 50%;
  max-width: 498px;
  max-height: 198px;
  background-color: ${(props) => props.theme.color.bg};
  box-shadow: 0 6px 31px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    height: 100px;
    margin-bottom: 0;
  }
`

const StyledImg = styled.img`
  display: block;
  object-fit: cover;
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.theme.color.grey[400]};
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100px;
    height: 100px;
  }
`

const StyledImgHolder = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.theme.color.grey[400]};
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100px;
    height: 100px;
  }
`

const StyledContentWrapper = styled.div`
  display: flex;
  padding: 24px;
  flex: 3;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    padding: 10px;
  }
`
const StyledContent = styled.div`
  display: flex;
  flex: 100%;
  flex-wrap: wrap;
  font-size: 16px;
  font-weight: 700;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 16px;
  font-family: 'Helvetica Neue LT W05_93 Blk E', sans-serif;
  margin: ${(props) => props.theme.spacing[1]}px 0 0;
  max-height: 30px;
  overflow: hidden;
  word-break: break-all;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    font-size: 16px;
    line-height: 1;
    max-height: 16px;
    margin: 0;
  }
`

const StyledDetails = styled.div`
  display: flex;
  flex: 100%;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  word-break: break-all;
  max-height: 80px;
  overflow: hidden;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    line-height: 1;
    max-height: 42px;
  }
`

const StyledFooter = styled.div`
  display: flex;
  margin-top: auto;
  width: 100%;
  justify-content: space-between;
  align-content: flex-end;
`

const StyledProfile = styled.div`
  flex: 1;
  color: ${(props) => props.theme.color.text[400]};
  font-family: 'Helvetica Neue LT W05_93 Blk E', serif;
  line-height: 1.5;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  margin-right: auto;
  max-width: 165px;
  overflow: hidden;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    font-size: 14px;
    line-height: 1;
    max-width: auto;
  }
`

const StyledPrice = styled.div`
  color: ${(props) => props.theme.color.grey[600]};
  font-family: 'Helvetica Neue LT W05_53 Ext', sans-serif;
  line-height: 1.5;
  text-transform: uppercase;
  font-size: 16px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    font-size: 14px;
    line-height: 1;
  }
`

export default NFTCard
