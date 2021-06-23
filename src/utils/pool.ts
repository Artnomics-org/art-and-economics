import { Web3Provider } from '@ethersproject/providers'
import PoolABI from '../constants/abi/Pool.json'
import { getContractWithAbi } from './ethers'

export const getContract = (provider: Web3Provider, address: string) => {
  const contract = getContractWithAbi(address, PoolABI, provider)
  return contract
}
