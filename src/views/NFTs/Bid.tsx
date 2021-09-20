import { Token } from '@haneko/uniswap-sdk'
import { utils } from 'ethers'
import { Input, Select, Spinner, NumberInput, NumberInputField, useNumberInput, useToast } from '@chakra-ui/react'
import React, { useState, useCallback, useMemo, useContext } from 'react'
import { RouteComponentProps, useHistory } from 'react-router'
import { BlackButton } from '../../components/Button'
import { BlackInternalLink } from '../../components/Link'
import Page from '../../components/Page'
import { ZERO_ADDRESS } from '../../constants/address'
import { useAllTokens } from '../../hooks/lists'
import { useMedia, useMarket, useMediaToken, useMyBid, useMediaData } from '../../hooks/nfts'
import { useToken, useTokenBalance } from '../../hooks/token'
import { getBalanceNumber } from '../../utils'
import NFTContentCard from './components/NFTContentCard'
import NFTLabelInfo from './components/NFTLabelInfo'
import {
  BidButtonWrapper,
  BidMeWarningButtons,
  BidMeWarningWrapper,
  BidResaleText,
  BidSpacer,
  CreateNumberInputButton,
  CreateNumberInputWrapper,
  LoadingText,
  LoadingTitle,
  NFTBodyLeft,
  NFTBodyRight,
  NFTBodyWrapper,
  NFTImage,
  NFTImageView,
  NFTsWrapper,
} from './components/styleds'
import { useActiveWeb3React } from '../../hooks/wallet'
import { ApprovalState, useApproveCallback } from '../../hooks/approve'
import { ThemeContext } from 'styled-components/macro'
import { constructBid } from '../../utils/zdk'

type BidProps = {
  id: string
}

const Bid: React.FC<RouteComponentProps<BidProps>> = ({
  match: {
    params: { id },
  },
}) => {
  const router = useHistory()
  const theme = useContext(ThemeContext)
  const toast = useToast()
  const { account } = useActiveWeb3React()
  const mediaContract = useMedia()
  const marketContract = useMarket()
  const { profile, isMeTheOwner, isAskExist } = useMediaToken(id)
  const { backendData, metadata, isError } = useMediaData({ id: Number(id) })

  const currentAskToken = useToken(profile?.currentAsk?.currency)
  const bidShare = getBalanceNumber(String(profile?.bidsShares?.creator?.value))
  const currentAsk = getBalanceNumber(String(profile?.currentAsk?.amount), currentAskToken?.decimals || 18).toFixed(2)

  // my bid
  const { myBid, removeBid } = useMyBid(id)
  const myBidToken = useToken(myBid?.currency)
  const myBidAmount = getBalanceNumber(String(myBid?.amount), myBidToken?.decimals || 18).toFixed(2)
  const isMyBid = myBid && myBid.currency !== ZERO_ADDRESS
  const [isRemoving, setIsRemoving] = useState(false)
  const handleRemoveBid = useCallback(async () => {
    try {
      setIsRemoving(true)
      toast({
        title: 'Removing bid...',
        description: 'Wait for the contract confirmation, please do not refresh or leave the page.',
        status: 'info',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
      const tx = await removeBid()
      toast({
        title: 'Successfully remove bid...',
        description: `Bid has been removed, transaction hash: ${tx.transactionHash}`,
        status: 'success',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
      setIsRemoving(false)
      setTimeout(() => router.goBack(), 3500)
    } catch (error) {
      toast({
        title: 'Remove bid error',
        description: `${error}, Please try again.`,
        status: 'error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      })
    } finally {
      setIsRemoving(false)
    }
  }, [removeBid, router, toast])

  // select currency
  const allTokens = useAllTokens()
  const filteredTokens: Token[] = useMemo(() => {
    return Object.values(allTokens)
  }, [allTokens])
  const [selectCurrency, setSelectCurrency] = useState<Token>(null)
  const [inputBidPrice, setInputBidPrice] = useState<number>(0)
  const currencyAmount = useTokenBalance(account, selectCurrency)
  const currencyAmountNumber = getBalanceNumber(currencyAmount?.raw?.toString() || '0', selectCurrency?.decimals || 18)
  console.log('BidPage:useTokenBalance:currencyAmount:', currencyAmount, 'currencyAmountNumber:', currencyAmountNumber)
  const [approvalState, approve] = useApproveCallback(currencyAmount, marketContract.address)
  console.log('BidPage:useApproveCallback:approvalState:', approvalState)
  const handleSelectCurrency = useCallback(
    (ev: React.ChangeEvent<HTMLSelectElement>) => {
      const value = ev.target.value
      if (value) {
        const selectedToken = filteredTokens.find((t) => t.address === value)
        console.log('BidPage:handleSelectCurrency:value', value, 'selectedToken:', selectedToken)
        setSelectCurrency(selectedToken)
      }
    },
    [filteredTokens],
  )
  const handleBidPriceChange = useCallback((valueStr: string, valueNumber: number) => {
    setInputBidPrice(valueNumber)
    console.log('BidPage:handleBidPriceChange:valueStr', valueStr, 'valueNumber:', valueNumber)
  }, [])
  const isPriceZero = inputBidPrice === 0
  const isOutOfAmount = inputBidPrice > currencyAmountNumber
  const isBuyDisabled = isPriceZero || isOutOfAmount

  // sell on share
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber: sellOnShare,
  } = useNumberInput({
    step: 1,
    defaultValue: 0,
    min: 0,
    max: 100,
  })
  const handleIncrement = getIncrementButtonProps()
  const handleDecrement = getDecrementButtonProps()
  const handleNumberInput = getInputProps()

  // bid
  const isWaitForApprove = approvalState === ApprovalState.UNKNOWN
  const isNeedApprove = approvalState !== ApprovalState.APPROVED
  const isApproving = approvalState === ApprovalState.PENDING
  const [isBidding, setIsBidding] = useState(false)
  const handleSetBid = useCallback(async () => {
    if (!selectCurrency) return
    try {
      setIsBidding(true)
      const price = utils.parseUnits(inputBidPrice.toString(), selectCurrency.decimals)
      const bidData = constructBid(selectCurrency.address, price, account, account, sellOnShare)
      console.log('BidPage:handleSetBid:constructBid:bidData', bidData)
      const tx = await mediaContract.setBid(id, bidData)
      toast({
        title: 'Setting bid...',
        description: 'Wait for the contract confirmation, please do not refresh or leave the page.',
        status: 'info',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
      const receipt = await tx.wait()
      toast({
        title: 'Successfully make bid...',
        description: `Bid has been set, transaction hash: ${receipt.transactionHash}`,
        status: 'success',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
      setIsBidding(false)
      setInputBidPrice(0)
      setTimeout(() => router.goBack(), 3500)
    } catch (error) {
      toast({
        title: 'Make bid error',
        description: `${error}, Please try again.`,
        status: 'error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      })
    } finally {
      setIsBidding(false)
    }
  }, [account, id, inputBidPrice, mediaContract, router, selectCurrency, sellOnShare, toast])

  const handleGoBack = useCallback(() => {
    router.goBack()
  }, [router])

  if (isError) {
    router.replace(`/market/${id}`)
  }

  return (
    <Page>
      {isMeTheOwner && (
        <BidMeWarningWrapper>
          <LoadingTitle error>Sorry, but...</LoadingTitle>
          <LoadingText>
            We detected that you are the owner.
            <br />
            Which in this case that you cannot set a bid on your token.
          </LoadingText>
          <BidMeWarningButtons>
            <BlackButton onClick={handleGoBack}>Go Back</BlackButton>
            <BlackInternalLink to={`/market/${id}/ask`}>Set ask instead</BlackInternalLink>
          </BidMeWarningButtons>
        </BidMeWarningWrapper>
      )}
      {!isMeTheOwner && (
        <NFTsWrapper>
          <NFTImageView>{backendData && <NFTImage src={backendData?.tokenURI} alt="NFT Image" />}</NFTImageView>
          <NFTBodyWrapper>
            <NFTBodyLeft>
              <NFTContentCard title="Your bid">
                <Select
                  id="currency"
                  isRequired
                  borderRadius={0}
                  colorScheme="blackAlpha"
                  placeholder="Bidding Currency"
                  onChange={handleSelectCurrency}
                >
                  {filteredTokens.map((token) => (
                    <option key={token.address} value={token.address}>
                      {token.symbol}
                    </option>
                  ))}
                </Select>
                <BidSpacer />
                <p>Balance: {currencyAmountNumber}</p>
                <BidSpacer />
                <NumberInput
                  id="currency"
                  defaultValue={0}
                  min={0}
                  max={currencyAmountNumber}
                  borderRadius={0}
                  colorScheme="blackAlpha"
                  onChange={handleBidPriceChange}
                >
                  <NumberInputField borderRadius={0} />
                </NumberInput>
              </NFTContentCard>
              <NFTContentCard title="Resale Fee">
                <BidResaleText>
                  If you re-sell this piece, the person you&apos;re buying it from now will earn this percentage as a
                  reward for selling it to you.
                </BidResaleText>
                <CreateNumberInputWrapper>
                  <CreateNumberInputButton {...handleIncrement}>+</CreateNumberInputButton>
                  <Input
                    {...handleNumberInput}
                    id="sellOnShare"
                    isRequired
                    borderRadius={0}
                    colorScheme="blackAlpha"
                    placeholder="0"
                  />
                  <CreateNumberInputButton {...handleDecrement}>-</CreateNumberInputButton>
                </CreateNumberInputWrapper>
              </NFTContentCard>
              <BidButtonWrapper>
                {!selectCurrency && <BlackButton disabled={true}>Select Currency</BlackButton>}
                {isNeedApprove && selectCurrency && (
                  <BlackButton disabled={isApproving || isWaitForApprove} onClick={() => approve()}>
                    {isApproving && <Spinner size="sm" color={theme.color.white} marginRight={4} />}
                    Approve
                  </BlackButton>
                )}
                {!isNeedApprove && selectCurrency && (
                  <BlackButton disabled={isBuyDisabled || isBidding} onClick={handleSetBid}>
                    {isBidding && <Spinner size="sm" color={theme.color.white} marginRight={4} />}
                    Make your bid
                  </BlackButton>
                )}
              </BidButtonWrapper>
            </NFTBodyLeft>
            <NFTBodyRight>
              <NFTContentCard title="RESALE ROYALTY">
                <NFTLabelInfo title="Creator">{bidShare}%</NFTLabelInfo>
              </NFTContentCard>
              {isAskExist && (
                <NFTContentCard title="CURRENT ASK">
                  <NFTLabelInfo title="price">
                    {currentAsk}
                    {currentAskToken && ` ${currentAskToken?.symbol}`}
                  </NFTLabelInfo>
                </NFTContentCard>
              )}
              {isMyBid && (
                <NFTContentCard title="MY CURRENT BID">
                  <NFTLabelInfo title="price">
                    {myBidAmount}
                    {myBidToken && ` ${myBidToken?.symbol}`}
                  </NFTLabelInfo>
                  <BlackButton disabled={isRemoving} onClick={handleRemoveBid}>
                    {isRemoving && <Spinner size="sm" color={theme.color.white} marginRight={4} />}
                    Remove Current Bid
                  </BlackButton>
                </NFTContentCard>
              )}
              {metadata && (
                <NFTContentCard title="Metadata">
                  <NFTLabelInfo title="FileName">{metadata?.name}</NFTLabelInfo>
                  <NFTLabelInfo title="Description">{metadata?.description}</NFTLabelInfo>
                  <NFTLabelInfo title="MimeType">{metadata?.mimeType}</NFTLabelInfo>
                  <NFTLabelInfo title="Version">{metadata?.version}</NFTLabelInfo>
                </NFTContentCard>
              )}
            </NFTBodyRight>
          </NFTBodyWrapper>
        </NFTsWrapper>
      )}
    </Page>
  )
}

export default Bid
