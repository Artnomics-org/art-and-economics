import { darken, lighten } from 'polished'
import { ButtonProps } from 'rebass'
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

export const BaseButton = styled.button<ButtonProps>`
  text-decoration: none;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
  &:disabled {
    cursor: auto;
  }
  > * {
    user-select: none;
  }
`

interface ButtonPrimaryProps {
  altDisabledStyle?: boolean
}
export const ButtonPrimary = styled(BaseButton)<ButtonPrimaryProps>`
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text[500]};
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.color.grey[600])};
    background-color: ${({ theme }) => darken(0.05, theme.color.bg)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.color.bg)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.color.grey[600])};
    background-color: ${({ theme }) => darken(0.1, theme.color.bg)};
  }
  &:disabled {
    background-color: ${({ theme, altDisabledStyle }) =>
      altDisabledStyle ? darken(0.1, theme.color.bg) : theme.color.bg};
    color: ${({ theme, altDisabledStyle }) =>
      altDisabledStyle ? lighten(0.1, theme.color.text[500]) : theme.color.text[500]};
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: ${({ altDisabledStyle }) => (altDisabledStyle ? '0.7' : '1')};
  }
`

export const ButtonOutlined = styled(BaseButton)`
  padding: ${({ padding }) => (padding ? String(padding) : '18px')};
  width: ${({ width }) => (width ? width : '100%')};
  border-radius: 13.5px;
  font-weight: 500;

  border: 2px solid ${({ theme }) => theme.color.grey[600]};
  background-color: transparent;
  color: ${({ theme }) => theme.color.text[500]};

  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.color.grey[600]};
  }
  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.color.grey[600]};
  }
  &:active {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.color.grey[600]};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`
