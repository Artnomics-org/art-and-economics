/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, Overrides, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface MarketInterface extends ethers.utils.Interface {
  functions: {
    'acceptBid(uint256,tuple)': FunctionFragment
    'bidForTokenBidder(uint256,address)': FunctionFragment
    'bidSharesForToken(uint256)': FunctionFragment
    'configure(address)': FunctionFragment
    'currentAskForToken(uint256)': FunctionFragment
    'isValidBid(uint256,uint256)': FunctionFragment
    'isValidBidShares(tuple)': FunctionFragment
    'mediaContract()': FunctionFragment
    'removeAsk(uint256)': FunctionFragment
    'removeBid(uint256,address)': FunctionFragment
    'setAsk(uint256,tuple)': FunctionFragment
    'setBid(uint256,tuple,address)': FunctionFragment
    'setBidShares(uint256,tuple)': FunctionFragment
    'splitShare(tuple,uint256)': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'acceptBid',
    values: [
      BigNumberish,
      {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
    ],
  ): string
  encodeFunctionData(functionFragment: 'bidForTokenBidder', values: [BigNumberish, string]): string
  encodeFunctionData(functionFragment: 'bidSharesForToken', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'configure', values: [string]): string
  encodeFunctionData(functionFragment: 'currentAskForToken', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'isValidBid', values: [BigNumberish, BigNumberish]): string
  encodeFunctionData(
    functionFragment: 'isValidBidShares',
    values: [
      {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
    ],
  ): string
  encodeFunctionData(functionFragment: 'mediaContract', values?: undefined): string
  encodeFunctionData(functionFragment: 'removeAsk', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'removeBid', values: [BigNumberish, string]): string
  encodeFunctionData(
    functionFragment: 'setAsk',
    values: [BigNumberish, { amount: BigNumberish; currency: string }],
  ): string
  encodeFunctionData(
    functionFragment: 'setBid',
    values: [
      BigNumberish,
      {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      string,
    ],
  ): string
  encodeFunctionData(
    functionFragment: 'setBidShares',
    values: [
      BigNumberish,
      {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
    ],
  ): string
  encodeFunctionData(functionFragment: 'splitShare', values: [{ value: BigNumberish }, BigNumberish]): string

  decodeFunctionResult(functionFragment: 'acceptBid', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'bidForTokenBidder', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'bidSharesForToken', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'configure', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'currentAskForToken', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isValidBid', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isValidBidShares', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'mediaContract', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'removeAsk', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'removeBid', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setAsk', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setBid', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setBidShares', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'splitShare', data: BytesLike): Result

  events: {
    'AskCreated(uint256,tuple)': EventFragment
    'AskRemoved(uint256,tuple)': EventFragment
    'BidCreated(uint256,tuple)': EventFragment
    'BidFinalized(uint256,tuple)': EventFragment
    'BidRemoved(uint256,tuple)': EventFragment
    'BidShareUpdated(uint256,tuple)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'AskCreated'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'AskRemoved'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'BidCreated'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'BidFinalized'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'BidRemoved'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'BidShareUpdated'): EventFragment
}

export class Market extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: MarketInterface

  functions: {
    acceptBid(
      tokenId: BigNumberish,
      expectedBid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'acceptBid(uint256,tuple)'(
      tokenId: BigNumberish,
      expectedBid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    bidForTokenBidder(
      tokenId: BigNumberish,
      bidder: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: {
        amount: BigNumber
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumber; 0: BigNumber }
        0: BigNumber
        1: string
        2: string
        3: string
        4: { value: BigNumber; 0: BigNumber }
      }
    }>

    'bidForTokenBidder(uint256,address)'(
      tokenId: BigNumberish,
      bidder: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: {
        amount: BigNumber
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumber; 0: BigNumber }
        0: BigNumber
        1: string
        2: string
        3: string
        4: { value: BigNumber; 0: BigNumber }
      }
    }>

    bidSharesForToken(
      tokenId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: {
        prevOwner: { value: BigNumber; 0: BigNumber }
        creator: { value: BigNumber; 0: BigNumber }
        owner: { value: BigNumber; 0: BigNumber }
        0: { value: BigNumber; 0: BigNumber }
        1: { value: BigNumber; 0: BigNumber }
        2: { value: BigNumber; 0: BigNumber }
      }
    }>

    'bidSharesForToken(uint256)'(
      tokenId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: {
        prevOwner: { value: BigNumber; 0: BigNumber }
        creator: { value: BigNumber; 0: BigNumber }
        owner: { value: BigNumber; 0: BigNumber }
        0: { value: BigNumber; 0: BigNumber }
        1: { value: BigNumber; 0: BigNumber }
        2: { value: BigNumber; 0: BigNumber }
      }
    }>

    configure(mediaContractAddress: string, overrides?: Overrides): Promise<ContractTransaction>

    'configure(address)'(mediaContractAddress: string, overrides?: Overrides): Promise<ContractTransaction>

    currentAskForToken(
      tokenId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: { amount: BigNumber; currency: string; 0: BigNumber; 1: string }
    }>

    'currentAskForToken(uint256)'(
      tokenId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: { amount: BigNumber; currency: string; 0: BigNumber; 1: string }
    }>

    isValidBid(
      tokenId: BigNumberish,
      bidAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: boolean
    }>

    'isValidBid(uint256,uint256)'(
      tokenId: BigNumberish,
      bidAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: boolean
    }>

    isValidBidShares(
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: CallOverrides,
    ): Promise<{
      0: boolean
    }>

    'isValidBidShares(tuple)'(
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: CallOverrides,
    ): Promise<{
      0: boolean
    }>

    mediaContract(overrides?: CallOverrides): Promise<{
      0: string
    }>

    'mediaContract()'(overrides?: CallOverrides): Promise<{
      0: string
    }>

    removeAsk(tokenId: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    'removeAsk(uint256)'(tokenId: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

    removeBid(tokenId: BigNumberish, bidder: string, overrides?: Overrides): Promise<ContractTransaction>

    'removeBid(uint256,address)'(
      tokenId: BigNumberish,
      bidder: string,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    setAsk(
      tokenId: BigNumberish,
      ask: { amount: BigNumberish; currency: string },
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'setAsk(uint256,tuple)'(
      tokenId: BigNumberish,
      ask: { amount: BigNumberish; currency: string },
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    setBid(
      tokenId: BigNumberish,
      bid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      spender: string,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'setBid(uint256,tuple,address)'(
      tokenId: BigNumberish,
      bid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      spender: string,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    setBidShares(
      tokenId: BigNumberish,
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'setBidShares(uint256,tuple)'(
      tokenId: BigNumberish,
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    splitShare(
      sharePercentage: { value: BigNumberish },
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    'splitShare(tuple,uint256)'(
      sharePercentage: { value: BigNumberish },
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>
  }

  acceptBid(
    tokenId: BigNumberish,
    expectedBid: {
      amount: BigNumberish
      currency: string
      bidder: string
      recipient: string
      sellOnShare: { value: BigNumberish }
    },
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'acceptBid(uint256,tuple)'(
    tokenId: BigNumberish,
    expectedBid: {
      amount: BigNumberish
      currency: string
      bidder: string
      recipient: string
      sellOnShare: { value: BigNumberish }
    },
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  bidForTokenBidder(
    tokenId: BigNumberish,
    bidder: string,
    overrides?: CallOverrides,
  ): Promise<{
    amount: BigNumber
    currency: string
    bidder: string
    recipient: string
    sellOnShare: { value: BigNumber; 0: BigNumber }
    0: BigNumber
    1: string
    2: string
    3: string
    4: { value: BigNumber; 0: BigNumber }
  }>

  'bidForTokenBidder(uint256,address)'(
    tokenId: BigNumberish,
    bidder: string,
    overrides?: CallOverrides,
  ): Promise<{
    amount: BigNumber
    currency: string
    bidder: string
    recipient: string
    sellOnShare: { value: BigNumber; 0: BigNumber }
    0: BigNumber
    1: string
    2: string
    3: string
    4: { value: BigNumber; 0: BigNumber }
  }>

  bidSharesForToken(
    tokenId: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<{
    prevOwner: { value: BigNumber; 0: BigNumber }
    creator: { value: BigNumber; 0: BigNumber }
    owner: { value: BigNumber; 0: BigNumber }
    0: { value: BigNumber; 0: BigNumber }
    1: { value: BigNumber; 0: BigNumber }
    2: { value: BigNumber; 0: BigNumber }
  }>

  'bidSharesForToken(uint256)'(
    tokenId: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<{
    prevOwner: { value: BigNumber; 0: BigNumber }
    creator: { value: BigNumber; 0: BigNumber }
    owner: { value: BigNumber; 0: BigNumber }
    0: { value: BigNumber; 0: BigNumber }
    1: { value: BigNumber; 0: BigNumber }
    2: { value: BigNumber; 0: BigNumber }
  }>

  configure(mediaContractAddress: string, overrides?: Overrides): Promise<ContractTransaction>

  'configure(address)'(mediaContractAddress: string, overrides?: Overrides): Promise<ContractTransaction>

  currentAskForToken(
    tokenId: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<{ amount: BigNumber; currency: string; 0: BigNumber; 1: string }>

  'currentAskForToken(uint256)'(
    tokenId: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<{ amount: BigNumber; currency: string; 0: BigNumber; 1: string }>

  isValidBid(tokenId: BigNumberish, bidAmount: BigNumberish, overrides?: CallOverrides): Promise<boolean>

  'isValidBid(uint256,uint256)'(
    tokenId: BigNumberish,
    bidAmount: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<boolean>

  isValidBidShares(
    bidShares: {
      prevOwner: { value: BigNumberish }
      creator: { value: BigNumberish }
      owner: { value: BigNumberish }
    },
    overrides?: CallOverrides,
  ): Promise<boolean>

  'isValidBidShares(tuple)'(
    bidShares: {
      prevOwner: { value: BigNumberish }
      creator: { value: BigNumberish }
      owner: { value: BigNumberish }
    },
    overrides?: CallOverrides,
  ): Promise<boolean>

  mediaContract(overrides?: CallOverrides): Promise<string>

  'mediaContract()'(overrides?: CallOverrides): Promise<string>

  removeAsk(tokenId: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  'removeAsk(uint256)'(tokenId: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>

  removeBid(tokenId: BigNumberish, bidder: string, overrides?: Overrides): Promise<ContractTransaction>

  'removeBid(uint256,address)'(
    tokenId: BigNumberish,
    bidder: string,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  setAsk(
    tokenId: BigNumberish,
    ask: { amount: BigNumberish; currency: string },
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'setAsk(uint256,tuple)'(
    tokenId: BigNumberish,
    ask: { amount: BigNumberish; currency: string },
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  setBid(
    tokenId: BigNumberish,
    bid: {
      amount: BigNumberish
      currency: string
      bidder: string
      recipient: string
      sellOnShare: { value: BigNumberish }
    },
    spender: string,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'setBid(uint256,tuple,address)'(
    tokenId: BigNumberish,
    bid: {
      amount: BigNumberish
      currency: string
      bidder: string
      recipient: string
      sellOnShare: { value: BigNumberish }
    },
    spender: string,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  setBidShares(
    tokenId: BigNumberish,
    bidShares: {
      prevOwner: { value: BigNumberish }
      creator: { value: BigNumberish }
      owner: { value: BigNumberish }
    },
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'setBidShares(uint256,tuple)'(
    tokenId: BigNumberish,
    bidShares: {
      prevOwner: { value: BigNumberish }
      creator: { value: BigNumberish }
      owner: { value: BigNumberish }
    },
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  splitShare(
    sharePercentage: { value: BigNumberish },
    amount: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>

  'splitShare(tuple,uint256)'(
    sharePercentage: { value: BigNumberish },
    amount: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>

  callStatic: {
    acceptBid(
      tokenId: BigNumberish,
      expectedBid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      overrides?: CallOverrides,
    ): Promise<void>

    'acceptBid(uint256,tuple)'(
      tokenId: BigNumberish,
      expectedBid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      overrides?: CallOverrides,
    ): Promise<void>

    bidForTokenBidder(
      tokenId: BigNumberish,
      bidder: string,
      overrides?: CallOverrides,
    ): Promise<{
      amount: BigNumber
      currency: string
      bidder: string
      recipient: string
      sellOnShare: { value: BigNumber; 0: BigNumber }
      0: BigNumber
      1: string
      2: string
      3: string
      4: { value: BigNumber; 0: BigNumber }
    }>

    'bidForTokenBidder(uint256,address)'(
      tokenId: BigNumberish,
      bidder: string,
      overrides?: CallOverrides,
    ): Promise<{
      amount: BigNumber
      currency: string
      bidder: string
      recipient: string
      sellOnShare: { value: BigNumber; 0: BigNumber }
      0: BigNumber
      1: string
      2: string
      3: string
      4: { value: BigNumber; 0: BigNumber }
    }>

    bidSharesForToken(
      tokenId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      prevOwner: { value: BigNumber; 0: BigNumber }
      creator: { value: BigNumber; 0: BigNumber }
      owner: { value: BigNumber; 0: BigNumber }
      0: { value: BigNumber; 0: BigNumber }
      1: { value: BigNumber; 0: BigNumber }
      2: { value: BigNumber; 0: BigNumber }
    }>

    'bidSharesForToken(uint256)'(
      tokenId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      prevOwner: { value: BigNumber; 0: BigNumber }
      creator: { value: BigNumber; 0: BigNumber }
      owner: { value: BigNumber; 0: BigNumber }
      0: { value: BigNumber; 0: BigNumber }
      1: { value: BigNumber; 0: BigNumber }
      2: { value: BigNumber; 0: BigNumber }
    }>

    configure(mediaContractAddress: string, overrides?: CallOverrides): Promise<void>

    'configure(address)'(mediaContractAddress: string, overrides?: CallOverrides): Promise<void>

    currentAskForToken(
      tokenId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      amount: BigNumber
      currency: string
      0: BigNumber
      1: string
    }>

    'currentAskForToken(uint256)'(
      tokenId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      amount: BigNumber
      currency: string
      0: BigNumber
      1: string
    }>

    isValidBid(tokenId: BigNumberish, bidAmount: BigNumberish, overrides?: CallOverrides): Promise<boolean>

    'isValidBid(uint256,uint256)'(
      tokenId: BigNumberish,
      bidAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>

    isValidBidShares(
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: CallOverrides,
    ): Promise<boolean>

    'isValidBidShares(tuple)'(
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: CallOverrides,
    ): Promise<boolean>

    mediaContract(overrides?: CallOverrides): Promise<string>

    'mediaContract()'(overrides?: CallOverrides): Promise<string>

    removeAsk(tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>

    'removeAsk(uint256)'(tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>

    removeBid(tokenId: BigNumberish, bidder: string, overrides?: CallOverrides): Promise<void>

    'removeBid(uint256,address)'(tokenId: BigNumberish, bidder: string, overrides?: CallOverrides): Promise<void>

    setAsk(
      tokenId: BigNumberish,
      ask: { amount: BigNumberish; currency: string },
      overrides?: CallOverrides,
    ): Promise<void>

    'setAsk(uint256,tuple)'(
      tokenId: BigNumberish,
      ask: { amount: BigNumberish; currency: string },
      overrides?: CallOverrides,
    ): Promise<void>

    setBid(
      tokenId: BigNumberish,
      bid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      spender: string,
      overrides?: CallOverrides,
    ): Promise<void>

    'setBid(uint256,tuple,address)'(
      tokenId: BigNumberish,
      bid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      spender: string,
      overrides?: CallOverrides,
    ): Promise<void>

    setBidShares(
      tokenId: BigNumberish,
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: CallOverrides,
    ): Promise<void>

    'setBidShares(uint256,tuple)'(
      tokenId: BigNumberish,
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: CallOverrides,
    ): Promise<void>

    splitShare(
      sharePercentage: { value: BigNumberish },
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'splitShare(tuple,uint256)'(
      sharePercentage: { value: BigNumberish },
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>
  }

  filters: {
    AskCreated(tokenId: BigNumberish | null, ask: null): EventFilter

    AskRemoved(tokenId: BigNumberish | null, ask: null): EventFilter

    BidCreated(tokenId: BigNumberish | null, bid: null): EventFilter

    BidFinalized(tokenId: BigNumberish | null, bid: null): EventFilter

    BidRemoved(tokenId: BigNumberish | null, bid: null): EventFilter

    BidShareUpdated(tokenId: BigNumberish | null, bidShares: null): EventFilter
  }

  estimateGas: {
    acceptBid(
      tokenId: BigNumberish,
      expectedBid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      overrides?: Overrides,
    ): Promise<BigNumber>

    'acceptBid(uint256,tuple)'(
      tokenId: BigNumberish,
      expectedBid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      overrides?: Overrides,
    ): Promise<BigNumber>

    bidForTokenBidder(tokenId: BigNumberish, bidder: string, overrides?: CallOverrides): Promise<BigNumber>

    'bidForTokenBidder(uint256,address)'(
      tokenId: BigNumberish,
      bidder: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    bidSharesForToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    'bidSharesForToken(uint256)'(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    configure(mediaContractAddress: string, overrides?: Overrides): Promise<BigNumber>

    'configure(address)'(mediaContractAddress: string, overrides?: Overrides): Promise<BigNumber>

    currentAskForToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    'currentAskForToken(uint256)'(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    isValidBid(tokenId: BigNumberish, bidAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    'isValidBid(uint256,uint256)'(
      tokenId: BigNumberish,
      bidAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    isValidBidShares(
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'isValidBidShares(tuple)'(
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    mediaContract(overrides?: CallOverrides): Promise<BigNumber>

    'mediaContract()'(overrides?: CallOverrides): Promise<BigNumber>

    removeAsk(tokenId: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    'removeAsk(uint256)'(tokenId: BigNumberish, overrides?: Overrides): Promise<BigNumber>

    removeBid(tokenId: BigNumberish, bidder: string, overrides?: Overrides): Promise<BigNumber>

    'removeBid(uint256,address)'(tokenId: BigNumberish, bidder: string, overrides?: Overrides): Promise<BigNumber>

    setAsk(
      tokenId: BigNumberish,
      ask: { amount: BigNumberish; currency: string },
      overrides?: Overrides,
    ): Promise<BigNumber>

    'setAsk(uint256,tuple)'(
      tokenId: BigNumberish,
      ask: { amount: BigNumberish; currency: string },
      overrides?: Overrides,
    ): Promise<BigNumber>

    setBid(
      tokenId: BigNumberish,
      bid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      spender: string,
      overrides?: Overrides,
    ): Promise<BigNumber>

    'setBid(uint256,tuple,address)'(
      tokenId: BigNumberish,
      bid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      spender: string,
      overrides?: Overrides,
    ): Promise<BigNumber>

    setBidShares(
      tokenId: BigNumberish,
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: Overrides,
    ): Promise<BigNumber>

    'setBidShares(uint256,tuple)'(
      tokenId: BigNumberish,
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: Overrides,
    ): Promise<BigNumber>

    splitShare(
      sharePercentage: { value: BigNumberish },
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'splitShare(tuple,uint256)'(
      sharePercentage: { value: BigNumberish },
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>
  }

  populateTransaction: {
    acceptBid(
      tokenId: BigNumberish,
      expectedBid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'acceptBid(uint256,tuple)'(
      tokenId: BigNumberish,
      expectedBid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    bidForTokenBidder(tokenId: BigNumberish, bidder: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'bidForTokenBidder(uint256,address)'(
      tokenId: BigNumberish,
      bidder: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    bidSharesForToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'bidSharesForToken(uint256)'(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    configure(mediaContractAddress: string, overrides?: Overrides): Promise<PopulatedTransaction>

    'configure(address)'(mediaContractAddress: string, overrides?: Overrides): Promise<PopulatedTransaction>

    currentAskForToken(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'currentAskForToken(uint256)'(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    isValidBid(tokenId: BigNumberish, bidAmount: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'isValidBid(uint256,uint256)'(
      tokenId: BigNumberish,
      bidAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    isValidBidShares(
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'isValidBidShares(tuple)'(
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    mediaContract(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'mediaContract()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    removeAsk(tokenId: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    'removeAsk(uint256)'(tokenId: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>

    removeBid(tokenId: BigNumberish, bidder: string, overrides?: Overrides): Promise<PopulatedTransaction>

    'removeBid(uint256,address)'(
      tokenId: BigNumberish,
      bidder: string,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    setAsk(
      tokenId: BigNumberish,
      ask: { amount: BigNumberish; currency: string },
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'setAsk(uint256,tuple)'(
      tokenId: BigNumberish,
      ask: { amount: BigNumberish; currency: string },
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    setBid(
      tokenId: BigNumberish,
      bid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      spender: string,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'setBid(uint256,tuple,address)'(
      tokenId: BigNumberish,
      bid: {
        amount: BigNumberish
        currency: string
        bidder: string
        recipient: string
        sellOnShare: { value: BigNumberish }
      },
      spender: string,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    setBidShares(
      tokenId: BigNumberish,
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'setBidShares(uint256,tuple)'(
      tokenId: BigNumberish,
      bidShares: {
        prevOwner: { value: BigNumberish }
        creator: { value: BigNumberish }
        owner: { value: BigNumberish }
      },
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    splitShare(
      sharePercentage: { value: BigNumberish },
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'splitShare(tuple,uint256)'(
      sharePercentage: { value: BigNumberish },
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>
  }
}
