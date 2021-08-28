import { Currency, ETHER, Token } from '@haneko/uniswap-sdk'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useAllTokens, useSelectedListInfo } from '../../../hooks/lists'
import { useToken } from '../../../hooks/token'
import { useActiveWeb3React } from '../../../hooks/wallet'
import { isAddress } from '../../../utils/ethers'
import { CloseButton, SortButton } from '../../Button'
import QuestionHelper from '../../QuestionHelper'
import Row, { AutoRow, RowBetween } from '../../Row'
import CommonBases from './CommonBases'
import { filterTokens } from './filtering'
import { useTokenComparator } from './sorting'
import { FullColumn, ListWrapper, PaddedColumn, SearchInput, Separator, Text } from './styleds'
import CurrencyList from './CurrencyList'
import Card from '../../Card'
import { ListLogo } from '../../CurrencyLogo'

interface CurrencySearchProps {
  isOpen: boolean
  onDismiss: () => void
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  onChangeList: () => void
}

const CurrencySearch: React.FC<CurrencySearchProps> = ({
  selectedCurrency,
  onCurrencySelect,
  otherSelectedCurrency,
  showCommonBases,
  onDismiss,
  isOpen,
}) => {
  const { chainId } = useActiveWeb3React()
  const fixedList = useRef<FixedSizeList>()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [invertSearchOrder, setInvertSearchOrder] = useState<boolean>(false)
  const allTokens = useAllTokens()
  const isAddressSearch = isAddress(searchQuery)
  const searchToken = useToken(searchQuery)
  const showETH: boolean = useMemo(() => {
    const s = searchQuery.toLowerCase().trim()
    return s === '' || s === 'e' || s === 'et' || s === 'eth'
  }, [searchQuery])
  const tokenComparator = useTokenComparator(invertSearchOrder)
  const filteredTokens: Token[] = useMemo(() => {
    if (isAddressSearch) return searchToken ? [searchToken] : []
    return filterTokens(Object.values(allTokens), searchQuery)
  }, [isAddressSearch, searchToken, allTokens, searchQuery])
  const filteredSortedTokens: Token[] = useMemo(() => {
    if (searchToken) return [searchToken]
    const sorted = filteredTokens.sort(tokenComparator)
    const symbolMatch = searchQuery
      .toLowerCase()
      .split(/\s+/)
      .filter((s) => s.length > 0)
    if (symbolMatch.length > 1) return sorted

    return [
      ...(searchToken ? [searchToken] : []),
      // sort any exact symbol matches first
      ...sorted.filter((token) => token.symbol?.toLowerCase() === symbolMatch[0]),
      ...sorted.filter((token) => token.symbol?.toLowerCase() !== symbolMatch[0]),
    ]
  }, [filteredTokens, searchQuery, searchToken, tokenComparator])
  const selectedListInfo = useSelectedListInfo()

  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>()
  const handleInput = useCallback((event) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
    fixedList.current?.scrollTo(0)
  }, [])
  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency)
      onDismiss()
    },
    [onDismiss, onCurrencySelect],
  )
  const handleEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const s = searchQuery.toLowerCase().trim()
        if (s === 'bnb') {
          handleCurrencySelect(ETHER)
        } else if (filteredSortedTokens.length > 0) {
          if (
            filteredSortedTokens[0].symbol?.toLowerCase() === searchQuery.trim().toLowerCase() ||
            filteredSortedTokens.length === 1
          ) {
            handleCurrencySelect(filteredSortedTokens[0])
          }
        }
      }
    },
    [filteredSortedTokens, handleCurrencySelect, searchQuery],
  )

  // clear the input on open
  useEffect(() => {
    if (isOpen) setSearchQuery('')
  }, [isOpen])

  const selAListQues = 'Find a token by searching for its name or symbol or by pasting its address below.'

  return (
    <FullColumn>
      <PaddedColumn gap="14px">
        <RowBetween>
          <AutoRow>
            <Text>Select a list </Text>
            <QuestionHelper text={selAListQues} />
          </AutoRow>
          <CloseButton onClick={onDismiss} />
        </RowBetween>
        <SearchInput
          type="text"
          id="token-search-input"
          placeholder="Search name or paste address"
          value={searchQuery}
          ref={inputRef as React.RefObject<HTMLInputElement>}
          onChange={handleInput}
          onKeyDown={handleEnter}
        />
        {showCommonBases && (
          <CommonBases chainId={chainId} onSelect={handleCurrencySelect} selectedCurrency={selectedCurrency} />
        )}
        <RowBetween>
          <Text>Token name</Text>
          <SortButton ascending={invertSearchOrder} toggleSortOrder={() => setInvertSearchOrder((iso) => !iso)} />
        </RowBetween>
      </PaddedColumn>
      <Separator />
      <ListWrapper>
        <AutoSizer disableWidth>
          {({ height }) => (
            <CurrencyList
              height={height}
              showETH={showETH}
              currencies={filteredSortedTokens}
              onCurrencySelect={handleCurrencySelect}
              otherCurrency={otherSelectedCurrency}
              selectedCurrency={selectedCurrency}
              fixedListRef={fixedList}
            />
          )}
        </AutoSizer>
      </ListWrapper>
      <Separator />
      <Card>
        <RowBetween>
          {selectedListInfo.current ? (
            <Row>
              {selectedListInfo.current.logoURI ? (
                <ListLogo
                  style={{ marginRight: 12 }}
                  logoURI={selectedListInfo.current.logoURI}
                  alt={`${selectedListInfo.current.name} list logo`}
                />
              ) : null}
              <Text id="currency-search-selected-list-name">{selectedListInfo.current.name}</Text>
            </Row>
          ) : (
            'No list selected.'
          )}
        </RowBetween>
      </Card>
    </FullColumn>
  )
}

export default CurrencySearch
