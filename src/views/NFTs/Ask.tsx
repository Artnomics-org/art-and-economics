import React from 'react'
import { RouteComponentProps } from 'react-router'
import Page from '../../components/Page'

type AskProps = {
  id: string
}

const Ask: React.FC<RouteComponentProps<AskProps>> = ({
  match: {
    params: { id },
  },
}) => {
  return (
    <Page>
      <>{id}</>
    </Page>
  )
}

export default Ask
