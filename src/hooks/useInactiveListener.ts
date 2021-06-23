import { useEffect } from 'react'
import { useActiveWeb3React } from './wallet';

export function useInactiveListener(suppress = false) {
    const { error, account } = useActiveWeb3React()

    useEffect(() => {
        if (suppress) {
            return () => { };
        }
        const { ethereum } = window as any;
        if (ethereum && ethereum.on && !error) {
            const handleChainChanged = (chainId: any) => {
                console.log("chainChanged", chainId);
            };

            const handleAccountsChanged = (accounts: any) => {
                console.log("accountsChanged", accounts);
            };

            const handleNetworkChanged = (networkId: any) => {
                console.log("networkChanged", networkId);
            };

            ethereum.on("chainChanged", handleChainChanged);
            ethereum.on("accountsChanged", handleAccountsChanged);
            ethereum.on("networkChanged", handleNetworkChanged);

            const timer = setInterval(() => {
                console.log('account', account)
            }, 2000)

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener("chainChanged", handleChainChanged);
                    ethereum.removeListener("accountsChanged", handleAccountsChanged);
                    ethereum.removeListener("networkChanged", handleNetworkChanged);
                    console.log('clear')
                    clearInterval(timer)

                }
            };
        }

        return () => { };
    }, [account, error, suppress]);
}