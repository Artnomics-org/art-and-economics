import React, { MouseEvent } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'

export interface UserLinkProps {
  label: string
  avatar: string
  username: string
  nickname: string
  isVerified?: boolean
}

const UserLink: React.FC<UserLinkProps> = ({
  label,
  avatar,
  username,
  nickname,
  // isVerified = false,
}) => {
  const router = useHistory()
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    router.push(`/user/${username}`)
  }

  return (
    <CreatorContainer onClick={handleClick}>
      {label && <HeadLabel>{label}</HeadLabel>}
      <UserInfo>
        <AccountAvatar size={30} src={avatar} />
        <UserName>{nickname ? nickname : '@' + username}</UserName>
        {/* {isVerified && (
          <VerifiedIcon>
            <IconVerified />
          </VerifiedIcon>
        )} */}
      </UserInfo>
    </CreatorContainer>
  )
}

const UserName = styled.div`
  font-weight: 500;
  font-size: 16px;
`

const CreatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: auto;
  flex: 1 0 auto;
  &:hover ${UserName} {
    text-decoration: underline;
    cursor: pointer;
  }
`

const HeadLabel = styled.label`
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  line-height: 20px;
  margin-bottom: 10px;
  display: block;
`

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const AccountAvatar = styled.img<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin: 0px 10px 0px 0px !important;
  border-radius: 50%;
  cursor: unset;
  pointer-events: none;
`

// const VerifiedIcon = styled.div`
//   display: inline-block;
//   width: 24px;
//   height: 24px;
//   svg {
//     padding: 4px;
//   }
// `

export default UserLink
