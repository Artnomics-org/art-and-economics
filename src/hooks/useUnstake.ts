import { useCallback, useMemo } from 'react'
import useFarm from './useFarm'
import { getContract } from '../utils/pool'
import BigNumber from 'bignumber.js'
import { useActiveWeb3React } from './wallet'

const useUnstake = (pid: number) => {
  const { account, library: ethereum } = useActiveWeb3React()
  const farm = useFarm(pid)

  const contract = useMemo(() => {
    return getContract(ethereum, farm.poolAddress)
  }, [ethereum, farm.poolAddress])

  const handleUnstake = useCallback(
    async (amount: string) => {
      const value = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
      const txHash = await contract.methods
        .withdraw(value)
        .send({ from: account })
        .on('transactionHash', (tx: any) => {
          console.log(tx)
          return tx.transactionHash
        })
      console.log(txHash)
    },
    [account, contract],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
