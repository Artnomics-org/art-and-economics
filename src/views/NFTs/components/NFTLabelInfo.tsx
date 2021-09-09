import React from 'react'
import styled from 'styled-components/macro'

interface NFTLabelInfoProps {
  title: string
  size?: number
}

const NFTLabelInfo: React.FC<NFTLabelInfoProps> = ({ title, children, size = 14 }) => {
  return (
    <Wrapper>
      <Title size={size}>{title}</Title>
      <Content size={size}>{children}</Content>
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

const Title = styled.div<{ size: number }>`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: ${({ size }) => size}px;
  font-weight: 400;
  text-transform: uppercase;
  min-width: 100px;
  margin-right: 10px;
`

const Content = styled.div<{ size: number }>`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: ${({ size }) => size}px;
  font-weight: 400;
  word-break: break-all;
  flex: 1;
`

export default NFTLabelInfo
