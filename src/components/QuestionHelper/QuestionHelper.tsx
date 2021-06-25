import React, { useCallback, useState } from 'react'
import { HelpCircle as Question } from 'react-feather'
import styled from 'styled-components/macro'
import Tooltip from '../Tooltip'

export interface QuestionHelperProps {
  text: string
}

const QuestionHelper: React.FC<QuestionHelperProps> = ({ text }) => {
  const [show, setShow] = useState<boolean>(false)
  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <Container>
      <Tooltip text={text} show={show}>
        <QuestionWrapper onClick={open} onMouseEnter={open} onMouseLeave={close}>
          <Question size={16} />
        </QuestionWrapper>
      </Tooltip>
    </Container>
  )
}

const Container = styled.span`
  margin-left: 4px;
`

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text[500]};
  :hover,
  :focus {
    opacity: 0.7;
  }
`

export default QuestionHelper
