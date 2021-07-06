import { Percent } from '@haneko/uniswap-sdk'
import React from 'react'
import { ONE_BIPS } from '../../../constants'
import { warningSeverity } from '../../../utils/prices'
import { ErrorText } from './styleds'

interface FormattedPriceImpactProps {
  priceImpact?: Percent
}

const FormattedPriceImpact: React.FC<FormattedPriceImpactProps> = ({ priceImpact }) => {
  return (
    <ErrorText severity={warningSeverity(priceImpact)}>
      {priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01%' : `${priceImpact.toFixed(2)}%`) : '-'}
    </ErrorText>
  )
}

export default FormattedPriceImpact
