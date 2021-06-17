import React from 'react'
import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import TripleLine from '../../../components/TripleLine'

interface QuestionProps {
  answer: string
}

const Question: React.FC<QuestionProps> = ({ answer, children }) => {
  const theme = useContext(ThemeContext)

  return (
    <StyledQuestion>
      <StyledLeftWrapper>
        <StyledQuestionIcon>
          <TripleLine color={[theme.color.black, theme.color.black, theme.color.text[500]]} height={4} space={2} />
        </StyledQuestionIcon>
        <StyledQuestionText>{children}</StyledQuestionText>
      </StyledLeftWrapper>
      <StyledAnswerText>{answer}</StyledAnswerText>
    </StyledQuestion>
  )
}

const StyledQuestion = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 72px;
  }
`

const StyledLeftWrapper = styled.div`
  display: flex;
`

const StyledQuestionIcon = styled.div`
  width: 64px;
  margin-top: 6px;
  margin-right: 16px;
`

const StyledQuestionText = styled.p`
  font-family: Poppins;
  font-size: 19px;
  font-weight: 500;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  color: ${(props) => props.theme.color.text[500]};
  margin: 0;
`

const StyledAnswerText = styled.p`
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.6px;
  text-align: right;
  color: ${(props) => props.theme.color.text[400]};
  margin-top: 0;
  margin-bottom: 4px;
`

export default Question
