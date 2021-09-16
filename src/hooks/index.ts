import { parse, ParsedQs } from 'qs'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import copy from 'copy-to-clipboard'
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

const VISIBILITY_STATE_SUPPORTED = 'visibilityState' in document
function isWindowVisible() {
  return !VISIBILITY_STATE_SUPPORTED || document.visibilityState !== 'hidden'
}
/**
 * Returns whether the window is currently visible to the user.
 */
export function useIsWindowVisible(): boolean {
  const [focused, setFocused] = useState<boolean>(isWindowVisible())
  const listener = useCallback(() => {
    setFocused(isWindowVisible())
  }, [setFocused])

  useEffect(() => {
    if (!VISIBILITY_STATE_SUPPORTED) return undefined

    document.addEventListener('visibilitychange', listener)
    return () => {
      document.removeEventListener('visibilitychange', listener)
    }
  }, [listener])

  return focused
}

/**
 * Returns the last value of type T that passes a filter function
 * @param value changing value
 * @param filterFn function that determines whether a given value should be considered for the last value
 */
export function useLast<T>(
  value: T | undefined | null,
  filterFn?: (value: T | null | undefined) => boolean,
): T | null | undefined {
  const [last, setLast] = useState<T | null | undefined>(filterFn && filterFn(value) ? value : undefined)
  useEffect(() => {
    setLast((last) => {
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

// modified from https://usehooks.com/useDebounce/
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function useParsedQueryString(): ParsedQs {
  const { search } = useLocation()
  return useMemo(
    () => (search && search.length > 1 ? parse(search, { parseArrays: false, ignoreQueryPrefix: true }) : {}),
    [search],
  )
}

// modified from https://usehooks.com/usePrevious/
export function usePrevious<T>(value: T): T {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}

export function useCopyClipboard(timeout = 500): [boolean, (toCopy: string) => void] {
  const [isCopied, setIsCopied] = useState(false)

  const staticCopy = useCallback((text) => {
    const didCopy = copy(text)
    setIsCopied(didCopy)
  }, [])

  useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => {
        setIsCopied(false)
      }, timeout)

      return () => {
        clearTimeout(hide)
      }
    }
    return undefined
  }, [isCopied, setIsCopied, timeout])

  return [isCopied, staticCopy]
}

/**
 * Easy way to debounce the handling of a rapidly changing value, e.g. a changing slider input
 * @param value value that is rapidly changing
 * @param onChange change handler that should receive the debounced updates to the value
 * @param debouncedMs how long we should wait for changes to be applied
 */
export default function useDebouncedChangeHandler<T>(
  value: T,
  onChange: (newValue: T) => void,
  debouncedMs = 100,
): [T, (value: T) => void] {
  const [inner, setInner] = useState<T>(() => value)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const onChangeInner = useCallback(
    (newValue: T) => {
      setInner(newValue)
      if (timer.current) {
        clearTimeout(timer.current)
      }
      timer.current = setTimeout(() => {
        onChange(newValue)
        timer.current = undefined
      }, debouncedMs)
    },
    [debouncedMs, onChange],
  )

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = undefined
    }
    setInner(value)
  }, [value])

  return [inner, onChangeInner]
}
