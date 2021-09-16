import { Currency, currencyEquals, ETHER, Percent, WETH } from '@haneko/uniswap-sdk'
import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import { splitSignature } from '@ethersproject/bytes'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box } from '@chakra-ui/react'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { Percent as PercentIcon } from 'react-feather'
import { RouteComponentProps } from 'react-router'
import ConfirmationModalContent from '../../components/Modal/components/ConfirmationModalContent'
import TransactionConfirmationModal from '../../components/Modal/TransactionConfirmationModal'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import Page from '../../components/Page'
import { ROUTER_ADDRESS } from '../../constants/address'
import { useWalletModalToggle } from '../../hooks/application'
import { ApprovalState, useApproveCallback } from '../../hooks/approve'
import { useBurnState, useDerivedBurnInfo, useBurnActionHandlers } from '../../hooks/burn'
import { usePairContract, useRouterContract } from '../../hooks/contract'
import { useCurrency } from '../../hooks/token'
import { useTransactionAdder, useTransactionDeadline } from '../../hooks/transaction'
import { useUserSlippageTolerance } from '../../hooks/user'
import { useActiveWeb3React, useIsArgentWallet } from '../../hooks/wallet'
import { Field } from '../../state/burn/actions'
import { wrappedCurrency } from '../../utils/currency'
import { calculateGasMargin, calculateSlippageAmount } from '../../utils/prices'
import { PageCard, PositionCard, Wrapper } from '../AddLiquidity/components/styleds'
import ConfirmationContentBottom from './components/ConfirmationContentBottom'
import ConfirmationContentTop from './components/ConfirmationContentTop'
import { AutoColumn } from '../../components/Column'
import { LightCard } from '../../components/Card'
import Row, { RowBetween } from '../../components/Row'
import { ClickableText, MaxButton, Text, TitleText } from './components/styleds'
import useDebouncedChangeHandler from '../../hooks'
import { MinimalPositionCard } from '../../components/PositionCard'
import Button from '../../components/Button'
import { Contract } from '@ethersproject/contracts'

interface RemoveLiquidityProps {
  currencyIdA: string
  currencyIdB: string
}

const RemoveLiquidity: React.FC<RouteComponentProps<RemoveLiquidityProps>> = ({
  history,
  match: {
    params: { currencyIdA, currencyIdB },
  },
}) => {
  const [currencyA, currencyB] = [useCurrency(currencyIdA) ?? undefined, useCurrency(currencyIdB) ?? undefined]
  const { account, chainId, library } = useActiveWeb3React()
  const [tokenA, tokenB] = useMemo(
    () => [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)],
    [currencyA, currencyB, chainId],
  )
  const toggleWalletModal = useWalletModalToggle()
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [showDetailed, setShowDetailed] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState(false) // clicked confirm
  const addTransaction = useTransactionAdder()

  // burn state
  const { independentField, typedValue } = useBurnState()
  const { pair, parsedAmounts, error } = useDerivedBurnInfo(currencyA ?? undefined, currencyB ?? undefined)
  const pairContract: Contract | null = usePairContract(pair?.liquidityToken?.address)
  const { onUserInput: _onUserInput } = useBurnActionHandlers()
  const isValid = !error

  const [txHash, setTxHash] = useState<string>('')
  const deadline = useTransactionDeadline()
  const [allowedSlippage] = useUserSlippageTolerance()

  // allowance handling
  const [signatureData, setSignatureData] = useState<{ v: number; r: string; s: string; deadline: number } | null>(null)
  const [approval, approveCallback] = useApproveCallback(parsedAmounts[Field.LIQUIDITY], ROUTER_ADDRESS)

  const isArgentWallet = useIsArgentWallet()

  const formattedAmounts = {
    [Field.LIQUIDITY_PERCENT]: parsedAmounts[Field.LIQUIDITY_PERCENT].equalTo('0')
      ? '0'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].lessThan(new Percent('1', '100'))
      ? '<1'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0),
    [Field.LIQUIDITY]:
      independentField === Field.LIQUIDITY ? typedValue : parsedAmounts[Field.LIQUIDITY]?.toSignificant(6) ?? '',
    [Field.CURRENCY_A]:
      independentField === Field.CURRENCY_A ? typedValue : parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
    [Field.CURRENCY_B]:
      independentField === Field.CURRENCY_B ? typedValue : parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
  }

  const oneCurrencyIsETH = currencyA === ETHER || currencyB === ETHER
  const oneCurrencyIsWETH = Boolean(
    chainId &&
      ((currencyA && currencyEquals(WETH[chainId], currencyA)) ||
        (currencyB && currencyEquals(WETH[chainId], currencyB))),
  )

  const router = useRouterContract()

  const format = (currency?: Currency) => {
    if (!currency) return ''
    return currency === ETHER ? ETHER.symbol : currency.symbol
  }

  const pendingText = `Removing ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)} ${format(
    currencyA,
  )} and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)} ${format(currencyB)}`

  const isButtonDisabled = !isValid || (signatureData === null && approval !== ApprovalState.APPROVED)
  const isButtonError = !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]

  const approveText = () => {
    if (approval === ApprovalState.PENDING) return 'Approving'
    if (approval === ApprovalState.APPROVED || signatureData !== null) return 'Approved'
    return 'Approve'
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback(
    (field: Field, typedValue: string) => {
      setSignatureData(null)
      return _onUserInput(field, typedValue)
    },
    [_onUserInput],
  )

  const onRemove = useCallback(async () => {
    if (!chainId || !library || !account || !deadline) throw new Error('missing dependencies')
    const { [Field.CURRENCY_A]: currencyAmountA, [Field.CURRENCY_B]: currencyAmountB } = parsedAmounts
    if (!currencyAmountA || !currencyAmountB) {
      throw new Error('missing currency amounts')
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0],
    }

    if (!currencyA || !currencyB) throw new Error('missing tokens')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    const currencyBIsETH = currencyB === ETHER
    const oneCurrencyIsETH = currencyA === ETHER || currencyBIsETH

    if (!tokenA || !tokenB) throw new Error('could not wrap')

    let methodNames: string[], args: Array<string | string[] | number | boolean>
    // we have approval, use normal remove liquidity
    if (approval === ApprovalState.APPROVED) {
      // removeLiquidityETH
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETH', 'removeLiquidityETHSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          deadline.toHexString(),
        ]
      }
      // removeLiquidity
      else {
        methodNames = ['removeLiquidity']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          deadline.toHexString(),
        ]
      }
    }
    // we have a signataure, use permit versions of remove liquidity
    else if (signatureData !== null) {
      // removeLiquidityETHWithPermit
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETHWithPermit', 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
      // removeLiquidityETHWithPermit
      else {
        methodNames = ['removeLiquidityWithPermit']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
    } else {
      throw new Error('Attempting to confirm without approval or a signature. Please contact support.')
    }

    const safeGasEstimates: (BigNumber | undefined)[] = await Promise.all(
      methodNames.map((methodName) =>
        router.estimateGas[methodName](...args)
          .then(calculateGasMargin)
          .catch((error) => {
            console.error(`estimateGas failed`, methodName, args, error)
            return undefined
          }),
      ),
    )

    const indexOfSuccessfulEstimation = safeGasEstimates.findIndex((safeGasEstimate) =>
      BigNumber.isBigNumber(safeGasEstimate),
    )

    // all estimations failed...
    if (indexOfSuccessfulEstimation === -1) {
      console.error('This transaction would fail. Please contact support.')
    } else {
      const methodName = methodNames[indexOfSuccessfulEstimation]
      const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation]

      setAttemptingTxn(true)
      await router[methodName](...args, {
        gasLimit: safeGasEstimate,
      })
        .then((response: TransactionResponse) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary:
              'Remove ' +
              parsedAmounts[Field.CURRENCY_A]?.toSignificant(3) +
              ' ' +
              format(currencyA) +
              ' and ' +
              parsedAmounts[Field.CURRENCY_B]?.toSignificant(3) +
              ' ' +
              format(currencyB),
          })

          setTxHash(response.hash)
        })
        .catch((error: Error) => {
          setAttemptingTxn(false)
          // we only care if the error is something _other_ than the user rejected the tx
          console.error(error)
        })
    }
  }, [
    account,
    addTransaction,
    allowedSlippage,
    approval,
    chainId,
    currencyA,
    currencyB,
    deadline,
    library,
    parsedAmounts,
    router,
    signatureData,
    tokenA,
    tokenB,
  ])

  const onAttemptToApprove = useCallback(async () => {
    if (!pairContract || !pair || !library || !deadline) throw new Error('missing dependencies')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    if (isArgentWallet) {
      return approveCallback()
    }

    // try to gather a signature for permission
    const nonce = await pairContract.nonces(account)

    const EIP712Domain = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ]
    const domain = {
      name: 'Bestswap LP Token',
      version: '1',
      chainId: chainId,
      verifyingContract: pair.liquidityToken.address,
    }
    const Permit = [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ]
    const message = {
      owner: account,
      spender: ROUTER_ADDRESS,
      value: liquidityAmount.raw.toString(),
      nonce: nonce.toHexString(),
      deadline: deadline.toNumber(),
    }
    const data = JSON.stringify({
      types: {
        EIP712Domain,
        Permit,
      },
      domain,
      primaryType: 'Permit',
      message,
    })

    library
      .send('eth_signTypedData_v4', [account, data])
      .then(splitSignature)
      .then((signature) => {
        setSignatureData({
          v: signature.v,
          r: signature.r,
          s: signature.s,
          deadline: deadline.toNumber(),
        })
      })
      .catch((error) => {
        // for all errors other than 4001 (EIP-1193 user rejected request), fall back to manual approve
        if (error?.code !== 4001) {
          approveCallback()
        }
      })
  }, [account, approveCallback, chainId, deadline, isArgentWallet, library, pair, pairContract, parsedAmounts])

  const liquidityPercentChangeCallback = useCallback(
    (value: number) => {
      onUserInput(Field.LIQUIDITY_PERCENT, value.toString())
    },
    [onUserInput],
  )

  const [innerLiquidityPercentage, setInnerLiquidityPercentage] = useDebouncedChangeHandler(
    Number.parseInt(parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0)),
    liquidityPercentChangeCallback,
  )

  const handleShowDetailedClick = useCallback(() => {
    setShowDetailed(!showDetailed)
  }, [showDetailed])

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    setSignatureData(null) // important that we clear signature data to avoid bad sigs
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.LIQUIDITY_PERCENT, '0')
    }
    setTxHash('')
  }, [onUserInput, txHash])

  const handleRemoveButtonClick = useCallback(() => {
    setShowConfirm(true)
  }, [])

  return (
    <Page>
      <PageCard>
        <AddRemoveTabs creating={false} adding={false} />
        <Wrapper>
          <TransactionConfirmationModal
            isOpen={showConfirm}
            onDismiss={handleDismissConfirmation}
            attemptingTxn={attemptingTxn}
            hash={txHash ? txHash : ''}
            pendingText={pendingText}
          >
            <ConfirmationModalContent
              title="You will receive"
              onDismiss={handleDismissConfirmation}
              topContent={
                <ConfirmationContentTop
                  allowedSlippage={allowedSlippage}
                  parsedAmounts={parsedAmounts}
                  currencyA={currencyA}
                  currencyB={currencyB}
                />
              }
              bottomContent={
                <ConfirmationContentBottom
                  parsedAmounts={parsedAmounts}
                  pair={pair}
                  approval={approval}
                  signatureData={signatureData}
                  currencyA={currencyA}
                  currencyB={currencyB}
                  tokenA={tokenA}
                  tokenB={tokenB}
                  onRemove={onRemove}
                />
              }
            />
          </TransactionConfirmationModal>
          <AutoColumn gap="20px">
            <LightCard>
              <AutoColumn gap="20px">
                <RowBetween>
                  <Text>Amount</Text>
                  <ClickableText onClick={handleShowDetailedClick}>
                    {showDetailed ? 'Show Simple' : 'Show Detailed'}
                  </ClickableText>
                </RowBetween>
                <Row style={{ alignItems: 'flex-end' }}>
                  <TitleText>{formattedAmounts[Field.LIQUIDITY_PERCENT]}%</TitleText>
                </Row>
                {showDetailed && (
                  <>
                    <Slider
                      min={0}
                      max={100}
                      colorScheme="blackAlpha"
                      value={innerLiquidityPercentage}
                      onChange={setInnerLiquidityPercentage}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb boxSize={6}>
                        <Box size={12} as={PercentIcon} />
                      </SliderThumb>
                    </Slider>
                    <RowBetween>
                      <MaxButton onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '25')} width="20%">
                        25%
                      </MaxButton>
                      <MaxButton onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '50')} width="20%">
                        50%
                      </MaxButton>
                      <MaxButton onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '75')} width="20%">
                        75%
                      </MaxButton>
                      <MaxButton onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')} width="20%">
                        Max
                      </MaxButton>
                    </RowBetween>
                  </>
                )}
              </AutoColumn>
            </LightCard>
            {!!pair && (
              <LightCard>
                <RowBetween>
                  <Text>Price:</Text>
                  <Text>
                    1 {currencyA?.symbol} = {tokenA ? pair.priceOf(tokenA).toSignificant(6) : '-'} {currencyB?.symbol}
                  </Text>
                </RowBetween>
                <RowBetween>
                  <div />
                  <Text>
                    1 {currencyB?.symbol} = {tokenB ? pair.priceOf(tokenB).toSignificant(6) : '-'} {currencyA?.symbol}
                  </Text>
                </RowBetween>
              </LightCard>
            )}
            <AutoColumn gap="md">
              {!account && (
                <Button variant="secondary" onClick={toggleWalletModal}>
                  Connect Wallet
                </Button>
              )}
              {!!approval && (
                <Button
                  variant="secondary"
                  onClick={onAttemptToApprove}
                  disabled={approval !== ApprovalState.NOT_APPROVED || signatureData !== null}
                >
                  {approveText()}
                </Button>
              )}
              {account && (
                <Button
                  variant="secondary"
                  disabled={isButtonDisabled}
                  error={isButtonError}
                  onClick={handleRemoveButtonClick}
                >
                  {error ?? 'Remove'}
                </Button>
              )}
            </AutoColumn>
          </AutoColumn>
        </Wrapper>
      </PageCard>
      {!!pair && (
        <PositionCard>
          <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
        </PositionCard>
      )}
    </Page>
  )
}

export default RemoveLiquidity
