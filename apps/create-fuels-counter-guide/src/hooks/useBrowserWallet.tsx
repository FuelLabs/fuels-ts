import { AppWallet } from "../lib";
import { useIsConnected, useNetwork, useWallet } from "@fuels/react";
import { BN } from "fuels";
import { useCallback, useState } from "react";
import useAsync from "react-use/lib/useAsync";

interface BrowserWallet extends AppWallet {
  isConnected: boolean | null;
  network: any;
}

/**
 * This hook returns an instance of the browser wallet connected via
 * any of the supported connectors.
 **/
export const useBrowserWallet: () => BrowserWallet = () => {
  const { wallet } = useWallet();
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
    wallet: wallet || undefined,
    walletBalance: browserWalletBalance,
    refreshWalletBalance: refreshBrowserWalletBalance,
    isConnected,
    network,
  };
};
