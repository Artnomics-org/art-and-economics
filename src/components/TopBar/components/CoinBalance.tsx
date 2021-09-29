import React from 'react'
import styled from 'styled-components/macro'
import { ANE } from '../../../constants/lists'
import { useWalletModalToggle } from '../../../hooks/application'
import { useTokenBalance } from '../../../hooks/token'
import { useActiveWeb3React } from '../../../hooks/wallet'
import { getDisplayChainName } from '../../../utils'

const CoinBalance: React.FC = () => {
  const toggleWalletModal = useWalletModalToggle()
  const { account, chainId } = useActiveWeb3React()
  const balance = useTokenBalance(account, ANE)
  return (
    <StyledWrapper>
      {!account && <StyledConnectButton onClick={toggleWalletModal}>Connect</StyledConnectButton>}
      {account && (
        <>
          <StyledChainName onClick={toggleWalletModal}>{getDisplayChainName(chainId)}</StyledChainName>
          <StyledBalance>{balance?.toSignificant(2) || 0} ANE</StyledBalance>
        </>
      )}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 48px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    margin-right: 24px;
  }
`

const StyledBalanceBase = styled.div`
  color: ${(props) => props.theme.color.nav.def};
  border: solid 2px ${(props) => props.theme.color.nav.def};
  font-weight: normal;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 16px;
  text-transform: uppercase;
  line-height: 1;
  padding: 4px 0;
  min-width: 160px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    border-width: 1px;
    min-width: 140px;
  }
`

const StyledChainName = styled(StyledBalanceBase)`
  font-size: 10px;
  min-width: auto;
  border-radius: 14px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 18px;
  margin-right: -12px;
  user-select: none;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    display: none;
  }
`

const StyledBalance = styled(StyledBalanceBase)`
  border-radius: 14px;
  text-align: right;
  padding-right: 16px;
`

const StyledConnectButton = styled(StyledBalanceBase)`
  text-align: center;
  outline: none;
  cursor: pointer;
`

export default CoinBalance
