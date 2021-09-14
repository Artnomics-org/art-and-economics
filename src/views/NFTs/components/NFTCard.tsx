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
  creator: string
  price: string | number
  currency?: string
  id?: string | number
  onClick?: () => void
}

const NFTCard: React.FC<NFTCardProps> = ({ img, title, creator, price, currency, onClick }) => {
  const token = useToken(currency)
  const _buy = price ? 'Place Bid' : 'Place Offer'
  const _price = price ? getBalanceNumber(String(price)).toFixed(2) : 'No Price'
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
          <StyledDetails>{creator}</StyledDetails>
        </StyledContent>
        <StyledFooter>
          <StyledBuy>{_buy}</StyledBuy>
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
  width: 198px;
  height: 198px;
  background-color: ${(props) => props.theme.color.grey[400]};
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100px;
    height: 100px;
  }
`

const StyledImgHolder = styled.div`
  width: 198px;
  height: 198px;
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
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    font-size: 16px;
    margin: 0;
    line-height: 1;
  }
`

const StyledDetails = styled.div`
  display: flex;
  flex: 100%;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    font-size: 14px;
    line-height: 1;
  }
`

const StyledFooter = styled.div`
  display: flex;
  margin-top: auto;
  width: 100%;
  justify-content: space-between;
  align-content: flex-end;
`

const StyledBuy = styled.div`
  color: ${(props) => props.theme.color.text[400]};
  font-family: 'Helvetica Neue LT W05_93 Blk E', serif;
  line-height: 1.5;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  margin-right: auto;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    font-size: 14px;
    line-height: 1;
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
