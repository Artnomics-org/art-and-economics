import { Web3Provider } from '@ethersproject/providers'
import ReferralRewardABI from '../constants/abi/ReferralReward.json'
import { getContractWithAbi } from './ethers'

export const getContract = (provider: Web3Provider, address: string) => {
  const contract = getContractWithAbi(address, ReferralRewardABI, provider)
  return contract
}