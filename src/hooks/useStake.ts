import { useCallback, useMemo } from 'react'
import useFarm from './useFarm'
import { getContract } from '../utils/pool'
import BigNumber from 'bignumber.js'
import { useActiveWeb3React } from './wallet'

const useStake = (pid: number) => {
  const { account, library: ethereum } = useActiveWeb3React()
  const farm = useFarm(pid)

  const contract = useMemo(() => {
    return getContract(ethereum, farm.poolAddress)
  }, [ethereum, farm])

  const handleStake = useCallback(
    async (amount: string) => {
      const value = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()

      const call = !farm.isWBNB
        ? contract.methods.stake(value).send({ from: account })
        : contract.methods.stake().send({ from: account, value })

      const txHash = call.on('transactionHash', (tx: any) => {
        console.log(tx)
        return tx.transactionHash
      })
      console.log(txHash)
    },
    [account, contract, farm],
  )

  const handleStakeWithRef = useCallback(
    async (amount: string, addr: string) => {
      console.log('amount', amount)
      console.log('amount', addr)
      const value = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()

      const call = !farm.isWBNB
        ? contract.methods.stakeWithRef(value, addr).send({ from: account })
        : contract.methods.stakeWithRef(addr).send({ from: account, value })

      const txHash = call.on('transactionHash', (tx: any) => {
        console.log(tx)
        return tx.transactionHash
      })
      console.log(txHash)
    },
    [account, contract, farm],
  )

  return { onStake: handleStake, onStakeWithRef: handleStakeWithRef }
}

export default useStake
