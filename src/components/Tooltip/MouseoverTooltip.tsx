import React, { useCallback, useState } from 'react'
import Tooltip from '.'
import { TooltipProps } from './Tooltip'

const MouseoverTooltip: React.FC<Omit<TooltipProps, 'show'>> = ({ children, ...rest }) => {
  const [show, setShow] = useState(false)
  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])
  return (
    <Tooltip {...rest} show={show}>
      <div onMouseEnter={open} onMouseLeave={close}>
        {children}
      </div>
    </Tooltip>
  )
}

export default MouseoverTooltip
