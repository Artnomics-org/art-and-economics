import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import Container from '../../components/Container'
import Page from '../../components/Page'
import TripleLine from '../../components/TripleLine'

const Home: React.FC = () => {
  const theme = useContext(ThemeContext)

  return (
    <Page>
      <StyledSectionWrapper>
        <TripleLine color={theme.color.grey[400]} />
        <StyledSectionIntro>
          <Container size="lg">
            <StyledTitle>The best luxury of the 21st<br />century is art</StyledTitle>
          </Container>
        </StyledSectionIntro>
      </StyledSectionWrapper>
      <StyledSectionWrapper>
        <TripleLine color={theme.color.grey[400]} />
        <StyledSectionWhy>
          <Container size="lg">
            <StyledTitle>Why do they keep<br />the art?</StyledTitle>
          </Container>
        </StyledSectionWhy>
      </StyledSectionWrapper>
    </Page>
  )
}

const StyledSectionWrapper = styled.div`
  width: 100%;
`

const StyledSectionWhy = styled.section`
  padding-top: 110px;
  padding-bottom: 130px;
  background-size: 100% 324px;
  background-image: linear-gradient(to bottom, ${(props) => props.theme.color.grey[400]}, ${(props) => props.theme.color.white});
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.color.white};
`

const StyledTitle = styled.h1`
  font-weight: normal;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 45px;
  text-align: center;
  line-height: 1.13;
  color: ${(props) => props.theme.color.grey[600]};
  text-transform: uppercase;
  margin-top: 0;
`

const StyledSectionIntro = styled.section`
  padding-top: 88px;
  padding-bottom: 68px;
  background-size: 100% 450px;
  background-image: linear-gradient(to bottom, ${(props) => props.theme.color.grey[400]}, ${(props) => props.theme.color.white});
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.color.grey[400]};
`

export default Home
