import { useMemo } from 'react'
import { Contract, ContractInterface } from '@ethersproject/contracts'
import { ChainId, WETH } from '@haneko/uniswap-sdk'
import { useActiveWeb3React } from '../wallet'
import { getContractWithAbi } from '../../utils/ethers'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../../constants/multicall'
import {
  ARGENT_WALLET_DETECTOR_ABI,
  ENS_ABI,
  ENS_PUBLIC_RESOLVER_ABI,
  ERC20_ABI,
  ERC20_BYTES32_ABI,
  IUniswapV2PairABI,
  IUniswapV2Router02ABI,
  WETH_ABI,
} from '../../constants/ethers'
import { ARGENT_WALLET_DETECTOR_ADDRESS, ROUTER_ADDRESS } from '../../constants/address'
import { isZeroHex } from '../ethers'

// returns null on errors
function useContract(
  address: string | undefined,
  ABI: ContractInterface,
  withSignerIfPossible = true,
): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || isZeroHex(address) || !ABI || !library) return null
    try {
      const contract = getContractWithAbi(address, ABI, library, withSignerIfPossible && account ? account : undefined)
      console.log('useContract:address:', address, contract)
      return contract
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  let address: string | undefined
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.GÖRLI:
      case ChainId.ROPSTEN:
      case ChainId.RINKEBY:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
        break
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI.abi, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useRouterContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? ROUTER_ADDRESS : undefined, IUniswapV2Router02ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useArgentWalletDetectorContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(ARGENT_WALLET_DETECTOR_ADDRESS[chainId], ARGENT_WALLET_DETECTOR_ABI, false)
}
