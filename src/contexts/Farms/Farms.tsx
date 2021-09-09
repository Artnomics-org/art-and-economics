/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Pools } from '../../constants/pools'
import { useActiveWeb3React } from '../../hooks/wallet'

// import { bnToDec } from '../../utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const { chainId } = useActiveWeb3React()

  const farms: Array<Farm> = Pools.filter((pool) => (pool.poolAddresses as any)[chainId]).map(
    (
      {
        poolAddresses,
        name,
        symbol,
        tokenSymbol,
        stakingTokenAddresses,
        acceleratorAddresses,
        isWBNB,
        isLp,
        icon,
        nftSymbol,
        magnification,
      }: any,
      index,
    ) => ({
      pid: index,
      id: symbol.replace('/', '-'),
      name,
      poolAddress: poolAddresses[chainId],
      stakingToken: symbol,
      stakingTokenAddress: stakingTokenAddresses[chainId],
      acceleratorAddress: acceleratorAddresses?.[chainId],
      tokenSymbol,
      earnToken: 'best',
      isLp,
      earnTokenAddress: '0x10747e2045a0ef884a0586AC81558F43285ea3c7',
      isWBNB,
      icon,
      nftSymbol: nftSymbol ?? '',
      magnification,
    }),
  )

  return (
    <Context.Provider
      value={{
        farms,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
