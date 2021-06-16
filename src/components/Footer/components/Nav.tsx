import React from 'react'
import styled from 'styled-components/macro'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink target="_blank" href="https://twitter.com/#TODO">
        Twitter
      </StyledLink>
      <StyledLink target="_blank" href="https://medium.com/#TODO">
        Medium
      </StyledLink>
      <StyledLink target="_blank" href="#">
        Github
      </StyledLink>
      <StyledLink target="_blank" href="https://discord.com/invite/#TODO">
        Discord
      </StyledLink>
      <StyledLink target="_blank" href="https://t.me/#TODO">
        Telegram
      </StyledLink>
      <StyledLink target="_blank" href="https://open.kakao.com/o/#TODO">
        Kakao
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  @media(max-width: 540px) {
    justify-content: flex-start;
  }
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.yellow};
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 34px;
  &:hover {
    color: ${(props) => props.theme.color.yellow};
  }
  @media(max-width: 540px) {
    /* padding-left: ${(props) => props.theme.spacing[3]}px; */
    padding-right: ${(props) => props.theme.spacing[3]}px;
  }
`

export default Nav
