/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Context from './context'

import { Accelerators as supportedAccelerators } from '../../constants/accelerators'
import { Accelerator } from './types'
import { useActiveWeb3React } from '../../hooks/wallet'

const Accelerators: React.FC = ({ children }) => {
  const { chainId } = useActiveWeb3React()

  const accelerators: Array<Accelerator> = supportedAccelerators
    .filter((accelerator) => (accelerator.addresses as any)[chainId])
    .map(({ addresses, poolAddresses, symbol }: any) => ({
      address: addresses[chainId],
      poolAddress: poolAddresses[chainId],
      symbol,
    }))

  return <Context.Provider value={{ accelerators }}>{children}</Context.Provider>
}

export default Accelerators
