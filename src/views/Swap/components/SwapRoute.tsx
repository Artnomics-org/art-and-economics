import { Trade } from '@haneko/uniswap-sdk'
import React, { Fragment, memo, useContext } from 'react'
import { ChevronRight } from 'react-feather'
import styled, { ThemeContext } from 'styled-components/macro'
import CurrencyLogo from '../../../components/CurrencyLogo'

interface SwapRouteProps {
  trade: Trade
}

const SwapRoute: React.FC<SwapRouteProps> = ({ trade }) => {
  const theme = useContext(ThemeContext)

  return (
    <FlexWrapper>
      {trade.route.path.map((token, i, path) => {
        const isLastItem: boolean = i === path.length - 1
        return (
          <Fragment key={i}>
            <Flex>
              <CurrencyLogo currency={token} size={24} />
              <Text>{token.symbol}</Text>
            </Flex>
            {isLastItem ? null : <ChevronRight color={theme.color.text[400]} />}
          </Fragment>
        )
      })}
    </FlexWrapper>
  )
}

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 13.5px;
  border: 1px solid ${({ theme }) => theme.color.grey[400]};
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`

const Text = styled.p`
  margin: 0;
  margin-left: 8px;
  margin-right: 0.5rem;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.color.text[400]};
`

export default memo(SwapRoute)
