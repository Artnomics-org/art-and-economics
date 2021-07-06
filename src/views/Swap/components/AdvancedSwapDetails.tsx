import { Trade } from '@haneko/uniswap-sdk'
import React from 'react'
import { AutoColumn } from '../../../components/Column'
import QuestionHelper from '../../../components/QuestionHelper'
import { RowFixed } from '../../../components/Row'
import { useUserSlippageTolerance } from '../../../hooks/user'
import { SectionBreak, Text } from './styleds'
import SwapRoute from './SwapRoute'
import TradeSummary from './TradeSummary'

export interface AdvancedSwapDetailsProps {
  trade?: Trade
}

const AdvancedSwapDetails: React.FC<AdvancedSwapDetailsProps> = ({ trade }) => {
  const [allowedSlippage] = useUserSlippageTolerance()
  const showRoute = Boolean(trade && trade.route.path.length > 2)
  const questRoute = 'Routing through these tokens resulted in the best price for your trade.'

  return (
    <AutoColumn style={{ padding: '0 10px' }}>
      {trade && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <>
              <SectionBreak />
              <AutoColumn style={{ padding: '0 10px' }}>
                <RowFixed>
                  <Text>Route</Text>
                  <QuestionHelper text={questRoute} />
                </RowFixed>
                <SwapRoute trade={trade} />
              </AutoColumn>
            </>
          )}
        </>
      )}
    </AutoColumn>
  )
}

export default AdvancedSwapDetails
