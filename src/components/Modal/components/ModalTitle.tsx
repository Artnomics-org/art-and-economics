import React from 'react'
import styled from 'styled-components/macro'

const ModalTitle: React.FC = ({ children }) => (
  <TitleText>
    {children}
  </TitleText>
)

const TitleText = styled.div`
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 20px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.text[500]};
`

export default ModalTitle
