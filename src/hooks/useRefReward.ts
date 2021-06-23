import { useCallback, useEffect, useMemo, useState } from "react"
import { getContract } from '../utils/refReward'
import { useActiveWeb3React } from "./wallet"

const useRefReward = () => {
    const [rewardStatus, setRewardStatus] = useState([false, false, false])
    const { account, library: ethereum } = useActiveWeb3React()

    const contract = useMemo(() => {
      return getContract(ethereum, '0x6692D5a360a7Bdc178B276c8e2CaFEf578ea1718')
    }, [ethereum])

    const fetchRewardStatus = useCallback(async () => {
      const token1 = await contract.methods.canReward(account, 0).call()
      const token2 = await contract.methods.canReward(account, 1).call()
      const token3 = await contract.methods.canReward(account, 2).call()
      console.log('useRefReward::fetchRewardStatus token1:', token1, 'token2:', token2, 'token3:', token3)
      setRewardStatus([token1, token2, token3])
    }, [account, contract])

    useEffect(() => {
      if (account && contract) {
        fetchRewardStatus()
      }
    }, [account, fetchRewardStatus, contract, setRewardStatus])

    const handleClaimNFT = useCallback(
      async (id: number) => {
        try {
          const txHash: string = await contract.methods
          .claim(id)
          .send({ from: account })
          .on('transactionHash', (tx: { transactionHash: string }) => {
            console.log('useRefReward::handleClaimNFT tx:', tx)
            return tx.transactionHash
          })
          console.log('useRefReward::handleClaimNFT txHash:', txHash)
          return txHash
        } catch (error) {
          console.error('useRefReward::handleClaimNFT error:', error)
        }
      }, [account, contract.methods])

    return { rewardStatus, onClaimNFT: handleClaimNFT }
}

export default useRefReward
