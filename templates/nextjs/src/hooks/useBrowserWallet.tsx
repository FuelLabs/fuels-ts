import { useIsConnected, useNetwork, useWallet } from "@fuel-wallet/react";
import { BN, WalletLocked } from "fuels";
import { useCallback, useEffect, useState } from "react";

export const useBrowserWallet = () => {
  const { wallet }: { wallet: WalletLocked } = useWallet();
  const [browserWalletBalance, setBrowserWalletBalance] = useState<BN>();
  const { isConnected } = useIsConnected();
  const { network } = useNetwork();

  useEffect(() => {
    if (wallet) {
      wallet.getBalance().then(setBrowserWalletBalance);
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
