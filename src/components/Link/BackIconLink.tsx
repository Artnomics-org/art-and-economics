import React from 'react'
import styled from 'styled-components/macro'
import { Link, LinkProps } from 'react-router-dom'
import { ArrowLeft as ArrowLeftIcon } from 'react-feather'

const BackIconLink: React.FC<LinkProps> = ({ ...res }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const { to, onClick } = res
    if (to === '#') onClick(e)
  }

  return (
    <HistoryLink {...res} onClick={handleClick}>
      <ArrowLeft />
    </HistoryLink>
  )
}

const HistoryLink = styled(Link)`
  display: inline-block;
  line-height: 0;
  cursor: pointer;
`

const ArrowLeft = styled(ArrowLeftIcon)`
  color: ${({ theme }) => theme.color.text[500]};
`

export default BackIconLink
