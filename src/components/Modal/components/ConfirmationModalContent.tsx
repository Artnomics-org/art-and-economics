import React from 'react'
import styled from 'styled-components/macro'
import CloseIconButton from '../../Button/CloseIconButton'
import { RowBetween } from '../../Row'
import { Wrapper, Section, BottomSection } from './styleds'

interface ConfirmationModalContentProps {
  title: string
  onDismiss: () => void
  topContent: JSX.Element
  bottomContent: JSX.Element
}

const ConfirmationModalContent: React.FC<ConfirmationModalContentProps> = ({
  title,
  bottomContent,
  onDismiss,
  topContent,
}) => {
  return (
    <Wrapper>
      <Section>
        <RowBetween>
          <Text>{title}</Text>
          <CloseIconButton onClick={onDismiss} />
        </RowBetween>
        {topContent}
      </Section>
      <BottomSection gap="12px">{bottomContent}</BottomSection>
    </Wrapper>
  )
}

const Text = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.color.text[500]};
`

export default ConfirmationModalContent
