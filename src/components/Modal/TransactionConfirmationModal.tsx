import React from 'react'
import { useActiveWeb3React } from '../../hooks/wallet'
import ConfirmationPendingContent from './components/ConfirmationPendingContent'
import TransactionSubmittedContent from './components/TransactionSubmittedContent'
import Modal from './Modal'

interface TransactionConfirmationModalProps {
  isOpen: boolean
  onDismiss: () => void
  hash: string | undefined
  attemptingTxn: boolean
  pendingText: string
}

const TransactionConfirmationModal: React.FC<TransactionConfirmationModalProps> = ({
  isOpen,
  onDismiss,
  hash,
  attemptingTxn,
  pendingText,
  children,
}) => {
  const { chainId } = useActiveWeb3React()
  if (!chainId) return null

  // confirmation screen
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90}>
      {attemptingTxn ? (
        <ConfirmationPendingContent onDismiss={onDismiss} pendingText={pendingText} />
      ) : hash ? (
        <TransactionSubmittedContent chainId={chainId} hash={hash} onDismiss={onDismiss} />
      ) : (
        { children }
      )}
    </Modal>
  )
}

export default TransactionConfirmationModal
