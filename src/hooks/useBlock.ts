import { useEffect, useState } from 'react'
import { useActiveWeb3React } from './wallet'
// import debounce from 'debounce'

const useBlock = () => {
  const [block, setBlock] = useState(0)
  const { library: ethereum } = useActiveWeb3React()

  useEffect(() => {
    // const setBlockDebounced = debounce(setBlock, 300)
    if (!ethereum) return

    // const subscription = new Web3(ethereum).eth.subscribe(
    //   'newBlockHeaders',
    //   (error, result) => {
    //     if (!error) {
    //       setBlockDebounced(result.number)
    //     }
    //   },
    // )

    const interval = setInterval(async () => {
      const latestBlockNumber = await ethereum.getBlockNumber()
      if (block !== latestBlockNumber) {
        setBlock(latestBlockNumber)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [block, ethereum])

  return block
}

export default useBlock
