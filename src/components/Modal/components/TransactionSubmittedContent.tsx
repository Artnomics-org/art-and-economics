import { ChainId } from '@art-economics/swap-sdk'
import React, { useContext } from 'react'
import { ArrowUpCircle } from 'react-feather'
import { Button } from 'rebass'
import styled, { ThemeContext } from 'styled-components/macro'
import { getScanLink } from '../../../utils'
import CloseIconButton from '../../Button/CloseIconButton'
import { AutoColumn } from '../../Column'
import { ExternalLink } from '../../Link'
import { RowBetween } from '../../Row'
import { Wrapper, Section, ConfirmedIcon } from './styleds'

interface TransactionSubmittedContentProps {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
}

const TransactionSubmittedContent: React.FC<TransactionSubmittedContentProps> = ({ onDismiss, chainId, hash }) => {
  const theme = useContext(ThemeContext)

  return (
    <Wrapper>
      <Section>
        <RowBetween>
          <div />
          <CloseIconButton onClick={onDismiss} />
        </RowBetween>
        <ConfirmedIcon>
          <ArrowUpCircle strokeWidth={0.5} size={90} color={theme.color.text[500]} />
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify={'center'}>
          <Text>Transaction Submitted</Text>
          {chainId && hash && (
            <ExternalLink href={getScanLink(chainId, hash, 'transaction')}>
              <SmallText>View on Bscscan</SmallText>
            </ExternalLink>
          )}
          <Button onClick={onDismiss} style={{ margin: '20px 0 0 0' }}>
            <Text>Close</Text>
          </Button>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

const Text = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.color.text[500]};
`

const SmallText = styled(Text)`
  font-size: 14px;
`

export default TransactionSubmittedContent
