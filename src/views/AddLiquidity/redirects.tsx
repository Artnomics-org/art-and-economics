import React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import AddLiquidity from './AddLiquidity'

interface RedirectDuplicateTokenIdsProps {
  currencyIdA: string
  currencyIdB: string
}

export const RedirectDuplicateTokenIds: React.FC<RouteComponentProps<RedirectDuplicateTokenIdsProps>> = (props) => {
  const {
    match: {
      params: { currencyIdA, currencyIdB },
    },
  } = props
  if (currencyIdA.toLowerCase() === currencyIdB.toLowerCase()) {
    return <Redirect to={`/add/${currencyIdA}`} />
  }
  return <AddLiquidity {...props} />
}
