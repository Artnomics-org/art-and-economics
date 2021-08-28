import React from 'react'
import styled from 'styled-components/macro'
import { useHttpLocations } from '../../hooks'
import TokenLogo from '../TokenLogo'

interface ListLogoProps {
  logoURI: string
  size?: number
  style?: React.CSSProperties
  alt?: string
}

const ListLogo: React.FC<ListLogoProps> = ({ logoURI, style, size = 24, alt }) => {
  const srcs: string[] = useHttpLocations(logoURI)

  return <StyledListLogo alt={alt} size={size} srcs={srcs} style={style} />
}

const StyledListLogo = styled(TokenLogo)<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

export default ListLogo
