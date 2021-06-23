import { getAddress } from '@ethersproject/address'
import { Contract, ContractInterface } from '@ethersproject/contracts'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { ERC20_INTERFACE } from '../constants/ethers'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContractWithAbi(address: string, ABI: ContractInterface, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function getERC20Contract(address: string, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ERC20_INTERFACE, getProviderOrSigner(library, account) as any)
}

export const getAllowance = async (
  lpContract: Contract,
  masterChefContract: Contract,
  account: string,
): Promise<string> => {
  try {
    const allowance: string = await lpContract.methods
      .allowance(account, masterChefContract.options.address)
      .call()
    return allowance
  } catch (e) {
    return '0'
  }
}

export const getBalance = async (
  provider: Web3Provider,
  tokenAddress: string,
  userAddress: string,
): Promise<string> => {
  const lpContract = getERC20Contract(tokenAddress, provider)
  try {
    const balance: string = await lpContract.methods
      .balanceOf(userAddress)
      .call()
    return balance
  } catch (e) {
    return '0'
  }
}

export const getTotalSupply = async (
  provider: Web3Provider,
  tokenAddress: string,
): Promise<string> => {
  const lpContract = getERC20Contract(tokenAddress, provider)
  try {
    const balance: string = await lpContract.methods
      .totalSupply()
      .call()
    return balance
  } catch (e) {
    return '0'
  }
}

const ENS_NAME_REGEX = /^(([a-zA-Z0-9]+\.)+)eth(\/.*)?$/

export function parseENSAddress(ensAddress: string): { ensName: string; ensPath: string | undefined } | undefined {
  const match = ensAddress.match(ENS_NAME_REGEX)
  if (!match) return undefined
  return { ensName: `${match[1].toLowerCase()}eth`, ensPath: match[3] }
}
