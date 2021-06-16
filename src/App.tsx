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
import VestNFT from './views/VestNFT'
import MyNFT from './views/MyNFT'

const App: React.FC = () => {
  return (
    <Providers>
      <Router basename={'farm'}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/farms">
            <Farms />
          </Route>
          <Route path="/vestnft">
            <VestNFT />
          </Route>
          <Route path="/mynft">
            <MyNFT />
          </Route>
          <Route path="/referral">
            <Referral />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/nfts">
            <NFTs />
          </Route>
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
