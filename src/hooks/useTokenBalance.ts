import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { getBalance } from '../utils/ethers'
import useBlock from './useBlock'
import { useActiveWeb3React } from './wallet'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, library: ethereum } = useActiveWeb3React()
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
