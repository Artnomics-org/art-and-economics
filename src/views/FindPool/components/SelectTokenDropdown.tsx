import { Currency } from '@art-economics/swap-sdk'
import React from 'react'
import styled from 'styled-components/macro'
import { DropdownButton } from '../../../components/Button'
import CurrencyLogo from '../../../components/CurrencyLogo'
import Row from '../../../components/Row'

interface SelectTokenDropdownProps {
  currency?: Currency
  onClick?: () => void
}
const SelectTokenDropdown: React.FC<SelectTokenDropdownProps> = ({ currency, onClick = () => {} }) => {
  return (
    <DropdownButton buttonType="light" onClick={onClick}>
      {currency ? (
        <Row>
          <CurrencyLogo currency={currency} />
          <Text>{currency.symbol}</Text>
        </Row>
      ) : (
        <Text>Select a token</Text>
      )}
    </DropdownButton>
  )
}

const Text = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  margin-left: 12px;
  text-transform: uppercase;
`

export default SelectTokenDropdown
