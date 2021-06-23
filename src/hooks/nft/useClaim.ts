import { useCallback, useMemo } from 'react'
import { getContract } from '../../utils/nft'
import { NFT_CLAIMER_ADDRESS } from '../../constants/tokenAddresses'
import { useActiveWeb3React } from '../wallet'

const useClaim = () => {
  const { account, library: ethereum } = useActiveWeb3React()
  const nftClaimerAddr = NFT_CLAIMER_ADDRESS

  const contract = useMemo(() => {
    return getContract(ethereum, nftClaimerAddr)
  }, [ethereum, nftClaimerAddr])

  const handleNftClaim = useCallback(async () => {
    const call = contract.methods.claim().send({ from: account })

    const txHash = await call.on('transactionHash', (tx: any) => {
      console.log('NFT::useClaim::handleNftClaim tx:', tx)
      return tx.transactionHash
    })

    console.log('NFT::useClaim::handleNftClaim txHash:', txHash)
  }, [account, contract.methods])

  return { onClaim: handleNftClaim }
}

export default useClaim