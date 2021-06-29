import React from 'react'
import styled, { css } from 'styled-components/macro'
import { animated, useTransition, useSpring } from 'react-spring'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { isMobile } from 'react-device-detect'
import { transparentize } from 'polished'
import { useGesture } from 'react-use-gesture'
import '@reach/dialog/styles.css'

export interface ModalProps {
  isOpen: boolean
  onDismiss: () => void
  minHeight?: number | false
  maxHeight?: number
  initialFocusRef?: React.RefObject<unknown>
}

const Modal: React.FC<ModalProps> = ({ minHeight, maxHeight, isOpen, initialFocusRef, onDismiss, children }) => {
  const fadeTransition = useTransition(isOpen, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  const [{ y }, set] = useSpring(() => ({ y: 0, config: { mass: 1, tension: 210, friction: 20 } }))
  const bind = useGesture({
    onDrag: (state) => {
      set({
        y: state.down ? state.movement[1] : 0,
      })
      if (state.movement[1] > 300 || (state.velocity > 3 && state.direction[1] > 0)) {
        onDismiss()
      }
    },
  })
  const contentRes = isMobile
    ? {
        ...bind(),
        style: { transform: y.to((y) => `translateY(${y > 0 ? y : 0}px)`) },
      }
    : {}

  return (
    <>
      {fadeTransition(
        (style, item, prop, key) =>
          item && (
            <StyledDialogOverlay key={key} style={style} onDismiss={onDismiss} initialFocusRef={initialFocusRef}>
              <StyledDialogContent
                {...contentRes}
                aria-label="dialog content"
                minHeight={minHeight}
                maxHeight={maxHeight}
                mobile={isMobile}
              >
                {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                {children}
              </StyledDialogContent>
            </StyledDialogOverlay>
          ),
      )}
    </>
  )
}

const AnimatedDialogOverlay = animated(DialogOverlay)
const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    z-index: 2;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }
`

const AnimatedDialogContent = animated(DialogContent)
const StyledDialogContent = styled(({ minHeight, maxHeight, mobile, isOpen, ...rest }) => (
  <AnimatedDialogContent {...rest} />
)).attrs({
  'aria-label': 'dialog',
})`
  overflow-y: ${({ mobile }) => (mobile ? 'scroll' : 'hidden')};

  &[data-reach-dialog-content] {
    display: flex;
    margin: 0 0 2rem 0;
    padding: 0px;
    background-color: ${({ theme }) => theme.color.bg};
    border: 2px solid ${({ theme }) => theme.color.grey[600]};
    border-radius: 13.5px;
    box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.95, theme.color.grey[400])};
    overflow-y: ${({ mobile }) => (mobile ? 'scroll' : 'hidden')};
    overflow-x: hidden;
    align-self: ${({ mobile }) => (mobile ? 'flex-end' : 'center')};
    max-width: 420px;
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
  }
`

export default Modal
