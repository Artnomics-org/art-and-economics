import React, { useCallback, useState } from 'react'
import Page from '../../components/Page'
import {
  SwapWrapper,
  Title,
  IconArrow,
  SwapBody,
  InputBody,
  BottomGrouping,
  AdvancedCard,
  TradePriceText,
} from './components/styleds'
import IconSwapBg from '../../assets/img/icon-swap-bg.svg'
import IconLongArrow from '../../assets/img/icon-long-arrow.svg'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { useWalletModalToggle } from '../../hooks/application'
import useWrapCallback, {
  useSwapState,
  useDerivedSwapInfo,
  WrapType,
  useSwapActionHandlers,
  useDefaultsFromURLSearch,
  useSwapCallback,
} from '../../hooks/swap'
import { useActiveWeb3React } from '../../hooks/wallet'
import { Field } from '../../state/swap/actions'
import { CurrencyAmount, JSBI, Trade } from '@haneko/uniswap-sdk'
import { maxAmountSpend } from '../../utils/currency'
import AdvancedInfoCard from './components/AdvancedInfoCard'
import AdvancedSwapDetailsDropdown from './components/AdvancedSwapDetailsDropdown'
import Button from '../../components/Button'
import { computeTradePriceBreakdown, confirmPriceImpactWithoutFee, warningSeverity } from '../../utils/prices'
import { useUserSlippageTolerance } from '../../hooks/user'
import { useApproveCallbackFromTrade, ApprovalState } from '../../hooks/approve'
import { RowBetween } from '../../components/Row'
import { AutoColumn } from '../../components/Column'
import ProgressCircles from './components/ProgressCircles'
import SwapCallbackError from './components/SwapCallbackError'
import TradePrice from './components/TradePrice'

const Swap: React.FC = () => {
  useDefaultsFromURLSearch()
  const { account } = useActiveWeb3React()
  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle()
  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)
  // modal and loading
  interface SwapState {
    showConfirm: boolean
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<SwapState>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })
  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)
  const isExpertMode = true

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()
  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT
  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)
  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  )
  const noRoute = !route

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()
  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)
  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient)

  const { onCurrencySelection, onUserInput } = useSwapActionHandlers()
  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput],
  )
  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
    },
    [onCurrencySelection],
  )
  const handleOutputSelect = useCallback(
    (outputCurrency) => onCurrencySelection(Field.OUTPUT, outputCurrency),
    [onCurrencySelection],
  )
  const handleMaxInput = useCallback(() => {
    maxAmountInput && onUserInput(Field.INPUT, maxAmountInput.toExact())
  }, [maxAmountInput, onUserInput])
  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then((hash) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: hash })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [tradeToConfirm, priceImpactWithoutFee, showConfirm, swapCallback])
  const handleSwapButtonClick = useCallback(() => {
    if (isExpertMode) {
      handleSwap()
    } else {
      setSwapState({
        tradeToConfirm: trade,
        attemptingTxn: false,
        swapErrorMessage: undefined,
        showConfirm: true,
        txHash: undefined,
      })
    }
  }, [handleSwap, isExpertMode, trade])

  const isWrapButtonShow = account && showWrap
  const wrapButtonText =
    wrapInputError ?? (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)

  const isNoRouteShow = !isWrapButtonShow && noRoute && userHasSpecifiedInputOutput
  const noRouteButtonText = 'Insufficient liquidity for this trade.'

  const isApproveFlowShow = !isNoRouteShow && showApproveFlow
  const isApproveFlowSwapButtonDisabled =
    !!swapInputError || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)
  const isApproveButtonDisabled = approval !== ApprovalState.NOT_APPROVED || approvalSubmitted
  const approvalButtonText =
    approval === ApprovalState.PENDING
      ? 'Approving'
      : approvalSubmitted && approval === ApprovalState.APPROVED
      ? 'Approved'
      : `Approve ${currencies[Field.INPUT]?.symbol}`

  const isNormalSwapButtonShow = account && !isWrapButtonShow && !isNoRouteShow && !isApproveFlowShow
  const isSwapButtonDisabled = !!swapInputError || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError
  const swapButtonText =
    priceImpactSeverity > 3 && !isExpertMode
      ? 'Price impact to high'
      : `Swap${priceImpactSeverity > 2 ? ' anyway' : ''}`

  const isMoreInfoShow = !!trade || showApproveFlow || (isExpertMode && !!swapErrorMessage) || showWrap

  return (
    <Page>
      <SwapWrapper bg={IconSwapBg}>
        <IconArrow src={IconLongArrow} alt="icon arrow" />
        <SwapBody>
          <Title>nft art market</Title>
          <InputBody>
            <AutoColumn gap="100px">
              <CurrencyInputPanel
                id="swap-currency-input"
                label={independentField === Field.OUTPUT && !showWrap && trade ? 'From (estimated)' : 'From'}
                value={formattedAmounts[Field.INPUT]}
                showMaxButton={!atMaxAmountInput}
                currency={currencies[Field.INPUT]}
                onUserInput={handleTypeInput}
                onMax={handleMaxInput}
                onCurrencySelect={handleInputSelect}
                otherCurrency={currencies[Field.OUTPUT]}
              />
              <CurrencyInputPanel
                id="swap-currency-output"
                value={formattedAmounts[Field.OUTPUT]}
                onUserInput={handleTypeOutput}
                label={independentField === Field.INPUT && !showWrap && trade ? 'To (estimated)' : 'To'}
                showMaxButton={false}
                currency={currencies[Field.OUTPUT]}
                onCurrencySelect={handleOutputSelect}
                otherCurrency={currencies[Field.INPUT]}
              />
            </AutoColumn>
            <BottomGrouping>
              {!account && (
                <Button id="wallet-button" onClick={toggleWalletModal}>
                  Connect Wallet
                </Button>
              )}
              {isWrapButtonShow && (
                <Button id="warp-button" disabled={Boolean(wrapInputError)} onClick={onWrap}>
                  {wrapButtonText}
                </Button>
              )}
              {isNoRouteShow && (
                <Button id="no-router-show" disabled={true}>
                  {noRouteButtonText}
                </Button>
              )}
              {isApproveFlowShow && (
                <RowBetween>
                  <Button
                    id="approve-button"
                    disabled={isApproveButtonDisabled}
                    style={{ width: '48%' }}
                    onClick={approveCallback}
                  >
                    {approvalButtonText}
                  </Button>
                  <Button id="swap-button" disabled={isApproveFlowSwapButtonDisabled} onClick={handleSwapButtonClick}>
                    {swapButtonText}
                  </Button>
                </RowBetween>
              )}
              {isNormalSwapButtonShow && (
                <Button id="swap-button" disabled={isSwapButtonDisabled} onClick={handleSwapButtonClick}>
                  {swapInputError ? swapInputError : swapButtonText}
                </Button>
              )}
            </BottomGrouping>
          </InputBody>
        </SwapBody>
      </SwapWrapper>
      <AdvancedInfoCard isShow={isMoreInfoShow}>
        {showWrap ? null : (
          <AdvancedCard>
            <AutoColumn gap="4px">
              {Boolean(trade) && (
                <RowBetween align="center">
                  <TradePriceText>Price</TradePriceText>
                  <TradePrice
                    price={trade?.executionPrice}
                    showInverted={showInverted}
                    setShowInverted={setShowInverted}
                  />
                </RowBetween>
              )}
            </AutoColumn>
          </AdvancedCard>
        )}
        {trade && <AdvancedSwapDetailsDropdown trade={trade} />}
        {showApproveFlow && (
          <AdvancedCard>
            <ProgressCircles steps={[approval === ApprovalState.APPROVED]} />
          </AdvancedCard>
        )}
        {isExpertMode && swapErrorMessage && (
          <AdvancedCard>
            <SwapCallbackError error={swapErrorMessage} />
          </AdvancedCard>
        )}
      </AdvancedInfoCard>
    </Page>
  )
}

export default Swap
