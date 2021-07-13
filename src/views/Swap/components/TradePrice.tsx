import React, { useCallback } from 'react'
import { Price } from '@haneko/uniswap-sdk'
import { Repeat } from 'react-feather'
import styled from 'styled-components/macro'
import { TradePriceText } from './styleds'
import { darken } from 'polished'

interface TradePriceProps {
  price?: Price
  showInverted: boolean
  setShowInverted: (showInverted: boolean) => void
}

const TradePrice: React.FC<TradePriceProps> = ({ price, showInverted, setShowInverted }) => {
  const formattedPrice = showInverted ? price?.toSignificant(6) : price?.invert()?.toSignificant(6)
  const show = Boolean(price?.baseCurrency && price?.quoteCurrency)
  const label = showInverted
    ? `${price?.quoteCurrency?.symbol} per ${price?.baseCurrency?.symbol}`
    : `${price?.baseCurrency?.symbol} per ${price?.quoteCurrency?.symbol}`
  const handleClick = useCallback(() => {
    setShowInverted(!showInverted)
  }, [setShowInverted, showInverted])

  return (
    <Text>
      {show ? (
        <>
          {formattedPrice ?? '-'} {label}
          <StyledBalanceMaxMini onClick={handleClick}>
            <Repeat size={14} />
          </StyledBalanceMaxMini>
        </>
      ) : (
        '-'
      )}
    </Text>
  )
}

const StyledBalanceMaxMini = styled.button`
  height: 22px;
  width: 22px;
  background-color: ${({ theme }) => theme.color.bg};
  border: none;
  border-radius: 6px;
  padding: 0.2rem;
  font-size: 0.875rem;
  font-weight: 400;
  margin-left: 0.4rem;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;

  :hover {
    background-color: ${({ theme }) => darken(0.1, theme.color.bg)};
  }
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.color.bg)};
    outline: none;
  }
`

const Text = styled(TradePriceText)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default TradePrice
