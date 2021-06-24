import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { NetworkContextName } from '../../constants'
import { useEagerConnect, useInactiveListener } from '../../hooks/connector'
import { network } from '../../connectors'

const Web3ReactManager: React.FC = ({ children }) => {
  const { active } = useWeb3React()
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NetworkContextName)
  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()
  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(network)
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active])
  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null
  }

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (!active && networkError) {
    return (
      <MessageWrapper>
        <Message>Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.</Message>
      </MessageWrapper>
    )
  }

  // if neither context is active, spin
  if (!active && !networkActive) {
    console.log('Loading...')
  }

  return <>{children}</>
}

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
`

const Message = styled.h2`
  color: ${({ theme }) => theme.color.red[500]};
`

export default Web3ReactManager
