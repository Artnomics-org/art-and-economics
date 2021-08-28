import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'

interface SpacerProps {
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}

const Spacer: React.FC<SpacerProps> = ({ size = 'md', style }) => {
  const { spacing } = useContext(ThemeContext)

  let s: number
  switch (size) {
    case 'lg':
      s = spacing[6]
      break
    case 'sm':
      s = spacing[2]
      break
    case 'md':
    default:
      s = spacing[4]
  }

  return <StyledSpacer size={s} style={style} />
}

interface StyledSpacerProps {
  size: number
}

const StyledSpacer = styled.div<StyledSpacerProps>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`

export default Spacer
