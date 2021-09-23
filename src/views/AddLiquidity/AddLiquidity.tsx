/* eslint-disable @typescript-eslint/no-explicit-any */
import { Currency, currencyEquals, ETHER, TokenAmount, WETH } from '@art-economics/swap-sdk'
import React, { useCallback, useContext, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Plus } from 'react-feather'
import { ThemeContext } from 'styled-components/macro'
import { TransactionResponse } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import Page from '../../components/Page'
import { useCurrency } from '../../hooks/token'
import { useActiveWeb3React } from '../../hooks/wallet'
import { ContentCard, PageCard, PositionCard, SmallText, Wrapper } from './components/styleds'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../hooks/mint'
import { Field } from '../../state/mint/actions'
import { currencyId, maxAmountSpend, wrappedCurrency } from '../../utils/currency'
import { useWalletModalToggle } from '../../hooks/application'
import Button from '../../components/Button'
import { PairState } from '../../hooks/liquidity'
import { MinimalPositionCard } from '../../components/PositionCard'
import { useTransactionAdder, useTransactionDeadline } from '../../hooks/transaction'
import { calculateGasMargin, calculateSlippageAmount } from '../../utils/prices'
import { useUserSlippageTolerance } from '../../hooks/user'
import { useRouterContract } from '../../hooks/contract'
import { ROUTER_ADDRESS } from '../../constants/address'
import { useApproveCallback, ApprovalState } from '../../hooks/approve'
import { RowBetween } from '../../components/Row'
import { LightCard } from '../../components/Card'
import PoolPriceBar from './components/PoolPriceBar'
import ConfirmationModalContent from '../../components/Modal/components/ConfirmationModalContent'
import TransactionConfirmationModal from '../../components/Modal/TransactionConfirmationModal'
import ConfirmationContentTop from './components/ConfirmationContentTop'
import ConfirmationContentBottom from './components/ConfirmationContentBottom'

interface AddLiquidityProps {
  currencyIdA?: string
  currencyIdB?: string
}

const AddLiquidity: React.FC<RouteComponentProps<AddLiquidityProps>> = ({
  match: {
    params: { currencyIdA, currencyIdB },
  },
  history,
}) => {
  const isCreate = history.location.pathname.includes('/create')
  const theme = useContext(ThemeContext)
  const toggleWalletModal = useWalletModalToggle() // toggle wallet when disconnected
  const { account, chainId, library } = useActiveWeb3React()
  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm
  const expertMode = true

  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)
  const oneCurrencyIsWETH = Boolean(
    chainId &&
      ((currencyA && currencyEquals(currencyA, WETH[chainId])) ||
        (currencyB && currencyEquals(currencyB, WETH[chainId]))),
  )
  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)
  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)
  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }
  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )
  const atMaxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
      }
    },
    {},
  )
  // txn values
  const deadline = useTransactionDeadline() // custom from users settings
  const [allowedSlippage] = useUserSlippageTolerance() // custom from users
  const [txHash, setTxHash] = useState<string>('')
  const addTransaction = useTransactionAdder()
  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], ROUTER_ADDRESS)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], ROUTER_ADDRESS)

  const router = useRouterContract()
  const onAdd = useCallback(async () => {
    if (!chainId || !library || !account) return

    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = parsedAmounts
    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) {
      return
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? 0 : allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? 0 : allowedSlippage)[0],
    }

    let estimate,
      method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null
    if (currencyA === ETHER || currencyB === ETHER) {
      const tokenBIsETH = currencyB === ETHER
      estimate = router.estimateGas.addLiquidityETH
      method = router.addLiquidityETH
      args = [
        wrappedCurrency(tokenBIsETH ? currencyA : currencyB, chainId)?.address ?? '', // token
        (tokenBIsETH ? parsedAmountA : parsedAmountB).raw.toString(), // token desired
        amountsMin[tokenBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
        amountsMin[tokenBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
        account,
        deadline.toHexString(),
      ]
      value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).raw.toString())
    } else {
      estimate = router.estimateGas.addLiquidity
      method = router.addLiquidity
      args = [
        wrappedCurrency(currencyA, chainId)?.address ?? '',
        wrappedCurrency(currencyB, chainId)?.address ?? '',
        parsedAmountA.raw.toString(),
        parsedAmountB.raw.toString(),
        amountsMin[Field.CURRENCY_A].toString(),
        amountsMin[Field.CURRENCY_B].toString(),
        account,
        deadline.toHexString(),
      ]
      value = null
    }

    setAttemptingTxn(true)
    await estimate(...args, value ? { value } : {})
      .then((estimatedGasLimit) =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
        }).then((response) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary:
              'Add ' +
              parsedAmounts[Field.CURRENCY_A]?.toSignificant(3) +
              ' ' +
              currencies[Field.CURRENCY_A]?.symbol +
              ' and ' +
              parsedAmounts[Field.CURRENCY_B]?.toSignificant(3) +
              ' ' +
              currencies[Field.CURRENCY_B]?.symbol,
          })

          setTxHash(response.hash)
        }),
      )
      .catch((error) => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== 4001) {
          console.error(error)
        }
      })
  }, [
    account,
    addTransaction,
    allowedSlippage,
    chainId,
    currencies,
    currencyA,
    currencyB,
    deadline,
    library,
    noLiquidity,
    parsedAmounts,
    router.addLiquidity,
    router.addLiquidityETH,
    router.estimateGas.addLiquidity,
    router.estimateGas.addLiquidityETH,
  ])

  const isValid = !error
  const isShowCard = pair && !noLiquidity && pairState !== PairState.INVALID
  const isButtonDisabled = !isValid || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED
  const isButtonError = !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]
  const isApproveFlowShow =
    (approvalA === ApprovalState.NOT_APPROVED ||
      approvalA === ApprovalState.PENDING ||
      approvalB === ApprovalState.NOT_APPROVED ||
      approvalB === ApprovalState.PENDING) &&
    isValid
  const isPriceBarShow = currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && pairState !== PairState.INVALID

  const approveText = (isPending: boolean, symbol: string) => {
    return `${isPending ? 'Approving' : 'Approve'} ${symbol}`
  }
  const approveButtonWidth = (isPending: boolean) => {
    return {
      width: isPending ? '48%' : '100%',
    }
  }
  const pendingText = `Supplying ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)} ${
    currencies[Field.CURRENCY_A]?.symbol
  } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)} ${currencies[Field.CURRENCY_B]?.symbol}`

  const handleCurrencyASelect = useCallback(
    (currencyA: Currency) => {
      const newCurrencyIdA = currencyId(currencyA)
      if (newCurrencyIdA === currencyIdB) {
        history.push(`/add/${currencyIdB}/${currencyIdA}`)
      } else {
        history.push(`/add/${newCurrencyIdA}/${currencyIdB}`)
      }
    },
    [currencyIdB, history, currencyIdA],
  )
  const handleCurrencyBSelect = useCallback(
    (currencyB: Currency) => {
      const newCurrencyIdB = currencyId(currencyB)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          history.push(`/add/${currencyIdB}/${newCurrencyIdB}`)
        } else {
          history.push(`/add/${newCurrencyIdB}`)
        }
      } else {
        history.push(`/add/${currencyIdA ? currencyIdA : 'BNB'}/${newCurrencyIdB}`)
      }
    },
    [currencyIdA, history, currencyIdB],
  )
  const handleCurrencyAMax = useCallback(() => {
    onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
  }, [maxAmounts, onFieldAInput])
  const handleCurrencyBMax = useCallback(() => {
    onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
  }, [maxAmounts, onFieldBInput])
  const handleSupplyButtonClick = useCallback(() => {
    expertMode ? onAdd() : setShowConfirm(true)
  }, [expertMode, onAdd])
  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('')
    }
    setTxHash('')
  }, [onFieldAInput, txHash])

  return (
    <Page>
      <PageCard>
        <AddRemoveTabs creating={isCreate} adding={true} />
        <Wrapper>
          <TransactionConfirmationModal
            isOpen={showConfirm}
            onDismiss={handleDismissConfirmation}
            attemptingTxn={attemptingTxn}
            hash={txHash}
            pendingText={pendingText}
          >
            <ConfirmationModalContent
              title={noLiquidity ? 'You are creating a pool' : 'You will receive'}
              onDismiss={handleDismissConfirmation}
              topContent={
                <ConfirmationContentTop
                  noLiquidity={noLiquidity}
                  liquidityMinted={liquidityMinted}
                  allowedSlippage={allowedSlippage}
                  currencies={currencies}
                />
              }
              bottomContent={
                <ConfirmationContentBottom
                  price={price}
                  currencies={currencies}
                  parsedAmounts={parsedAmounts}
                  noLiquidity={noLiquidity}
                  onAdd={onAdd}
                  poolTokenPercentage={poolTokenPercentage}
                />
              }
            />
          </TransactionConfirmationModal>
          <AutoColumn gap="20px">
            {isCreate && (
              <ContentCard>
                <h4>You are the first liquidity provider.</h4>
                <p>The ratio of tokens you add will set the price of this pool.</p>
                <p>Once you are happy with the rate click supply to review.</p>
              </ContentCard>
            )}
            <CurrencyInputPanel
              value={formattedAmounts[Field.CURRENCY_A]}
              onUserInput={onFieldAInput}
              onMax={handleCurrencyAMax}
              onCurrencySelect={handleCurrencyASelect}
              showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
              currency={currencies[Field.CURRENCY_A]}
              id="add-liquidity-input-token-a"
              showCommonBases
              padding
              fgColor={theme.color.text[500]}
            />
            <ColumnCenter>
              <Plus size="24" color={theme.color.text[500]} />
            </ColumnCenter>
            <CurrencyInputPanel
              value={formattedAmounts[Field.CURRENCY_B]}
              onUserInput={onFieldBInput}
              onCurrencySelect={handleCurrencyBSelect}
              onMax={handleCurrencyBMax}
              showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
              currency={currencies[Field.CURRENCY_B]}
              id="add-liquidity-input-token-b"
              showCommonBases
              padding
              fgColor={theme.color.text[500]}
            />
            {isPriceBarShow && (
              <LightCard padding="0">
                <RowBetween padding="16px">
                  <SmallText>{noLiquidity ? 'Initial prices' : 'Prices and pool share'}</SmallText>
                </RowBetween>
                <LightCard padding="16px" style={{ margin: '-1px', marginTop: 0, width: 'calc(100% + 2px)' }}>
                  <PoolPriceBar
                    currencies={currencies}
                    poolTokenPercentage={poolTokenPercentage}
                    noLiquidity={noLiquidity}
                    price={price}
                  />
                </LightCard>
              </LightCard>
            )}
            <AutoColumn gap="md">
              {!account && (
                <Button variant="secondary" onClick={toggleWalletModal}>
                  Connect Wallet
                </Button>
              )}
              {isApproveFlowShow && (
                <RowBetween>
                  {approvalA !== ApprovalState.APPROVED && (
                    <Button
                      variant="secondary"
                      onClick={approveACallback}
                      disabled={approvalA === ApprovalState.PENDING}
                      style={approveButtonWidth(approvalB !== ApprovalState.APPROVED)}
                    >
                      {approveText(approvalA === ApprovalState.PENDING, currencies[Field.CURRENCY_A]?.symbol)}
                    </Button>
                  )}
                  {approvalB !== ApprovalState.APPROVED && (
                    <Button
                      variant="secondary"
                      onClick={approveBCallback}
                      disabled={approvalB === ApprovalState.PENDING}
                      style={approveButtonWidth(approvalA !== ApprovalState.APPROVED)}
                    >
                      {approveText(approvalB === ApprovalState.PENDING, currencies[Field.CURRENCY_B]?.symbol)}
                    </Button>
                  )}
                </RowBetween>
              )}
              {account && (
                <Button
                  variant="secondary"
                  disabled={isButtonDisabled}
                  error={isButtonError}
                  onClick={handleSupplyButtonClick}
                >
                  {error ?? 'Supply'}
                </Button>
              )}
            </AutoColumn>
          </AutoColumn>
        </Wrapper>
      </PageCard>
      {isShowCard && (
        <PositionCard>
          <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
        </PositionCard>
      )}
    </Page>
  )
}

export default AddLiquidity
