import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getContract } from '../utils/pool'
import useFarm from './useFarm'
import { useActiveWeb3React } from './wallet'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, library: ethereum } = useActiveWeb3React()
  const farm = useFarm(pid)

  const contract = useMemo(() => {
    return getContract(ethereum, farm.poolAddress)
  }, [ethereum, farm.poolAddress])

  const fetchBalance = useCallback(async () => {
    const balance = await contract.methods.earned(account).call();
    setBalance(new BigNumber(balance))
  }, [account, contract])

  useEffect(() => {
    if (account && contract) {
      fetchBalance()
    }
    let refreshInterval = setInterval(fetchBalance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, pid, setBalance, contract, fetchBalance])

  return balance
}

export default useEarnings
