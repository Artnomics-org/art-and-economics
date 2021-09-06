import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import React, { useState } from 'react'
import { useModalOpen, useWalletModalToggle } from '../../hooks/application'
import { ApplicationModal } from '../../state/application/actions'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { usePrevious } from '../../hooks'
import Modal from '.'
import styled from 'styled-components/macro'
import { useEffect } from 'react'
import { fortmatic } from '../../connectors'
import { OVERLAY_READY } from '../../connectors/FortmaticConnector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import WalletModalContent from './components/WalletModalContent'

interface WalletModalProps {
  pendingTransactions: string[] // hashes of pending
  confirmedTransactions: string[] // hashes of confirmed
  ENSName?: string
}

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

const WalletModal: React.FC<WalletModalProps> = ({ pendingTransactions, confirmedTransactions, ENSName }) => {
  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error } = useWeb3React()
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)
  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>()
  const [pendingError, setPendingError] = useState<boolean>()
  const [connectError, setConnectError] = useState<Error>(error)
  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()
  const previousAccount = usePrevious(account)
  // close modal when a connection is successful
  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    setPendingWallet(connector) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }

    connector &&
      activate(connector, undefined, true).catch((error) => {
        console.log('WalletModal:activate:error:', error)
        setConnectError(error)
        if (error instanceof UnsupportedChainIdError) {
          activate(connector) // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true)
        }
      })
  }

  useEffect(() => {
    // close on connection, when logged out before
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal()
    }
    // always reset to account view
    if (walletModalOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
    // close modal when a connection is successful
    if (walletModalOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
    // close wallet modal if fortmatic modal is active
    fortmatic.on(OVERLAY_READY, () => {
      toggleWalletModal()
    })
  }, [
    account,
    active,
    activePrevious,
    connector,
    connectorPrevious,
    error,
    previousAccount,
    toggleWalletModal,
    walletModalOpen,
  ])

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <Wrapper>
        <WalletModalContent
          account={account}
          walletView={walletView}
          WALLET_VIEWS={WALLET_VIEWS}
          pendingError={pendingError}
          pendingTransactions={pendingTransactions}
          pendingWallet={pendingWallet}
          connector={connector}
          confirmedTransactions={confirmedTransactions}
          ENSName={ENSName}
          error={connectError}
          tryActivation={tryActivation}
          toggleWalletModal={toggleWalletModal}
          setWalletView={setWalletView}
          setPendingError={setPendingError}
        />
      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  padding: 0;
  width: 100%;
`

export default WalletModal
