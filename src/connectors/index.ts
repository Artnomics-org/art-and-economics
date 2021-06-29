import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { NetworkConnector } from './NetworkConnector'

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97]
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { 
    1: 'https://mainnet.infura.io/v3/4bf032f2d38a4ed6bb975b80d6340847',
    56: 'https://bsc-dataseed.binance.org/'
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000
})

export const network = new NetworkConnector({
  urls: {
    1: 'https://mainnet.infura.io/v3/4bf032f2d38a4ed6bb975b80d6340847',
    56: 'https://bsc-dataseed.binance.org/'
  },
  defaultChainId: 1
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as unknown))
}
