// import React from 'react'
import styled from 'styled-components/macro'

const Base = styled.button<{
  padding?: string
  width?: string
  borderRadius?: string
  altDisabledStyle?: boolean
}>`
  padding: ${({ padding }) => (padding ? padding : '18px')};
  width: ${({ width }) => (width ? width : '100%')};
  font-weight: 500;
  text-align: center;
  border-radius: 6px;
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  outline: none;
  border: 1px solid transparent;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    cursor: auto;
  }
  > * {
    user-select: none;
  }
`

export const ButtonSecondary = styled(Base)`
  border: 1px solid ${({ theme }) => theme.color.text[400]};
  color: ${({ theme }) => theme.color.text[500]};
  background-color: transparent;
  font-size: 16px;
  border-radius: 6px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.color.text[400]};
    border: 1px solid ${({ theme }) => theme.color.text[500]};
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.color.text[500]};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.color.text[400]};
    border: 1px solid ${({ theme }) => theme.color.text[500]};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`
