import { Web3Provider } from '@ethersproject/providers'
import RouterABI from '../constants/abi/BestswapRouter.json'
import { getContractWithAbi } from './ethers'

export const getSwapRouter = (provider: Web3Provider, address: string) => {
  const contract = getContractWithAbi(address, RouterABI, provider)
  return contract
}