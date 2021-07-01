import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
// import PageHeader from './components/PageHeader'
import Spacer from '../../components/Spacer'
import useFarm from '../../hooks/useFarm'
import { getERC20Contract } from '../../utils/ethers'
import Harvest from './components/Harvest'
import Stake from './components/Stake'
import TokenIcon from './components/TokenIcon'
import { useActiveWeb3React } from '../../hooks/wallet'

const Farm: React.FC = () => {
  const { farmId } = useParams<{ farmId?: string}>()
  const {
    pid,
    stakingToken,
    stakingTokenAddress,
    earnToken,
    isWBNB,
    icon,
  } = useFarm(farmId) || {
    pid: 0,
    stakingToken: '',
    stakingTokenAddress: '',
    earnToken: '',
    name: '',
    isWBNB: false,
  }

  const [imagePath, setImagePath ] = useState('')
  const loadTokenImage = (name: string): void => {
    setImagePath(name)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    loadTokenImage(icon)
  }, [icon])

  // const sushi = useSushi()
  const { library: ethereum } = useActiveWeb3React()

  const lpContract = useMemo(() => {
    return getERC20Contract(stakingTokenAddress, ethereum)
  }, [ethereum, stakingTokenAddress])

  // const { onRedeem } = useRedeem(getMasterChefContract(sushi))

  const lpTokenName = useMemo(() => {
    return stakingToken.toUpperCase()
  }, [stakingToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  return (
    <>
      {/* <PageHeader
        icon={<TokenIcon path={imagePath} />}
        title={`Deposit ${lpTokenName} Tokens and earn ${earnTokenName}`}
      /> */}
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest pid={pid} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake
              pid={pid}
              lpContract={lpContract}
              tokenName={stakingToken.toUpperCase()}
              isWBNB={isWBNB}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

// const StyledInfo = styled.h3`
//   color: ${(props) => props.theme.color.grey[400]};
//   font-size: 16px;
//   font-weight: 400;
//   margin: 0;
//   padding: 0;
//   text-align: center;
// `

export default Farm
