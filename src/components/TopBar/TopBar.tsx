import React from 'react'
import styled from 'styled-components/macro'
import Container from '../Container'
import Logo from '../Logo'
import Nav from './components/Nav'
import CoinBalance from './components/CoinBalance'
import SwapButton from './components/SwapButton'
import Spacer from '../Spacer'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
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
            <SwapButton />
          </StyledQuickActionWrapper>
        </StyledTopBarInner>
      </Container>
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
