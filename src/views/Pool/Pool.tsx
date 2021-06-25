import React, { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Pair } from '@haneko/uniswap-sdk'
import Page from '../../components/Page'
import {
  Button,
  ButtonWrapper,
  Content,
  Info,
  InternalLink,
  Link,
  PoolWrapper,
  PositionCardWrapper,
  Title,
  VoteCard,
} from './components/styleds'
import { IconArrow } from '../Swap/components/styleds'
import IconLongArrow from '../../assets/img/icon-long-arrow.svg'
import { useActiveWeb3React } from '../../hooks/wallet'
import { toV2LiquidityToken, usePairs, useTrackedTokenPairs } from '../../hooks/liquidity'
import { useTokenBalancesWithLoadingIndicator } from '../../hooks/token'
import FullPositionCard from '../../components/PositionCard'

const Pool: React.FC = () => {
  const { account } = useActiveWeb3React()
  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account,
    liquidityTokens
  )
  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )
  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const isLoading = account && (fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair))
  const isNoLiquidity = account && !isLoading && !allV2PairsWithLiquidity.length

  console.log(allV2PairsWithLiquidity)

  return (
    <Page>
      <PoolWrapper>
        <IconArrow src={IconLongArrow} alt="icon arrow" />
        <VoteCard>
          <Title>Liquidity provider rewards</Title>
          <Content>
            Liquidity providers earn a 0.3% fee on all trades proportional to
            <br />
            their share of the pool. Fees are added to the pool, accrue in real
            <br />
            time and can be claimed by withdrawing your liquidity.
            <br />
          </Content>
          <Link
            target="_blank"
            href="https://uniswap.org/docs/v2/core-concepts/pools/"
            rel="noopener noreferrer"
            style={{ width: '100%' }}
          >
            Read more about providing liquidity
          </Link>
        </VoteCard>
        <ButtonWrapper>
          <Button style={{ marginRight: '32px' }} as={RouterLink} to='/create'>Create a pair</Button>
          <Button as={RouterLink} to='/add'>Add liquidity</Button>
        </ButtonWrapper>
        <PositionCardWrapper>
          {!account && <Info>Connect to a wallet to view your liquidity.</Info>}
          {isLoading && <Info>Loading...</Info>}
          {isNoLiquidity && <Info>No liquidity found.</Info>}
          {allV2PairsWithLiquidity.map(v2Pair => (
            <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
          ))}
        </PositionCardWrapper>
        <Content>
          Don&#39;t see a pool you joined? <InternalLink to='/find'>Import it.</InternalLink>
        </Content>
      </PoolWrapper>
    </Page>
  )
}

export default Pool
