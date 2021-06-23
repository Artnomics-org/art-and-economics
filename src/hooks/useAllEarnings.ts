import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import useFarms from './useFarms'
import { getContract } from '../utils/pool'
import { useActiveWeb3React } from './wallet'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account, library: ethereum } = useActiveWeb3React()
  const [farms] = useFarms()

  const contracts = useMemo(() => {
    return farms.map(farm => getContract(ethereum, farm.poolAddress))
  }, [ethereum, farms])

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      contracts.map(contract =>
        contract.methods.earned(account).call()
      ),
    )
    setBalance(balances)
  }, [account, contracts])

  useEffect(() => {
    if (account && contracts) {
      fetchAllBalances()
    }
  }, [account, fetchAllBalances, contracts, setBalance])

  return balances
}

export default useAllEarnings
