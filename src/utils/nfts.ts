import { Web3Provider } from '@ethersproject/providers'
import NFTABI from '../constants/abi/NFT.json'
import NFTHoldingEnumeratorABI from '../constants/abi/NFTHoldingEnumerator.json'
import PoolAcceleratorABI from '../constants/abi/PoolAccelerator.json'
import { getContractWithAbi } from './ethers'

export const getContract = (provider: Web3Provider, address: string) => {
  const contract = getContractWithAbi(address, NFTABI, provider)
  return contract
}

export const getHoldingEnumeratorContract = (provider: Web3Provider, address: string) => {
  const contract = getContractWithAbi(address, NFTHoldingEnumeratorABI, provider)
  return contract
}

export const getAcceleratorContract = (provider: Web3Provider, address: string) => {
  const contract = getContractWithAbi(address, PoolAcceleratorABI, provider)
  return contract
}
