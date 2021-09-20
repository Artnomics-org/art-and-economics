import React, { useMemo, useCallback, useState, useContext } from 'react'
import { RouteComponentProps } from 'react-router'
import { Table, Thead, Tbody, Tr, Th, Td, useToast, Spinner } from '@chakra-ui/react'
import { AutoColumn } from '../../components/Column'
import Page from '../../components/Page'
import { useBidderList, useBidsDetail, useMedia, useMediaBids, useMediaToken } from '../../hooks/nfts'
import { BidsWrapper, BidTitle, TableWrapper } from './components/styleds'
import { formatAddress, getBalanceNumber } from '../../utils'
import { Bid } from '../../types/ContractTypes'
import { BlackButton } from '../../components/Button'
import { useActiveWeb3React } from '../../hooks/wallet'
import { ThemeContext } from 'styled-components/macro'

type BidsProps = {
  id: string
}

const Bids: React.FC<RouteComponentProps<BidsProps>> = ({
  match: {
    params: { id },
  },
}) => {
  const toast = useToast()
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  const media = useMedia()
  const { isMeTheOwner } = useMediaToken(id)
  const { mediaBids, reloadBids } = useMediaBids(id)
  const bidderList = useBidderList(mediaBids)
  const bidsDetail = useBidsDetail(id, bidderList)

  const [isProcessing, setIsProcessing] = useState(false)

  const activeBidsList = useMemo(() => {
    const list = Object.values(bidsDetail).filter((bid) => bid !== null)
    console.log('Bids:activeBidsList:bidsDetail:', bidsDetail, 'list:', list)
    return list.map((bid) => {
      const bidder = formatAddress(bid?.bidder)
      const price = getBalanceNumber(bid?.amount.toString()).toFixed(2)
      const sellOnShare = getBalanceNumber(bid?.sellOnShare?.value.toString())
      return { bid, bidder, price, sellOnShare }
    })
  }, [bidsDetail])

  const historyBidData = useMemo(() => {
    return mediaBids.map((bid) => {
      const bidder = formatAddress(bid?.bidder)
      const price = getBalanceNumber(bid?.amount).toFixed(2)
      const status = bid?.status
      const date = new Date(bid?.at?.timestamp * 1000).toLocaleString()
      return { bidder, price, status, date }
    })
  }, [mediaBids])

  const handleAcceptBid = useCallback(
    async (bid: Bid) => {
      try {
        setIsProcessing(true)
        const tx = await media.acceptBid(id, {
          ...bid,
          sellOnShare: bid.sellOnShare,
        })
        toast({
          title: 'Accepting bid...',
          description: 'Wait for the contract confirmation, please do not refresh or leave the page.',
          status: 'info',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        })
        const receipt = await tx.wait()
        await reloadBids()
        toast({
          title: 'Successfully accept bid',
          description: `Transaction hash: ${receipt.transactionHash}`,
          status: 'success',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        })
        setIsProcessing(false)
      } catch (error) {
        toast({
          title: 'Accept bid error',
          description: `${error}, Please try again.`,
          status: 'error',
          duration: 5000,
          position: 'top-right',
          isClosable: true,
        })
      } finally {
        setIsProcessing(false)
      }
    },
    [id, media, reloadBids, toast],
  )

  const handleRemoveBid = useCallback(async () => {
    try {
      setIsProcessing(true)
      const tx = await media.removeBid(id)
      toast({
        title: 'Removing bid...',
        description: 'Wait for the contract confirmation, please do not refresh or leave the page.',
        status: 'info',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
      const receipt = await tx.wait()
      await reloadBids()
      toast({
        title: 'Successfully remove bid',
        description: `Transaction hash: ${receipt.transactionHash}`,
        status: 'success',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
      setIsProcessing(false)
    } catch (error) {
      toast({
        title: 'Remove bid error',
        description: `${error}, Please try again.`,
        status: 'error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      })
    } finally {
      setIsProcessing(false)
    }
  }, [id, media, reloadBids, toast])

  return (
    <Page>
      <BidsWrapper>
        <AutoColumn gap="40px">
          <AutoColumn>
            <BidTitle>Current bid</BidTitle>
            <TableWrapper>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Bidder</Th>
                    <Th isNumeric>Price</Th>
                    <Th isNumeric>Sell On Share(%)</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {activeBidsList &&
                    activeBidsList.map((bid, index) => {
                      console.log(bid)
                      return (
                        <Tr key={`bid-active-${index}`}>
                          <Td>{bid.bidder}</Td>
                          <Td isNumeric>{bid.price}</Td>
                          <Td isNumeric>{bid.sellOnShare}</Td>
                          <Td>
                            {isMeTheOwner && (
                              <BlackButton disabled={isProcessing} onClick={() => handleAcceptBid(bid.bid)}>
                                {isProcessing && <Spinner size="sm" color={theme.color.white} marginRight={4} />}
                                Accept Bid and Transfer
                              </BlackButton>
                            )}
                            {bid.bid.bidder === account && (
                              <BlackButton disabled={isProcessing} onClick={handleRemoveBid}>
                                {isProcessing && <Spinner size="sm" color={theme.color.white} marginRight={4} />}
                                Remove Bid
                              </BlackButton>
                            )}
                          </Td>
                        </Tr>
                      )
                    })}
                </Tbody>
              </Table>
            </TableWrapper>
          </AutoColumn>
          <AutoColumn>
            <BidTitle>Historical bid</BidTitle>
            <TableWrapper>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Bidder</Th>
                    <Th isNumeric>Price</Th>
                    <Th>Status</Th>
                    <Th>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {historyBidData &&
                    historyBidData.map((bid, index) => (
                      <Tr key={`bid-history-${index}`}>
                        <Td>{bid.bidder}</Td>
                        <Td isNumeric>{bid.price}</Td>
                        <Td>{bid.status}</Td>
                        <Td>{bid.date}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableWrapper>
          </AutoColumn>
        </AutoColumn>
      </BidsWrapper>
    </Page>
  )
}

export default Bids
