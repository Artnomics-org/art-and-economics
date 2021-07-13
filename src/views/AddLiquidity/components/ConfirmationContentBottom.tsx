import { Fraction, Currency, CurrencyAmount, Percent } from '@haneko/uniswap-sdk'
import React from 'react'
import styled from 'styled-components/macro'
import { ButtonPrimary } from '../../../components/Button'
import CurrencyLogo from '../../../components/CurrencyLogo'
import { RowBetween, RowFixed } from '../../../components/Row'
import { Field } from '../../../state/mint/actions'

interface ConfirmationContentBottomProps {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}

const ConfirmationContentBottom: React.FC<ConfirmationContentBottomProps> = ({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}) => {
  return (
    <>
      <RowBetween>
        <BodyText>{currencies[Field.CURRENCY_A]?.symbol} deposited</BodyText>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_A]} style={{ marginRight: '8px' }} />
          <BodyText>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</BodyText>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <BodyText>{currencies[Field.CURRENCY_B]?.symbol} deposited</BodyText>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_B]} style={{ marginRight: '8px' }} />
          <BodyText>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</BodyText>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <BodyText>Rates</BodyText>
        <BodyText>
          {`1 ${currencies[Field.CURRENCY_A]?.symbol} = ${price?.toSignificant(4)} ${
            currencies[Field.CURRENCY_B]?.symbol
          }`}
        </BodyText>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <BodyText>
          {`1 ${currencies[Field.CURRENCY_B]?.symbol} = ${price?.invert().toSignificant(4)} ${
            currencies[Field.CURRENCY_A]?.symbol
          }`}
        </BodyText>
      </RowBetween>
      <RowBetween>
        <BodyText>Share of pool:</BodyText>
        <BodyText>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</BodyText>
      </RowBetween>
      <ButtonPrimary style={{ margin: '20px 0 0 0' }} onClick={onAdd}>
        <BigText>{noLiquidity ? 'Create pool & supply' : 'Confirm supply'}</BigText>
      </ButtonPrimary>
    </>
  )
}

const BodyText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.text[500]};
`

const BigText = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text[500]};
`

export default ConfirmationContentBottom
