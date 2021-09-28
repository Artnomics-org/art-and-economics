import React from 'react'
import { BidLogWithUser, isBidLogWithUser, isMediaLogWithUser, MediaLogWithUser } from '../../../types/TokenLog'
import { Ask, AskActionType, isBackendAsk } from '../../../types/Ask'
import { ZERO_ADDRESS } from '../../../constants/address'
import { MediaActionType } from '../../../types/MediaLog'
import { formatAddress, getBalanceNumber } from '../../../utils'
import styled from 'styled-components/macro'
import { useToken } from '../../../hooks/token'
import DefaultAvatar from '../../../assets/img/ane-profile-icon.png'

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
          <ItemAvatar>
            <img src={item.toUser?.avatar || DefaultAvatar} alt="avatar" />
          </ItemAvatar>
          <ItemContent>
            <p>@{creator} minted this media</p>
            <time>{localDate}</time>
          </ItemContent>
        </ItemWrapper>
      )
    }
    if (item.type === MediaActionType.Transfer) {
      return (
        <ItemWrapper>
          <ItemAvatar>
            <img src={item.fromUser?.avatar || DefaultAvatar} alt="avatar" />
          </ItemAvatar>
          <ItemContent>
            <p>
              {from} Transfer the ownership to {to}
            </p>
            <time>{localDate}</time>
          </ItemContent>
        </ItemWrapper>
      )
    }
    return (
      <ItemWrapper>
        <ItemAvatar>
          <img src={item.fromUser?.avatar || DefaultAvatar} alt="avatar" />
        </ItemAvatar>
        <ItemContent>
          <p>
            {from} Approve {to} to manage the token.
          </p>
          <time>{localDate}</time>
        </ItemContent>
      </ItemWrapper>
    )
  }

  if (isBidLogWithUser(item)) {
    const bidder = item.matchedBidder ? '@' + item?.matchedBidder?.username : formatAddress(item.bidder)
    const thePrice = `${getBalanceNumber(item?.amount, currency?.decimals || 18)} ${currency?.symbol}`
    return (
      <ItemWrapper>
        <ItemAvatar>
          <img src={item?.matchedBidder?.avatar || DefaultAvatar} alt="avatar" />
        </ItemAvatar>
        <ItemContent>
          <p>
            {bidder} buy with {thePrice}
          </p>
          <time>{localDate}</time>
        </ItemContent>
      </ItemWrapper>
    )
  }

  if (isBackendAsk(item)) {
    if (item.type === AskActionType.AskCreated) {
      const who = item?.who?.username ? `@${item?.who?.username}` : 'Owner'
      const thePrice = `${getBalanceNumber(item?.amount, currency?.decimals || 18)} ${currency?.symbol}`
      return (
        <ItemWrapper>
          <ItemAvatar>
            <img src={item?.who?.avatar || DefaultAvatar} alt="avatar" />
          </ItemAvatar>
          <ItemContent>
            <p>
              {who} Ask for {thePrice}
            </p>
            <time>{localDate}</time>
          </ItemContent>
        </ItemWrapper>
      )
    }
  }

  return null
}

const ItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ItemAvatar = styled.div`
  width: 56px;
  height: 56px;
  /* box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.13); */
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.grey[600]};
  margin-right: 24px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
  }
`

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  line-height: 1;
  > p {
    font-size: 16px;
    margin-bottom: 8px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    > p {
      margin-bottom: 6px;
    }
  }
`

export default NFTProvenanceItem
