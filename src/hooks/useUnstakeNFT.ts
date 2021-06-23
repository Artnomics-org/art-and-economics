import { useCallback, useMemo } from "react"
import { getAcceleratorContract } from "../utils/nfts"
import useAccelerator from "./useAccelerator"
import { useActiveWeb3React } from "./wallet"

export default (symbol: string) => {
    const { account, library: ethereum } = useActiveWeb3React()
    const accelerator = useAccelerator(symbol)

    const contract = useMemo(() => {
        return getAcceleratorContract(ethereum, accelerator.address)
    }, [accelerator.address, ethereum])

    const handleUnstake = useCallback(
        async () => {
          const call = contract.methods.withdraw().send({ from: account })
          const txHash = call.on('transactionHash', (tx: any) => {
            console.log(tx)
            return tx.transactionHash
          })
          console.log(txHash)
          return txHash
        },
    [account, contract])

    return { onUnstake: handleUnstake }
}
