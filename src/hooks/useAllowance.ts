import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import useFarm from './useFarm'
import { useActiveWeb3React } from './wallet'

const useAllowance = (lpContract: Contract, pid: number) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useActiveWeb3React()
  const farm = useFarm(pid)

  const fetchAllowance = useCallback(async () => {
    const allowance = await lpContract.methods.allowance(account, farm.poolAddress).call()
    console.warn(allowance)
    setAllowance(new BigNumber(allowance))
  }, [account, farm, lpContract])

  useEffect(() => {
    if (account && farm && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, farm, fetchAllowance, lpContract])

  return allowance
}

export default useAllowance
