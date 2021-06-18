import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import CoinLogo from '../../assets/img/logo-coin.png'
import CoinLogo2x from '../../assets/img/logo-coin@2x.png'
import CoinLogo3x from '../../assets/img/logo-coin@3x.png'
import LogoWhite from '../../assets/img/logo-white.svg'
import LogoGallery from '../../assets/img/logo-gallery.svg'
import PartnerLogo, { PartnerLogoItem } from './components/PartnerLogo'
import TripleLine from '../TripleLine'
// Partners logo
import Binance1x from '../../assets/img/partners/logo-binance.png'
import Binance2x from '../../assets/img/partners/logo-binance@2x.png'
import Binance3x from '../../assets/img/partners/logo-binance@3x.png'
import Hotbit1x from '../../assets/img/partners/logo-hotbit.png'
import Hotbit2x from '../../assets/img/partners/logo-hotbit@2x.png'
import Hotbit3x from '../../assets/img/partners/logo-hotbit@3x.png'
import Cashforce1x from '../../assets/img/partners/logo-cashforce.png'
import Cashforce2x from '../../assets/img/partners/logo-cashforce@2x.png'
import Cashforce3x from '../../assets/img/partners/logo-cashforce@3x.png'
import Bcmc1x from '../../assets/img/partners/logo-bcmc.png'
import Bcmc2x from '../../assets/img/partners/logo-bcmc@2x.png'
import Bcmc3x from '../../assets/img/partners/logo-bcmc@3x.png'
import Bitribe1x from '../../assets/img/partners/logo-bitribe.png'
import Bitribe2x from '../../assets/img/partners/logo-bitribe@2x.png'
import Bitribe3x from '../../assets/img/partners/logo-bitribe@3x.png'

const partnerList: Array<PartnerLogoItem> = [
  {
    '1x': Binance1x,
    '2x': Binance2x,
    '3x': Binance3x
  },
  {
    '1x': Hotbit1x,
    '2x': Hotbit2x,
    '3x': Hotbit3x
  },
  {
    '1x': Cashforce1x,
    '2x': Cashforce2x,
    '3x': Cashforce3x
  },
  {
    '1x': Bcmc1x,
    '2x': Bcmc2x,
    '3x': Bcmc3x
  },
  {
    '1x': Bitribe1x,
    '2x': Bitribe2x,
    '3x': Bitribe3x
  }
]

const Footer: React.FC = () => {
  const theme = useContext(ThemeContext)

  return (
    <StyledFooter>
      <TripleLine color={theme.color.footer} />
      <StyledFooterWrapper>
        <StyledFooterInner>
          <StyledFooterItem>
            <StyledLogoLine>
              <StyledLogo src={LogoWhite} alt="logo" />
              ART&amp;ECONOMICS
            </StyledLogoLine>
            <StyledAddress>3 Fraser Street #05-25,<br />Duo Tower, Singapore, 189352</StyledAddress>
            <StyledCopyright>info@artnomics.org +821038997991</StyledCopyright>
          </StyledFooterItem>
          <StyledFooterItem>
            <StyledCoinLogo src={CoinLogo} srcSet={`${CoinLogo2x} 2x, ${CoinLogo3x} 3x`} alt="coin logo" />
          </StyledFooterItem>
          <StyledFooterItem style={{ alignItems: 'flex-end' }}>
            <StyledGallery src={LogoGallery} alt="logo gallery" />
            <StyledPartners>
              {partnerList.map((logo, i) => (
                <PartnerLogo logo={logo} key={`partner-logo-${i}`} />
              ))}
            </StyledPartners>
            <StyledCopyright>©2021 Design by studio nongraphic</StyledCopyright>
          </StyledFooterItem>
        </StyledFooterInner>
      </StyledFooterWrapper>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
`

const StyledFooterWrapper = styled.div`
  background-color: ${(props) => props.theme.color.footer};
`

const StyledFooterInner = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 48px 165px;
  max-width: ${(props) => props.theme.siteWidth}px;
  box-sizing: border-box;
`

const StyledFooterItem = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 164px;
`

const StyledCoinLogo = styled.img`
  object-fit: contain;
  height: 164px;
`

const StyledLogoLine = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 30px;
  line-height: 1;
  color: ${(props) => props.theme.color.white};
`

const StyledLogo = styled.img`
  object-fit: contain;
  height: 22px;
  margin-right: 14px;
`

const StyledAddress = styled.p`
  max-width: 328px;
  font-weight: normal;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 12px;
  line-height: 1.5;
  color: ${(props) => props.theme.color.white};
  text-transform: uppercase;
  margin: 0;
`

const StyledCopyright = styled.p`
  font-weight: normal;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 8px;
  line-height: 1;
  letter-spacing: 0.6px;
  color: ${(props) => props.theme.color.white};
  text-transform: uppercase;
  margin: 0;
`

const StyledGallery = styled.img`
  object-fit: contain;
  height: 18px;
`

const StyledPartners = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 340px;
`

export default Footer
