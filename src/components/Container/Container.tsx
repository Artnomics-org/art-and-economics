import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'

interface ContainerProps {
  children?: React.ReactNode,
  size?: 'sm' | 'md' | 'lg',
  padding?: boolean
}

const Container: React.FC<ContainerProps> = ({ children, size = 'md', padding = true }) => {
  const { siteWidth } = useContext<{ siteWidth: number }>(ThemeContext)
  let width: number
  switch (size) {
    case 'sm':
      width = siteWidth / 2
      break
    case 'md':
      width = siteWidth * 2 / 3
      break
    case 'lg':
    default:
      width = siteWidth
  }
  return (
    <StyledContainer width={width} padding={padding}>
      {children}
    </StyledContainer>
  )
}

interface StyledContainerProps {
  width: number
  padding: boolean
}

const StyledContainer = styled.div<StyledContainerProps>`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: ${props => props.width}px;
  padding: 0 ${props => props.padding ? props.theme.spacing[4] : 0}px;
  width: 100%;
`

export default Container