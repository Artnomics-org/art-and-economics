import { UnsupportedChainIdError } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import WalletModalOptions from './WalletModalOptions'
import { ExternalLink } from '../../Link'
import { X } from 'react-feather'
import WalletModalPendingView from './WalletModalPendingView'
import { AccountDetails } from '../../AccountDetails'

interface WalletModalContentProps {
  account: string
  walletView: string
  WALLET_VIEWS: Record<string, string>
  pendingTransactions: string[] // hashes of pending
  confirmedTransactions: string[] // hashes of confirmed
  ENSName: string
  pendingWallet: AbstractConnector
  pendingError: boolean
  connector: AbstractConnector
  error: Error | undefined
  tryActivation: (connector: AbstractConnector | undefined) => Promise<void>
  toggleWalletModal: () => void
  setWalletView: React.Dispatch<React.SetStateAction<string>>
  setPendingError: React.Dispatch<React.SetStateAction<boolean>>
}

const WalletModalContent: React.FC<WalletModalContentProps> = ({
  account,
  walletView,
  WALLET_VIEWS,
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  connector,
  pendingWallet,
  pendingError,
  error,
  tryActivation,
  toggleWalletModal,
  setWalletView,
  setPendingError,
}) => {
  const wrongNetwork = 'You are on the wrong network'
  const unlockWallet = 'Please unlock Wallet'
  const errorConnecting = 'Error connecting'
  const ethereumNetwork = 'Please connect to the appropriate Ethereum network.'
  const metamaskLocked = 'Metamask is locked, please open the extension before continuing.'
  const tryRefreshing = 'Error connecting. Try refreshing the page.'

  let errHeader = ''
  if (error instanceof UnsupportedChainIdError) {
    errHeader = wrongNetwork
  } else if (error?.message.includes('eth_requestAccounts')) {
    errHeader = unlockWallet
  } else if (error instanceof Error) {
    errHeader = errorConnecting
  }

  let errBody = ''
  if (error instanceof UnsupportedChainIdError) {
    errBody = ethereumNetwork
  } else if (error?.message.includes('eth_requestAccounts')) {
    errBody = metamaskLocked
  } else if (error instanceof Error) {
    errBody = tryRefreshing
  }

  const handleClick = useCallback(() => {
    setPendingError(false)
    setWalletView(WALLET_VIEWS.ACCOUNT)
  }, [WALLET_VIEWS.ACCOUNT, setPendingError, setWalletView])

  if (error) {
    return (
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        <HeaderRow>{errHeader}</HeaderRow>
        <ContentWrapper>{errBody}</ContentWrapper>
      </UpperSection>
    )
  }

  if (account && walletView === WALLET_VIEWS.ACCOUNT) {
    return (
      <AccountDetails
        toggleWalletModal={toggleWalletModal}
        pendingTransactions={pendingTransactions}
        confirmedTransactions={confirmedTransactions}
        ENSName={ENSName}
        openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
      />
    )
  }

  return (
    <UpperSection>
      <CloseIcon onClick={toggleWalletModal}>
        <CloseColor />
      </CloseIcon>
      {walletView !== WALLET_VIEWS.ACCOUNT ? (
        <HeaderRow color="blue">
          <HoverText onClick={handleClick}>Back</HoverText>
        </HeaderRow>
      ) : (
        <HeaderRow>
          <HoverText>Connect to a wallet</HoverText>
        </HeaderRow>
      )}
      <ContentWrapper>
        {walletView === WALLET_VIEWS.PENDING ? (
          <WalletModalPendingView
            connector={pendingWallet}
            error={pendingError}
            errorMessage={errorConnecting}
            setPendingError={setPendingError}
            tryActivation={tryActivation}
          />
        ) : (
          <OptionGrid>
            <WalletModalOptions
              WALLET_VIEWS={WALLET_VIEWS}
              connector={connector}
              tryActivation={tryActivation}
              setWalletView={setWalletView}
            />
          </OptionGrid>
        )}
        {walletView !== WALLET_VIEWS.PENDING && (
          <Blurb>
            <span>New to Binance Smart Chain? &nbsp;</span>{' '}
            <ExternalLink href="https://docs.binance.org/smart-chain/wallet/metamask.html">
              Learn more about wallets
            </ExternalLink>
          </Blurb>
        )}
      </ContentWrapper>
    </UpperSection>
  )
}

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(X)`
  path {
    stroke: ${({ theme }) => theme.color.text[400]};
  }
`

const HeaderRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.color.text[500] : 'inherit')};
  /* ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `}; */
`

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.bg};
  padding: 2rem;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;

  /* ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`}; */
`

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const Blurb = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
  /* ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 1rem;
    font-size: 12px;
  `}; */
`

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  /* ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `}; */
`

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`

export default WalletModalContent
