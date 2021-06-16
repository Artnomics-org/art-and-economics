import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/home">
        Swap
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/farms">
        Pool
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/vestnft">
        Farm
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/mynft">
        NFT Market
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-self: flex-end;
  align-items: center;
  display: flex;
  margin-bottom: 28px;
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.nav.def};
  font-weight: normal;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  text-transform: uppercase;
  &:hover, &.active {
    color: ${(props) => props.theme.color.nav.hov};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default Nav
