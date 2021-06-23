import { useCallback } from 'react'
import { ethers } from 'ethers'
import { Contract } from 'web3-eth-contract'
import useFarm from './useFarm'
import { useActiveWeb3React } from './wallet'

const useApprove = (lpContract: Contract, pid: number) => {
  const { account } = useActiveWeb3React()
  const farm = useFarm(pid)

  const handleApprove = useCallback(async () => {
    try {
      return await lpContract.methods.approve(farm.poolAddress, ethers.constants.MaxUint256)
        .send({ from: account })
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, lpContract, farm])

  return { onApprove: handleApprove }
}

export default useApprove
