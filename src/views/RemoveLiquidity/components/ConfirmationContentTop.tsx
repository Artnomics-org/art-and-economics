import { Currency, CurrencyAmount, ETHER, Percent, TokenAmount } from '@art-economics/swap-sdk'
import React, { useContext } from 'react'
import { Plus } from 'react-feather'
import styled, { ThemeContext } from 'styled-components/macro'
import { AutoColumn } from '../../../components/Column'
import CurrencyLogo from '../../../components/CurrencyLogo'
import { RowBetween, RowFixed } from '../../../components/Row'
import { Field } from '../../../state/burn/actions'

interface ConfirmationContentTopProps {
  allowedSlippage: number
  currencyA: Currency | undefined
  currencyB: Currency | undefined
  parsedAmounts: {
    LIQUIDITY_PERCENT: Percent
    LIQUIDITY?: TokenAmount | undefined
    CURRENCY_A?: CurrencyAmount | undefined
    CURRENCY_B?: CurrencyAmount | undefined
  }
}

const ConfirmationContentTop: React.FC<ConfirmationContentTopProps> = ({
  allowedSlippage,
  currencyA,
  currencyB,
  parsedAmounts,
}) => {
  const theme = useContext(ThemeContext)
  const percentageText = `Output is estimated. If the price changes by more than ${
    allowedSlippage / 100
  }% your transaction will revert.`
  const format = (currency?: Currency) => {
    if (!currency) return ''
    return currency === ETHER ? ETHER.symbol : currency.symbol
  }

  return (
    <AutoColumn gap="20px" style={{ marginTop: '20px' }}>
      <RowBetween align="flex-end">
        <Text>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Text>
        <RowFixed gap="4px">
          <CurrencyLogo currency={currencyA} size={24} />
          <Text style={{ marginLeft: '10px' }}>{format(currencyA)}</Text>
        </RowFixed>
      </RowBetween>
      <RowFixed>
        <Plus size="24" color={theme.color.text[500]} />
      </RowFixed>
      <RowBetween align="flex-end">
        <Text>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Text>
        <RowFixed gap="4px">
          <CurrencyLogo currency={currencyB} size={24} />
          <Text style={{ marginLeft: '10px' }}>{format(currencyB)}</Text>
        </RowFixed>
      </RowBetween>
      <ItalicText>{percentageText}</ItalicText>
    </AutoColumn>
  )
}

const Text = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.theme.color.text[500]};
`

const ItalicText = styled(Text)`
  font-size: 12px;
  text-align: left;
  padding-top: 8px;
  font-style: italic;
`

export default ConfirmationContentTop
