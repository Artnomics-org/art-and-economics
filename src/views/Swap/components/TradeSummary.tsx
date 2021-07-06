import { Trade, TradeType } from '@haneko/uniswap-sdk'
import React from 'react'
import styled from 'styled-components/macro'
import { AutoColumn } from '../../../components/Column'
import QuestionHelper from '../../../components/QuestionHelper'
import { RowBetween, RowFixed } from '../../../components/Row'
import { Field } from '../../../state/swap/actions'
import { computeSlippageAdjustedAmounts } from '../../../utils/currency'
import { computeTradePriceBreakdown } from '../../../utils/prices'
import FormattedPriceImpact from './FormattedPriceImpact'

interface TradeSummaryProps {
  trade: Trade
  allowedSlippage: number
}

const TradeSummary: React.FC<TradeSummaryProps> = ({ trade, allowedSlippage }) => {
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)
  const questMinMax =
    'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.'
  const questPrice = 'The difference between the market price and estimated price due to trade size.'
  const questLiqFee = 'A portion of each trade (0.30%) goes to liquidity providers as a protocol incentive.'

  return (
    <AutoColumn style={{ padding: '0 20px' }}>
      <RowBetween>
        <RowFixed>
          <Text>{isExactIn ? 'Minimum received' : 'Maximum sold'}</Text>
          <QuestionHelper text={questMinMax} />
        </RowFixed>
        <RowFixed>
          <Text>
            {isExactIn
              ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}` ??
                '-'
              : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ?? '-'}
          </Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          <Text>Price Impact</Text>
          <QuestionHelper text={questPrice} />
        </RowFixed>
        <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
      </RowBetween>
      <RowBetween>
        <RowFixed>
          <Text>Liquidity Provider Fee</Text>
          <QuestionHelper text={questLiqFee} />
        </RowFixed>
        <Text>{realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}</Text>
      </RowBetween>
    </AutoColumn>
  )
}

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.text[500]};
`

export default TradeSummary
