import { ChainId, Currency, currencyEquals, ETHER, Token } from '@haneko/uniswap-sdk'
import React from 'react'
import { useCallback } from 'react'
import { SUGGESTED_BASES } from '../../../constants/lists'
import { AutoColumn } from '../../Column'
import CurrencyLogo from '../../CurrencyLogo'
import QuestionHelper from '../../QuestionHelper'
import { AutoRow } from '../../Row'
import { BaseWrapper, Text } from './styleds'

interface CommonBasesProps {
  chainId?: ChainId
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}

const CommonBases: React.FC<CommonBasesProps> = ({ chainId, onSelect, selectedCurrency }) => {
  const helperText = 'These tokens are commonly paired with other tokens.'
  const handleETHClick = useCallback(() => {
    if (!selectedCurrency || !currencyEquals(selectedCurrency, ETHER)) {
      onSelect(ETHER)
    }
  }, [onSelect, selectedCurrency])

  return (
    <AutoColumn gap="md">
      <AutoRow>
        <Text>Common bases</Text>
        <QuestionHelper text={helperText} />
      </AutoRow>
      <AutoRow gap="4px">
        <BaseWrapper onClick={handleETHClick} disable={selectedCurrency === ETHER}>
          <CurrencyLogo currency={ETHER} style={{ marginRight: 8 }} />
          <Text>BNB</Text>
        </BaseWrapper>
        {(chainId ? SUGGESTED_BASES[chainId] : []).map((token: Token) => {
          const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address
          return (
            <BaseWrapper onClick={() => !selected && onSelect(token)} disable={selected} key={token.address}>
              <CurrencyLogo currency={token} style={{ marginRight: 8 }} />
              <Text>{token.symbol}</Text>
            </BaseWrapper>
          )
        })}
      </AutoRow>
    </AutoColumn>
  )
}

export default CommonBases
