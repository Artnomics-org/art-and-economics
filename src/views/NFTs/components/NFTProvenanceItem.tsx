import React from 'react'
import { BidLogWithUser, isBidLogWithUser, isMediaLogWithUser, MediaLogWithUser } from '../../../types/TokenLog'
import { Ask, AskActionType, isBackendAsk } from '../../../types/Ask'
import { ZERO_ADDRESS } from '../../../constants/address'
import { MediaActionType } from '../../../types/MediaLog'
import { formatAddress, getBalanceNumber } from '../../../utils'
import styled from 'styled-components/macro'
import { useToken } from '../../../hooks/token'

type NFTProvenanceItemProps = {
  item: Ask | MediaLogWithUser | BidLogWithUser
  creator: string
}

const NFTProvenanceItem: React.FC<NFTProvenanceItemProps> = ({ item, creator }) => {
  const localDate = new Date(item?.at?.timestamp).toLocaleString()
  // @ts-ignore
  const currency = useToken(item?.currency)

  if (isMediaLogWithUser(item)) {
    const fromUser = item?.fromUser?.nickname || undefined
    const toUser = item?.toUser?.nickname || undefined
    const fromAddr = formatAddress(item.from)
    const toAddr = formatAddress(item.to)
    const from = fromUser || fromAddr
    const to = toUser || toAddr

    if (item.type === MediaActionType.Transfer && item.from === ZERO_ADDRESS) {
      return (
        <ItemWrapper>
          <p>@{creator} minted this media</p>
          <time>{localDate}</time>
        </ItemWrapper>
      )
    }
    if (item.type === MediaActionType.Transfer) {
      return (
        <ItemWrapper>
          <p>
            {from} Transfer the ownership to {to}
          </p>
          <time>{localDate}</time>
        </ItemWrapper>
      )
    }
    return (
      <ItemWrapper>
        <p>
          {from} Approve {to} to manage the token.
        </p>
        <time>{localDate}</time>
      </ItemWrapper>
    )
  }

  if (isBidLogWithUser(item)) {
    const bidder = item.matchedBidder ? '@' + item?.matchedBidder?.username : formatAddress(item.bidder)
    const thePrice = `${getBalanceNumber(item?.amount, currency?.decimals || 18)} ${currency?.symbol}`
    return (
      <ItemWrapper>
        <p>
          {bidder} buy with {thePrice}
        </p>
        <time>{localDate}</time>
      </ItemWrapper>
    )
  }

  if (isBackendAsk(item)) {
    if (item.type === AskActionType.AskCreated) {
      const who = item?.who?.username ? `@${item?.who?.username}` : 'Owner'
      const thePrice = `${getBalanceNumber(item?.amount, currency?.decimals || 18)} ${currency?.symbol}`
      return (
        <ItemWrapper>
          <p>
            {who} Ask for {thePrice}
          </p>
          <time>{localDate}</time>
        </ItemWrapper>
      )
    }
  }

  return null
}

const ItemWrapper = styled.div`
  width: 100%;
  > p {
    font-size: 16px;
    margin-bottom: 8px;
  }
`

export default NFTProvenanceItem
