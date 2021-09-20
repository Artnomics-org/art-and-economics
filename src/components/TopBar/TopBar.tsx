import React, { useMemo, useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent } from '@chakra-ui/react'
import Container from '../Container'
import Logo from '../Logo'
import Nav from './components/Nav'
import CoinBalance from './components/CoinBalance'
import SwapButton from './components/SwapButton'
import WalletModal from '../Modal/WalletModal'
import { useWeb3React } from '@web3-react/core'
import { useENSName } from '../../hooks/ethers'
import { isTransactionRecent, useAllTransactions } from '../../hooks/transaction'
import { TransactionDetails } from '../../state/transactions/reducer'
import { useWalletModalToggle } from '../../hooks/application'
import { Menu } from 'react-feather'

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
  // mobile nav
  const theme = useContext(ThemeContext)
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const toggleMobileNav = () => setMobileNavOpen(!isMobileNavOpen)

  return (
    <StyledTopBar>
      <Container size="lg" padding={false}>
        <StyledTopBarInner>
          <StyledLogoWrapper>
            <Logo />
          </StyledLogoWrapper>
          <StyledNavWrapper>
            <Nav />
          </StyledNavWrapper>
          <StyledMobileNavButton onClick={toggleMobileNav}>
            <Menu size={16} color={theme.color.grey[400]} />
          </StyledMobileNavButton>
          <StyledQuickActionWrapper>
            <CoinBalance />
            <SwapButton onClick={toggleWalletModal} />
          </StyledQuickActionWrapper>
        </StyledTopBarInner>
      </Container>
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
      <Drawer placement="left" isOpen={isMobileNavOpen} onClose={toggleMobileNav}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <StyledDrawerButton onClick={toggleMobileNav}>
              <Menu size={16} color={theme.color.grey[400]} />
            </StyledDrawerButton>
          </DrawerHeader>
          <DrawerBody>
            <Nav />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
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
  position: relative;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    padding: 20px;
    height: auto;
  }
`

const StyledLogoWrapper = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    display: none;
  }
`

const StyledNavWrapper = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    display: none;
  }
`

const StyledMobileNavButton = styled.button`
  border: 2px solid ${(props) => props.theme.color.grey[400]};
  padding: 4px;
  outline: none;
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    display: flex;
  }
`

const StyledDrawerButton = styled.button`
  border: 2px solid ${(props) => props.theme.color.grey[400]};
  padding: 4px;
  margin: 4px -4px;
  outline: none;
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    display: flex;
  }
`

const StyledQuickActionWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  margin-bottom: 28px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    margin-bottom: 0;
  }
`

export default TopBar
