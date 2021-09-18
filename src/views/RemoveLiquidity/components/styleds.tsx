import styled from 'styled-components/macro'

export const Wrapper = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    .currency-input-max {
      display: none;
    }
  }
`

export const Text = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.text[500]};
`

export const ClickableText = styled(Text)`
  text-decoration: underline;
  :hover {
    cursor: pointer;
  }
`

export const TitleText = styled(Text)`
  font-size: 36px;
`

export const MaxButton = styled.button<{ width: string }>`
  color: ${({ theme }) => theme.color.text[500]};
  background-color: ${({ theme }) => theme.color.bg};
  border: 1px solid ${({ theme }) => theme.color.grey[500]};
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  margin: 4px;
  padding: 8px 16px;
  width: ${({ width }) => width};
  overflow: hidden;
  cursor: pointer;
  :hover {
    border: 1px solid ${({ theme }) => theme.color.grey[600]};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.color.grey[600]};
    outline: none;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    font-size: 10px;
  }
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
`
