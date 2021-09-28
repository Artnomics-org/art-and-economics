import React, { MouseEvent } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'

export interface NFTUserLinkProps {
  user: {
    avatar: string
    username: string
    nickname: string
  }
}

const NFTUserLink: React.FC<NFTUserLinkProps> = ({ user }) => {
  const { avatar, username, nickname } = user
  const router = useHistory()
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    router.push(`/user/${username}`)
  }

  return (
    <CreatorContainer onClick={handleClick}>
      <AccountAvatar size={54} src={avatar} />
      <UserName>@{nickname ? nickname : username}</UserName>
    </CreatorContainer>
  )
}

const CreatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
`

const UserName = styled.div`
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-weight: normal;
  font-size: 16px;
  line-height: 1.5;
  color: ${(props) => props.theme.color.grey[600]};
`

const AccountAvatar = styled.img<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  margin-bottom: 10px;
  cursor: unset;
  pointer-events: none;
`

export default NFTUserLink
