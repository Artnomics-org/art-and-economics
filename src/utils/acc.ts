import { Web3Provider } from '@ethersproject/providers'
import ABI from '../constants/abi/StakingRewardAccelerator.json'
import { getContractWithAbi } from './ethers'

export const getContract = (provider: Web3Provider, address: string) => {
  const contract = getContractWithAbi(address, ABI, provider)
  return contract
}