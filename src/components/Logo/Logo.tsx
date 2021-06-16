import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import LogoFile from '../../assets/img/logo-full.svg'

const Logo: React.FC = () => {
  return (
    <StyledLogo to="/">
      <img src={LogoFile} alt="logo" />
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 42px;
  min-width: 42px;
  padding: 0;
  text-decoration: none;
  img {
    height: 42px;
    object-fit: contain;
  }
`

export default Logo
