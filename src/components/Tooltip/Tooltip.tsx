import React from 'react'
import styled from 'styled-components/macro'
import Popover from '../Popover'
import { PopoverProps } from '../Popover/Popover'

interface TooltipProps extends Omit<PopoverProps, 'content'> {
  text: string
}

const Tooltip: React.FC<TooltipProps> = ({ text, ...rest }) => {
  return <Popover content={<TooltipContainer>{text}</TooltipContainer>} {...rest} />
}

const TooltipContainer = styled.div`
  width: 228px;
  padding: 0.6rem 1rem;
  line-height: 150%;
  font-weight: 400;
`

export default Tooltip
