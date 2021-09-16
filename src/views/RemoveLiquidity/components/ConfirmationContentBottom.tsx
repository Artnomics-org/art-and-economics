import { Currency, CurrencyAmount, ETHER, Pair, Percent, Token, TokenAmount } from '@haneko/uniswap-sdk'
import React from 'react'
import styled from 'styled-components/macro'
import { RowBetween, RowFixed } from '../../../components/Row'
import { ButtonPrimary } from '../../../components/Button'
import { ApprovalState } from '../../../hooks/approve'
import { DoubleCurrencyLogo } from '../../../components/CurrencyLogo'
import { Field } from '../../../state/burn/actions'

interface ConfirmationContentBottonProps {
  pair: Pair | null | undefined
  approval: ApprovalState
  signatureData: unknown | null
  currencyA: Currency | undefined
  currencyB: Currency | undefined
  tokenA: Token | undefined
  tokenB: Token | undefined
  parsedAmounts: {
    LIQUIDITY_PERCENT: Percent
    LIQUIDITY?: TokenAmount | undefined
    CURRENCY_A?: CurrencyAmount | undefined
    CURRENCY_B?: CurrencyAmount | undefined
  }
  onRemove: () => Promise<void>
}

const ConfirmationContentBottom: React.FC<ConfirmationContentBottonProps> = ({
  pair,
  approval,
  signatureData,
  currencyA,
  currencyB,
  tokenA,
  tokenB,
  parsedAmounts,
  onRemove,
}) => {
  const format = (currency?: Currency) => {
    if (!currency) return ''
    return currency === ETHER ? ETHER.symbol : currency.symbol
  }

  return (
    <>
      <RowBetween>
        <Text>{format(currencyA) + '/' + format(currencyB)} burned</Text>
        <RowFixed>
          <DoubleCurrencyLogo currency0={currencyA} currency1={currencyB} margin={true} />
          <Text>{parsedAmounts[Field.LIQUIDITY]?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>
      {pair && (
        <>
          <RowBetween>
            <Text>Price</Text>
            <Text>
              1 {format(currencyA)} = {tokenA ? pair.priceOf(tokenA).toSignificant(6) : '-'} {format(currencyB)}
            </Text>
          </RowBetween>
          <RowBetween>
            <div />
            <Text>
              1 {format(currencyB)} = {tokenB ? pair.priceOf(tokenB).toSignificant(6) : '-'} {format(currencyA)}
            </Text>
          </RowBetween>
        </>
      )}
      <ButtonPrimary
        style={{ margin: '20px 0 0 0' }}
        disabled={!(approval === ApprovalState.APPROVED || signatureData !== null)}
        onClick={onRemove}
      >
        <BigText>Confirm</BigText>
      </ButtonPrimary>
    </>
  )
}

const Text = styled.p`
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
