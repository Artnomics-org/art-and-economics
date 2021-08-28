import React from 'react'
import styled from 'styled-components/macro'
import LogoFile from '../../../assets/img/logo.svg'

interface SwapButtonProps {
  onClick: () => void
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick }) => {
  return (
    <StyledSwapButton onClick={onClick}>
      <StyledLogo src={LogoFile} alt="logo" />
    </StyledSwapButton>
  )
}

const StyledSwapButton = styled.button`
  display: block;
  height: 22px;
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const StyledLogo = styled.img`
  object-fit: contain;
  height: 22px;
`

export default SwapButton
