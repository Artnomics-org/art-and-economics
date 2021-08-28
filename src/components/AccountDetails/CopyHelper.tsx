import React from 'react'
import styled from 'styled-components/macro'
import { CheckCircle, Copy } from 'react-feather'
import { LinkStyledButton } from '../Button'
import { useCopyClipboard } from '../../hooks'

interface CopyHelperProps {
  toCopy: string
}

const CopyHelper: React.FC<CopyHelperProps> = ({ toCopy, children }) => {
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <CopyIcon onClick={() => setCopied(toCopy)}>
      {isCopied ? (
        <TransactionStatusText>
          <CheckCircle size={'16'} />
          <TransactionStatusText>Copied</TransactionStatusText>
        </TransactionStatusText>
      ) : (
        <TransactionStatusText>
          <Copy size={'16'} />
        </TransactionStatusText>
      )}
      {isCopied ? '' : children}
    </CopyIcon>
  )
}

const CopyIcon = styled(LinkStyledButton)`
  color: ${({ theme }) => theme.color.text[400]};
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  font-size: 0.825rem;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => theme.color.text[500]};
  }
`
const TransactionStatusText = styled.span`
  display: flex;
  flex-flow: row nowrap;
  margin-left: 0.25rem;
  font-size: 0.825rem;
  align-items: center;
`

export default CopyHelper
