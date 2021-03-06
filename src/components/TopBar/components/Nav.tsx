import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/swap">
        Swap
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/pool">
        Pool
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/market">
        NFT Market
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-self: flex-end;
  align-items: center;
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.nav.def};
  font-weight: normal;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  text-transform: uppercase;
  &:hover,
  &.active {
    color: ${(props) => props.theme.color.nav.hov};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
    padding-top: ${(props) => props.theme.spacing[3]}px;
    padding-bottom: ${(props) => props.theme.spacing[3]}px;
  }
`

export default Nav
