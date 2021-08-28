import React from 'react'
import styled from 'styled-components/macro'
import { RowFixed } from '../Row'

interface SortButtonProps {
  toggleSortOrder: () => void
  ascending: boolean
}

const SortButton: React.FC<SortButtonProps> = ({ toggleSortOrder, ascending }) => {
  return (
    <FilterWrapper onClick={toggleSortOrder}>
      <Text>{ascending ? '↑' : '↓'}</Text>
    </FilterWrapper>
  )
}

export const FilterWrapper = styled(RowFixed)`
  padding: 8px;
  background-color: transparent;
  color: ${({ theme }) => theme.color.text[500]};
  border-radius: 6px;
  user-select: none;
  & > * {
    user-select: none;
  }
  :hover {
    cursor: pointer;
  }
`

const Text = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`

export default SortButton
