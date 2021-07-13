import React from 'react'
import styled from 'styled-components/macro'
import { useLastTruthy } from '../../../hooks'
import AdvancedSwapDetails, { AdvancedSwapDetailsProps } from './AdvancedSwapDetails'

const AdvancedSwapDetailsDropdown: React.FC<AdvancedSwapDetailsProps> = ({ trade }) => {
  const lastTrade = useLastTruthy(trade)

  return (
    <AdvancedDetailsFooter show={!!trade}>
      <AdvancedSwapDetails trade={trade ?? lastTrade ?? undefined} />
    </AdvancedDetailsFooter>
  )
}

const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  width: 100%;
  padding: 16px 0;
  color: ${({ theme }) => theme.color.text[400]};
  border: 1px solid ${({ theme }) => theme.color.grey[600]};
  border-radius: 13.5px;
  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
`

export default AdvancedSwapDetailsDropdown
