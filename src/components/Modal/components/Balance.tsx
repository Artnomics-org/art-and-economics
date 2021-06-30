import { CurrencyAmount } from '@haneko/uniswap-sdk'
import React from 'react'
import { ListBalanceText } from './styleds'

interface BalanceProps { balance: CurrencyAmount }

const Balance: React.FC<BalanceProps> = ({ balance }) => {
  return (
    <ListBalanceText title={balance.toExact()}>{balance.toSignificant(4)}</ListBalanceText>
  )
}

export default Balance
