import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { JSBI, Percent } from '@haneko/uniswap-sdk'
import { useActiveWeb3React } from '../../hooks/wallet'
import { useTokenBalance, useTotalSupply } from '../../hooks/token'
import { unwrappedToken } from '../../utils/currency'
import { PositionCardProps } from './types'

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

  return <></>
}

export default MinimalPositionCard
