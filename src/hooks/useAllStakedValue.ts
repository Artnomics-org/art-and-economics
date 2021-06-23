import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import {
  getMasterChefContract,
  // getWethContract,
  getFarms,
  // getTotalLPWethValue,
} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'
import { useActiveWeb3React } from './wallet'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account } = useActiveWeb3React()
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const masterChefContract = getMasterChefContract(sushi)
  // const wethContact = getWethContract(sushi)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    // const balances: Array<StakedValue> = await Promise.all(
    //   farms.map(
    //     ({
    //       pid,
    //       lpContract,
    //       tokenContract,
    //     }: {
    //       pid: number
    //       lpContract: Contract
    //       tokenContract: Contract
    //     }) =>
    //       getTotalLPWethValue(
    //         masterChefContract,
    //         wethContact,
    //         lpContract,
    //         tokenContract,
    //         pid,
    //       ),
    //   ),
    // )
    const balances: Array<StakedValue> = farms.map(() => ({
      tokenAmount: new BigNumber(0),
      wethAmount: new BigNumber(0),
      totalWethValue: new BigNumber(0),
      tokenPriceInWeth: new BigNumber(0),
      poolWeight: new BigNumber(0),
    }))

    setBalance(balances)
  }, [farms])

  useEffect(() => {
    if (account && masterChefContract && sushi) {
      fetchAllStakedValue()
    }
  }, [account, block, fetchAllStakedValue, masterChefContract, setBalance, sushi])

  return balances
}

export default useAllStakedValue
