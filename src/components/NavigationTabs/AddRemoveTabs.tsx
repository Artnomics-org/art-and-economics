import React from 'react'
import QuestionHelper from '../QuestionHelper'
import { BackIconLink } from '../Link'
import { Tabs, ActiveText } from './styleds'

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
      <BackIconLink to='/pool' />
      <ActiveText>{creating ? 'Create A Pair' : adding ? 'Add Liquidity' : 'Remove Liquidity'}</ActiveText>
      <QuestionHelper text={adding ? addText : removeText} />
    </Tabs>
  )
}

export default AddRemoveTabs
