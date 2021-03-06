import { Placement } from '@popperjs/core'
import React, { useCallback, useState } from 'react'
import { usePopper } from 'react-popper'
import Portal from '@reach/portal'
import styled from 'styled-components/macro'
import { transparentize } from 'polished'
import { useInterval } from '../../hooks'

export interface PopoverProps {
  content: React.ReactNode
  show: boolean
  placement?: Placement
}

const Popover: React.FC<PopoverProps> = ({ content, show, children, placement = 'auto' }) => {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const { styles, update, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [8, 8] } },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  })
  const updateCallback = useCallback(() => {
    update && update()
  }, [update])
  useInterval(updateCallback, show ? 100 : null)

  return (
    <Container>
      <ReferenceElement ref={setReferenceElement}>{children}</ReferenceElement>
      <Portal>
        <PopoverContainer show={show} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          {content}
          <Arrow
            className={`arrow-${attributes.popper?.['data-popper-placement'] ?? ''}`}
            ref={setArrowElement}
            style={styles.arrow}
            {...attributes.arrow}
          />
        </PopoverContainer>
      </Portal>
    </Container>
  )
}

const Container = styled.div`
  line-height: 0;
`

const ReferenceElement = styled.div`
  display: inline-block;
`

const PopoverContainer = styled.div<{ show: boolean }>`
  z-index: 9999;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;
  background: ${({ theme }) => theme.color.bg};
  border: 1px solid ${({ theme }) => theme.color.grey[500]};
  box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.9, theme.color.grey[600])};
  color: ${({ theme }) => theme.color.text[500]};
  border-radius: 6px;
`

const Arrow = styled.div`
  width: 8px;
  height: 8px;
  z-index: 9998;
  ::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: 9998;
    content: '';
    border: 1px solid ${({ theme }) => theme.color.grey[500]};
    transform: rotate(45deg);
    background: ${({ theme }) => theme.color.bg};
  }
  &.arrow-top {
    bottom: -5px;
    ::before {
      border-top: none;
      border-left: none;
    }
  }
  &.arrow-bottom {
    top: -5px;
    ::before {
      border-bottom: none;
      border-right: none;
    }
  }
  &.arrow-left {
    right: -5px;
    ::before {
      border-bottom: none;
      border-left: none;
    }
  }
  &.arrow-right {
    left: -5px;
    ::before {
      border-right: none;
      border-top: none;
    }
  }
`

export default Popover
