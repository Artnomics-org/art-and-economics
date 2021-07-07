import { BigNumber } from 'ethers'
import { namehash } from 'ethers/lib/utils'
import { useMemo } from 'react'
import { useDebounce } from '..'
import { isAddress } from '../../utils/ethers'
import { useENSRegistrarContract, useENSResolverContract, useMulticallContract } from '../contract'
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

/**
 * Does a reverse lookup for an address to find its ENS name.
 * Note this is not the same as looking up an ENS name to find an address.
 */
export function useENSName(address?: string): { ENSName: string | null; loading: boolean } {
  const debouncedAddress = useDebounce(address, 200)
  const ensNodeArgument = useMemo(() => {
    if (!debouncedAddress || !isAddress(debouncedAddress)) return [undefined]
    try {
      return debouncedAddress ? [namehash(`${debouncedAddress.toLowerCase().substr(2)}.addr.reverse`)] : [undefined]
    } catch (error) {
      return [undefined]
    }
  }, [debouncedAddress])
  const registrarContract = useENSRegistrarContract(false)
  const resolverAddress = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument)
  const resolverAddressResult = resolverAddress.result?.[0]
  const resolverContract = useENSResolverContract(
    resolverAddressResult && !isZeroHex(resolverAddressResult) ? resolverAddressResult : undefined,
    false
  )
  const name = useSingleCallResult(resolverContract, 'name', ensNodeArgument)

  const changed = debouncedAddress !== address
  return {
    ENSName: changed ? null : name.result?.[0] ?? null,
    loading: changed || resolverAddress.loading || name.loading
  }
}

/**
 * Does a lookup for an ENS name to find its address.
 */
export function useENSAddress(ensName?: string | null): { loading: boolean; address: string | null } {
  const debouncedName = useDebounce(ensName, 200)
  const ensNodeArgument = useMemo(() => {
    if (!debouncedName) return [undefined]
    try {
      return debouncedName ? [namehash(debouncedName)] : [undefined]
    } catch (error) {
      return [undefined]
    }
  }, [debouncedName])
  const registrarContract = useENSRegistrarContract(false)
  const resolverAddress = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument)
  const resolverAddressResult = resolverAddress.result?.[0]
  const resolverContract = useENSResolverContract(
    resolverAddressResult && !isZeroHex(resolverAddressResult) ? resolverAddressResult : undefined,
    false
  )
  const addr = useSingleCallResult(resolverContract, 'addr', ensNodeArgument)

  const changed = debouncedName !== ensName
  return {
    address: changed ? null : addr.result?.[0] ?? null,
    loading: changed || resolverAddress.loading || addr.loading
  }
}

/**
 * Given a name or address, does a lookup to resolve to an address and name
 * @param nameOrAddress ENS name or address
 */
export function useENS(
  nameOrAddress?: string | null
): { loading: boolean; address: string | null; name: string | null } {
  const validated = isAddress(nameOrAddress)
  const reverseLookup = useENSName(validated ? validated : undefined)
  const lookup = useENSAddress(nameOrAddress)

  return {
    loading: reverseLookup.loading || lookup.loading,
    address: validated ? validated : lookup.address,
    name: reverseLookup.ENSName ? reverseLookup.ENSName : !validated && lookup.address ? nameOrAddress || null : null
  }
}

export function useCurrentBlockTimestamp(): BigNumber | undefined {
  const multicall = useMulticallContract()
  return useSingleCallResult(multicall, 'getCurrentBlockTimestamp')?.result?.[0]
}
