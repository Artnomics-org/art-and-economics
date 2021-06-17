import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import Page from '../../components/Page'
import TripleLine from '../../components/TripleLine'
import BannerTitle1x from '../../assets/img/title.png'
import BannerTitle2x from '../../assets/img/title@2x.png'
import BannerTitle3x from '../../assets/img/title@3x.png'
import BannerSubTitle1x from '../../assets/img/sub-title.png'
import BannerSubTitle2x from '../../assets/img/sub-title@2x.png'
import BannerSubTitle3x from '../../assets/img/sub-title@3x.png'
import PaperImg1x from '../../assets/img/image-paper.png'
import PaperImg2x from '../../assets/img/image-paper@2x.png'
import PaperImg3x from '../../assets/img/image-paper@3x.png'
import IconArrow from '../../assets/img/icon-long-arrow.svg'
import IntroImg1x from '../../assets/img/image-intro.png'
import IntroImg2x from '../../assets/img/image-intro@2x.png'
import IntroImg3x from '../../assets/img/image-intro@3x.png'
import Question from './components/Question'

const Home: React.FC = () => {
  const theme = useContext(ThemeContext)

  return (
    <Page>
      {/* Banner */}
      <StyledSectionWrapper>
        <StyledSectionBanner>
          <StyledBannerTitle src={BannerTitle1x} srcSet={`${BannerTitle2x} 2x, ${BannerTitle3x} 3x`} alt="banner title" />
          <StyledBannerSubTitle src={BannerSubTitle1x} srcSet={`${BannerSubTitle2x} 2x, ${BannerSubTitle3x} 3x`} alt="banner sub title" />
        </StyledSectionBanner>
      </StyledSectionWrapper>
      {/* Whitepaper */}
      <StyledSectionWrapper>
        <StyledIconArrow src={IconArrow} alt="icon arrow" />
        <StyledSectionPaper>
          <StyledPaperImg src={PaperImg1x} srcSet={`${PaperImg2x} 2x, ${PaperImg3x} 3x`} alt="whitepaper image" />
          <StyledSubTitle style={{ marginBottom: '20px' }}>Whitepaper 1.0V</StyledSubTitle>
          <StyledPaperLinks>
            <StyledPaperLink href="#">Korean</StyledPaperLink>
            <StyledPaperLink href="#">English</StyledPaperLink>
            <StyledPaperLink href="#">Chinese</StyledPaperLink>
          </StyledPaperLinks>
        </StyledSectionPaper>
      </StyledSectionWrapper>
      {/* Introduction */}
      <StyledSectionWrapper>
        <TripleLine color={theme.color.grey[400]} />
        <StyledSectionIntro>
          <StyledTitle style={{ marginBottom: '100px' }}>The best luxury of the 21st<br />century is art</StyledTitle>
          <StyledIntroContent>
            <StyledIntroImg src={IntroImg1x} srcSet={`${IntroImg2x} 2x, ${IntroImg3x} 3x`} alt="whitepaper image" />
            <StyledIntroImgContentWrapper>
              <StyledIntroImgContentTitle>
                Les femmes d’Alger,<br />
                Pablo Ruiz Picasso
              </StyledIntroImgContentTitle>
              <StyledIntroImgContentAuthor>피카소의 알제의 연인들</StyledIntroImgContentAuthor>
              <StyledIntroImgContentText>
                2015년 5월 크리스티 뉴욕경매,<br />
                1억7,955만 달러(약2,000억원)
              </StyledIntroImgContentText>
            </StyledIntroImgContentWrapper>
          </StyledIntroContent>
          <StyledIntroContentTitle style={{ marginTop: '70px', marginBottom: '16px' }}>21세기 최고의 명품은 미술품</StyledIntroContentTitle>
          <StyledIntroContentText>
            미술 시장에서 가장 비싼 그림은 피카소의 &lt;알제리의 여인들&gt; 입니다. 이 작품은 무려 1억 7,955만 달러로 한화를<br />
            그 가치로 계산하면 대략 2,000억원입니다. 아이폰 20만대, 에르메스 가방 1만개, 포르쉐 박스터 2,000대, YG사옥<br />
            20채에 해당하는 가치입니다. 수십억 수백억을 호가하는 작품을 구매하는 미술품 컬렉터들은 평범한 사람들<br />
            눈에는 가치를 명확히 알 수 있는 작품을 소장하려 하는 걸까요?
          </StyledIntroContentText>
        </StyledSectionIntro>
      </StyledSectionWrapper>
      {/* Why */}
      <StyledSectionWrapper>
        <TripleLine color={theme.color.grey[400]} />
        <StyledSectionWhy>
          <StyledTitle style={{ marginBottom: '110px' }}>Why do they keep<br />the art?</StyledTitle>
          <StyledWhyContentWrapper>
            <Question answer='심미적인 만족감 (미술에 대한 사랑)'>Aesthetic<br />satisfaction</Question>
            <Question answer='투자수익에 대한 기대'>Expectations for<br />return on investment</Question>
            <Question answer='상류사회 진입 및 존경'>Entering and respecting<br />upper-class society</Question>
          </StyledWhyContentWrapper>
        </StyledSectionWhy>
      </StyledSectionWrapper>
    </Page>
  )
}

const StyledSectionWrapper = styled.div`
  width: 100%;
  position: relative;
`

const StyledSectionBanner = styled.section`
  width: 100%;
  padding-top: 74px;
  padding-bottom: 128px;
  background-color: ${(props) => props.theme.color.grey[400]};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledSectionPaper = styled.section`
  width: 100%;
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledSectionIntro = styled.section`
  padding-top: 88px;
  padding-bottom: 68px;
  background-size: 100% 450px;
  background-image: linear-gradient(to bottom, ${(props) => props.theme.color.grey[400]}, ${(props) => props.theme.color.grey[300]});
  background-repeat: no-repeat;
`

const StyledSectionWhy = styled.section`
  padding-top: 110px;
  padding-bottom: 130px;
  background-size: 100% 324px;
  background-image: linear-gradient(to bottom, ${(props) => props.theme.color.grey[400]}, ${(props) => props.theme.color.white});
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.color.white};
`

const StyledTitle = styled.h2`
  font-weight: normal;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 45px;
  text-align: center;
  line-height: 1.13;
  color: ${(props) => props.theme.color.grey[600]};
  text-transform: uppercase;
  margin-top: 0;
`

const StyledSubTitle = styled.h3`
  font-weight: normal;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 36px;
  text-align: center;
  letter-spacing: 2px;
  color: ${(props) => props.theme.color.grey[600]};
  text-transform: uppercase;
  margin: 0;
`

const StyledBannerTitle = styled.img`
  object-fit: contain;
  height: 380px;
  margin-bottom: 36px;
`

const StyledBannerSubTitle = styled.img`
  object-fit: contain;
  height: 44px;
`

const StyledPaperImg = styled.img`
  object-fit: contain;
  width: 730px;
  margin-top: -64px;
  margin-bottom: 60px;
`

const StyledPaperLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 730px;
`

const StyledPaperLink = styled.a`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 16px;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.5;
  letter-spacing: 0.6px;
  &:hover {
    color: ${(props) => props.theme.color.grey[400]};
  }
`

const StyledIconArrow = styled.img`
  object-fit: contain;
  height: 160px;
  position: absolute;
  right: 30px;
  top: 70px;
`

const StyledIntroContentTitle = styled.h5`
  font-family: 'Noto Sans KR';
  font-size: 36px;
  font-weight: 900;
  letter-spacing: 1px;
  text-align: center;
  color: ${(props) => props.theme.color.text[500]};
`

const StyledIntroContentText = styled.h5`
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-weight: 900;
  line-height: 1.5;
  letter-spacing: 0.6px;
  text-align: center;
  color: ${(props) => props.theme.color.text[400]};
`

const StyledIntroContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 70px;
`

const StyledIntroImg = styled.img`
  object-fit: contain;
  width: 660px;
  margin-right: 42px;
  margin-bottom: -8px;
`

const StyledIntroImgContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledIntroImgContentTitle = styled.h6`
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 16px;
  line-height: 1.5;
  color: ${(props) => props.theme.color.text[400]};
  text-transform: uppercase;
  margin-bottom: 10px;
`

const StyledIntroImgContentAuthor = styled.p`
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-weight: 900;
  line-height: 1.5;
  letter-spacing: 1px;
  color: ${(props) => props.theme.color.text[400]};
  margin-bottom: 22px;
`

const StyledIntroImgContentText = styled.p`
  font-family: 'Noto Sans KR';
  font-size: 10px;
  font-weight: 900;
  line-height: 1.5;
  color: ${(props) => props.theme.color.text[400]};
  margin: 0;
`

const StyledWhyContentWrapper = styled.div`
  width: 775px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`

export default Home
