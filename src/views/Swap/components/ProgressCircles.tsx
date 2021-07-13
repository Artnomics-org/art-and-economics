import React from 'react'
import styled from 'styled-components/macro'
import { AutoColumn } from '../../../components/Column'
import { RowBetween } from '../../../components/Row'

interface ProgressCirclesProps {
  steps: boolean[]
  disabled?: boolean
}

/**
 * Based on array of steps, create a step counter of circles.
 * A circle can be enabled, disabled, or confirmed. States are derived
 * from previous step.
 *
 * An extra circle is added to represent the ability to swap, add, or remove.
 * This step will never be marked as complete (because no 'txn done' state in body ui).
 *
 * @param steps  array of booleans where true means step is complete
 */
const ProgressCircles: React.FC<ProgressCirclesProps> = ({ steps, disabled = false, ...rest }) => {
  return (
    <Wrapper justify={'center'} {...rest}>
      <Grouping>
        {steps.map((step, i) => {
          return (
            <CircleRow key={i}>
              <Circle confirmed={step} disabled={disabled || (!steps[i - 1] && i !== 0)}>
                {step ? '✓' : i + 1}
              </Circle>
              <Connector prevConfirmed={step} disabled={disabled} />
            </CircleRow>
          )
        })}
        <Circle disabled={disabled || !steps[steps.length - 1]}>{steps.length + 1}</Circle>
      </Grouping>
    </Wrapper>
  )
}

const Wrapper = styled(AutoColumn)``

const Grouping = styled(RowBetween)`
  width: 50%;
`

const Circle = styled.div<{ confirmed?: boolean; disabled?: boolean }>`
  min-width: 20px;
  min-height: 20px;
  background-color: ${({ theme, confirmed, disabled }) =>
    disabled ? theme.color.bg : confirmed ? theme.color.green[500] : theme.color.bg};
  border-radius: 50%;
  color: ${({ theme }) => theme.color.text[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 8px;
  font-size: 12px;
`

const CircleRow = styled.div`
  width: calc(100% - 20px);
  display: flex;
  align-items: center;
`

const Connector = styled.div<{ prevConfirmed?: boolean; disabled?: boolean }>`
  width: 100%;
  height: 2px;
  opacity: 0.6;
`

export default ProgressCircles
