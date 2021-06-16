import React from 'react'
import styled from 'styled-components/macro'

const CoinBalance: React.FC = () => {
  return (
    <StyledBalance>
      0 ANE
    </StyledBalance>
  )
}

const StyledBalance = styled.div`
  color: ${(props) => props.theme.color.nav.def};
  font-weight: normal;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 20px;
  min-width: 160px;
  border-radius: 14px;
  border: solid 2px ${(props) => props.theme.color.nav.def};
  text-transform: uppercase;
  text-align: right;
  padding-right: 16px;
`

export default CoinBalance
