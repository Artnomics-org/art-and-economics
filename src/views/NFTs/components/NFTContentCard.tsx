import React from 'react'
import styled from 'styled-components/macro'

interface NFTContentCardProps {
  title: string
}

const NFTContentCard: React.FC<NFTContentCardProps> = ({ title, children }) => {
  return (
    <CardWrapper>
      <Title>{title}</Title>
      {children}
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  margin: 0;
  min-width: 0;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid ${(props) => props.theme.color.grey[400]};
  margin-bottom: 30px;
`

const Title = styled.p`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 20px;
`

export default NFTContentCard
