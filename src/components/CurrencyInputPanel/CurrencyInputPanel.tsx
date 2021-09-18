import React, { useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import { Currency, Pair } from '@haneko/uniswap-sdk'
import { ReactComponent as DropDownIcon } from '../../assets/img/icon-drop-down.svg'
import NumericalInput from '../NumericalInput'
import CurrencyLogo, { DoubleCurrencyLogo } from '../CurrencyLogo'
import { useCurrencyBalance } from '../../hooks/token'
import { useActiveWeb3React } from '../../hooks/wallet'
import { CurrencySearchModal } from '../Modal'

interface CurrencyInputPanelProps {
  value: string
  showMaxButton?: boolean
  label?: string
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  customBalanceText?: string
  style?: React.CSSProperties
  padding?: boolean | number
  fgColor?: string
  onUserInput: (value: string) => void
  onMax?: () => void
  onCurrencySelect?: (currency: Currency) => void
}

const CurrencyInputPanel: React.FC<CurrencyInputPanelProps> = ({
  value,
  onUserInput,
  onMax,
  showMaxButton = false,
  label = 'Input',
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
  customBalanceText,
  style,
  padding = false,
  fgColor,
}) => {
  const inputId = `${id}-input`
  const { account } = useActiveWeb3React()
  const [modalOpen, setModalOpen] = useState(false)
  const selectedCurrencyBalance = useCurrencyBalance(account, currency)

  const isMaxDisplay = !hideInput && account && currency && showMaxButton && label !== 'To'
  const balanceDisplay =
    !hideBalance && !!currency && selectedCurrencyBalance
      ? customBalanceText ?? selectedCurrencyBalance?.toSignificant(6)
      : '0'
  const currencySymbolName =
    currency && currency.symbol && currency.symbol.length > 20
      ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)}`
      : currency?.symbol

  const handleCurrencySelectClick = useCallback(() => {
    if (!disableCurrencySelect) {
      setModalOpen(true)
    }
  }, [disableCurrencySelect])

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return (
    <InputPanel id={id} padding={padding} style={style}>
      <Container>
        {!hideInput && (
          <LabelRow>
            <Label htmlFor={inputId} fgColor={fgColor}>
              {label}
            </Label>
            {account && <Balance fgColor={fgColor}>balance: {balanceDisplay}</Balance>}
          </LabelRow>
        )}
        <InputRow>
          {!hideInput && (
            <NumericalInput fgColor={fgColor} fontSize={40} value={value} onUserInput={(val) => onUserInput(val)} />
          )}
          <CurrencySelectWrapper>
            {isMaxDisplay && (
              <BalanceMax className="currency-input-max" fgColor={fgColor} onClick={onMax}>
                max
              </BalanceMax>
            )}
            <CurrencySelect fgColor={fgColor} onClick={handleCurrencySelectClick}>
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={18} />
              ) : currency ? (
                <CurrencyLogo currency={currency} size={18} margin={true} />
              ) : null}
              {pair ? (
                <TokenName active={true} fgColor={fgColor}>
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </TokenName>
              ) : (
                <TokenName active={Boolean(currency && currency.symbol)} fgColor={fgColor}>
                  {currencySymbolName || 'Select a token'}
                </TokenName>
              )}
              {!disableCurrencySelect && <IconDropDown color={fgColor} />}
            </CurrencySelect>
          </CurrencySelectWrapper>
        </InputRow>
      </Container>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
        />
      )}
    </InputPanel>
  )
}

const InputPanel = styled.div<{ padding: boolean | number }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${({ padding }) => padding && 20}px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const LabelRow = styled(Row)`
  align-items: flex-end;
`

const InputRow = styled(Row)`
  margin-top: 36px;
`

const Label = styled.label<{ fgColor?: string }>`
  display: inline-block;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 16px;
  line-height: 1.38;
  letter-spacing: 1.7px;
  text-transform: uppercase;
  color: ${({ theme, fgColor }) => (fgColor ? fgColor : theme.color.white)};
`

const Balance = styled.p<{ fgColor?: string }>`
  font-family: 'Helvetica Neue LT W05_53 Ext';
  font-size: 8px;
  line-height: 2.25;
  letter-spacing: 0.67px;
  text-align: right;
  text-transform: uppercase;
  color: ${({ theme, fgColor }) => (fgColor ? fgColor : theme.color.white)};
  margin: 0;
`

const CurrencySelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const BalanceMax = styled.button<{ fgColor?: string }>`
  box-sizing: border-box;
  width: 68px;
  height: 28px;
  background-color: transparent;
  border: 2px solid ${({ theme, fgColor }) => (fgColor ? fgColor : theme.color.white)};
  border-radius: 60px;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 16px;
  text-transform: uppercase;
  color: ${({ theme, fgColor }) => (fgColor ? fgColor : theme.color.white)};
  cursor: pointer;
  outline: none;
  margin-right: 6px;
`

const CurrencySelect = styled.button<{ fgColor?: string }>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  background-color: transparent;
  font-family: 'Helvetica Neue LT W05_53 Ext';
  font-size: 16px;
  text-transform: uppercase;
  color: ${({ theme, fgColor }) => (fgColor ? fgColor : theme.color.white)};
  border-radius: 60px;
  border: 2px solid ${({ theme, fgColor }) => (fgColor ? fgColor : theme.color.white)};
  outline: none;
  cursor: pointer;
  user-select: none;
`

const TokenName = styled.span<{ active: boolean; fgColor?: string }>`
  font-family: ${({ active }) => (active ? 'Helvetica Neue LT W05_53 Ext' : 'Helvetica Neue LT W05_93 Blk E')};
  font-size: ${({ active }) => (active ? 16 : 10)}px;
  text-align: center;
  color: ${({ theme, fgColor }) => (fgColor ? fgColor : theme.color.white)};
`

const IconDropDown = styled(DropDownIcon)<{ color?: string }>`
  margin-left: 6px;
  height: 16px;
  path {
    stroke: ${({ theme, color }) => (color ? color : theme.color.white)};
  }
`

export default CurrencyInputPanel
