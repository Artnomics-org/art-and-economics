import React, { useCallback } from 'react'
import { X } from 'react-feather'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { injected, walletconnect } from '../../connectors'
import { SUPPORTED_WALLETS } from '../../constants'
import { useActiveWeb3React } from '../../hooks/wallet'
import { AppDispatch } from '../../state'
import { clearAllTransactions } from '../../state/transactions/actions'
import { ButtonSecondary } from '../Button/ButtonSecondary'
import Identicon from '../Icon/Identicon'
import { ExternalLink } from '../Link'
import WalletConnectIcon from '../../assets/img/wallet/walletConnectIcon.svg'
import { shortenAddress } from '../../utils/ethers'
import { getScanLink } from '../../utils'
import { ExternalLink as LinkIcon } from 'react-feather'
import { AutoRow } from '../Row'
import CopyHelper from './CopyHelper'
import { LinkStyledButton } from '../Button'
import Transaction from './Transaction'

function renderTransactions(transactions: string[]) {
  return (
    <TransactionListWrapper>
      {transactions.map((hash, i) => {
        return <Transaction key={i} hash={hash} />
      })}
    </TransactionListWrapper>
  )
}

interface AccountDetailsProps {
  pendingTransactions: string[]
  confirmedTransactions: string[]
  ENSName?: string
  openOptions: () => void
  toggleWalletModal: () => void
}

const AccountDetails: React.FC<AccountDetailsProps> = ({
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  openOptions,
  toggleWalletModal,
}) => {
  const { chainId, account, connector } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  function formatConnectorName() {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK')),
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0]
    return <WalletName>Connected with {name}</WalletName>
  }

  function getStatusIcon() {
    if (connector === injected) {
      return (
        <IconWrapper size={16}>
          <Identicon />
        </IconWrapper>
      )
    } else if (connector === walletconnect) {
      return (
        <IconWrapper size={16}>
          <img src={WalletConnectIcon} alt="Wallet connect logo" />
        </IconWrapper>
      )
    }
    return null
  }

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])

  return (
    <>
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        <HeaderRow>Account</HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>
                {formatConnectorName()}
                <WalletAction
                  style={{ fontSize: '.825rem', fontWeight: 400 }}
                  onClick={() => {
                    openOptions()
                  }}
                >
                  Change
                </WalletAction>
              </AccountGroupingRow>
              <AccountGroupingRow id="web3-account-identifier-row">
                <AccountControl>
                  {getStatusIcon()}
                  {ENSName ? <p> {ENSName}</p> : <p> {account && shortenAddress(account)}</p>}
                </AccountControl>
              </AccountGroupingRow>
              <AccountGroupingRow>
                <AccountControl>
                  {account && (
                    <CopyHelper toCopy={account}>
                      <span style={{ marginLeft: '4px' }}>Copy Address</span>
                    </CopyHelper>
                  )}
                  {chainId && account && ENSName ? (
                    <AddressLink hasENS={!!ENSName} isENS={true} href={getScanLink(chainId, ENSName, 'address')}>
                      <LinkIcon size={16} />
                      <span style={{ marginLeft: '4px' }}>View on Bscscan</span>
                    </AddressLink>
                  ) : (
                    <AddressLink hasENS={!!ENSName} isENS={false} href={getScanLink(chainId, account, 'address')}>
                      <LinkIcon size={16} />
                      <span style={{ marginLeft: '4px' }}>View on Bscscan</span>
                    </AddressLink>
                  )}
                </AccountControl>
              </AccountGroupingRow>
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>
      {!!pendingTransactions.length || !!confirmedTransactions.length ? (
        <LowerSection>
          <AutoRow mb={'1rem'} style={{ justifyContent: 'space-between' }}>
            <Text>Recent Transactions</Text>
            <LinkStyledButton onClick={clearAllTransactionsCallback}>(Clear all)</LinkStyledButton>
          </AutoRow>
          {renderTransactions(pendingTransactions)}
          {renderTransactions(confirmedTransactions)}
        </LowerSection>
      ) : (
        <LowerSection>
          <Text>Your transactions will appear here...</Text>
        </LowerSection>
      )}
    </>
  )
}

const HeaderRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.color.grey[500] : 'inherit')};
`

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const InfoCard = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.grey[600]};
  border-radius: 6px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
`

const AccountGroupingRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.color.text[500]};

  div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
`

const AccountSection = styled.div`
  background-color: ${({ theme }) => theme.color.bg};
  padding: 0rem 1rem;
`

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`

const LowerSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 1.5rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.color.bg};
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 20px;

  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.color.text[500]};
  }
`

const AccountControl = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;

  font-weight: 500;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const AddressLink = styled(ExternalLink)<{ hasENS: boolean; isENS: boolean }>`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.color.text[400]};
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.color.text[500]};
  }
`

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(X)`
  path {
    stroke: ${({ theme }) => theme.color.text[400]};
  }
`

const WalletName = styled.div`
  width: initial;
  font-size: 0.825rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text[400]};
`

const IconWrapper = styled.div<{ size?: number }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

const TransactionListWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const WalletAction = styled(ButtonSecondary)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const Text = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.color.text[500]};
`

// const MainWalletAction = styled(WalletAction)`
//   color: ${({ theme }) => theme.primary1};
// `

export default AccountDetails
