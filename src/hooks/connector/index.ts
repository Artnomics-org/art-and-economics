import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { isMobile } from 'react-device-detect'
import { SUPPORTED_WALLETS } from '../../constants'
import { injected } from '../../connectors'

export function useInactiveListener(suppress = false): void {
  const { active, error, activate, account } = useWeb3React()
  useEffect(() => {
    if (suppress) {
      return () => { console.log('suppress') }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any
    const injected = SUPPORTED_WALLETS['METAMASK'].connector

    if (ethereum && ethereum.on && !active && !error) {

      const handleChainChanged = (chainId: number) => {
        console.log('chainChanged', chainId)
        activate(injected)
      }

      const handleAccountsChanged = (accounts: string) => {
        console.log('accountsChanged', accounts)
        if (accounts.length > 0) {
          activate(injected)
        }
      }

      const handleNetworkChanged = (networkId: number) => {
        console.log('networkChanged', networkId)
        activate(injected)
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      activate(injected)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }

    return () => { console.log('no ethereum') }
  }, [active, error, suppress, activate, account])
}

export function useEagerConnect(): boolean {
  const { activate, active } = useWeb3React() // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        // @ts-ignore: window has ethereum injected
        if (isMobile && window.ethereum) {
          activate(injected, undefined, true).catch(() => {
            setTried(true)
          })
        } else {
          setTried(true)
        }
      }
    })
  }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}
