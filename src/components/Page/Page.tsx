import React, { useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import Footer from '../Footer'
import MobileMenu from '../MobileMenu'
import TopBar from '../TopBar'

export interface PageProps {
  showBgColor?: boolean
}

interface StyledPageProps {
  showBg: boolean
}

const Page: React.FC<PageProps> = ({ children, showBgColor = true }) => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <StyledPage showBg={showBgColor}>
      <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
      <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </StyledPage>
  )
}

const StyledPage = styled.div<StyledPageProps>`
  background-color: ${props => props.showBg ? props.theme.color.bg : 'transparent'};
`

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${(props) => props.theme.topBarSize * 3.5}px);
`

export default Page
