import { useBoolean } from 'ahooks'
import { ethers, BigNumber, BigNumberish, BytesLike, utils } from 'ethers'
import { MaxUint256 } from '@ethersproject/constants'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { BaseErc20 } from '../../constants/nfts/BaseErc20'
import { MEDIA_ADDRESS, ZERO_ADDRESS } from '../../constants/address'
import { useActiveWeb3React } from '../wallet'
import { BaseErc20Factory } from '../../constants/nfts/BaseErc20Factory'
import { ERC20Profile, getProfileOfERC20 } from '../../utils/ethers'
import { getSigner } from '../../utils/ethers'
import { checkIsWalletRegistered, registerUser, loginWithPermit } from '../../backend/user'
import { User } from '../../types/User'
import { getCookie } from '../../utils/cookie'
import { IMarket, MarketFactory } from '../../constants/nfts/MarketFactory'
import { MARKET_ADDRESS } from '../../constants/address'
import { FunctionFragment } from '@ethersproject/abi'
import { MULTICALL_NETWORKS } from '../../constants/multicall'
import { Multicall__factory } from '../../constants/nfts/MulticallFactory'
import { MediaFactory } from '../../constants/nfts/MediaFactory'
import { axiosFetcher, backendSWRFetcher, getMediaMetadata } from '../../backend/media'
import { Decimal } from '../../utils/decimal'
import { Bid, DecimalValue } from '../../types/ContractTypes'
import { BidLog } from '../../types/Bid'
import { constructBid } from '../../utils/zdk'
import { WETH9__factory } from '../../constants/nfts/WETH9__factory'
import { WETH } from '@haneko/uniswap-sdk'
import { Media, MediaMetadata } from '../../types/Media'

export function useAllowance(token: BaseErc20, spender: string) {
  const { account } = useActiveWeb3React()
  const [allowance, setAllowance] = useState(BigNumber.from(0))
  const [isUnlocking, setUnlockStat] = useState(false)
  const { lastUpdated, updated } = useLastUpdated()

  const fetchAllowance = useCallback(async () => {
    if (account && spender !== ZERO_ADDRESS && token.address !== ZERO_ADDRESS) {
      const result = await token.allowance(account as string, spender)
      setAllowance(result)
      updated()
    }
  }, [account, spender, token, updated])
  /**
   * use Dan's example
   * https://github.com/facebook/react/issues/14326#issuecomment-441680293
   */
  useEffect(() => {
    if (account && spender !== ZERO_ADDRESS && token.address !== ZERO_ADDRESS) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 1000 * 10)
    return () => clearInterval(refreshInterval)
  }, [account, spender, fetchAllowance, token])

  const isEnough = useCallback((x: BigNumberish) => allowance.gte(x), [allowance])

  const approve = useCallback(
    async (value: BigNumber = MaxUint256) => {
      setUnlockStat(true)
      try {
        const txResp = await token.approve(spender, value)
        await txResp.wait()
        await fetchAllowance()
        //   setAllowance(value);
        setUnlockStat(false)
      } catch (error) {
        console.error('Error happened when trying to unlock', error)
        //   setAllowance(value);
        setUnlockStat(false)
      }
      return true
    },
    [token, spender, fetchAllowance],
  )

  return { allowance, isEnough, approve, lastUpdated, isUnlocking }
}

export function useBalance(token: BaseErc20) {
  const { account } = useActiveWeb3React()
  const [balance, setBalance] = useState(BigNumber.from(0))
  const { lastUpdated, updated } = useLastUpdated()

  const fetchBalance = useCallback(async () => {
    const result = await token.balanceOf(account as string)
    setBalance(result)
    updated()
  }, [token, account, updated])
  /**
   * use Dan's example
   * https://github.com/facebook/react/issues/14326#issuecomment-441680293
   */
  useEffect(() => {
    if (token.address === ZERO_ADDRESS) return
    if (account && token) {
      fetchBalance()
    }
    const refreshInterval = setInterval(fetchBalance, 1000 * 10)
    return () => clearInterval(refreshInterval)
  }, [account, fetchBalance, token])

  const isEnough = (x: BigNumberish) => balance.gte(x)

  return { balance, isEnough, lastUpdated }
}

export function useERC20(tokenAddress: string) {
  const { account, library } = useActiveWeb3React()
  const signer = getSigner(library, account)

  const token = useMemo(() => {
    if (!tokenAddress) return BaseErc20Factory.connect(ZERO_ADDRESS, library)
    if (!!signer) {
      return BaseErc20Factory.connect(tokenAddress, signer)
    } else {
      return BaseErc20Factory.connect(tokenAddress, library)
    }
  }, [tokenAddress, library, signer])

  const profileWhileLoading: ERC20Profile = useMemo(
    () => ({
      tokenAddress: ZERO_ADDRESS,
      name: 'Loading Token Profile',
      symbol: 'Please wait',
      decimals: 18, // most the token use 18 decimals
      balance: BigNumber.from(0),
      updatedAtBlock: 0,
    }),
    [],
  )

  const [tokenProfile, setTokenProfile] = useState<ERC20Profile>(profileWhileLoading)
  const resetProfileToLoading = useCallback(() => setTokenProfile(profileWhileLoading), [profileWhileLoading])
  const isProfileLoading = useMemo(() => tokenProfile.updatedAtBlock === 0, [tokenProfile])
  const formattedBalance = useMemo(() => utils.formatUnits(tokenProfile.balance, tokenProfile.decimals), [tokenProfile])

  const getProfile = useCallback(async () => {
    if (token.address === ZERO_ADDRESS) return
    resetProfileToLoading()
    const profile = await getProfileOfERC20(token, account)
    setTokenProfile(profile)
  }, [token, resetProfileToLoading, account])

  /**
   * use Dan's example
   * https://github.com/facebook/react/issues/14326#issuecomment-441680293
   */
  useEffect(() => {
    if (token.address === ZERO_ADDRESS) return
    getProfile()
    const refreshInterval = setInterval(getProfile, 1000 * 10)
    return () => clearInterval(refreshInterval)
  }, [getProfile, token])

  return { token, isProfileLoading, tokenProfile, formattedBalance }
}

export function useLastUpdated() {
  const [lastUpdated, setUpdateTime] = useState<Date>(new Date(0))

  const updated = () => setUpdateTime(new Date())
  return { lastUpdated, updated }
}

interface SignInPermit {
  signature: string
  message: string
  from: string
}
export function useLogin() {
  const { account, active, library, error } = useActiveWeb3React()
  const [caughtError, updateError] = useState<Error>(null)
  const [accessToken, updateAccessToken] = useState<string | null>(null)
  const [userDataByWallet, updateUserData] = useState<User | null>(null)
  const [registeredLoading, setRegisteredLoading] = useState<boolean>(false) // 查询注册 Loading

  useEffect(() => {
    async function fetchData() {
      if (!account) return
      setRegisteredLoading(true)
      try {
        const { isUserExist, user } = await checkIsWalletRegistered(account)
        if (isUserExist) {
          updateUserData(user)
          const token = getCookie('token')
          if (token) {
            updateAccessToken(token)
          }
        } else updateUserData(null)
      } catch (e) {
        console.error('e', e)
        updateUserData(null)
      } finally {
        setRegisteredLoading(false)
      }
    }

    // 有钱包地址就查是不是已经注册过
    fetchData()
    console.log('wallet.account', account)
  }, [account])

  const isRegistered = useMemo(() => Boolean(userDataByWallet), [userDataByWallet])

  const requestToSign = useCallback<() => Promise<SignInPermit>>(async () => {
    if (!active) {
      throw new Error('Please connect to wallet')
    }

    const AppName = 'ArtEconomics NFT'
    const MessageForLogin = `${AppName} uses this cryptographic signature in place of a password, verifying that you are the owner of this Ethereum address`
    const msgAboutToSign = `${MessageForLogin} — ${Date.now()}`
    const signature: string = await library.provider.request({
      method: 'personal_sign',
      params: [utils.hexlify(ethers.utils.toUtf8Bytes(msgAboutToSign)), account],
    })
    return {
      signature,
      message: msgAboutToSign,
      from: account,
    }
  }, [account, active, library])

  async function register(profile: Pick<User, 'username' | 'nickname' | 'avatar' | 'bio'>) {
    const signedLoginPermit = await requestToSign()
    const token = await registerUser(profile, signedLoginPermit)
    updateAccessToken(token)
    return token
  }

  const loginWithSignature = useCallback(async () => {
    try {
      // if (!active) {
      //   await library.provider.connect('injected')
      // }
      const signedLoginPermit = await requestToSign()
      const data = await loginWithPermit(signedLoginPermit)
      if (data) updateAccessToken(data)
      return data
    } catch (err) {
      updateError(err as Error)
      console.log(err)
      return false
    }
  }, [requestToSign])

  return {
    requestToSign,
    loginWithSignature,
    register,
    isRegistered,
    userDataByWallet,
    accessToken,
    walletError: error,
    caughtError,
    registeredLoading,
  }
}

export function useMarket() {
  const { account, library, chainId } = useActiveWeb3React()
  const signer = getSigner(library, account)

  const market = useMemo(() => {
    if (!!signer) {
      return MarketFactory.connect(MARKET_ADDRESS[chainId], signer)
    } else {
      return MarketFactory.connect(MARKET_ADDRESS[chainId], library)
    }
  }, [chainId, library, signer])

  return market
}

export type MarketAsk = {
  currency: string
  amount: BigNumber
}
export function isAskExist(currentAsk?: MarketAsk): currentAsk is MarketAsk {
  return Boolean(currentAsk) && currentAsk?.currency !== ZERO_ADDRESS
}
type MarketPriceBook = Record<string, MarketAsk>
export function useMarketPrices(ids: Array<number | null>) {
  // const { account } = useActiveWeb3React()
  const marketContract = useMarket()
  const [isLoading, { setFalse: finishLoading }] = useBoolean(true)
  const { aggerateQuery } = useMulticall()

  const [priceBook, updatePriceBook] = useState<MarketPriceBook>({})

  const getDetailOf = useCallback(async () => {
    const queries = ids.map((id) => ({
      target: marketContract.address,
      iface: marketContract.interface,
      funcFrag: marketContract.interface.getFunction('currentAskForToken'),
      data: [id],
    }))
    console.info('queries', queries)
    const { returns } = await aggerateQuery(queries)
    const currentAsks = returns.map((r) => ({
      amount: r[0][0],
      currency: r[0][1],
    })) as unknown as Array<{
      amount: BigNumber
      currency: string
    }>
    const _tmpB: MarketPriceBook = {}
    ids.forEach((id, idx) => {
      if (id) _tmpB[id] = currentAsks[idx]
    })
    updatePriceBook(_tmpB)
    finishLoading()
  }, [marketContract, ids, aggerateQuery, finishLoading])

  useEffect(() => {
    if (ids.length > 0) {
      getDetailOf()
    }
    const refreshInterval = setInterval(getDetailOf, 1000 * 30)
    return () => clearInterval(refreshInterval)
  }, [getDetailOf, ids.length])

  return { priceBook, isLoading }
}

export function useMedia() {
  const { account, library, chainId } = useActiveWeb3React()
  const signer = getSigner(library, account)

  const media = useMemo(() => {
    if (!!signer) {
      return MediaFactory.connect(MEDIA_ADDRESS[chainId], signer)
    } else {
      return MediaFactory.connect(MEDIA_ADDRESS[chainId], library)
    }
  }, [chainId, library, signer])

  return media
}

enum SortBy {
  ASC = 'ASC',
  DESC = 'DESC',
}
type MediaData = {
  askIds: number[]
  bidLogIds: number[]
  tokenLogsIds: number[]
} & Media
type MediaList = {
  items: MediaData[]
}
export function useMediaList(page = 1, limit = 6, sort = SortBy.DESC) {
  const { data: mediaList, error } = useSWR<MediaList, Error>(
    `/media?page=${page}&limit=${limit}&order=${sort}`,
    backendSWRFetcher,
  )
  console.log('useMediaList:mediaList:', mediaList)
  if (error) console.log('useMediaList:error:', error)
  return { mediaList, isError: Boolean(error), isLoading: !Boolean(mediaList), error }
}

export function useMediaData(post?: { id: number; backendData: Media; metadata: MediaMetadata }) {
  const { data: backendData, error: backendError } = useSWR<Media>(
    post ? `/media/${post.id}` : null,
    backendSWRFetcher,
    { fallbackData: post?.backendData },
  )
  const { data: metadata, error: metadataError } = useSWR<MediaMetadata>(
    post && backendData ? backendData.metadataURI : null,
    axiosFetcher,
    { fallbackData: post?.metadata },
  )
  return {
    backendData,
    metadata,
    isLoading: !backendError && !backendData,
    isError: backendError,
    backendError,
    metadataError,
  }
}

export type MediaWithMetadata = Media & { metadata: MediaMetadata }
export function useMediaListWithMeta(page = 1, limit = 6, sort = SortBy.DESC) {
  const { mediaList, isError, isLoading } = useMediaList(page, limit, sort)
  const mediaData = useMemo(async () => {
    const getData = mediaList?.items.map(async (item) => {
      const metadata = await getMediaMetadata(item.metadataURI)
      return {
        ...item,
        metadata,
      }
    })
    const mediaListWithMeta: MediaWithMetadata[] = await Promise.all(getData)
    return mediaListWithMeta
  }, [mediaList])
  console.log('useMediaListWithMeta:mediaData:', mediaData)
  return { mediaList, mediaData, isError, isLoading }
}

export function useMediaToken(id: BigNumberish) {
  const { account } = useActiveWeb3React()
  const mediaContract = useMedia()
  const marketContract = useMarket()
  const { aggerateQuery } = useMulticall()
  const [profile, setProfile] = useState({
    owner: '',
    creator: '',
    approvedOperator: '',
    bidsShares: {
      creator: Decimal.new(0),
      prevOwner: Decimal.new(0),
      owner: Decimal.new(0),
    },
    currentAsk: {
      currency: ZERO_ADDRESS,
      amount: BigNumber.from(0),
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAllApprove, setAllApprove] = useState(false)
  const isAskExist = useMemo(() => profile.currentAsk.currency !== ZERO_ADDRESS, [profile])

  const getDetailOf = useCallback(async () => {
    if (Number.isNaN(id)) {
      return
    }
    const { returns } = await aggerateQuery([
      {
        target: mediaContract.address,
        iface: mediaContract.interface,
        funcFrag: mediaContract.interface.getFunction('ownerOf'),
        data: [id],
      },
      {
        target: mediaContract.address,
        iface: mediaContract.interface,
        funcFrag: mediaContract.interface.getFunction('getApproved'),
        data: [id],
      },
      {
        target: mediaContract.address,
        iface: mediaContract.interface,
        funcFrag: mediaContract.interface.getFunction('tokenCreators'),
        data: [id],
      },
      {
        target: marketContract.address,
        iface: marketContract.interface,
        funcFrag: marketContract.interface.getFunction('bidSharesForToken'),
        data: [id],
      },
      {
        target: marketContract.address,
        iface: marketContract.interface,
        funcFrag: marketContract.interface.getFunction('currentAskForToken'),
        data: [id],
      },
    ])
    console.info('re', returns)
    const [[owner], [approvedOperator], [creator], [bidsShares], [currentAsk]] = returns as unknown as [
      [string],
      [string],
      [string],
      {
        creator: DecimalValue
        owner: DecimalValue
        prevOwner: DecimalValue
      }[],
      {
        amount: BigNumber
        currency: string
      }[],
    ]
    setProfile({
      owner,
      creator,
      approvedOperator,
      bidsShares: {
        creator: bidsShares.creator,
        prevOwner: bidsShares.prevOwner,
        owner: bidsShares.owner,
      },
      currentAsk: { amount: currentAsk.amount, currency: currentAsk.currency },
    })
    // if (account) {
    //   const isApproveForAll = await mediaContract.isApprovedForAll(
    //     owner,
    //     account
    //   );
    //   const bidForTokenBidder = await marketContract.bidForTokenBidder(
    //     id,
    //     account
    //   );
    //   setAllApprove(isApproveForAll);
    // }
  }, [
    id,
    aggerateQuery,
    mediaContract.address,
    mediaContract.interface,
    marketContract.address,
    marketContract.interface,
  ])

  useEffect(() => {
    if (id) {
      getDetailOf()
    }
    const refreshInterval = setInterval(getDetailOf, 1000 * 10)
    return () => clearInterval(refreshInterval)
  }, [id, getDetailOf])

  const isMeTheOwner = useMemo(
    () => account && profile.owner && utils.getAddress(profile.owner) === utils.getAddress(account),
    [profile, account],
  )

  const isOwnerOrApproved = useMemo(() => {
    return isAllApprove || profile.approvedOperator === account || profile.owner === account
  }, [isAllApprove, profile, account])

  const removeAsk = useCallback(async () => {
    const req = await mediaContract.removeAsk(id)
    const receipt = await req.wait()
    return receipt
  }, [mediaContract, id])

  return { isOwnerOrApproved, isMeTheOwner, profile, removeAsk, isAskExist }
}

export function useMediaBids(id: number) {
  const { data: mediaBids, error } = useSWR<BidLog[], Error>(`/media/${id}/bids`, backendSWRFetcher)

  console.log('useMediaBids:mediaBids:', mediaBids)
  if (error) console.log('useMediaBids:error:', error)

  return { mediaBids, isError: Boolean(error), error }
}

export function useStaticMulticall() {
  const { library, chainId } = useActiveWeb3React()
  return Multicall__factory.connect(MULTICALL_NETWORKS[chainId], library)
}
export function useMulticall() {
  const { account, library, chainId } = useActiveWeb3React()
  const signer = getSigner(library, account)
  const Multicall = useMemo(() => {
    if (!!signer) {
      return Multicall__factory.connect(MULTICALL_NETWORKS[chainId], signer)
    } else {
      return Multicall__factory.connect(MULTICALL_NETWORKS[chainId], library)
    }
  }, [chainId, library, signer])

  const aggerateQuery = useCallback(
    async (
      _calls: Array<{
        target: string
        iface: utils.Interface
        funcFrag: FunctionFragment
        data: unknown[]
      }>,
    ) => {
      const calls: Array<{ target: string; callData: BytesLike }> = _calls.map((c) => {
        return {
          target: c.target,
          callData: c.iface.encodeFunctionData(c.funcFrag, c.data),
        }
      })
      const { returnData, blockNumber } = await Multicall.callStatic.aggregate(calls)
      const returns = returnData.map((result, idx) => {
        const _ = _calls[idx]
        return _.iface.decodeFunctionResult(_.funcFrag, result)
      })
      return { returns, blockNumber }
    },
    [Multicall],
  )

  return { Multicall, aggerateQuery }
}

export async function useGetBidFor(tokenId: BigNumberish, addresses: string[]) {
  const { chainId } = useActiveWeb3React()
  const calls = addresses.map((who) => ({
    target: MARKET_ADDRESS[chainId],
    callData: IMarket.encodeFunctionData('bidForTokenBidder', [tokenId, who]),
  }))
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const staticMulticall = useStaticMulticall()
  const { returnData } = await staticMulticall.callStatic.aggregate(calls)
  const decoded = returnData
    .map((rawData) => IMarket.decodeFunctionResult('bidForTokenBidder', rawData))
    // treat currency 0x0...0 as removed bid
    .map((el) =>
      el[0].currency === ZERO_ADDRESS
        ? null
        : ({
            currency: el[0].currency,
            amount: el[0].amount,
            bidder: el[0].bidder,
            recipient: el[0].recipient,
            sellOnShare: el[0].sellOnShare,
          } as Bid),
    )
  console.info('decoded', decoded)
  const list: Record<string, Bid | null> = {}
  decoded.forEach((bid, idx) => {
    const addr = addresses[idx]
    list[addr] = bid
  })
  return list
}

export function useMyBid(tokenId: BigNumberish) {
  const { account } = useActiveWeb3React()
  const [myBid, updateMyBid] = useState<Bid | null>(constructBid(ZERO_ADDRESS, 0, ZERO_ADDRESS, ZERO_ADDRESS, 0))
  const { lastUpdated, updated } = useLastUpdated()
  const media = useMedia()
  const getBid = useGetBidFor(tokenId, [account])

  const getBidsDetail = useCallback(async () => {
    if (!account || !tokenId) return

    const res = await getBid
    updateMyBid(res[account])
    updated()
  }, [account, tokenId, getBid, updated])

  useEffect(() => {
    if (!account || !tokenId) return
    if (account && tokenId) {
      getBidsDetail()
    }
    const refreshInterval = setInterval(getBidsDetail, 1000 * 10)
    return () => clearInterval(refreshInterval)
  }, [tokenId, account, getBidsDetail])

  const removeBid = useCallback(async () => {
    if (!tokenId) return
    const tx = await media.removeBid(tokenId)
    const receipt = await tx.wait()
    return receipt
  }, [tokenId, media])

  return { myBid, lastUpdated, removeBid }
}

export function useWETH() {
  const { account, library, chainId } = useActiveWeb3React()
  const signer = getSigner(library, account)

  const weth = useMemo(() => {
    if (!!signer) {
      return WETH9__factory.connect(WETH[chainId].address, signer)
    } else {
      return WETH9__factory.connect(WETH[chainId].address, library)
    }
  }, [chainId, library, signer])

  const deposit = useCallback(
    async (amount: BigNumberish) => {
      if (!!signer) throw new Error('Please connect wallet to continue')

      const txRequest = await weth.deposit({ value: amount })
      const receipt = await txRequest.wait()
      return { txRequest, receipt }
    },
    [signer, weth],
  )

  const withdraw = useCallback(
    async (amount: BigNumberish) => {
      if (!!signer) throw new Error('Please connect wallet to continue')

      const txRequest = await weth.withdraw(amount)
      const receipt = await txRequest.wait()
      return { txRequest, receipt }
    },
    [signer, weth],
  )

  return { weth, deposit, withdraw }
}
