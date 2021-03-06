import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'styled-components/macro'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { Provider as ReduxProvider } from 'react-redux'

import { getLibrary } from './utils/ethers'
import { NetworkContextName } from './constants'
import store from './state'
import theme from './theme'
import Web3ReactManager from './components/Web3ReactManager'
import { useAppInactiveListener } from './hooks/connector'

import { ApplicationUpdater } from './updaters/application'
import { ListsUpdater } from './updaters/lists'
import { MulticallUpdater } from './updaters/multicall'
import { UserUpdater } from './updaters/user'

import NFTs from './views/NFTs'
import Swap from './views/Swap'
import Pool from './views/Pool'
import AddLiquidity from './views/AddLiquidity'
import FindPool from './views/FindPool'
import { RedirectDuplicateTokenIds } from './views/AddLiquidity/redirects'
import { RedirectPathToHome } from './views/Home/redirects'
import NFTView from './views/NFTs/NFTView'
import Create from './views/NFTs/Create'
import Register from './views/NFTs/Register'
import UserEdit from './views/NFTs/UserEdit'
import UserView from './views/NFTs/User'
import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects'
import { RemoveLiquidity } from './views/RemoveLiquidity'
import Ask from './views/NFTs/Ask'
import Bid from './views/NFTs/Bid'
import Bids from './views/NFTs/Bids'

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
          <Route exact strict path="/" component={Swap} />
          <Route exact strict path="/swap" component={Swap} />
          <Route exact strict path="/pool" component={Pool} />
          <Route exact strict path="/find" component={FindPool} />
          <Route exact strict path="/market" component={NFTs} />
          <Route exact strict path="/market/new" component={Create} />
          <Route exact strict path="/register" component={Register} />
          <Route exact strict path="/user/edit" component={UserEdit} />

          <Route exact path="/add" component={AddLiquidity} />
          <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
          <Route exact path="/create" component={AddLiquidity} />
          <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
          <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
          <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
          <Route exact path="/market/:id" component={NFTView} />
          <Route exact path="/market/:id/bids" component={Bids} />
          <Route exact path="/market/:id/bid" component={Bid} />
          <Route exact path="/market/:id/ask" component={Ask} />
          <Route exact path="/user/:name" component={UserView} />
          <Route component={RedirectPathToHome} />
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
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <ReduxProvider store={store}>{children}</ReduxProvider>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default App
