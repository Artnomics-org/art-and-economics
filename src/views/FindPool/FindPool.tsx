import { Currency, ETHER, JSBI, TokenAmount } from '@haneko/uniswap-sdk'
import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { useContext } from 'react'
import { Plus } from 'react-feather'
import { ThemeContext } from 'styled-components/macro'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import { CurrencySearchModal } from '../../components/Modal'
import { ImportPoolTabs } from '../../components/NavigationTabs'
import Page from '../../components/Page'
import { MinimalPositionCard } from '../../components/PositionCard'
import { PairState, usePair, usePairAdder } from '../../hooks/liquidity'
import { useTokenBalance } from '../../hooks/token'
import { useActiveWeb3React } from '../../hooks/wallet'
import { currencyId } from '../../utils/currency'
import { PageCard, Wrapper } from '../AddLiquidity/components/styleds'
import PairInfoCard from './components/PairInfoCard'
import SelectTokenDropdown from './components/SelectTokenDropdown'

enum Fields {
  TOKEN0 = 0,
  TOKEN1 = 1,
}

const FindPool: React.FC = () => {
  const { account } = useActiveWeb3React()
  const theme = useContext(ThemeContext)
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)
  const [currency0, setCurrency0] = useState<Currency | null>(ETHER)
  const [currency1, setCurrency1] = useState<Currency | null>(null)

  const [pairState, pair] = usePair(currency0 ?? undefined, currency1 ?? undefined)
  const position: TokenAmount | undefined = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const hasPosition = Boolean(position && JSBI.greaterThan(position.raw, JSBI.BigInt(0)))
  const addPair = usePairAdder()
  const validPairNoLiquidity: boolean =
    pairState === PairState.NOT_EXISTS ||
    Boolean(
      pairState === PairState.EXISTS &&
        pair &&
        JSBI.equal(pair.reserve0.raw, JSBI.BigInt(0)) &&
        JSBI.equal(pair.reserve1.raw, JSBI.BigInt(0)),
    )

  useEffect(() => {
    if (pair) {
      addPair(pair)
    }
  }, [pair, addPair])

  const handleCurrency0Click = useCallback(() => {
    setShowSearch(true)
    setActiveField(Fields.TOKEN0)
  }, [])
  const handleCurrency1Click = useCallback(() => {
    setShowSearch(true)
    setActiveField(Fields.TOKEN1)
  }, [])
  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (activeField === Fields.TOKEN0) {
        setCurrency0(currency)
      } else {
        setCurrency1(currency)
      }
    },
    [activeField],
  )
  const handleSearchDismiss = useCallback(() => {
    setShowSearch(false)
  }, [setShowSearch])

  const connectText = 'Connect to a wallet to find pools.'
  const selectText = 'Select a token to find your liquidity.'

  return (
    <Page>
      <PageCard>
        <ImportPoolTabs />
        <Wrapper>
          <AutoColumn gap="md">
            <SelectTokenDropdown currency={currency0} onClick={handleCurrency0Click} />
            <ColumnCenter>
              <Plus size={16} color={theme.color.text[500]} />
            </ColumnCenter>
            <SelectTokenDropdown currency={currency1} onClick={handleCurrency1Click} />
            {hasPosition && (
              <PairInfoCard link={`/pool`} linkText="Manage This Pool">
                Pool Found!
              </PairInfoCard>
            )}
            {currency0 && currency1 ? (
              pairState === PairState.EXISTS ? (
                hasPosition && pair ? (
                  <MinimalPositionCard pair={pair} />
                ) : (
                  <PairInfoCard
                    link={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}
                    linkText="Add Liquidity"
                  >
                    You don’t have liquidity in this pool yet.
                  </PairInfoCard>
                )
              ) : validPairNoLiquidity ? (
                <PairInfoCard link={`/add/${currencyId(currency0)}/${currencyId(currency1)}`} linkText="Create Pool">
                  No Pool Found.
                </PairInfoCard>
              ) : pairState === PairState.INVALID ? (
                <PairInfoCard>Invalid Pair.</PairInfoCard>
              ) : pairState === PairState.LOADING ? (
                <PairInfoCard>Loading...</PairInfoCard>
              ) : null
            ) : (
              <PairInfoCard>{!account ? connectText : selectText}</PairInfoCard>
            )}
          </AutoColumn>
        </Wrapper>
      </PageCard>
      <CurrencySearchModal
        isOpen={showSearch}
        onCurrencySelect={handleCurrencySelect}
        onDismiss={handleSearchDismiss}
        showCommonBases
        selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
      />
    </Page>
  )
}

export default FindPool
