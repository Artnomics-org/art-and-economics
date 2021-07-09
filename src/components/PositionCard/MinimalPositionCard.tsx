import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { JSBI, Percent } from '@haneko/uniswap-sdk'
import { useActiveWeb3React } from '../../hooks/wallet'
import { useTokenBalance, useTotalSupply } from '../../hooks/token'
import { unwrappedToken } from '../../utils/currency'
import { PositionCardProps } from './types'
import { AutoColumn } from '../Column'
import { FixedHeightRow } from './styleds'
import { RowFixed } from '../Row'
import { useCallback } from 'react'
import { DoubleCurrencyLogo } from '../CurrencyLogo'

const MinimalPositionCard: React.FC<PositionCardProps> = ({ pair, border, showUnwrapped = false }) => {
  const { account } = useActiveWeb3React()
  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)
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

  const userHasBalance = userPoolBalance && JSBI.greaterThan(userPoolBalance.raw, JSBI.BigInt(0))
  const posiText1 =
    "By adding liquidity you'll earn 0.3% of all trades on this pair proportional to your share of the pool."
  const posiText2 = 'Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.'

  const handleShowMore = useCallback(() => {
    setShowMore(!showMore)
  }, [showMore])

  return (
    <CardWrapper>
      {userHasBalance ? (
        <AutoColumn gap="12px">
          <FixedHeightRow>
            <NormalText>Your Position</NormalText>
          </FixedHeightRow>
          <FixedHeightRow onClick={handleShowMore}>
            <RowFixed>
              <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin={true} size={20} />
              <BigText>
                {currency0.symbol}/{currency1.symbol}
              </BigText>
            </RowFixed>
            <RowFixed>
              <BigText>{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</BigText>
            </RowFixed>
          </FixedHeightRow>
          <AutoColumn gap="4px">
            <FixedHeightRow>
              <NormalText>Your Pool Share:</NormalText>
              <NormalText>{poolTokenPercentage ? poolTokenPercentage.toFixed(6) + '%' : '-'}</NormalText>
            </FixedHeightRow>
            <FixedHeightRow>
              <NormalText>{currency0.symbol}:</NormalText>
              {token0Deposited ? (
                <RowFixed style={{ marginLeft: '6px' }}>
                  <NormalText>{token0Deposited?.toSignificant(6)}</NormalText>
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>
            <FixedHeightRow>
              <NormalText>{currency1.symbol}:</NormalText>
              {token1Deposited ? (
                <RowFixed style={{ marginLeft: '6px' }}>
                  <NormalText>{token1Deposited?.toSignificant(6)}</NormalText>
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>
          </AutoColumn>
        </AutoColumn>
      ) : (
        <SmallText>
          {posiText1}
          <br />
          {posiText2}
        </SmallText>
      )}
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  width: 100%;
  border-radius: 13.5px;
  border: solid 2px ${(props) => props.theme.color.grey[600]};
  padding: 20px;
  background-color: ${(props) => props.theme.color.bg};
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`

const SmallText = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
`

const NormalText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
`

const BigText = styled(NormalText)`
  font-size: 20px;
`

export default MinimalPositionCard
