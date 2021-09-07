import React from 'react'
import styled from 'styled-components/macro'

interface NFTLabelInfoProps {
  title: string
}

const NFTLabelInfo: React.FC<NFTLabelInfoProps> = ({ title, children }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  margin-bottom: 10px;
`

const Title = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  min-width: 100px;
  margin-right: 10px;
`

const Content = styled.div`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 14px;
  font-weight: 400;
  word-break: break-all;
  flex: 1;
`

export default NFTLabelInfo
