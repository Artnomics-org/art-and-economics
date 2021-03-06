import styled from 'styled-components/macro'

export const SectionWrapper = styled.div`
  width: 100%;
  position: relative;
`

export const SectionBanner = styled.section`
  width: 100%;
  padding-top: 74px;
  padding-bottom: 128px;
  background-color: ${(props) => props.theme.color.grey[400]};
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    padding-top: 40px;
    padding-bottom: 110px;
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const SectionPaper = styled.section`
  width: 100%;
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    padding-bottom: 20px;
  }
`

export const SectionIntro = styled.section`
  padding-top: 88px;
  padding-bottom: 68px;
  background-size: 100% 450px;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.theme.color.grey[400]},
    ${(props) => props.theme.color.grey[300]}
  );
  background-repeat: no-repeat;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    padding-top: 40px;
    padding-bottom: 40px;
  }
`

export const SectionWhy = styled.section`
  padding-top: 110px;
  padding-bottom: 130px;
  background-size: 100% 324px;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.theme.color.grey[400]},
    ${(props) => props.theme.color.white}
  );
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.color.white};
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    padding-top: 40px;
    padding-bottom: 40px;
  }
`

export const Title = styled.h2`
  font-weight: normal;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 45px;
  text-align: center;
  line-height: 1.13;
  color: ${(props) => props.theme.color.grey[600]};
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 100;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    margin-bottom: 30px;
  }
`

export const SubTitle = styled.h3`
  font-weight: normal;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 36px;
  text-align: center;
  letter-spacing: 2px;
  color: ${(props) => props.theme.color.grey[600]};
  text-transform: uppercase;
  margin: 0;
`

export const BannerTitle = styled.img`
  object-fit: contain;
  height: 380px;
  margin-bottom: 36px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    height: auto;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 20px;
  }
`

export const BannerSubTitle = styled.img`
  object-fit: contain;
  height: 44px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    height: auto;
  }
`

export const PaperImg = styled.img`
  object-fit: contain;
  width: 730px;
  margin-top: -64px;
  margin-bottom: 60px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    margin-bottom: 20px;
  }
`

export const PaperLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 730px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    padding: 20px;
  }
`

export const PaperLink = styled.a`
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

export const IconArrow = styled.img`
  object-fit: contain;
  height: 160px;
  position: absolute;
  right: 30px;
  top: 70px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    display: none;
  }
`

export const IntroContentTitle = styled.h5`
  font-family: 'Noto Sans KR';
  font-size: 36px;
  font-weight: 900;
  letter-spacing: 1px;
  text-align: center;
  color: ${(props) => props.theme.color.text[500]};
  margin-top: 70px;
  margin-bottom: 16px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    margin-top: 40px;
  }
`

export const IntroContentText = styled.h5`
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-weight: 900;
  line-height: 1.5;
  letter-spacing: 0.6px;
  text-align: center;
  color: ${(props) => props.theme.color.text[400]};
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    padding-left: 20px;
    padding-right: 20px;
    text-align: left;
  }
`

export const IntroContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 70px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  }
`

export const IntroImg = styled.img`
  object-fit: contain;
  width: 660px;
  margin-right: 42px;
  margin-bottom: -8px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 90%;
    margin-right: 0;
    margin-bottom: 0;
  }
`

export const IntroImgContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 90%;
    text-align: right;
  }
`

export const IntroImgContentTitle = styled.h6`
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 16px;
  line-height: 1.5;
  color: ${(props) => props.theme.color.text[400]};
  text-transform: uppercase;
  margin-bottom: 10px;
`

export const IntroImgContentAuthor = styled.p`
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-weight: 900;
  line-height: 1.5;
  letter-spacing: 1px;
  color: ${(props) => props.theme.color.text[400]};
  margin-bottom: 22px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    margin-bottom: 10px;
  }
`

export const IntroImgContentText = styled.p`
  font-family: 'Noto Sans KR';
  font-size: 10px;
  font-weight: 900;
  line-height: 1.5;
  color: ${(props) => props.theme.color.text[400]};
  margin: 0;
`

export const ContentWrapperWhy = styled.div`
  width: 775px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
`
