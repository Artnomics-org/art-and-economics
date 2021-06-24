import { useCallback, useEffect, useMemo, useState } from "react"
import { getAcceleratorContract, getContract } from "../utils/nfts"
import useAccelerator from "./useAccelerator"
import useNFT from "./useNFT"
import { useActiveWeb3React } from "./wallet"

export default (symbol: string) => {
    const { account, library: ethereum } = useActiveWeb3React()

    const accelerator = useAccelerator(symbol)
    const accContract = useMemo(() => {
        return getAcceleratorContract(ethereum, accelerator.address)
    }, [ethereum, accelerator])

    const nft = useNFT(symbol)
    const contract = useMemo(() => {
        return getContract(ethereum, nft.address)
    }, [ethereum, nft])

    const [staked, setStaked] = useState('')
    const [quality, setQuality] = useState('')

    const fetch = useCallback(async () => {
        const staked = await accContract.methods.getStaked(account).call();
        if (staked === '0') {
            setStaked('')
            setQuality('')
            return
        }

        const quality = await contract.methods.qualityOf(staked).call();
        setStaked(staked)
        setQuality(quality)
      }, [account, accContract, contract])

      useEffect(() => {
        if (account && accContract) {
            fetch()
        }
        const refreshInterval = setInterval(fetch, 10000)
        return () => clearInterval(refreshInterval)
      }, [account, symbol, setStaked, accContract, fetch])

    return [staked, quality, fetch] as const
}
