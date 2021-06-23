import { Web3Provider } from '@ethersproject/providers'
import NFTClaimerABI from '../constants/abi/NFTClaimer.json'
import { getContractWithAbi } from './ethers'

export const getContract = (provider: Web3Provider, address: string) => {
  const contract = getContractWithAbi(address, NFTClaimerABI, provider)
  return contract
}