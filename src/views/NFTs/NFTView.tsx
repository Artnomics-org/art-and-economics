import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router'
import { Chrono } from 'react-chrono'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Page from '../../components/Page'
import { useMediaData, useMediaLogs, useMediaOwner, useMediaToken, useNFTScanLink } from '../../hooks/nfts'
import { useToken } from '../../hooks/token'
import { getBalanceNumber } from '../../utils'
import {
  LinkButton,
  LinkContainer,
  LoadingTitle,
  NFTBodyWrapper,
  NFTCardTitle,
  NFTCreatorWrapper,
  NFTDescription,
  NFTHistoryCard,
  NFTImage,
  NFTImageView,
  NFTImageViewFullButton,
  NFTInfoCard,
  NFTInfoCardWrapper,
  NFTLinksCard,
  NFTShareText,
  NFTsWrapper,
  NFTTitle,
  NFTViewBuyButton,
  NFTViewBuyWrapper,
  StyledLoadingWrapper,
} from './components/styleds'
import { ThemeContext } from 'styled-components/macro'
import NFTProvenanceItem from './components/NFTProvenanceItem'
import NFTUserLink from './components/NFTUserLink'
import { Maximize, Minimize } from 'react-feather'

type NFTViewProps = {
  id: string
}
const NFTView: React.FC<RouteComponentProps<NFTViewProps>> = ({
  match: {
    params: { id },
  },
}) => {
  const theme = useContext(ThemeContext)
  const { backendData, isLoading, isError } = useMediaData({
    id: Number(id),
    backendData: null,
    metadata: null,
  })
  const { profile, isMeTheOwner, isAskExist } = useMediaToken(Number(id))
  const { bidInfo, ownerInfo } = useMediaOwner(backendData)
  const { mediaLogs } = useMediaLogs(id)
  const bidShare = getBalanceNumber(String(profile?.bidsShares?.creator?.value))
  const bidToken = useToken(bidInfo?.currency)
  const askToken = useToken(profile?.currentAsk?.currency)
  let bidPrice = '0.00'
  if (!isAskExist && ownerInfo) {
    bidPrice = getBalanceNumber(String(bidInfo?.amount || 0), bidToken?.decimals || 18).toFixed(2)
  }
  if (isAskExist) {
    bidPrice = getBalanceNumber(String(profile?.currentAsk?.amount), askToken?.decimals || 18).toFixed(2)
  }
  const scanLink = useNFTScanLink(backendData?.id)
  const ipfsLink = backendData?.tokenURI

  const fullScreenHandle = useFullScreenHandle()

  return (
    <Page>
      {!backendData && !isError && isLoading && (
        <NFTsWrapper>
          <StyledLoadingWrapper>
            <LoadingTitle>Loading...</LoadingTitle>
          </StyledLoadingWrapper>
        </NFTsWrapper>
      )}
      {!backendData && !isLoading && isError && (
        <NFTsWrapper>
          <StyledLoadingWrapper>
            <LoadingTitle error>Sorry</LoadingTitle>
            <div>But the Token is not exist yet, please check with the URL</div>
          </StyledLoadingWrapper>
        </NFTsWrapper>
      )}
      {backendData && (
        <NFTsWrapper>
          <NFTBodyWrapper>
            <NFTTitle>{backendData?.title}</NFTTitle>
            <NFTImageView>
              <FullScreen handle={fullScreenHandle}>
                <NFTImage src={backendData.tokenURI} alt="NFT Image" />
                <NFTImageViewFullButton onClick={fullScreenHandle.exit}>
                  <Minimize />
                </NFTImageViewFullButton>
              </FullScreen>
              <NFTImageViewFullButton onClick={fullScreenHandle.enter}>
                <Maximize />
              </NFTImageViewFullButton>
            </NFTImageView>
            <NFTDescription>{backendData?.description}</NFTDescription>
            <NFTCreatorWrapper>
              <NFTUserLink user={backendData?.creator} />
            </NFTCreatorWrapper>
            <NFTHistoryCard>
              <NFTCardTitle center>History</NFTCardTitle>
              {mediaLogs?.length > 0 && (
                <Chrono
                  mode="VERTICAL"
                  borderLessCards={true}
                  hideControls={true}
                  cardHeight={54}
                  theme={{
                    primary: theme.color.grey[500],
                    secondary: theme.color.grey[500],
                  }}
                >
                  {mediaLogs.map((log, index) => (
                    <NFTProvenanceItem
                      item={log}
                      creator={backendData?.creator?.username}
                      key={`nft-provenance-item-${index}`}
                    />
                  ))}
                </Chrono>
              )}
            </NFTHistoryCard>
            <NFTLinksCard>
              <NFTCardTitle center>Proof of Authenticity</NFTCardTitle>
              <LinkContainer>
                <LinkButton href={scanLink} role="button" target="_blank" rel="noreferer noopener">
                  Etherscan Transaction
                </LinkButton>
                <LinkButton href={ipfsLink} role="button" target="_blank" rel="noreferer noopener">
                  View on IPFS
                </LinkButton>
              </LinkContainer>
            </NFTLinksCard>
            <NFTInfoCardWrapper>
              <NFTInfoCard>
                <NFTCardTitle bottom={10}>Reserve Price</NFTCardTitle>
                {isAskExist && (
                  <NFTShareText>
                    {bidPrice}
                    {askToken && ` ${askToken.symbol}`}
                  </NFTShareText>
                )}
                {!isAskExist && ownerInfo && (
                  <NFTShareText>
                    {bidPrice}
                    {bidToken && ` ${bidToken.symbol}`}
                  </NFTShareText>
                )}
              </NFTInfoCard>
              <NFTInfoCard>
                <NFTCardTitle bottom={10}>Resale royalty</NFTCardTitle>
                <NFTShareText>{bidShare}%</NFTShareText>
              </NFTInfoCard>
            </NFTInfoCardWrapper>
            <NFTViewBuyWrapper>
              {profile && !isMeTheOwner && <NFTViewBuyButton to={`/market/${id}/bid`}>Place a bid</NFTViewBuyButton>}
              {profile && isMeTheOwner && (
                <NFTViewBuyButton to={`/market/${id}/ask`}>{isAskExist ? 'Edit Price' : 'Add Price'}</NFTViewBuyButton>
              )}
              <NFTViewBuyButton to={`/market/${id}/bids`}>See Bids</NFTViewBuyButton>
            </NFTViewBuyWrapper>
          </NFTBodyWrapper>
        </NFTsWrapper>
      )}
    </Page>
  )
}

export default NFTView
