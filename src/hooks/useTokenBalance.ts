import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getBalance } from '../utils/ethers'
import useBlock from './useBlock'
import { Web3Provider } from '@ethersproject/providers'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: Web3Provider } = useWallet()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(ethereum, tokenAddress, account)
    setBalance(new BigNumber(balance))
  }, [account, ethereum, tokenAddress])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, setBalance, block, tokenAddress, fetchBalance])

  return balance
}

export default useTokenBalance
