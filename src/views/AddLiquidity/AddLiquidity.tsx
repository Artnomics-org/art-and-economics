import { Currency, currencyEquals, TokenAmount, WETH } from '@haneko/uniswap-sdk'
import React, { useCallback, useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Plus } from 'react-feather'
import { ThemeContext } from 'styled-components/macro'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import Page from '../../components/Page'
import { useCurrency } from '../../hooks/token'
import { useActiveWeb3React } from '../../hooks/wallet'
import { ContentCard, PageCard, Wrapper } from './components/styleds'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../hooks/mint'
import { Field } from '../../state/mint/actions'
import { currencyId, maxAmountSpend } from '../../utils/currency'
import { useWalletModalToggle } from '../../hooks/application'
import Button from '../../components/Button'

interface AddLiquidityProps {
  currencyIdA?: string
  currencyIdB?: string
}

const AddLiquidity: React.FC<RouteComponentProps<AddLiquidityProps>> = ({
  match: {
    params: {
      currencyIdA,
      currencyIdB
    }
  },
  history
}) => {
  const isCreate = history.location.pathname.includes('/create')
  const theme = useContext(ThemeContext)
  const toggleWalletModal = useWalletModalToggle() // toggle wallet when disconnected
  const { account, chainId, library } = useActiveWeb3React()

  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)
  const oneCurrencyIsWETH = Boolean(
    chainId &&
      ((currencyA && currencyEquals(currencyA, WETH[chainId])) ||
        (currencyB && currencyEquals(currencyB, WETH[chainId])))
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
    error
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)
  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)
  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? ''
  }
  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field])
      }
    },
    {}
  )
  const atMaxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0')
      }
    },
    {}
  )

  const handleCurrencyASelect = useCallback(
    (currencyA: Currency) => {
      const newCurrencyIdA = currencyId(currencyA)
      if (newCurrencyIdA === currencyIdB) {
        history.push(`/add/${currencyIdB}/${currencyIdA}`)
      } else {
        history.push(`/add/${newCurrencyIdA}/${currencyIdB}`)
      }
    },
    [currencyIdB, history, currencyIdA]
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
    [currencyIdA, history, currencyIdB]
  )

  return (
    <Page>
      <PageCard>
        <AddRemoveTabs creating={isCreate} adding={true} />
        <Wrapper>
          <AutoColumn gap='20px'>
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
              onMax={() => {
                onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
              }}
              onCurrencySelect={handleCurrencyASelect}
              showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
              currency={currencies[Field.CURRENCY_A]}
              id="add-liquidity-input-token-a"
              showCommonBases
              padding
              fgColor={theme.color.text[500]}
            />
            <ColumnCenter>
              <Plus size='24' color={theme.color.text[500]} />
            </ColumnCenter>
            <CurrencyInputPanel
              value={formattedAmounts[Field.CURRENCY_B]}
              onUserInput={onFieldBInput}
              onCurrencySelect={handleCurrencyBSelect}
              onMax={() => {
                onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
              }}
              showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
              currency={currencies[Field.CURRENCY_B]}
              id="add-liquidity-input-token-b"
              showCommonBases
              padding
              fgColor={theme.color.text[500]}
            />
            <AutoColumn>
              <Button variant='secondary'>Enter an amount</Button>
            </AutoColumn>
          </AutoColumn>
        </Wrapper>
      </PageCard>
    </Page>
  )
}

export default AddLiquidity
