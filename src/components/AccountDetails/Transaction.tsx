import React from 'react'
import styled from 'styled-components/macro'
import { CheckCircle, ExternalLink, Loader, Triangle } from 'react-feather'
import { useAllTransactions } from '../../hooks/transaction'
import { useActiveWeb3React } from '../../hooks/wallet'
import { RowFixed } from '../Row'
import { getScanLink } from '../../utils/getScanLink'

interface TransactionProps {
  hash: string
}

const Transaction: React.FC<TransactionProps> = ({ hash }) => {
  const { chainId } = useActiveWeb3React()
  const allTransactions = useAllTransactions()

  const tx = allTransactions?.[hash]
  const summary = tx?.summary
  const pending = !tx?.receipt
  const success = !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined')

  if (!chainId) return null

  return (
    <TransactionWrapper>
      <TransactionState href={getScanLink(chainId, hash, 'transaction')} pending={pending} success={success}>
        <RowFixed>
          <TransactionStatusText>{summary ?? hash}</TransactionStatusText>
        </RowFixed>
        <IconWrapper pending={pending} success={success}>
          {pending ? <Loader /> : success ? <CheckCircle size="16" /> : <Triangle size="16" />}
        </IconWrapper>
      </TransactionState>
    </TransactionWrapper>
  )
}

const TransactionWrapper = styled.div``

const TransactionStatusText = styled.div`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  :hover {
    text-decoration: underline;
  }
`

const TransactionState = styled(ExternalLink)<{ pending: boolean; success?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none !important;
  border-radius: 6px;
  padding: 0.25rem 0rem;
  font-weight: 500;
  font-size: 0.825rem;
  color: ${({ theme }) => theme.color.text[500]};
`

const IconWrapper = styled.div<{ pending: boolean; success?: boolean }>`
  color: ${({ pending, success, theme }) =>
    pending ? theme.color.text[500] : success ? theme.color.green[500] : theme.color.red[500]};
`

export default Transaction
