import React from 'react'
import styled from 'styled-components/macro'
import Container from '../../components/Container'
import Page from '../../components/Page'

const Home: React.FC = () => {
  return (
    <Page>
      <StyledSectionWrapper>
        <StyledLine />
        <StyledLine />
        <StyledLine />
        <StyledSectionIntro>
          <Container size="lg">
            <StyledTitle>The best luxury of the 21st<br />century is art</StyledTitle>
          </Container>
        </StyledSectionIntro>
      </StyledSectionWrapper>
      <StyledSectionWrapper>
        <StyledLine />
        <StyledLine />
        <StyledLine />
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

const StyledLine = styled.div`
  width: 100%;
  height: 2px;
  margin: 0 0 4px;
  background-color: ${(props) => props.theme.color.grey[400]};
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
