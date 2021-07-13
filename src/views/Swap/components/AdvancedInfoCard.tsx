import React from 'react'
import { animated, useTransition } from 'react-spring'
import styled from 'styled-components/macro'
import { AutoColumn } from '../../../components/Column'

interface AdvancedInfoCardProps {
  isShow: boolean
  mobile?: boolean
}
const AdvancedInfoCard: React.FC<AdvancedInfoCardProps> = ({ isShow, mobile = false, children }) => {
  const transitions = useTransition(isShow, {
    config: { duration: 200 },
    from: { opacity: 0, left: '20px' },
    enter: { opacity: 1, left: '20px' },
    leave: { opacity: 0 , left: '-120%'},
  })
  return (
    <>
      {transitions((style, item, props, key) => item && (
        <AdvancedInfoCardWrapper key={key} style={style} mobile={mobile ? mobile : undefined}>
          <AutoColumn gap='20px'>
            {children}
          </AutoColumn>
        </AdvancedInfoCardWrapper>
      ))}
    </>
  )
}

const AdvancedInfoCardWrapper = styled(animated.div)<{ mobile?: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.bg};
  border: 2px solid ${({ theme }) => theme.color.grey[600]};
  border-radius: 13.5px;
  overflow-y: ${({ mobile }) => (mobile ? 'scroll' : 'hidden')};
  overflow-x: hidden;
  align-self: ${({ mobile }) => (mobile ? 'flex-end' : 'center')};
  max-width: 420px;
  max-height: 60vh;
`

export default AdvancedInfoCard
