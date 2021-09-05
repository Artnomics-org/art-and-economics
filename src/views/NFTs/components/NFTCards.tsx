import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components/macro'
import { getMediaBids, getMediaMetadata } from '../../../backend/media'
import { useMediaList } from '../../../hooks/nfts'
import NFTCard, { NFTCardProps } from './NFTCard'

const NFTCards: React.FC = () => {
  const [nftList, setNftList] = useState<NFTCardProps[]>([])
  const { mediaList, isLoading, isError, error } = useMediaList()

  const fetchData = useCallback(async () => {
    if (mediaList) {
      const getData = mediaList.items.map(async (item) => {
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
          title: media.metadata.name,
          creator: media.creator.username,
          price: media.bidLogs[0].amount || 0,
          currency: media.bidLogs[0].currency,
          img: {
            low: media.tokenURI,
            medium: media.tokenURI,
            high: media.tokenURI,
          },
        }
      })
      setNftList(nftList)
    }
  }, [mediaList])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <StyledCardWrapper>
      {isLoading && !isError && <StyledLoading>Loading...</StyledLoading>}
      {isError && (
        <StyledError>
          No Data...
          <br />
          {error.message}
        </StyledError>
      )}
      {nftList.map((item, index) => (
        <NFTCard
          img={item.img}
          title={item.title}
          creator={item.creator}
          price={item.price}
          currency={item.currency}
          key={`${item.title}-${item.price}-${index}`}
        />
      ))}
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
