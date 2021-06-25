import { Interface } from '@ethersproject/abi'
import ERC20_ABI from './abi/ERC20.json'
import ENS_ABI from './abi/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from './abi/ens-public-resolver.json'
import ERC20_BYTES32_ABI from './abi/erc20_bytes32.json'

const ERC20_INTERFACE = new Interface(ERC20_ABI.abi)
const ERC20_BYTES32_INTERFACE = new Interface(ERC20_BYTES32_ABI)

export { ERC20_ABI, ENS_ABI, ENS_PUBLIC_RESOLVER_ABI, ERC20_BYTES32_ABI, ERC20_INTERFACE, ERC20_BYTES32_INTERFACE }
