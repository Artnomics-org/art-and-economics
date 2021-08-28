/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="react-scripts" />

declare module 'fortmatic'

interface Window {
  ethereum?: {
    isMetaMask?: true
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
  }
  web3?: Record<string, unknown>
}

declare module 'jazzicon' {
  export default function (diameter: number, seed: number): HTMLElement
}
