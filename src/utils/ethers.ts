/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract, ContractInterface } from '@ethersproject/contracts'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { Provider } from '@ethersproject/abstract-provider'
import { namehash } from 'ethers/lib/utils'
import { ERC20_INTERFACE, REGISTRAR_ABI, RESOLVER_ABI } from '../constants/ethers'
import { REGISTRAR_ADDRESS } from '../constants/address'
import { BaseErc20 } from '../constants/nfts/BaseErc20'
import { useStaticMulticall } from '../hooks/nfts'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: unknown): string | false {
  try {
    return getAddress(String(value))
  } catch {
    return false
  }
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account)
}

export function getUncheckedSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return getSigner(library, account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContractWithAbi(
  address: string,
  ABI: ContractInterface,
  library: Web3Provider,
  account?: string,
): Contract {
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
    const allowance: string = await lpContract.methods.allowance(account, masterChefContract.options.address).call()
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
    const balance: string = await lpContract.methods.balanceOf(userAddress).call()
    return balance
  } catch (e) {
    return '0'
  }
}

export const getTotalSupply = async (provider: Web3Provider, tokenAddress: string): Promise<string> => {
  const lpContract = getERC20Contract(tokenAddress, provider)
  try {
    const balance: string = await lpContract.methods.totalSupply().call()
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

// cache the resolver contracts since most of them are the public resolver
function resolverContract(resolverAddress: string, provider: Provider): Contract {
  return new Contract(resolverAddress, RESOLVER_ABI, provider)
}

/**
 * Fetches and decodes the result of an ENS contenthash lookup on mainnet to a URI
 * @param ensName to resolve
 * @param provider provider to use to fetch the data
 */
export async function resolveENSContentHash(ensName: string, provider: Provider): Promise<string> {
  const ensRegistrarContract = new Contract(REGISTRAR_ADDRESS, REGISTRAR_ABI, provider)
  const hash = namehash(ensName)
  const resolverAddress = await ensRegistrarContract.resolver(hash)
  return resolverContract(resolverAddress, provider).contenthash(hash)
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export function getLibrary(provider: unknown): Web3Provider {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}

// NFTs
export type ERC20Profile = {
  tokenAddress: string
  name: string
  symbol: string
  decimals: number
  balance: BigNumber
  updatedAtBlock: number
}

export async function getProfileOfERC20(token: BaseErc20, holder: string | null): Promise<ERC20Profile> {
  const tokenAddress = token.address
  console.info('getProfileOfERC20;:tokenAddress', tokenAddress)
  const frag = [
    token.interface.encodeFunctionData('name'),
    token.interface.encodeFunctionData('symbol'),
    token.interface.encodeFunctionData('decimals'),
  ]
  if (holder) frag.push(token.interface.encodeFunctionData('balanceOf', [holder]))
  const calls = frag.map((callData) => ({
    target: tokenAddress,
    callData,
  }))
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const staticMulticall = useStaticMulticall()
  const { returnData, blockNumber } = await staticMulticall.callStatic.aggregate(calls)
  const [name] = token.interface.decodeFunctionResult('name', returnData[0])
  const [symbol] = token.interface.decodeFunctionResult('symbol', returnData[1])
  const [decimals] = token.interface.decodeFunctionResult('decimals', returnData[2])
  let balance = BigNumber.from(0)
  if (returnData[3]) [balance] = token.interface.decodeFunctionResult('balanceOf', returnData[3])

  return {
    updatedAtBlock: blockNumber.toNumber(),
    name,
    symbol,
    decimals,
    balance,
    tokenAddress,
  }
}
