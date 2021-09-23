import { Currency, Percent, Price } from '@art-economics/swap-sdk'
import React from 'react'
import styled from 'styled-components/macro'
import { AutoColumn } from '../../../components/Column'
import { AutoRow } from '../../../components/Row'
import { ONE_BIPS } from '../../../constants'
import { Field } from '../../../state/mint/actions'

interface PoolPriceBarProps {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}

const PoolPriceBar: React.FC<PoolPriceBarProps> = ({ currencies, noLiquidity, poolTokenPercentage, price }) => {
  return (
    <AutoColumn gap="md">
      <AutoRow justify="space-around" gap="4px">
        <AutoColumn justify="center">
          <BigText>{price?.toSignificant(6) ?? '-'}</BigText>
          <SmallText>
            {currencies[Field.CURRENCY_B]?.symbol} per {currencies[Field.CURRENCY_A]?.symbol}
          </SmallText>
        </AutoColumn>
        <AutoColumn justify="center">
          <BigText>{price?.invert()?.toSignificant(6) ?? '-'}</BigText>
          <SmallText>
            {currencies[Field.CURRENCY_A]?.symbol} per {currencies[Field.CURRENCY_B]?.symbol}
          </SmallText>
        </AutoColumn>
        <AutoColumn justify="center">
          <BigText>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </BigText>
          <SmallText>Share of Pool</SmallText>
        </AutoColumn>
      </AutoRow>
    </AutoColumn>
  )
}

const BigText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
`

const SmallText = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  padding-top: 4px;
`

export default PoolPriceBar
