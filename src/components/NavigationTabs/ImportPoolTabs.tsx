import React from 'react'
import { BackIconLink } from '../Link'
import QuestionHelper from '../QuestionHelper'
import { Tabs, ActiveText } from './styleds'

const ImportPoolTabs: React.FC = () => {
  const findText = "Use this tool to find pairs that don't automatically appear in the interface."

  return (
    <Tabs>
      <BackIconLink to="/pool" />
      <ActiveText>Import Pool</ActiveText>
      <QuestionHelper text={findText} />
    </Tabs>
  )
}

export default ImportPoolTabs
