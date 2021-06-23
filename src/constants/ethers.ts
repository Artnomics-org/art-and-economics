import { Interface } from '@ethersproject/abi'
import ERC20_ABI from './abi/ERC20.json'
import ENS_ABI from './abi/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from './abi/ens-public-resolver.json'

const ERC20_INTERFACE = new Interface(ERC20_ABI.abi)

export { ERC20_ABI, ENS_ABI, ENS_PUBLIC_RESOLVER_ABI, ERC20_INTERFACE }
