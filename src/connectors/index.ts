import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from '@haneko/uniswap-sdk'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { FortmaticConnector } from './FortmaticConnector'
import { NetworkConnector } from './NetworkConnector'

export const injected = new InjectedConnector({
  supportedChainIds: Object.values(ChainId)
    .map((x) => parseInt(x as string))
    .filter((x) => !isNaN(x)),
})

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: 'https://mainnet.infura.io/v3/4bf032f2d38a4ed6bb975b80d6340847',
    56: 'https://bsc-dataseed.binance.org/',
    97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
})

export const network = new NetworkConnector({
  urls: {
    1: 'https://mainnet.infura.io/v3/4bf032f2d38a4ed6bb975b80d6340847',
    56: 'https://bsc-dataseed.binance.org/',
    97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  },
  defaultChainId: 56,
})

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: 'pk_live_F937DF033A1666BF',
  chainId: 1,
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as unknown))
}
