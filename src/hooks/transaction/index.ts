import { TransactionResponse } from '@ethersproject/providers'
import { BigNumber } from 'ethers'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../../state'
import { addTransaction } from '../../state/transactions/actions'
import { TransactionDetails } from '../../state/transactions/reducer'
import { useCurrentBlockTimestamp } from '../ethers'
import { useActiveWeb3React } from '../wallet'

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (
  response: TransactionResponse,
  customData?: {
    summary?: string
    approval?: { tokenAddress: string; spender: string }
    claim?: { recipient: string }
  },
) => void {
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    (
      response: TransactionResponse,
      {
        summary,
        approval,
        claim,
      }: { summary?: string; claim?: { recipient: string }; approval?: { tokenAddress: string; spender: string } } = {},
    ) => {
      if (!account) return
      if (!chainId) return

      const { hash } = response
      if (!hash) {
        throw Error('No transaction hash found.')
      }
      dispatch(addTransaction({ hash, from: account, chainId, approval, summary, claim }))
    },
    [dispatch, chainId, account],
  )
}

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const { chainId } = useActiveWeb3React()

  const state = useSelector<AppState, AppState['transactions']>((state) => state.transactions)

  return chainId ? state[chainId] ?? {} : {}
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return new Date().getTime() - tx.addedTime < 86_400_000
}

// returns whether a token has a pending approval transaction
export function useHasPendingApproval(tokenAddress: string | undefined, spender: string | undefined): boolean {
  const allTransactions = useAllTransactions()
  return useMemo(
    () =>
      typeof tokenAddress === 'string' &&
      typeof spender === 'string' &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash]
        if (!tx) return false
        if (tx.receipt) {
          return false
        } else {
          const approval = tx.approval
          if (!approval) return false
          return approval.spender === spender && approval.tokenAddress === tokenAddress && isTransactionRecent(tx)
        }
      }),
    [allTransactions, spender, tokenAddress],
  )
}

// combines the block timestamp with the user setting to give the deadline that should be used for any submitted transaction
export function useTransactionDeadline(): BigNumber | undefined {
  const ttl = useSelector<AppState, number>((state) => state.user.userDeadline)
  const blockTimestamp = useCurrentBlockTimestamp()
  return useMemo(() => {
    if (blockTimestamp && ttl) return blockTimestamp.add(ttl)
    return undefined
  }, [blockTimestamp, ttl])
}
