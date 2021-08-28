import { JSBI, Percent } from '@haneko/uniswap-sdk'
import React, { useState, useCallback } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'react-feather'
import styled from 'styled-components/macro'
import { useTokenBalance, useTotalSupply } from '../../hooks/token'
import { useActiveWeb3React } from '../../hooks/wallet'
import { currencyId, unwrappedToken } from '../../utils/currency'
import { LinkStyledButton } from '../Button'
import { AutoColumn } from '../Column'
import CurrencyLogo, { DoubleCurrencyLogo } from '../CurrencyLogo'
import { AutoRow, RowBetween, RowFixed } from '../Row'
import { PositionCardProps } from './types'
import { FixedHeightRow } from './styleds'

const FullPositionCard: React.FC<PositionCardProps> = ({ pair, border }) => {
  const { account } = useActiveWeb3React()
  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)
  const [showMore, setShowMore] = useState(false)
  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)
  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined
  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  const handleShowMore = useCallback(() => {
    setShowMore(!showMore)
  }, [showMore])

  return (
    <PositionCard>
      <AutoColumn gap="12px">
        <FixedHeightRow>
          <RowFixed>
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin={true} size={20} />
            <CardTitleText>
              {!currency0 || !currency1 ? 'Loading...' : `${currency0.symbol}/${currency1.symbol}`}
            </CardTitleText>
          </RowFixed>
          <RowFixed>
            <LinkStyledButton onClick={handleShowMore}>
              <AutoRow>
                Manage
                {showMore ? (
                  <ChevronUp size="20" style={{ marginLeft: '10px' }} />
                ) : (
                  <ChevronDown size="20" style={{ marginLeft: '10px' }} />
                )}
              </AutoRow>
            </LinkStyledButton>
          </RowFixed>
        </FixedHeightRow>
        {showMore && (
          <AutoColumn gap="8px">
            <FixedHeightRow>
              <CardText>Your pool tokens:</CardText>
              <CardText>{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</CardText>
            </FixedHeightRow>
            <FixedHeightRow>
              <RowFixed>
                <CardText>Pooled {currency0.symbol}:</CardText>
              </RowFixed>
              {token0Deposited ? (
                <RowFixed>
                  <CardText style={{ marginLeft: '6px' }}>{token0Deposited?.toSignificant(6)}</CardText>
                  <CurrencyLogo size={20} style={{ marginLeft: '8px' }} currency={currency0} />
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>
            <FixedHeightRow>
              <RowFixed>
                <CardText>Pooled {currency1.symbol}:</CardText>
              </RowFixed>
              {token1Deposited ? (
                <RowFixed>
                  <CardText style={{ marginLeft: '6px' }}>{token1Deposited?.toSignificant(6)}</CardText>
                  <CurrencyLogo size={20} style={{ marginLeft: '8px' }} currency={currency1} />
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>
            <FixedHeightRow>
              <CardText>Your pool share:</CardText>
              <CardText>{poolTokenPercentage ? poolTokenPercentage.toFixed(2) + '%' : '-'}</CardText>
            </FixedHeightRow>
            <RowBetween style={{ marginTop: '10px' }}>
              <Button as={RouterLink} to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                Add
              </Button>
              <Button as={RouterLink} to={`/remove/${currencyId(currency0)}/${currencyId(currency1)}`}>
                Remove
              </Button>
            </RowBetween>
          </AutoColumn>
        )}
      </AutoColumn>
    </PositionCard>
  )
}

const PositionCard = styled.div`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  width: 100%;
  border-radius: 14px;
  border: solid 2px ${(props) => props.theme.color.grey[600]};
  padding: 20px;
  background-color: ${(props) => props.theme.color.bg};
  position: relative;
  overflow: hidden;
`

const CardTitleText = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
`

const CardText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
`

export const Button = styled.button`
  appearance: none;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 60px;
  border: solid 2px ${(props) => props.theme.color.grey[600]};
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  font-family: 'Helvetica Neue LT W05_53 Ext';
  text-transform: uppercase;
  text-decoration: none;
  color: ${(props) => props.theme.color.text[500]};
  background-color: transparent;
  padding: 0 16px;
  margin: 0;
  min-width: 160px;
`

export default FullPositionCard
