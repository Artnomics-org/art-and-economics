/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Context } from '../NFTs'
import { NFTs as supportedNFTs } from '../../constants/nft'
import { NFT } from './types'
import { useActiveWeb3React } from '../../hooks/wallet'

const NFTs: React.FC = ({ children }) => {
  const { chainId } = useActiveWeb3React()

  const nfts: Array<NFT> = supportedNFTs
    .filter((nft) => (nft.addresses as any)[chainId])
    .map(({ addresses, name, symbol }: any) => ({
      address: addresses[chainId],
      name,
      symbol,
    }))

  return <Context.Provider value={{ nfts }}>{children}</Context.Provider>
}

export default NFTs
