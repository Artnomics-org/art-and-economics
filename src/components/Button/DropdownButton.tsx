import React from 'react'
import { ChevronDown } from 'react-feather'
import { ButtonProps } from 'rebass'
import styled from 'styled-components/macro'
import { RowBetween } from '../Row'
import { ButtonOutlined, ButtonPrimary } from './styleds'

interface DropdownButtonProps extends ButtonProps {
  buttonType?: 'primary' | 'light'
  disabled?: boolean
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  children,
  buttonType = 'primary',
  disabled = false,
  ...rest
}) => {
  const buttonInternal = (
    <RowBetween>
      <InternalWrapper>{children}</InternalWrapper>
      <ChevronDown size={24} />
    </RowBetween>
  )

  return (
    <>
      {buttonType === 'primary' && (
        <ButtonPrimary {...rest} disabled={disabled}>
          {buttonInternal}
        </ButtonPrimary>
      )}
      {buttonType === 'light' && (
        <ButtonOutlined {...rest} disabled={disabled}>
          {buttonInternal}
        </ButtonOutlined>
      )}
    </>
  )
}

const InternalWrapper = styled.div`
  display: flex;
  align-items: center;
`

export default DropdownButton
