import { useCallback, useEffect, useMemo, useState } from 'react'
import { getContract } from '../utils/pool'
import useFarm from './useFarm'
import { useActiveWeb3React } from './wallet'

const useAcceleration = (pid: number) => {
  const [acc, setAcc] = useState(0)
  const { account, library: ethereum } = useActiveWeb3React()
  const farm = useFarm(pid)

  const contract = useMemo(() => {
    return getContract(ethereum, farm.poolAddress)
  }, [ethereum, farm.poolAddress])

  const fetchBalance = useCallback(async () => {
    const balance = await contract.methods.accOf(account).call();
    setAcc(Number(balance))
  }, [account, contract])

  useEffect(() => {
    if (account && contract) {
      fetchBalance()
    }
    let refreshInterval = setInterval(fetchBalance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, pid, setAcc, contract, fetchBalance])

  return acc
}

export default useAcceleration
