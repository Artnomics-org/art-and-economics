import { ChainId, Token, WETH } from '@art-economics/swap-sdk'

// the Uniswap Default token list lives here
export const DEFAULT_TOKEN_LIST_URL =
  'https://unpkg.com/@art-economics/default-token-list@latest/build/ane-default.tokenlist.json'

export const DEFAULT_LIST_OF_LISTS: string[] = [DEFAULT_TOKEN_LIST_URL]

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

type ChainPairList = {
  readonly [chainId in ChainId]?: [Token, Token][]
}

// ETH Main
export const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const CDAI = new Token(ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai')
export const CUSDC = new Token(
  ChainId.MAINNET,
  '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
  8,
  'cUSDC',
  'Compound USD Coin',
)
export const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')
export const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
export const COMP = new Token(ChainId.MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound')
export const MKR = new Token(ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker')
export const AMPL = new Token(ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')
// BSC Main
export const BUSD = new Token(
  ChainId.BSC_MAINNET,
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  18,
  'BUSD',
  'BUSD Token',
)
export const B_DAI = new Token(
  ChainId.BSC_MAINNET,
  '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
  18,
  'DAI',
  'Dai Token',
)
export const B_USDT = new Token(
  ChainId.BSC_MAINNET,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  'Tether USD',
)
export const ANE = new Token(ChainId.BSC_MAINNET, '0x244c22d4bB6f27D82A4240Ed8F4662f0B398A7f1', 18, 'ANE', 'Artnomics')
// BSC Test
export const T_BUSD = new Token(
  ChainId.BSC_TESTNET,
  '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
  6,
  'BUSD',
  'BUSD Token',
)
export const T_DAI = new Token(
  ChainId.BSC_TESTNET,
  '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867',
  18,
  'DAI',
  'Dai Token',
)
export const T_USDT = new Token(
  ChainId.BSC_TESTNET,
  '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
  6,
  'USDT',
  'Tether USD',
)

export const PINNED_PAIRS: ChainPairList = {
  [ChainId.MAINNET]: [
    [CDAI, CUSDC],
    [USDC, USDT],
    [DAI, USDT],
  ],
}

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WETH[ChainId.KOVAN]],
  [ChainId.BSC_MAINNET]: [WETH[ChainId.BSC_MAINNET]],
  [ChainId.BSC_TESTNET]: [WETH[ChainId.BSC_TESTNET]],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT],
  [ChainId.BSC_MAINNET]: [...WETH_ONLY[ChainId.BSC_MAINNET], ANE, B_USDT, BUSD, B_DAI],
  [ChainId.BSC_TESTNET]: [...WETH_ONLY[ChainId.BSC_TESTNET], T_USDT, T_BUSD, T_DAI],
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT],
  [ChainId.BSC_MAINNET]: [...WETH_ONLY[ChainId.BSC_MAINNET], ANE, B_DAI, BUSD, B_USDT],
  [ChainId.BSC_TESTNET]: [...WETH_ONLY[ChainId.BSC_TESTNET], T_DAI, T_BUSD, T_USDT],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, COMP, MKR],
  [ChainId.BSC_MAINNET]: [...WETH_ONLY[ChainId.BSC_MAINNET], ANE, B_DAI, BUSD, B_USDT],
  [ChainId.BSC_TESTNET]: [...WETH_ONLY[ChainId.BSC_TESTNET], T_DAI, T_BUSD, T_USDT],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    [AMPL.address]: [DAI, WETH[ChainId.MAINNET]],
  },
}
