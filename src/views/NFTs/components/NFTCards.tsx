import React from "react"
import styled from "styled-components"
import ImageNFT from '../../../assets/img/image-nft.png'
import ImageNFT2x from '../../../assets/img/image-nft@2x.png'
import ImageNFT3x from '../../../assets/img/image-nft@3x.png'

const NFTCard: React.FC = () => {
    return (
        <StyledCard>
          <img src={ImageNFT} srcSet={`${ImageNFT2x} 2x, ${ImageNFT3x} 3x`} alt="NFT Cover" />
            <StyledContentWrapper>
              <StyledContent>
                <StyledTitle>{"LES FEMMES D'ALGER, PABLO RUIZ PICASSO"}</StyledTitle>
                <StyledDetails>{"피카소의 알제의 연인들"}</StyledDetails>
              </StyledContent>
              <StyledFooter>
                <StyledOwner>{"Swap"}</StyledOwner>
                <StyledPrice>{"Price"}</StyledPrice>
              </StyledFooter>
            </StyledContentWrapper>
        </StyledCard>
    )
}

const NFTCards: React.FC = () => {
    return (
      <StyledCardWrapper>
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
      </StyledCardWrapper>
    )
}

const StyledCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  justify-content: space-evenly;
`

const StyledCard = styled.div`
  display: flex;
  color: ${(props) => props.theme.color.text[400]};
  margin: 24px 0;
  flex: 50%;
  max-width: 498px;
  max-height: 198px; 
  background-color: ${(props) => props.theme.color.bg};
  box-shadow: 0 6px 31px 2px rgba(0, 0, 0, 0.1);
`

const StyledContentWrapper = styled.div`
  display: flex;
  padding: 24px;
  flex: 3;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
`
const StyledContent = styled.div`
  display: flex;
  flex: 100%;
  flex-wrap: wrap;
  font-size: 16px;
  font-weight: 700;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 16px;
  font-family: 'Helvetica Neue LT W05_93 Blk E',sans-serif;
  margin: ${(props) => props.theme.spacing[1]}px 0 0;
`

const StyledDetails = styled.div`
  display: flex;
  flex: 100%;
  font-family: 'Noto Sans KR',sans-serif;
  text-align: center;
`

const StyledFooter = styled.div`
  display: flex;
  margin-top: auto;
  width: 100%;
  justify-content: space-between;
  align-content: flex-end;
`

const StyledOwner = styled.div`
  color: ${(props) => props.theme.color.text[400]};
  font-family: 'Helvetica Neue LT W05_93 Blk E',serif;
  line-height: 1.5;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  margin-right: auto;
`

const StyledPrice = styled.div`
  color: ${(props) => props.theme.color.grey[600]};
  font-family: 'Helvetica Neue LT W05_53 Ext',sans-serif;
  text-transform: uppercase;
  font-size: 16px;
`

export default NFTCards
