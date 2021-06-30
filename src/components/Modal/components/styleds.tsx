import { TextProps } from 'rebass'
import styled from 'styled-components/macro'
import Column, { AutoColumn } from '../../Column'
import { RowBetween, RowFixed } from '../../Row'

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

export const Text = styled.div<TextProps>`
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
  border-radius: 13.5px;
  border: 2px solid ${({ theme }) => theme.color.grey[600]};
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
  border: 2px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.color.grey[600])};
  border-radius: 13.5px;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.color.bg};
  }
`

export const ListWrapper = styled.div`
  flex: 1;
`

export const ListBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`

export const Tag = styled.div`
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text[500]};
  font-size: 14px;
  border-radius: 4px;
  padding: 0.25rem 0.3rem;
  max-width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-self: flex-end;
  margin-right: 4px;
`

export const TagContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const MenuItem = styled(RowBetween)`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto minmax(0, 72px);
  grid-gap: 16px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  box-sizing: border-box;
  :hover {
    background-color: ${({ theme, disabled }) => !disabled && theme.color.bg};
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};
`

export const FadedSpan = styled(RowFixed)`
  color: ${({ theme }) => theme.color.text[500]};
  font-size: 14px;
`
