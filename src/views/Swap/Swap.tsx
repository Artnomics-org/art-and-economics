import React from 'react'
import Page from '../../components/Page'
import { SwapWrapper, Title, IconArrow, SwapBody, InputBody } from './components/styleds'
import IconSwapBg from '../../assets/img/icon-swap-bg.svg'
import IconLongArrow from '../../assets/img/icon-long-arrow.svg'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'

const Swap: React.FC = () => {
  return (
    <Page>
      <SwapWrapper bg={IconSwapBg}>
        <IconArrow src={IconLongArrow} alt="icon arrow" />
        <SwapBody>
          <Title>nft art market</Title>
          <InputBody>
            <CurrencyInputPanel
              id="swap-currency-input"
              label="From"
              value=""
              onUserInput={() => {}}
              showMaxButton={true}
              style={{ marginBottom: '130px' }}
            />
            <CurrencyInputPanel id="swap-currency-output" label="To" value="" onUserInput={() => {}} />
          </InputBody>
        </SwapBody>
      </SwapWrapper>
    </Page>
  )
}

export default Swap
