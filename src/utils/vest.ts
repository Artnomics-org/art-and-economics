import { Web3Provider } from '@ethersproject/providers'
import VESTABI from '../constants/abi/VEST.json'
import { getContractWithAbi } from './ethers'

export const getContract = (provider: Web3Provider, address: string) => {
  const contract = getContractWithAbi(address, VESTABI, provider)
  return contract
}