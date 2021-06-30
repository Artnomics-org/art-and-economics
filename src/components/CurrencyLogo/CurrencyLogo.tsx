import { Currency, ETHER, Token } from '@haneko/uniswap-sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components/macro'
import { useHttpLocations } from '../../hooks'
import { WrappedTokenInfo } from '../../hooks/lists'
import TokenLogo from '../TokenLogo'
import EthereumLogo from '../../assets/img/tokens/bnb.svg'

interface CurrencyLogoProps {
  currency?: Currency
  size?: number
  style?: React.CSSProperties
  margin?: boolean
}

const CurrencyLogo: React.FC<CurrencyLogoProps> = ({ currency, size = 24, style, margin = false }) => {
  const getTokenLogoURL = (address: string) =>
    `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`

  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }

      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} margin={margin} style={style} />
  }

  return <StyledLogo size={size} margin={margin} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}

interface LogoSizeProp {
  size: number
  margin: boolean
}
const StyledEthereumLogo = styled.img<LogoSizeProp>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
  margin-right: ${({ size, margin }) => margin && (size / 2).toString() + 'px'};
`

const StyledLogo = styled(TokenLogo)<LogoSizeProp>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size}px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  margin-right: ${({ size, margin }) => margin && (size / 2).toString() + 'px'};
`

export default CurrencyLogo
