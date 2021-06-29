import React, { useEffect } from 'react'
import chef from '../../assets/img/chef.png'

import Page from '../../components/Page'
import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'
import { useActiveWeb3React } from '../../hooks/wallet'

const Farm: React.FC = () => {
  const { account } = useActiveWeb3React()
  // const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Page>
      {!!account ? (
        <>
          <PageHeader
            icon={<img src={chef} height="120" />}
            title="Stake Sushi Tokens & Earn Fees"
            subtitle="0.05% of all SushiSwap trades are rewarded to SUSHI stakers"
          />
          {/* <FarmCards /> */}
          <div>TBD</div>
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
            // onClick={onPresentWalletProviderModal}
            text="🔓 Unlock Wallet"
          />
        </div>
      )}
    </Page>
  )
}

export default Farm
