import React from 'react'
import { ImportPoolTabs } from '../../components/NavigationTabs'
import Page from '../../components/Page'
import { PageCard, Wrapper } from '../AddLiquidity/components/styleds'

const FindPool: React.FC = () => {
  return (
    <Page>
      <PageCard>
        <ImportPoolTabs />
        <Wrapper></Wrapper>
      </PageCard>
    </Page>
  )
}

export default FindPool
