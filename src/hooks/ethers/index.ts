import { namehash } from 'ethers/lib/utils'
import { useMemo } from 'react'
import { useENSRegistrarContract, useENSResolverContract } from '../contract'
import { useSingleCallResult } from '../multicall'

/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export function isZeroHex(hexNumberString: string): boolean {
  return /^0x0*$/.test(hexNumberString)
}

/**
 * Does a lookup for an ENS name to find its contenthash.
 */
export function useENSContentHash(ensName?: string | null): { loading: boolean; contenthash: string | null } {
  const ensNodeArgument = useMemo(() => {
    if (!ensName) return [undefined]
    try {
      return ensName ? [namehash(ensName)] : [undefined]
    } catch (error) {
      return [undefined]
    }
  }, [ensName])
  const registrarContract = useENSRegistrarContract(false)
  const resolverAddressResult = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument)
  const resolverAddress = resolverAddressResult.result?.[0]
  const resolverContract = useENSResolverContract(
    resolverAddress && isZeroHex(resolverAddress) ? undefined : resolverAddress,
    false
  )
  const contenthash = useSingleCallResult(resolverContract, 'contenthash', ensNodeArgument)

  return {
    contenthash: contenthash.result?.[0] ?? null,
    loading: resolverAddressResult.loading || contenthash.loading
  }
}
