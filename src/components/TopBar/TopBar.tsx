import React, { useMemo } from 'react'
import styled from 'styled-components/macro'
import Container from '../Container'
import Logo from '../Logo'
import Nav from './components/Nav'
import CoinBalance from './components/CoinBalance'
import SwapButton from './components/SwapButton'
import Spacer from '../Spacer'
import WalletModal from '../Modal/WalletModal'
import { useWeb3React } from '@web3-react/core'
import { useENSName } from '../../hooks/ethers'
import { isTransactionRecent, useAllTransactions } from '../../hooks/transaction'
import { TransactionDetails } from '../../state/transactions/reducer'
import { useWalletModalToggle } from '../../hooks/application'

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  const { account } = useWeb3React()
  const { ENSName } = useENSName(account ?? undefined)
  const allTransactions = useAllTransactions()
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])
  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash)
  const toggleWalletModal = useWalletModalToggle()

  return (
    <StyledTopBar>
      <Container size="lg" padding={false}>
        <StyledTopBarInner>
          <StyledLogoWrapper>
            <Logo />
          </StyledLogoWrapper>
          <Nav />
          <StyledQuickActionWrapper>
            <CoinBalance />
            <Spacer size="lg" style={{ height: '20px' }} />
            <SwapButton onClick={toggleWalletModal} />
          </StyledQuickActionWrapper>
        </StyledTopBarInner>
      </Container>
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </StyledTopBar>
  )
}

const StyledTopBar = styled.div`
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`

const StyledTopBarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px;
  height: ${(props) => props.theme.topBarSize}px;
  max-width: ${(props) => props.theme.siteWidth}px;
`

const StyledLogoWrapper = styled.div``

const StyledQuickActionWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  margin-bottom: 28px;
`

export default TopBar
