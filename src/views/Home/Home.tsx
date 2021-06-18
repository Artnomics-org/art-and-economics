import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components/macro'
import Page from '../../components/Page'
import TripleLine from '../../components/TripleLine'
import Question from './components/Question'
import {
  SectionWrapper,
  SectionBanner,
  SectionPaper,
  SectionIntro,
  SectionWhy,
  BannerTitle,
  BannerSubTitle,
  Title,
  SubTitle,
  PaperImg,
  PaperLinks,
  PaperLink,
  IconArrow,
  IntroContent,
  IntroContentText,
  IntroContentTitle,
  IntroImg,
  IntroImgContentAuthor,
  IntroImgContentText,
  IntroImgContentTitle,
  IntroImgContentWrapper,
  ContentWrapperWhy,
} from './components/styleds'
import BannerTitle1x from '../../assets/img/title.png'
import BannerTitle2x from '../../assets/img/title@2x.png'
import BannerTitle3x from '../../assets/img/title@3x.png'
import BannerSubTitle1x from '../../assets/img/sub-title.png'
import BannerSubTitle2x from '../../assets/img/sub-title@2x.png'
import BannerSubTitle3x from '../../assets/img/sub-title@3x.png'
import PaperImg1x from '../../assets/img/image-paper.png'
import PaperImg2x from '../../assets/img/image-paper@2x.png'
import PaperImg3x from '../../assets/img/image-paper@3x.png'
import IconLongArrow from '../../assets/img/icon-long-arrow.svg'
import IntroImg1x from '../../assets/img/image-intro.png'
import IntroImg2x from '../../assets/img/image-intro@2x.png'
import IntroImg3x from '../../assets/img/image-intro@3x.png'

const Home: React.FC = () => {
  const theme = useContext(ThemeContext)

  return (
    <Page>
      {/* Banner */}
      <SectionWrapper>
        <SectionBanner>
          <BannerTitle src={BannerTitle1x} srcSet={`${BannerTitle2x} 2x, ${BannerTitle3x} 3x`} alt="banner title" />
          <BannerSubTitle
            src={BannerSubTitle1x}
            srcSet={`${BannerSubTitle2x} 2x, ${BannerSubTitle3x} 3x`}
            alt="banner sub title"
          />
        </SectionBanner>
      </SectionWrapper>
      {/* Whitepaper */}
      <SectionWrapper>
        <IconArrow src={IconLongArrow} alt="icon arrow" />
        <SectionPaper>
          <PaperImg src={PaperImg1x} srcSet={`${PaperImg2x} 2x, ${PaperImg3x} 3x`} alt="whitepaper image" />
          <SubTitle style={{ marginBottom: '20px' }}>Whitepaper 1.0V</SubTitle>
          <PaperLinks>
            <PaperLink href="#">Korean</PaperLink>
            <PaperLink href="#">English</PaperLink>
            <PaperLink href="#">Chinese</PaperLink>
          </PaperLinks>
        </SectionPaper>
      </SectionWrapper>
      {/* Introduction */}
      <SectionWrapper>
        <TripleLine color={theme.color.grey[400]} />
        <SectionIntro>
          <Title style={{ marginBottom: '100px' }}>
            The best luxury of the 21st
            <br />
            century is art
          </Title>
          <IntroContent>
            <IntroImg src={IntroImg1x} srcSet={`${IntroImg2x} 2x, ${IntroImg3x} 3x`} alt="whitepaper image" />
            <IntroImgContentWrapper>
              <IntroImgContentTitle>
                Les femmes d’Alger,
                <br />
                Pablo Ruiz Picasso
              </IntroImgContentTitle>
              <IntroImgContentAuthor>피카소의 알제의 연인들</IntroImgContentAuthor>
              <IntroImgContentText>
                2015년 5월 크리스티 뉴욕경매,
                <br />
                1억7,955만 달러(약2,000억원)
              </IntroImgContentText>
            </IntroImgContentWrapper>
          </IntroContent>
          <IntroContentTitle style={{ marginTop: '70px', marginBottom: '16px' }}>
            21세기 최고의 명품은 미술품
          </IntroContentTitle>
          <IntroContentText>
            미술 시장에서 가장 비싼 그림은 피카소의 &lt;알제리의 여인들&gt; 입니다. 이 작품은 무려 1억 7,955만 달러로
            한화를
            <br />
            그 가치로 계산하면 대략 2,000억원입니다. 아이폰 20만대, 에르메스 가방 1만개, 포르쉐 박스터 2,000대, YG사옥
            <br />
            20채에 해당하는 가치입니다. 수십억 수백억을 호가하는 작품을 구매하는 미술품 컬렉터들은 평범한 사람들
            <br />
            눈에는 가치를 명확히 알 수 있는 작품을 소장하려 하는 걸까요?
          </IntroContentText>
        </SectionIntro>
      </SectionWrapper>
      {/* Why */}
      <SectionWrapper>
        <TripleLine color={theme.color.grey[400]} />
        <SectionWhy>
          <Title style={{ marginBottom: '110px' }}>
            Why do they keep
            <br />
            the art?
          </Title>
          <ContentWrapperWhy>
            <Question answer="심미적인 만족감 (미술에 대한 사랑)">
              Aesthetic
              <br />
              satisfaction
            </Question>
            <Question answer="투자수익에 대한 기대">
              Expectations for
              <br />
              return on investment
            </Question>
            <Question answer="상류사회 진입 및 존경">
              Entering and respecting
              <br />
              upper-class society
            </Question>
          </ContentWrapperWhy>
        </SectionWhy>
      </SectionWrapper>
    </Page>
  )
}

export default Home
