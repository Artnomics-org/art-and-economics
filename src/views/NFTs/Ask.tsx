import { Token } from '@haneko/uniswap-sdk'
import { utils } from 'ethers'
import { Select, Spinner, NumberInput, NumberInputField, useToast } from '@chakra-ui/react'
import React, { useState, useCallback, useMemo, useContext } from 'react'
import { RouteComponentProps, useHistory } from 'react-router'
import { BlackButton } from '../../components/Button'
import { BlackInternalLink } from '../../components/Link'
import Page from '../../components/Page'
import { useAllTokens } from '../../hooks/lists'
import { useMedia, useMediaToken, useMediaData, useLogin } from '../../hooks/nfts'
import { useToken, useTokenBalance } from '../../hooks/token'
import { getBalanceNumber } from '../../utils'
import NFTContentCard from './components/NFTContentCard'
import NFTLabelInfo from './components/NFTLabelInfo'
import {
  BidButtonWrapper,
  BidMeWarningButtons,
  BidMeWarningWrapper,
  BidSpacer,
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
import { constructAsk } from '../../utils/zdk'

type AskProps = {
  id: string
}

const Ask: React.FC<RouteComponentProps<AskProps>> = ({
  match: {
    params: { id },
  },
}) => {
  const router = useHistory()
  const theme = useContext(ThemeContext)
  const toast = useToast()
  const { account } = useActiveWeb3React()
  const { isRegistered, registeredLoading } = useLogin()
  const needReg = !isRegistered && !registeredLoading
  const { profile, isMeTheOwner, isAskExist, removeAsk } = useMediaToken(id)
  const { backendData, metadata, isError } = useMediaData({ id: Number(id) })
  const mediaContract = useMedia()

  const bidShare = getBalanceNumber(String(profile?.bidsShares?.creator?.value))
  const currentAskToken = useToken(profile?.currentAsk?.currency)
  const currentAsk = getBalanceNumber(String(profile?.currentAsk?.amount), currentAskToken?.decimals || 18).toFixed(2)

  // removing
  const [isRemoving, setIsRemoving] = useState(false)
  const handleRemoveAsk = useCallback(async () => {
    try {
      setIsRemoving(true)
      toast({
        title: 'Removing ask...',
        description: 'Wait for the contract confirmation, please do not refresh or leave the page.',
        status: 'info',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
      const tx = await removeAsk()
      toast({
        title: 'Successfully remove ask...',
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
        title: 'Remove ask error',
        description: `${error}, Please try again.`,
        status: 'error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      })
    } finally {
      setIsRemoving(false)
    }
  }, [removeAsk, router, toast])

  // select currency
  const allTokens = useAllTokens()
  const filteredTokens: Token[] = useMemo(() => {
    return Object.values(allTokens)
  }, [allTokens])
  const [selectCurrency, setSelectCurrency] = useState<Token>(null)
  const [inputBidPrice, setInputBidPrice] = useState<number>(0)
  const currencyAmount = useTokenBalance(account, selectCurrency)
  const currencyAmountNumber = getBalanceNumber(currencyAmount?.raw?.toString() || '0', selectCurrency?.decimals || 18)
  console.log('AskPage:useTokenBalance:currencyAmount:', currencyAmount, 'currencyAmountNumber:', currencyAmountNumber)
  const [approvalState, approve] = useApproveCallback(currencyAmount, mediaContract.address)
  console.log('AskPage:useApproveCallback:approvalState:', approvalState)
  const handleSelectCurrency = useCallback(
    (ev: React.ChangeEvent<HTMLSelectElement>) => {
      const value = ev.target.value
      if (value) {
        const selectedToken = filteredTokens.find((t) => t.address === value)
        console.log('AskPage:handleSelectCurrency:value', value, 'selectedToken:', selectedToken)
        setSelectCurrency(selectedToken)
      }
    },
    [filteredTokens],
  )
  const handleAskPriceChange = useCallback((valueStr: string, valueNumber: number) => {
    setInputBidPrice(valueNumber)
    console.log('AskPage:handleBidPriceChange:valueStr', valueStr, 'valueNumber:', valueNumber)
  }, [])

  // ask button
  const isPriceZero = inputBidPrice === 0
  const isOutOfAmount = inputBidPrice > currencyAmountNumber
  const isAskDisabled = isPriceZero || isOutOfAmount
  const isWaitForApprove = approvalState === ApprovalState.UNKNOWN
  const isNeedApprove = approvalState !== ApprovalState.APPROVED
  const isApproving = approvalState === ApprovalState.PENDING
  const [isAsking, setIsAsking] = useState(false)
  const handleSetAsk = useCallback(async () => {
    if (!selectCurrency) return
    try {
      setIsAsking(true)
      const price = utils.parseUnits(inputBidPrice.toString(), selectCurrency.decimals)
      const askData = constructAsk(selectCurrency.address, price)
      console.log('AskPage:handleSetAsk:constructAsk:askData', askData)
      const tx = await mediaContract.setAsk(id, askData)
      toast({
        title: 'Setting ask...',
        description: 'Wait for the contract confirmation, please do not refresh or leave the page.',
        status: 'info',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
      const receipt = await tx.wait()
      toast({
        title: 'Successfully make ask...',
        description: `Bid has been set, transaction hash: ${receipt.transactionHash}`,
        status: 'success',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
      setIsAsking(false)
      setInputBidPrice(0)
      setTimeout(() => router.goBack(), 3500)
    } catch (error) {
      toast({
        title: 'Make ask error',
        description: `${error}, Please try again.`,
        status: 'error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      })
    } finally {
      setIsAsking(false)
    }
  }, [id, inputBidPrice, mediaContract, router, selectCurrency, toast])

  const handleGoBack = useCallback(() => {
    router.goBack()
  }, [router])

  if (isError) {
    router.replace(`/market/${id}`)
  }

  if (needReg) {
    return (
      <Page>
        <BidMeWarningWrapper>
          <LoadingTitle error>Sorry, but...</LoadingTitle>
          <LoadingText>You need to register to make ask.</LoadingText>
          <BidMeWarningButtons>
            <BlackButton onClick={handleGoBack}>Go Back</BlackButton>
            <BlackInternalLink to="/register">Go To Register</BlackInternalLink>
          </BidMeWarningButtons>
        </BidMeWarningWrapper>
      </Page>
    )
  }

  return (
    <Page>
      {!isMeTheOwner && (
        <BidMeWarningWrapper>
          <LoadingTitle error>Sorry, but...</LoadingTitle>
          <LoadingText>
            We detected that you are the owner.
            <br />
            Which in this case that you cannot set a bid on your token.
          </LoadingText>
          <BidMeWarningButtons>
            <BlackButton onClick={handleGoBack}>Go Back</BlackButton>
            <BlackInternalLink to={`/market/${id}/bid`}>Set bid instead</BlackInternalLink>
          </BidMeWarningButtons>
        </BidMeWarningWrapper>
      )}
      {isMeTheOwner && (
        <NFTsWrapper>
          <NFTImageView>{backendData && <NFTImage src={backendData?.tokenURI} alt="NFT Image" />}</NFTImageView>
          <NFTBodyWrapper>
            <NFTBodyLeft>
              <NFTContentCard title="Your ask">
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
                  onChange={handleAskPriceChange}
                >
                  <NumberInputField borderRadius={0} />
                </NumberInput>
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
                  <BlackButton disabled={isAskDisabled || isAsking} onClick={handleSetAsk}>
                    {isAsking && <Spinner size="sm" color={theme.color.white} marginRight={4} />}
                    Make your ask
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
                  <BlackButton disabled={isRemoving} onClick={handleRemoveAsk}>
                    {isRemoving && <Spinner size="sm" color={theme.color.white} marginRight={4} />}
                    Remove Ask
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

export default Ask
