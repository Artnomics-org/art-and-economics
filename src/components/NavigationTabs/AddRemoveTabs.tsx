import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { ArrowLeft as ArrowLeftIcon } from 'react-feather'
import QuestionHelper from '../QuestionHelper'

interface AddRemoveTabsProps {
  adding: boolean
  creating: boolean
}

const AddRemoveTabs: React.FC<AddRemoveTabsProps> = ({ adding, creating }) => {
  const addText =
    'When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.'
  const removeText =
    'Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.'

  return (
    <Tabs>
      <HistoryLink to="/pool">
        <ArrowLeft />
      </HistoryLink>
      <ActiveText>{creating ? 'Create A Pair' : adding ? 'Add Liquidity' : 'Remove Liquidity'}</ActiveText>
      <QuestionHelper text={adding ? addText : removeText} />
    </Tabs>
  )
}

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
`

const HistoryLink = styled(Link)`
  display: inline-block;
  line-height: 0;
`

const ArrowLeft = styled(ArrowLeftIcon)`
  color: ${({ theme }) => theme.color.text[500]};
`

const ActiveText = styled.div`
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 20px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.text[500]};
`

export default AddRemoveTabs
