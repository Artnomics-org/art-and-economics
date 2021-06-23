import { useCallback, useMemo } from 'react'
import { getContract } from '../utils/nfts'
import useNFT from './useNFT'
import { useActiveWeb3React } from './wallet'

const useApproveNFT = (symbol: string, to: string) => {
  const { account, library: ethereum } = useActiveWeb3React()
  const nft = useNFT(symbol)

  const contract = useMemo(() => {
    return getContract(ethereum, nft.address)
  }, [ethereum, nft.address])

  const handleApprove = useCallback(async (tokenId: string) => {
    try {
      return await contract.methods.approve(to, tokenId)
        .send({ from: account })
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, contract, to])

  return { onApprove: handleApprove }
}

export default useApproveNFT
