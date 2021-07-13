import { Currency, TokenAmount } from '@haneko/uniswap-sdk'
import React from 'react'
import styled from 'styled-components/macro'
import { LightCard } from '../../../components/Card'
import { AutoColumn } from '../../../components/Column'
import { DoubleCurrencyLogo } from '../../../components/CurrencyLogo'
import Row, { RowFlat } from '../../../components/Row'
import { Field } from '../../../state/mint/actions'

interface ConfirmationContentTopProps {
  noLiquidity: boolean
  currencies: { [field in Field]?: Currency }
  liquidityMinted?: TokenAmount
  allowedSlippage: number
}

const ConfirmationContentTop: React.FC<ConfirmationContentTopProps> = ({
  noLiquidity,
  currencies,
  liquidityMinted,
  allowedSlippage,
}) => {
  const symbolText = `${currencies[Field.CURRENCY_A]?.symbol}/${currencies[Field.CURRENCY_B]?.symbol}`
  const poolTokenText = `${symbolText} pool tokens`
  const percentageText = `Output is estimated. If the price changes by more than ${(
    allowedSlippage / 100
  ).toString()}% your transaction will revert.`

  return noLiquidity ? (
    <AutoColumn gap="20px">
      <LightCard style={{ marginTop: '20px' }}>
        <RowFlat>
          <BigText>{symbolText}</BigText>
          <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={30}
          />
        </RowFlat>
      </LightCard>
    </AutoColumn>
  ) : (
    <AutoColumn gap="20px">
      <RowFlat style={{ marginTop: '20px' }}>
        <BigText>{liquidityMinted?.toSignificant(6)}</BigText>
        <DoubleCurrencyLogo
          currency0={currencies[Field.CURRENCY_A]}
          currency1={currencies[Field.CURRENCY_B]}
          size={30}
        />
      </RowFlat>
      <Row>
        <Text>{poolTokenText}</Text>
      </Row>
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

const BigText = styled(Text)`
  margin: 0;
  font-size: 48px;
  line-height: 42px;
  margin-right: 10px;
`

const ItalicText = styled(Text)`
  font-size: 12px;
  text-align: left;
  padding-top: 8px;
  font-style: italic;
`

export default ConfirmationContentTop
