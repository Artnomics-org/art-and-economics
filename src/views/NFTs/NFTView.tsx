import React, { useContext } from 'react'
import { ArrowUpRight } from 'react-feather'
import { RouteComponentProps } from 'react-router'
import { Chrono } from 'react-chrono'
import { BlackInternalLink } from '../../components/Link'
import { MediaOwnershipInfo } from '../../components/MediaOwnershipInfo'
import Page from '../../components/Page'
import { UserLink } from '../../components/UserLink'
import { useMediaData, useMediaLogs, useMediaOwner, useMediaToken, useNFTScanLink } from '../../hooks/nfts'
import { useToken } from '../../hooks/token'
import { getBalanceNumber } from '../../utils'
import NFTContentCard from './components/NFTContentCard'
import NFTLabelInfo from './components/NFTLabelInfo'
import {
  LinkButton,
  LinkContainer,
  LoadingTitle,
  NFTBodyLeft,
  NFTBodyRight,
  NFTBodyWrapper,
  NFTDescription,
  NFTImage,
  NFTImageView,
  NFTsWrapper,
  NFTTitle,
  NFTViewBuyWrapper,
  StyledLoadingWrapper,
} from './components/styleds'
import { ThemeContext } from 'styled-components/macro'
import NFTProvenanceItem from './components/NFTProvenanceItem'

type NFTViewProps = {
  id: string
}
const NFTView: React.FC<RouteComponentProps<NFTViewProps>> = ({
  match: {
    params: { id },
  },
}) => {
  const theme = useContext(ThemeContext)
  const { backendData, metadata, isLoading, isError } = useMediaData({
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
  let bidTitle = 'Reserve Price'
  let bidPrice = '0.00'
  if (!isAskExist && ownerInfo) {
    bidTitle = 'Sold For'
    bidPrice = getBalanceNumber(String(bidInfo?.amount || 0), bidToken?.decimals || 18).toFixed(2)
  }
  if (isAskExist) {
    bidTitle = 'Current Ask'
    bidPrice = getBalanceNumber(String(profile?.currentAsk?.amount), askToken?.decimals || 18).toFixed(2)
  }
  const scanLink = useNFTScanLink(backendData?.id)
  const ipfsLink = backendData?.tokenURI

  return (
    <Page>
      <NFTsWrapper>
        {!backendData && !isError && isLoading && (
          <StyledLoadingWrapper>
            <LoadingTitle>Loading...</LoadingTitle>
          </StyledLoadingWrapper>
        )}
        {!backendData && !isLoading && isError && (
          <StyledLoadingWrapper>
            <LoadingTitle error>Sorry</LoadingTitle>
            <div>But the Token is not exist yet, please check with the URL</div>
          </StyledLoadingWrapper>
        )}
        {backendData && (
          <>
            <NFTImageView>
              <NFTImage src={backendData.tokenURI} alt="NFT Image" />
            </NFTImageView>
            <NFTBodyWrapper>
              <NFTBodyLeft>
                <NFTTitle>{backendData?.title}</NFTTitle>
                <NFTDescription>{backendData?.description}</NFTDescription>
                <MediaOwnershipInfo info={backendData} />
                <NFTViewBuyWrapper>
                  <BlackInternalLink to={`/market/${id}/bids`}>See Bids</BlackInternalLink>
                  {profile && !isMeTheOwner && (
                    <BlackInternalLink to={`/market/${id}/bid`}>Place a bid</BlackInternalLink>
                  )}
                  {profile && isMeTheOwner && (
                    <BlackInternalLink to={`/market/${id}/ask`}>
                      {isAskExist ? 'Edit Price' : 'Add Price'}
                    </BlackInternalLink>
                  )}
                </NFTViewBuyWrapper>
                {mediaLogs && (
                  <NFTContentCard title="Provenance">
                    <Chrono
                      mode="VERTICAL"
                      borderLessCards={true}
                      hideControls={true}
                      cardHeight={40}
                      theme={{
                        cardBgColor: theme.color.bg,
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
                  </NFTContentCard>
                )}
              </NFTBodyLeft>
              <NFTBodyRight>
                <NFTContentCard title={bidTitle}>
                  {isAskExist && (
                    <NFTLabelInfo title="Price">
                      {bidPrice}
                      {askToken && ` ${askToken.symbol}`}
                    </NFTLabelInfo>
                  )}
                  {!isAskExist && ownerInfo && (
                    <>
                      <NFTLabelInfo title="Price">
                        {bidPrice}
                        {bidToken && ` ${bidToken.symbol}`}
                      </NFTLabelInfo>
                      <NFTLabelInfo title="Bidder">
                        <UserLink label="" {...ownerInfo} />
                      </NFTLabelInfo>
                    </>
                  )}
                </NFTContentCard>
                <NFTContentCard title="RESALE ROYALTY">
                  <NFTLabelInfo title="Creator">{bidShare}%</NFTLabelInfo>
                </NFTContentCard>
                {metadata && (
                  <NFTContentCard title="Metadata">
                    <NFTLabelInfo title="FileName">{metadata?.name}</NFTLabelInfo>
                    <NFTLabelInfo title="Description">{metadata?.description}</NFTLabelInfo>
                    <NFTLabelInfo title="MimeType">{metadata?.mimeType}</NFTLabelInfo>
                    <NFTLabelInfo title="Version">{metadata?.version}</NFTLabelInfo>
                  </NFTContentCard>
                )}
                <NFTContentCard title="Proof of Authenticity">
                  <LinkContainer>
                    <LinkButton href={scanLink} role="button" target="_blank" rel="noreferer noopener">
                      View Transaction
                      <ArrowUpRight />
                    </LinkButton>
                    <LinkButton href={ipfsLink} role="button" target="_blank" rel="noreferer noopener">
                      View on IPFS
                      <ArrowUpRight />
                    </LinkButton>
                  </LinkContainer>
                </NFTContentCard>
              </NFTBodyRight>
            </NFTBodyWrapper>
          </>
        )}
      </NFTsWrapper>
    </Page>
  )
}

export default NFTView
