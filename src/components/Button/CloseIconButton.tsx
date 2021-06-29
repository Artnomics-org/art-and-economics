import React from 'react'
import styled from 'styled-components/macro'
import { X } from 'react-feather'

interface CloseIconButtonProps {
  onClick: () => void
}
const CloseIconButton: React.FC<CloseIconButtonProps> = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <X />
    </StyledButton>
  )
}

const StyledButton = styled.div`
  cursor: pointer;
  line-height: 0;
`

export default CloseIconButton
