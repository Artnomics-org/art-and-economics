import React from 'react'
import styled from 'styled-components/macro'
import { AbstractConnector } from '@web3-react/abstract-connector'
import WalletModalOption from './WalletModalOption'
import { SUPPORTED_WALLETS } from '../../../constants'
import { injected } from '../../../connectors'
import { darken } from 'polished'

interface WalletModalPendingViewProps {
  connector?: AbstractConnector
  error?: boolean
  errorMessage?: string
  setPendingError: (error: boolean) => void
  tryActivation: (connector: AbstractConnector) => void
}

const WalletModalPendingView: React.FC<WalletModalPendingViewProps> = ({
  connector,
  error = false,
  errorMessage = 'Error connecting',
  setPendingError,
  tryActivation,
}) => {
  const isMetamask = window?.ethereum?.isMetaMask
  return (
    <PendingSection>
      <LoadingMessage error={error}>
        <LoadingWrapper>
          {error ? (
            <ErrorGroup>
              <div>{errorMessage}</div>
              <ErrorButton
                onClick={() => {
                  setPendingError(false)
                  connector && tryActivation(connector)
                }}
              >
                Try Again
              </ErrorButton>
            </ErrorGroup>
          ) : (
            <div>Initializing...</div>
          )}
        </LoadingWrapper>
      </LoadingMessage>
      {Object.keys(SUPPORTED_WALLETS).map((key) => {
        const option = SUPPORTED_WALLETS[key]
        if (option.connector === connector) {
          if (option.connector === injected) {
            if (isMetamask && option.name !== 'MetaMask') {
              return null
            }
            if (!isMetamask && option.name === 'MetaMask') {
              return null
            }
          }
          return (
            <WalletModalOption
              id={`connect-${key}`}
              key={key}
              clickable={false}
              color={option.color}
              header={option.name}
              subheader={option.description}
              icon={require('../../../assets/img/wallet/' + option.iconName)}
            />
          )
        }
        return null
      })}
    </PendingSection>
  )
}

const PendingSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {
    width: 100%;
  }
`

// const StyledLoader = styled(Loader)`
//   margin-right: 1rem;
// `

const LoadingMessage = styled.div<{ error?: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  border-radius: 6px;
  margin-bottom: 20px;
  color: ${({ theme, error }) => (error ? theme.color.red[500] : 'inherit')};
  border: 1px solid ${({ theme, error }) => (error ? theme.color.red[500] : theme.color.text[400])};

  & > * {
    padding: 1rem;
  }
`

const ErrorGroup = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
`

const ErrorButton = styled.div`
  border-radius: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.text[500]};
  background-color: ${({ theme }) => theme.color.bg};
  margin-left: 1rem;
  padding: 0.5rem;
  font-weight: 600;
  user-select: none;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => darken(0.1, theme.color.text[400])};
  }
`

const LoadingWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`

export default WalletModalPendingView
