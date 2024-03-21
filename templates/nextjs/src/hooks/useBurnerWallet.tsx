import { NODE_URL } from "@/lib";
import { BN, Provider, Wallet, WalletUnlocked } from "fuels";
import { useCallback, useEffect, useState } from "react";

const BURNER_WALLET_LOCAL_STORAGE_KEY = "create-fuels-burner-wallet-pk";

export const useBurnerWallet = () => {
  const [burnerWallet, setBurnerWallet] = useState<WalletUnlocked>();
  const [burnerWalletBalance, setBurnerWalletBalance] = useState<BN>();

  useEffect(() => {
    (async () => {
      // check if burner wallet pk is stored in local storage
      const burnerWalletPk = localStorage.getItem(
        BURNER_WALLET_LOCAL_STORAGE_KEY,
      );

      let wallet: WalletUnlocked;

      if (burnerWalletPk) {
        const provider = await Provider.create(NODE_URL);
        wallet = Wallet.fromPrivateKey(burnerWalletPk, provider);
        setBurnerWallet(wallet);
      } else {
        // if not, create a new burner wallet
        const provider = await Provider.create(NODE_URL);
        wallet = Wallet.generate({ provider });

        localStorage.setItem(
          BURNER_WALLET_LOCAL_STORAGE_KEY,
          wallet.privateKey,
        );
        setBurnerWallet(wallet);
      }

      const burnerWalletBalance = await wallet?.getBalance();
      setBurnerWalletBalance(burnerWalletBalance);
    })().catch(console.error);
  }, []);

  const refreshBurnerWalletBalance = useCallback(async () => {
    const burnerWalletBalance = await burnerWallet?.getBalance();
    setBurnerWalletBalance(burnerWalletBalance);
  }, [burnerWallet]);

  return {
    burnerWallet,
    burnerWalletBalance,
    refreshBurnerWalletBalance,
  };
};
