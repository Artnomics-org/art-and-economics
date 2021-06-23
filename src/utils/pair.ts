import { Web3Provider } from '@ethersproject/providers'
import PairABI from '../constants/abi/Pair.json'
import { getContractWithAbi } from './ethers'

export const getPairContract = (provider: Web3Provider, address: string) => {
  const contract = getContractWithAbi(address, PairABI, provider)
  return contract
}
