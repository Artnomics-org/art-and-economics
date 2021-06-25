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
  margin: 20px 4rem;
  flex: 30%;
  width: 500px;
  height: 200px;
  background: ${(props) => props.theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`

const StyledContentWrapper = styled.div`
  display: flex;
  padding: 30px;
  flex: 3;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
`
const StyledContent = styled.div`
  display: flex;
  flex: 100%;
  flex-wrap: wrap;
  font-family: 'Helvetica Neue LT W05_93 Blk E',serif;
  font-size: 16px;
  font-weight: 700;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 16px;
  font-weight: 700;
  font-family: 'Helvetica Neue LT W05_93 Blk E',serif;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
`

const StyledDetails = styled.div`
  display: flex;
  flex: 100%;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  text-align: center;
`

const StyledFooter = styled.div`
  display: flex;
  margin-top: ${(props) => props.theme.spacing[5]}px;
  width: 100%;
  justify-content: space-between;
  align-content: flex-end;
`

const StyledOwner = styled.div`
  color: ${(props) => props.theme.color.grey[600]};
  font-family: 'Helvetica Neue LT W05_93 Blk E',serif;
  font-size: 16px;
  font-weight: 700;
  margin-right: auto;
`

const StyledPrice = styled.div`
  color: ${(props) => props.theme.color.grey[600]};
  font-family: 'Helvetica Neue LT W05_93 Blk E',serif;
  font-size: 16px;
`

export default NFTCards
