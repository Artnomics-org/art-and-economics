import styled from 'styled-components/macro'

// A button that triggers some onClick result, but looks like a link.
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) => (disabled ? theme.color.text[400] : theme.color.text[500])};
  font-weight: 500;
  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }
  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }
  :active {
    text-decoration: none;
  }
`
