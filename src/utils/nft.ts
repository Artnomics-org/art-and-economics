import { MediaFactory } from '../constants/nfts/MediaFactory'
import { Decimal } from './decimal'
import { BigNumberish, providers, Signer, utils } from 'ethers'
import type { MintAndTransferParameters } from '../types/MintAndTransfer'
import { Media } from '../constants/nfts/Media'
import { MEDIA_ADDRESS } from '../constants/address'
import { ChainId } from '@haneko/uniswap-sdk'

/**
 * 铸 Media 币
 * @param tokenURI 内容的链接
 * @param metadataURI 元数据的链接
 * @param contentHash 内容文件的哈希
 * @param metadataHash 元数据文件的哈希
 * @param creatorShare 创造者的分成百分比数，数值范围 [0, 100]
 * @param chainId 当前 Chain id
 * @param wallet Web3 Provider 里的 Signer
 */
export async function mintMediaToken(
  tokenURI: string,
  metadataURI: string,
  contentHash: string,
  metadataHash: string,
  creatorShare: number,
  chainId: ChainId,
  wallet: Signer,
) {
  checkParameters(tokenURI, metadataURI, contentHash, metadataHash, creatorShare)

  const media = MediaFactory.connect(MEDIA_ADDRESS[chainId], wallet)

  console.log('Minting NFT... ', tokenURI, contentHash, metadataURI, metadataHash)
  const mediaData = {
    tokenURI: tokenURI,
    metadataURI: metadataURI,
    contentHash: Uint8Array.from(Buffer.from(contentHash, 'hex')),
    metadataHash: Uint8Array.from(Buffer.from(metadataHash, 'hex')),
  }

  const bidShare = {
    prevOwner: Decimal.new(0),
    creator: Decimal.new(creatorShare),
    owner: Decimal.new(100 - creatorShare),
  }

  try {
    const estimatedGas = await media.estimateGas.mint(mediaData, bidShare)
    return media.mint(mediaData, bidShare, { gasLimit: estimatedGas })
  } catch (error) {
    console.debug('Gas estimate failed, trying eth_call to extract error', error)
    return new Promise<void>((resolve, reject) => {
      media.callStatic
        .mint(mediaData, bidShare)
        .then((res) => resolve(res))
        .catch((callError) => {
          // if ()
          console.debug('Mint Call threw error', callError)
          let errorMessage: string
          switch (callError.reason) {
            case 'Media: a token has already been created with this content hash':
              errorMessage =
                'This transaction will not succeed because a token has already been created with this content hash'
              break
            case 'Media: specified uri must be non-empty':
              errorMessage = 'This transaction will not succeed because Media URI is empty'
              break
            default:
              errorMessage = `The transaction cannot succeed due to error: ${callError.reason}. This is probably an issue with one of the tokens you are swapping.`
          }
          reject(errorMessage)
        })
    })
  }
}

export async function GenerateCreationSignature(
  tokenURI: string,
  metadataURI: string,
  contentHash: string,
  metadataHash: string,
  to: string,
  creatorShare: number,
  chainId: ChainId.BSC_MAINNET,
  wallet: providers.JsonRpcSigner,
): Promise<MintAndTransferParameters> {
  checkParameters(tokenURI, metadataURI, contentHash, metadataHash, creatorShare)

  if (!utils.isAddress(to)) {
    throw new Error('Bad `to`, please contact team ASAP.')
  }

  const media = MediaFactory.connect(MEDIA_ADDRESS[chainId], wallet)

  console.log('Minting by signing... ', tokenURI, contentHash, metadataURI, metadataHash)
  const { signer, sig } = await signMintWithSig(wallet, media, media.address, {
    contentHash: contentHash,
    metadataHash: metadataHash,
    creatorShare: Decimal.new(creatorShare).value,
    to,
  })

  return {
    creator: signer,
    data: {
      tokenURI: tokenURI,
      metadataURI: metadataURI,
      contentHash: '0x' + Buffer.from(contentHash, 'hex').toString('hex'),
      metadataHash: '0x' + Buffer.from(metadataHash, 'hex').toString('hex'),
    },
    bidShares: {
      // I fxxking hate Zora's Decimal lib
      prevOwner: { value: Decimal.new(0).value.toHexString() },
      creator: { value: Decimal.new(creatorShare).value.toHexString() },
      owner: { value: Decimal.new(100 - creatorShare).value.toHexString() },
    },
    to,
    sig,
  }
}

export function checkParameters(
  tokenURI: string,
  metadataURI: string,
  contentHash: string,
  metadataHash: string,
  creatorShare: number,
) {
  if (!tokenURI) {
    throw new Error('--tokenURI token URI is required')
  }
  if (!metadataURI) {
    throw new Error('--metadataURI metadata URI is required')
  }
  if (!contentHash) {
    throw new Error('--contentHash content hash is required')
  }
  if (!metadataHash) {
    throw new Error('--metadataHash content hash is required')
  }
  if (!creatorShare && creatorShare !== 0) {
    throw new Error('--creatorShare creator share is required')
  }
  if (creatorShare < 0 || creatorShare > 100) {
    throw new Error('--creatorShare creator share range is [0, 100]')
  }
}

// export async function sendPermitToMint(
//   media: Media,
//   data: MintAndTransferParameters
// ) {
//   const res = await media.mintAndTransferWithSig(
//     data.creator,
//     data.data,
//     data.bidShares,
//     data.to,
//     data.sig
//   );
// }

export function getDeadline(days: number) {
  //          Now            + sec + min + hour * days
  return Math.floor(Date.now() / 1000) + 3600 * 24 * days
}

type MintAndTransferWithSig = {
  contentHash: string
  metadataHash: string
  creatorShare: BigNumberish
  to: string
}

export async function signMintWithSig(
  wallet: providers.JsonRpcSigner,
  media: Media,
  verifyingContract: string,
  data: MintAndTransferWithSig,
) {
  const deadline = getDeadline(365)
  const [signerWallet, chainId, contractName] = await Promise.all([
    wallet.getAddress(),
    wallet.getChainId(),
    media.name(),
  ])
  console.info('data', data)
  const finalData = {
    ...data,
    contentHash: '0x' + data.contentHash,
    metadataHash: '0x' + data.metadataHash,
    // contentHash: Uint8Array.from(Buffer.from(data.contentHash, 'hex')),
    // metadataHash: Uint8Array.from(Buffer.from(data.metadataHash, 'hex')),
    deadline,
  }
  const result = await wallet._signTypedData(
    {
      name: contractName,
      version: '1',
      chainId,
      verifyingContract,
    },
    {
      MintWithSig: [
        { name: 'contentHash', type: 'bytes32' },
        { name: 'metadataHash', type: 'bytes32' },
        { name: 'creatorShare', type: 'uint256' },
        { name: 'to', type: 'address' },
        { name: 'deadline', type: 'uint256' },
      ],
    },
    finalData,
  )
  const { r, s, v } = utils.splitSignature(result)
  return { sig: { r, s, v, deadline }, signer: signerWallet }
}
