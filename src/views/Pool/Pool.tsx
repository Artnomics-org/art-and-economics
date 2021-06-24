import React from 'react'
import Page from '../../components/Page'
import { Button, ButtonWrapper, Content, Info, Link, PoolWrapper, Title } from './components/styleds'
import { IconArrow } from '../Swap/components/styleds'
import IconLongArrow from '../../assets/img/icon-long-arrow.svg'

const Pool: React.FC = () => {
  return (
    <Page>
      <PoolWrapper>
        <IconArrow src={IconLongArrow} alt="icon arrow" />
        <Title>Liquidity provider rewards</Title>
        <Content>
          Liquidity providers earn a 0.3% fee on all trades proportional to
          <br />
          their share of the pool. Fees are added to the pool, accrue in real
          <br />
          time and can be claimed by withdrawing your liquidity.
          <br />
        </Content>
        <Link href="#" style={{ width: '100%', marginBottom: '40px' }}>
          Read more about providing liquidity
        </Link>
        <ButtonWrapper>
          <Button style={{ marginRight: '32px' }}>Create a pair</Button>
          <Button>Add liquidity</Button>
        </ButtonWrapper>
        <Info style={{ marginBottom: '48px' }}>No liquidity found.</Info>
        <Content>Don&#39;t see a pool you joined? <Link>Import it.</Link></Content>
      </PoolWrapper>
    </Page>
  )
}

export default Pool
