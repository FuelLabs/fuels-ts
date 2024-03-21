import { useIsConnected, useNetwork, useWallet } from "@fuel-wallet/react";
import { BN, WalletLocked } from "fuels";
import { useCallback, useState } from "react";
import useAsync from "react-use/lib/useAsync";

export const useBrowserWallet = () => {
  const { wallet }: { wallet: WalletLocked } = useWallet();
  const [browserWalletBalance, setBrowserWalletBalance] = useState<BN>();
  const { isConnected } = useIsConnected();
  const { network } = useNetwork();

  useAsync(async () => {
    if (wallet) {
      await wallet.getBalance().then(setBrowserWalletBalance);
    }
  }, [wallet]);

  const refreshBrowserWalletBalance = useCallback(async () => {
    if (wallet) {
      const browserWalletBalance = await wallet.getBalance();
      setBrowserWalletBalance(browserWalletBalance);
    }
  }, [wallet]);

  return {
    browserWallet: wallet,
    browserWalletBalance,
    refreshBrowserWalletBalance,
    isBrowserWalletConnected: isConnected,
    browserWalletNetwork: network,
  };
};
