import React from 'react'
import styled from 'styled-components/macro'

export interface PartnerLogoItem {
  '1x': string
  '2x': string
  '3x': string
}

interface PartnerLogoProps {
  logo: PartnerLogoItem
}

const PartnerLogoComp: React.FC<PartnerLogoProps> = ({ logo }) => {
  return (
    <StyledLogo src={logo['1x']} srcSet={`${logo['2x']} 2x, ${logo['3x']} 3x`} alt="partner logo" />
  )
}

const StyledLogo = styled.img`
  object-fit: contain;
  height: 20px;
  &:first-child {
    margin-bottom: 10px;
  }
`

export default PartnerLogoComp
