import { ChainId } from '@art-economics/swap-sdk'
import BigNumber from 'bignumber.js'
import CID from 'cids'
import CryptoJS from 'crypto-js'
import { getCodec, rmPrefix } from 'multicodec'
import { decode, toB58String } from 'multihashes'

export const formatAddress = (address: string) => {
  return address.slice(0, 6) + '...' + address.slice(-6)
}

export const getBalanceNumber = (balance: BigNumber | string, decimals = 18) => {
  if (typeof balance === 'string') balance = new BigNumber(balance)
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const getDisplayBalance = (balance: BigNumber | string, decimals = 18) => {
  if (typeof balance === 'string') balance = new BigNumber(balance)
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(4)
  } else {
    return displayBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

export const getFullDisplayBalance = (balance: BigNumber | string, decimals = 18) => {
  if (typeof balance === 'string') balance = new BigNumber(balance)
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const bnToDec = (bn: BigNumber, decimals = 18): number => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}

export const decToBn = (dec: number, decimals = 18): BigNumber => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals))
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

/**
 * Given a URI that may be ipfs, ipns, http, or https protocol, return the fetch-able http(s) URLs for the same content
 * @param uri to convert to fetch-able http url
 */
export function uriToHttp(uri: string): string[] {
  const protocol = uri.split(':')[0].toLowerCase()
  switch (protocol) {
    case 'https':
      return [uri]
    case 'http':
      return ['https' + uri.substr(4), uri]
    case 'ipfs':
      const hash = uri.match(/^ipfs:(\/\/)?(.*)$/i)?.[2]
      return [`https://cloudflare-ipfs.com/ipfs/${hash}/`, `https://ipfs.io/ipfs/${hash}/`]
    case 'ipns':
      const name = uri.match(/^ipns:(\/\/)?(.*)$/i)?.[2]
      return [`https://cloudflare-ipfs.com/ipns/${name}/`, `https://ipfs.io/ipns/${name}/`]
    default:
      return []
  }
}

export function hexToUint8Array(hex: string): Uint8Array {
  hex = hex.startsWith('0x') ? hex.substr(2) : hex
  if (hex.length % 2 !== 0) throw new Error('hex must have length that is multiple of 2')
  const arr = new Uint8Array(hex.length / 2)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(hex.substr(i * 2, 2), 16)
  }
  return arr
}

const UTF_8_DECODER = new TextDecoder()

/**
 * Returns the URI representation of the content hash for supported codecs
 * @param contenthash to decode
 */
export function contenthashToUri(contenthash: string): string {
  const buff = hexToUint8Array(contenthash)
  const codec = getCodec(buff as Buffer) // the typing is wrong for @types/multicodec
  switch (codec) {
    case 'ipfs-ns': {
      const data = rmPrefix(buff as Buffer)
      const cid = new CID(data)
      return `ipfs://${toB58String(cid.multihash)}`
    }
    case 'ipns-ns': {
      const data = rmPrefix(buff as Buffer)
      const cid = new CID(data)
      const multihash = decode(cid.multihash)
      if (multihash.name === 'identity') {
        return `ipns://${UTF_8_DECODER.decode(multihash.digest).trim()}`
      } else {
        return `ipns://${toB58String(cid.multihash)}`
      }
    }
    default:
      throw new Error(`Unrecognized codec: ${codec}`)
  }
}

const ETHERSCAN_PREFIXES: { [chainId: string]: string } = {
  1: 'etherscan.io',
  3: 'ropsten.etherscan.io',
  4: 'rinkeby.etherscan.io',
  5: 'goerli.etherscan.io',
  42: 'kovan.etherscan.io',
  56: 'bscscan.com',
  97: 'testnet.bscscan.com',
}

export function getScanLink(
  chainId: number,
  data: string,
  type: 'transaction' | 'token' | 'block' | 'address',
): string {
  const prefix = `https://${ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]}`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'block': {
      return `${prefix}/block/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

export function getSocialLink(name: string, type: 'twitter' | 'tetegram' | 'facebook' | 'medium'): string {
  switch (type) {
    case 'twitter':
      return `https://twitter.com/${name}`
    case 'tetegram':
      return `https://t.me/${name}`
    case 'facebook':
      return `https://facebook.com/${name}`
    case 'medium': {
      if (name.startsWith('http')) {
        return name
      } else {
        return `https://medium.com/${name}`
      }
    }
    default:
      return ''
  }
}

export function arrayBufferToWordArray(ab: ArrayBuffer) {
  const i8a = new Uint8Array(ab)
  const a = []
  for (let i = 0; i < i8a.length; i += 4) {
    a.push((i8a[i] << 24) | (i8a[i + 1] << 16) | (i8a[i + 2] << 8) | i8a[i + 3])
  }
  return CryptoJS.lib.WordArray.create(a, i8a.length)
}

export function getDisplayChainName(chainId: ChainId): string {
  switch (chainId) {
    case ChainId.MAINNET:
      return 'Mainnet'
    case ChainId.ROPSTEN:
      return 'Ropsten'
    case ChainId.RINKEBY:
      return 'Rinkeby'
    case ChainId.G??RLI:
      return 'G??rli'
    case ChainId.KOVAN:
      return 'Kovan'
    case ChainId.BSC_MAINNET:
      return 'BSC Mainnet'
    case ChainId.BSC_TESTNET:
      return 'BSC Testnet'
    default:
      return 'Unknown'
  }
}
