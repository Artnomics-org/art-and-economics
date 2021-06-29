import styled from 'styled-components/macro'
import Column, { AutoColumn } from '../../Column'

export const FullColumn = styled(Column)`
  width: 100%;
  flex: 1 1;
`

export const PaddedColumn = styled(AutoColumn)`
  padding: 20px;
  padding-bottom: 12px;
`

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.grey[500]};
`

export const Text = styled.div`
  font-weight: 600;
  font-size: 16px;
`

export const SearchInput = styled.input`
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
  outline: none;
  appearance: none;
  width: 100%;
  height: 44px;
  padding: 12px;
  background-color: transparent;
  color: ${({ theme }) => theme.color.text[500]};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.grey[400]};
  font-size: 18px;
  ::placeholder {
    color: ${({ theme }) => theme.color.text[500]};
  }
  :focus {
    outline: none;
  }
`

export const BaseWrapper = styled.div<{ disable?: boolean }>`
  display: flex;
  padding: 6px;
  align-items: center;
  background-color: ${({ theme, disable }) => disable && theme.color.bg};
  opacity: ${({ disable }) => disable && '0.4'};
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.color.bg)};
  border-radius: 6px;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.color.bg};
  }
`
