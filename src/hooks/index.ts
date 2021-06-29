import { useEffect, useMemo, useRef, useState } from 'react'
import { contenthashToUri, uriToHttp } from '../utils'
import { parseENSAddress } from '../utils/ethers'
import { useENSContentHash } from './ethers'

export function useHttpLocations(uri: string | undefined): string[] {
  const ens = useMemo(() => (uri ? parseENSAddress(uri) : undefined), [uri])
  const resolvedContentHash = useENSContentHash(ens?.ensName)
  return useMemo(() => {
    if (ens) {
      return resolvedContentHash.contenthash ? uriToHttp(contenthashToUri(resolvedContentHash.contenthash)) : []
    } else {
      return uri ? uriToHttp(uri) : []
    }
  }, [ens, resolvedContentHash.contenthash, uri])
}

export function useInterval(callback: () => void, delay: null | number, leading = true): void {
  const savedCallback = useRef<() => void>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      const current = savedCallback.current
      current && current()
    }

    if (delay !== null) {
      if (leading) tick()
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return undefined
  }, [delay, leading])
}

/**
 * Returns the last value of type T that passes a filter function
 * @param value changing value
 * @param filterFn function that determines whether a given value should be considered for the last value
 */
export default function useLast<T>(
  value: T | undefined | null,
  filterFn?: (value: T | null | undefined) => boolean
): T | null | undefined {
  const [last, setLast] = useState<T | null | undefined>(filterFn && filterFn(value) ? value : undefined)
  useEffect(() => {
    setLast(last => {
      const shouldUse: boolean = filterFn ? filterFn(value) : true
      if (shouldUse) return value
      return last
    })
  }, [filterFn, value])
  return last
}

function isDefined<T>(x: T | null | undefined): x is T {
  return x !== null && x !== undefined
}

/**
 * Returns the last truthy value of type T
 * @param value changing value
 */
export function useLastTruthy<T>(value: T | undefined | null): T | null | undefined {
  return useLast(value, isDefined)
}
