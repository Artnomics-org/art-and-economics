import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getContract } from '../utils/pool'
import useFarm from './useFarm'
import { useActiveWeb3React } from './wallet'

const useTotalSupply = (pid: number) => {
  const [totalSupply, setTotalSupply] = useState(new BigNumber(0))
  const { account, library: ethereum } = useActiveWeb3React()
  const farm = useFarm(pid)

  const contract = useMemo(() => {
    return getContract(ethereum, farm.poolAddress)
  }, [ethereum, farm])

  const fetchTotalSupply = useCallback(async () => {
    const totalSupply = await contract.methods.totalSupply().call()
    setTotalSupply(new BigNumber(totalSupply))
  }, [contract])

  useEffect(() => {
    if (account && contract) {
      fetchTotalSupply()
    }
  }, [account, fetchTotalSupply, contract, setTotalSupply])

  return totalSupply
}

export default useTotalSupply
