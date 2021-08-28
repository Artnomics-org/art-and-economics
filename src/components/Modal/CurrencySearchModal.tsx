import { Currency } from '@haneko/uniswap-sdk'
import React, { useCallback, useEffect, useState } from 'react'
import { useLast } from '../../hooks'
import CurrencySearch from './components/CurrencySearch'
import Modal from './Modal'

interface CurrencySearchModalProps {
  isOpen: boolean
  onDismiss: () => void
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
}

const CurrencySearchModal: React.FC<CurrencySearchModalProps> = ({
  isOpen,
  onDismiss,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases = false,
}) => {
  const [listView, setListView] = useState<boolean>(false)
  const lastOpen = useLast(isOpen)
  useEffect(() => {
    if (isOpen && !lastOpen) {
      setListView(false)
    }
  }, [isOpen, lastOpen])
  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency)
      onDismiss()
    },
    [onDismiss, onCurrencySelect],
  )
  const handleClickChangeList = useCallback(() => {
    setListView(true)
  }, [])
  // const handleClickBack = useCallback(() => {
  //   setListView(false)
  // }, [])

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={80} minHeight={listView ? 40 : 60} contentHeight={100}>
      <CurrencySearch
        isOpen={isOpen}
        onDismiss={onDismiss}
        onCurrencySelect={handleCurrencySelect}
        onChangeList={handleClickChangeList}
        selectedCurrency={selectedCurrency}
        otherSelectedCurrency={otherSelectedCurrency}
        showCommonBases={showCommonBases}
      />
    </Modal>
  )
}

export default CurrencySearchModal
