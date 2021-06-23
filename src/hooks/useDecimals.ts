import { Web3Provider } from "@ethersproject/providers"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useWallet } from "use-wallet"
import { provider } from 'web3-core'
import { getERC20Contract } from "../utils/ethers"

const useDecimals = (tokenAddress: string) => {
    const [decimals, setDecimals] = useState("18")
    const { account, ethereum } = useWallet()

    const contract = useMemo(() => {
      return getERC20Contract(tokenAddress, ethereum as Web3Provider)
    }, [ethereum, tokenAddress])

    const fetchTotalSupply = useCallback(async () => {
        const totalSupply = await contract.methods.decimals().call()
        setDecimals(totalSupply)
    }, [contract])

    useEffect(() => {
      if (account && contract) {
        fetchTotalSupply()
      }
    }, [account, fetchTotalSupply, contract, setDecimals])

    return decimals
}

export default useDecimals
