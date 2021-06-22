import React, { useState, useContext, useCallback } from 'react'
import styled from 'styled-components'
import { Currency, Pair } from '@haneko/uniswap-sdk'
import { useWallet } from 'use-wallet'
import { ReactComponent as DropDownIcon } from '../../assets/img/icon-drop-down.svg'
import NumericalInput from '../NumericalInput'

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
}) => {
  const inputId = `${id}-input`
  // const { account } = useWallet()
  const account = true
  const [modalOpen, setModalOpen] = useState(false)
  // const isMaxDisplay = !hideInput && account && currency && showMaxButton && label !== 'To'
  const isMaxDisplay = true
  const currencySymbolName =
    currency && currency.symbol && currency.symbol.length > 20
      ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)}`
      : currency?.symbol

  return (
    <InputPanel id={id} style={style}>
      <Container>
        {!hideInput && (
          <LabelRow>
            <Label htmlFor={inputId}>{label}</Label>
            {account && <Balance>balance: 0</Balance>}
          </LabelRow>
        )}
        <InputRow>
          {!hideInput && <NumericalInput fontSize={40} value={value} onUserInput={(val) => onUserInput(val)} />}
          <CurrencySelectWrapper>
            {isMaxDisplay && <BalanceMax onClick={onMax}>max</BalanceMax>}
            <CurrencySelect>
              {/* {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={18} />
              ) : currency ? (
                <CurrencyLogo currency={currency} size={18} />
              ) : null} */}
              {pair ? (
                <TokenName active={true}>
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </TokenName>
              ) : (
                <TokenName active={Boolean(currency && currency.symbol)}>
                  {currencySymbolName || 'Select a token'}
                </TokenName>
              )}
              {!disableCurrencySelect && <IconDropDown />}
            </CurrencySelect>
          </CurrencySelectWrapper>
        </InputRow>
      </Container>
    </InputPanel>
  )
}

const InputPanel = styled.div`
  display: flex;
  flex-direction: column;
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

const Label = styled.label`
  display: inline-block;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 16px;
  line-height: 1.38;
  letter-spacing: 1.7px;
  text-transform: uppercase;
  color: ${(props) => props.theme.color.white};
`

const Balance = styled.p`
  font-family: 'Helvetica Neue LT W05_53 Ext';
  font-size: 8px;
  line-height: 2.25;
  letter-spacing: 0.67px;
  text-align: right;
  text-transform: uppercase;
  color: ${(props) => props.theme.color.white};
  margin: 0;
`

const CurrencySelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const BalanceMax = styled.button`
  box-sizing: border-box;
  width: 68px;
  height: 28px;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.color.white};
  border-radius: 60px;
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 16px;
  text-transform: uppercase;
  color: ${(props) => props.theme.color.white};
  cursor: pointer;
  outline: none;
  margin-right: 6px;
`

const CurrencySelect = styled.button`
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
  color: ${(props) => props.theme.color.white};
  border-radius: 60px;
  border: 2px solid ${(props) => props.theme.color.white};
  outline: none;
  cursor: pointer;
  user-select: none;
`

const TokenName = styled.span<{ active: boolean }>`
  font-family: ${({ active }) => (active ? 'Helvetica Neue LT W05_53 Ext' : 'Helvetica Neue LT W05_93 Blk E')};
  font-size: ${({ active }) => (active ? 16 : 10)}px;
  text-align: center;
  color: ${(props) => props.theme.color.white};
`

const IconDropDown = styled(DropDownIcon)`
  margin-left: 6px;
  height: 16px;
  path {
    stroke: ${(props) => props.theme.color.white};
  }
`

export default CurrencyInputPanel
