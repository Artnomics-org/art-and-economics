import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components/macro'
import { UseWalletProvider } from 'use-wallet'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import NFTsProvider from './contexts/NFTs'
import AcceleratorsProvider from './contexts/Accelerators'
import theme from './theme'
import Farms from './views/Farms'
import Home from './views/Home'
import Shop from './views/Shop'
import NFTs from './views/NFTs'
import Referral from './views/Referral'

const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <Switch>
          <Route exact strict path="/" component={Home} />
          <Route exact strict path="/home" component={Home} />
          <Route exact strict path="/swap" component={Referral} />
          <Route exact strict path="/pool" component={Shop} />
          <Route exact strict path="/farm" component={Farms} />
          <Route exact strict path="/market" component={NFTs} />
        </Switch>
      </Router>
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={56}
        connectors={{
          walletconnect: { rpcUrl: 'https://bsc-dataseed.binance.org/' },
        }}
      >
        <TransactionProvider>
          <FarmsProvider>
            <NFTsProvider>
              <AcceleratorsProvider>
                <ModalsProvider>{children}</ModalsProvider>
              </AcceleratorsProvider>
            </NFTsProvider>
          </FarmsProvider>
        </TransactionProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

export default App
