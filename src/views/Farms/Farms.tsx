import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from './components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import Farm from '../Farm'

import FarmCards from './components/FarmCards'
import { useActiveWeb3React } from '../../hooks/wallet'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useActiveWeb3React()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {account ? (
          <>
            <Route exact path={path}>
              <PageHeader title="Stake tokens to stack BEST" subtitle="" />
              <FarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm />
            </Route>
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPresentWalletProviderModal}
              text="🔓 Unlock Wallet"
            />
          </div>
        )}
      </Page>
    </Switch>
  )
}

export default Farms
