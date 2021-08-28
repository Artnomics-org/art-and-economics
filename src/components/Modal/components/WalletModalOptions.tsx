import { AbstractConnector } from '@web3-react/abstract-connector'
import React from 'react'
import { injected } from '../../../connectors'
import { SUPPORTED_WALLETS } from '../../../constants'
import WalletModalOption from './WalletModalOption'
import { isMobile } from 'react-device-detect'
import MetamaskIcon from '../../../assets/img/wallet/metamask.png'

interface WalletModalOptionsProps {
  WALLET_VIEWS: Record<string, string>
  connector: AbstractConnector
  tryActivation: (connector: AbstractConnector | undefined) => Promise<void>
  setWalletView: React.Dispatch<React.SetStateAction<string>>
}

const WalletModalOptions: React.FC<WalletModalOptionsProps> = ({
  connector,
  WALLET_VIEWS,
  setWalletView,
  tryActivation,
}) => {
  const isMetamask = window.ethereum && window.ethereum.isMetaMask

  const elements = Object.keys(SUPPORTED_WALLETS).map((key) => {
    const option = SUPPORTED_WALLETS[key]
    // check for mobile options
    if (isMobile) {
      //disable portis on mobile for now
      // if (option.connector === portis) {
      //   return null
      // }

      if (!window.web3 && !window.ethereum && option.mobile) {
        return (
          <WalletModalOption
            onClick={() => {
              option.connector !== connector && !option.href && tryActivation(option.connector)
            }}
            id={`connect-${key}`}
            key={key}
            active={option.connector && option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null}
            icon={require('../../../assets/img/wallet/' + option.iconName)}
          />
        )
      }
      return null
    }

    // overwrite injected when needed
    if (option.connector === injected) {
      // don't show injected if there's no injected provider
      if (!(window.web3 || window.ethereum)) {
        if (option.name === 'MetaMask') {
          return (
            <WalletModalOption
              id={`connect-${key}`}
              key={key}
              color={'#E8831D'}
              header={'Install Metamask'}
              subheader={null}
              link={'https://metamask.io/'}
              icon={MetamaskIcon}
            />
          )
        } else {
          return null //dont want to return install twice
        }
      }
      // don't return metamask if injected provider isn't metamask
      else if (option.name === 'MetaMask' && !isMetamask) {
        return null
      }
      // likewise for generic
      else if (option.name === 'Injected' && isMetamask) {
        return null
      }
    }

    // return rest of options
    return (
      !isMobile &&
      !option.mobileOnly && (
        <WalletModalOption
          id={`connect-${key}`}
          onClick={() => {
            option.connector === connector
              ? setWalletView(WALLET_VIEWS.ACCOUNT)
              : !option.href && tryActivation(option.connector)
          }}
          key={key}
          active={option.connector === connector}
          color={option.color}
          link={option.href}
          header={option.name}
          subheader={null} //use option.descriptio to bring back multi-line
          icon={require('../../../assets/img/wallet/' + option.iconName)}
        />
      )
    )
  })

  return <>{elements}</>
}

export default WalletModalOptions
