import React from 'react'
import styled from 'styled-components/macro'
import { escapeRegExp } from '../../utils'

interface InputProps {
  error?: boolean
  fontSize?: number
  fgColor?: string
  align?: 'right' | 'left'
}

type NumericalInputProps = {
  value: string | number
  onUserInput: (input: string) => void
} & InputProps &
  Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>

const NumericalInput: React.FC<NumericalInputProps> = ({ value, onUserInput, placeholder, ...rest }) => {
  const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  }

  return (
    <Input
      {...rest}
      value={value}
      onChange={(event) => {
        // replace commas with periods, because uniswap exclusively uses period as the decimal separator
        enforcer(event.target.value.replace(/,/g, '.'))
      }}
      // universal input options
      inputMode="decimal"
      title="Token amount"
      autoComplete="off"
      autoCorrect="off"
      // text-specific options
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder={placeholder || '0.0'}
      minLength={1}
      maxLength={79}
      spellCheck="false"
    />
  )
}

const Input = styled.input<InputProps>`
  color: ${({ error, theme, fgColor }) => (error ? theme.color.red[500] : fgColor ? fgColor : theme.color.white)};
  position: relative;
  outline: none;
  border: none;
  background-color: transparent;
  width: 0;
  flex: 1 1 auto;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: ${({ fontSize }) => fontSize ?? 24}px;
  text-align: ${({ align }) => (align ? align : 'left')};
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0;
  appearance: textfield;
  ::-webkit-search-decoration {
    appearance: none;
  }
  [type='number'] {
    appearance: textfield;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    appearance: none;
  }
  ::placeholder {
    color: ${({ theme, fgColor }) => (fgColor ? fgColor : theme.color.white)};
  }
`

export default NumericalInput
