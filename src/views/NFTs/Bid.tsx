import React from 'react'
import { RouteComponentProps } from 'react-router'
import Page from '../../components/Page'

type BidProps = {
  id: string
}

const Bid: React.FC<RouteComponentProps<BidProps>> = ({
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

export default Bid
