import { Currency, Token, ETHER } from '@haneko/uniswap-sdk'
import React from 'react'
import { useSelectedTokenList } from '../../../hooks/lists'
import { useCurrencyBalance } from '../../../hooks/token'
import { useRemoveUserAddedToken, useAddUserToken, useIsUserAddedToken } from '../../../hooks/user'
import { useActiveWeb3React } from '../../../hooks/wallet'
import { isTokenOnList } from '../../../utils/lists'
import Column from '../../Column'
import CurrencyLogo from '../../CurrencyLogo'
import Balance from './Balance'
import { FadedSpan, MenuItem, Text } from './styleds'
import TokenTags from './TokenTags'
import { AutoRow, RowFixed } from '../../Row'
import { useCallback } from 'react'
import { LinkStyledButton } from '../../Button'

interface CurrencyRowProps {
  currency: Currency
  onSelect: () => void
  isSelected: boolean
  otherSelected: boolean
  style: React.CSSProperties
}

export function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? 'ETHER' : ''
}

const CurrencyRow: React.FC<CurrencyRowProps> = ({ currency, onSelect, isSelected, otherSelected, style }) => {
  const { account, chainId } = useActiveWeb3React()
  const key = currencyKey(currency)
  const selectedTokenList = useSelectedTokenList()
  const isOnSelectedList = isTokenOnList(selectedTokenList, currency)
  const customAdded = useIsUserAddedToken(currency)
  const balance = useCurrencyBalance(account ?? undefined, currency)
  const removeToken = useRemoveUserAddedToken()
  const addToken = useAddUserToken()
  const handleRemoveToken = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation()
      if (chainId && currency instanceof Token) removeToken(chainId, currency.address)
    },
    [chainId, currency, removeToken],
  )
  const handleAddToken = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation()
      if (currency instanceof Token) addToken(currency)
    },
    [addToken, currency],
  )

  return (
    <MenuItem
      style={style}
      className={`token-item-${key}`}
      onClick={() => (isSelected ? null : onSelect())}
      disabled={isSelected}
      selected={otherSelected}
    >
      <CurrencyLogo currency={currency} size={24} />
      <Column>
        <Text title={currency.name}>{currency.symbol}</Text>
        <FadedSpan>
          {!isOnSelectedList && customAdded ? (
            <AutoRow>
              <Text>Added by user </Text>
              <LinkStyledButton onClick={handleRemoveToken}>(Remove)</LinkStyledButton>
            </AutoRow>
          ) : null}
          {!isOnSelectedList && !customAdded ? (
            <AutoRow>
              <Text>Found by address </Text>
              <LinkStyledButton onClick={handleAddToken}>(Add)</LinkStyledButton>
            </AutoRow>
          ) : null}
        </FadedSpan>
      </Column>
      <TokenTags currency={currency} />
      <RowFixed style={{ justifySelf: 'flex-end' }}>{balance ? <Balance balance={balance} /> : '0'}</RowFixed>
    </MenuItem>
  )
}

export default CurrencyRow
