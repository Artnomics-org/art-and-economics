import React from 'react'
import styled from 'styled-components/macro'
import CloseIconButton from '../../Button/CloseIconButton'
import { AutoColumn } from '../../Column'
import { RowBetween } from '../../Row'
import { Wrapper, Section, ConfirmedIcon, CustomLightSpinner } from './styleds'
import Circle from '../../../assets/img/blue-loader.svg'

interface ConfirmationPendingContentProps {
  onDismiss: () => void
  pendingText: string
}

const ConfirmationPendingContent: React.FC<ConfirmationPendingContentProps> = ({ pendingText, onDismiss }) => {
  return (
    <Wrapper>
      <Section>
        <RowBetween>
          <div />
          <CloseIconButton onClick={onDismiss} />
        </RowBetween>
        <ConfirmedIcon>
          <CustomLightSpinner src={Circle} alt="loader" size={'90px'} />
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify={'center'}>
          <BigText>Waiting for Confirmation</BigText>
          <AutoColumn gap="12px" justify={'center'}>
            <BoldText>{pendingText}</BoldText>
          </AutoColumn>
          <NormalText>Confirm this transaction in your wallet.</NormalText>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

const BigText = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.color.text[500]};
`

const BoldText = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  color: ${(props) => props.theme.color.text[500]};
`

const NormalText = styled.p`
  margin: 0;
  font-size: 12px;
  text-align: center;
  color: ${(props) => props.theme.color.text[500]};
`

export default ConfirmationPendingContent
