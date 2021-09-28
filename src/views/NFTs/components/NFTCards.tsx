import React, { useState, useEffect, useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import { getMediaBids, getMediaMetadata } from '../../../backend/media'
import { useMediaList } from '../../../hooks/nfts'
import NFTCard, { NFTCardProps } from './NFTCard'

const NFTCards: React.FC = () => {
  const [nftList, setNftList] = useState<NFTCardProps[]>([])
  const { mediaList, hasMore, loadMore, isLoading, isError, error } = useMediaList()
  const history = useHistory()

  const fetchData = useCallback(async () => {
    if (mediaList) {
      const getData = mediaList.map(async (item) => {
        const metadata = await getMediaMetadata(item.metadataURI)
        const bidLogs = await getMediaBids(item.id)
        return {
          ...item,
          metadata,
          bidLogs,
        }
      })
      const data = await Promise.all(getData)
      const nftList: NFTCardProps[] = data.map((media) => {
        return {
          id: media.id,
          title: media?.metadata?.name,
          description: media?.metadata?.description,
          creator: media?.creator?.username,
          price: media?.bidLogs[0]?.amount || 0,
          currency: media?.bidLogs[0]?.currency,
          img: {
            low: media?.tokenURI,
            medium: media?.tokenURI,
            high: media?.tokenURI,
          },
        }
      })
      setNftList(nftList)
    }
  }, [mediaList])

  const handleLoadMore = useCallback(() => {
    if (mediaList.length > 0) {
      loadMore()
    }
  }, [loadMore, mediaList])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleCardClick = useCallback(
    (id: string | number) => {
      history.push(`/market/${id}`)
    },
    [history],
  )

  if (isLoading && !isError) {
    return <StyledLoading>Loading...</StyledLoading>
  }

  if (isError) {
    return (
      <StyledError>
        No Data...
        <br />
        {error.message}
      </StyledError>
    )
  }

  return (
    <InfiniteScroll
      dataLength={nftList.length}
      hasMore={hasMore}
      next={handleLoadMore}
      loader={<StyledLoading>Loading...</StyledLoading>}
    >
      <StyledCardWrapper>
        {nftList.map((item, index) => (
          <NFTCard
            img={item.img}
            title={item.title}
            description={item.description}
            creator={item.creator}
            price={item.price}
            currency={item.currency}
            key={`${item.title}-${item.price}-${index}`}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </StyledCardWrapper>
    </InfiniteScroll>
  )
}

const StyledCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0px 60px;
  justify-items: center;
  width: 100%;
  position: relative;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    grid-template-columns: 1fr;
    padding-left: 20px;
    padding-right: 20px;
  }
`

const StyledLoading = styled.div`
  color: ${(props) => props.theme.color.text[400]};
  font-family: 'Helvetica Neue LT W05_93 Blk E', sans-serif;
  font-size: 32px;
  text-align: center;
  margin: 100px auto;
`

const StyledError = styled.div`
  color: ${(props) => props.theme.color.text[400]};
  font-family: 'Helvetica Neue LT W05_93 Blk E', sans-serif;
  font-size: 32px;
  text-align: center;
  margin: 100px auto;
`

export default NFTCards
