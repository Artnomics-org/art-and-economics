import { Interface } from '@ethersproject/abi'
import ERC20_ABI from './abi/ERC20.json'
import ENS_ABI from './abi/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from './abi/ens-public-resolver.json'
import ERC20_BYTES32_ABI from './abi/erc20_bytes32.json'
import WETH_ABI from './abi/weth.json'
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import ARGENT_WALLET_DETECTOR_ABI from './abi/argent-wallet-detector.json'

const ERC20_INTERFACE = new Interface(ERC20_ABI.abi)
const ERC20_BYTES32_INTERFACE = new Interface(ERC20_BYTES32_ABI)

const RESOLVER_ABI = [
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'contenthash',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]

const REGISTRAR_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'resolver',
    outputs: [
      {
        name: 'resolverAddress',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]

export {
  ERC20_ABI,
  ENS_ABI,
  ENS_PUBLIC_RESOLVER_ABI,
  RESOLVER_ABI,
  REGISTRAR_ABI,
  ERC20_BYTES32_ABI,
  ERC20_INTERFACE,
  ERC20_BYTES32_INTERFACE,
  WETH_ABI,
  IUniswapV2Router02ABI,
  IUniswapV2PairABI,
  ARGENT_WALLET_DETECTOR_ABI,
}
