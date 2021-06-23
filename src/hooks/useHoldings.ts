import { useCallback, useEffect, useMemo, useState } from 'react'
import { HoldingEnumerators } from '../constants/nft'
import { getHoldingEnumeratorContract } from '../utils/nfts'
import { useActiveWeb3React } from './wallet'

const useHoldings = (address: string) => {
  const { account, library: ethereum, chainId } = useActiveWeb3React()
  const contract = useMemo(() => {
    return getHoldingEnumeratorContract(ethereum, (HoldingEnumerators as any)[chainId])
  }, [ethereum, chainId])

  const [holdings, setHoldings] = useState([])

  const fetch = useCallback(async () => {
    const holdings = await contract.methods.getHoldingsOf(address, account).call()
    setHoldings(holdings)
  }, [account, contract, address])

  useEffect(() => {
    if (account && contract) {
      fetch()
    }
  }, [account, contract, fetch])

  return [holdings, fetch] as const
}

export default useHoldings
