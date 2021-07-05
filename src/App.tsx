import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ThemeProvider } from 'styled-components/macro'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { Provider as ReduxProvider } from 'react-redux'
import FarmsProvider from './contexts/Farms'
import TransactionProvider from './contexts/Transactions'
import NFTsProvider from './contexts/NFTs'
import AcceleratorsProvider from './contexts/Accelerators'

import { getLibrary } from './utils'
import { NetworkContextName } from './constants'
import store from './state'
import theme from './theme'
import Web3ReactManager from './components/Web3ReactManager'
import { useAppInactiveListener } from './hooks/connector'

import { ApplicationUpdater } from './updaters/application'
import { ListsUpdater } from './updaters/lists'
import { MulticallUpdater } from './updaters/multicall'
import { UserUpdater } from './updaters/user'

import Farms from './views/Farms'
import Home from './views/Home'
import NFTs from './views/NFTs'
import Swap from './views/Swap'
import Pool from './views/Pool'
import AddLiquidity from './views/AddLiquidity'
import { RedirectDuplicateTokenIds } from './views/AddLiquidity/redirects'


const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const App: React.FC = () => {
  return (
    <Providers>
      <Updaters />
      <Routers />
    </Providers>
  )
}

const Routers: React.FC = () => {
  useAppInactiveListener()

  return (
    <Web3ReactManager>
      <Router>
        <Switch>
          <Route exact strict path="/" component={Home} />
          <Route exact strict path="/home" component={Home} />
          <Route exact strict path="/swap" component={Swap} />
          <Route exact strict path="/pool" component={Pool} />
          <Route exact strict path="/farm" component={Farms} />
          <Route exact strict path="/market" component={NFTs} />
          <Route exact path="/add" component={AddLiquidity} />
          <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
          <Route exact path="/create" component={AddLiquidity} />
          <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
        </Switch>
      </Router>
    </Web3ReactManager>
  )
}

const Updaters: React.FC = () => {
  return (
    <>
      <ListsUpdater />
      <UserUpdater />
      <ApplicationUpdater />
      <MulticallUpdater />
    </>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <ReduxProvider store={store}>
            <TransactionProvider>
              <FarmsProvider>
                <NFTsProvider>
                  <AcceleratorsProvider>{children}</AcceleratorsProvider>
                </NFTsProvider>
              </FarmsProvider>
            </TransactionProvider>
          </ReduxProvider>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </ThemeProvider>
  )
}

export default App
