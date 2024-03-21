import { useEffect, useState } from "react";
import { useBrowserWallet } from "./useBrowserWallet";
import { useBurnerWallet } from "./useBurnerWallet";

/**
 * burner -> a burner wallet embedded inside of the template app and stored in local storage
 * browser -> a wallet connected via a browser extension like the Fuel Wallet
 */
type WalletTypes = "burner" | "browser";

export const useActiveWallet = () => {
  const { burnerWallet, burnerWalletBalance, refreshBurnerWalletBalance } =
    useBurnerWallet();
  const {
    browserWallet,
    browserWalletBalance,
    refreshBrowserWalletBalance,
    isBrowserWalletConnected,
  } = useBrowserWallet();

  const [activeWallet, setActiveWallet] = useState<WalletTypes>("burner");

  useEffect(() => {
    if (isBrowserWalletConnected) {
      setActiveWallet("browser");
      refreshBrowserWalletBalance?.();
    } else {
      setActiveWallet("burner");
      refreshBurnerWalletBalance?.();
    }
  }, [isBrowserWalletConnected]);

  return {
    wallet: activeWallet === "browser" ? browserWallet : burnerWallet,
    walletBalance:
      activeWallet === "browser" ? browserWalletBalance : burnerWalletBalance,
    refreshWalletBalance:
      activeWallet == "browser"
        ? refreshBrowserWalletBalance
        : refreshBurnerWalletBalance,
  };
};
