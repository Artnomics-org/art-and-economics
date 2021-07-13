import { transparentize } from 'polished'
import React from 'react'
import { AlertTriangle } from 'react-feather'
import styled from 'styled-components/macro'

interface SwapCallbackErrorProps {
  error: string
}

const SwapCallbackError: React.FC<SwapCallbackErrorProps> = ({ error }) => {
  return (
    <SwapCallbackErrorInner>
      <SwapCallbackErrorInnerAlertTriangle>
        <AlertTriangle size={24} />
      </SwapCallbackErrorInnerAlertTriangle>
      <p>{error}</p>
    </SwapCallbackErrorInner>
  )
}

const SwapCallbackErrorInnerAlertTriangle = styled.div`
  background-color: ${({ theme }) => transparentize(0.9, theme.color.red[500])};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border-radius: 6px;
  min-width: 48px;
  height: 48px;
`

const SwapCallbackErrorInner = styled.div`
  background-color: ${({ theme }) => transparentize(0.9, theme.color.red[500])};
  border-radius: 6px;
  display: flex;
  align-items: center;
  font-size: 0.825rem;
  width: 100%;
  padding: 3rem 1.25rem 1rem 1rem;
  margin-top: -2rem;
  color: ${({ theme }) => theme.color.red[500]};
  z-index: -1;
  p {
    padding: 0;
    margin: 0;
    font-weight: 500;
  }
`

export default SwapCallbackError
