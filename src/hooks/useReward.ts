import { useCallback, useMemo } from 'react'
import { getContract } from '../utils/pool'
import useFarm from './useFarm'
import { useActiveWeb3React } from './wallet'

const useReward = (pid: number) => {
  const { account, library: ethereum } = useActiveWeb3React()
  const farm = useFarm(pid)

  const contract = useMemo(() => {
    return getContract(ethereum, farm.poolAddress)
  }, [ethereum, farm.poolAddress])

  const handleReward = useCallback(async () => {
    const txHash = await contract.methods
      .getReward()
      .send({ from: account })
      .on('transactionHash', (tx: any) => {
        console.log(tx)
        return tx.transactionHash
      })
    console.log(txHash)
    return ''
  }, [account, contract.methods])

  return { onReward: handleReward }
}

export default useReward
