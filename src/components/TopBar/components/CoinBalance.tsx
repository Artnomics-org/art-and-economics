import React from 'react'
import styled from 'styled-components/macro'
import { ANE } from '../../../constants/lists'
import { useWalletModalToggle } from '../../../hooks/application'
import { useTokenBalance } from '../../../hooks/token'
import { useActiveWeb3React } from '../../../hooks/wallet'

const CoinBalance: React.FC = () => {
  const toggleWalletModal = useWalletModalToggle()
  const { account } = useActiveWeb3React()
  const balance = useTokenBalance(account, ANE)
  return (
    <>
      {!account && <StyledConnectButton onClick={toggleWalletModal}>Connect</StyledConnectButton>}
      {account && <StyledBalance>{balance?.toSignificant(2) || 0} ANE</StyledBalance>}
    </>
  )
}

const StyledBalance = styled.div`
  color: ${(props) => props.theme.color.nav.def};
  font-weight: normal;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 20px;
  min-width: 160px;
  border-radius: 14px;
  border: solid 2px ${(props) => props.theme.color.nav.def};
  text-transform: uppercase;
  text-align: right;
  padding-right: 16px;
`

const StyledConnectButton = styled.button`
  color: ${(props) => props.theme.color.nav.def};
  border: solid 2px ${(props) => props.theme.color.nav.def};
  font-weight: normal;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 20px;
  min-width: 160px;
  text-align: center;
  text-transform: uppercase;
  outline: none;
  cursor: pointer;
`

export default CoinBalance
