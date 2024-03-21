import { NODE_URL } from "@/lib";
import { Provider, Wallet, WalletUnlocked } from "fuels";
import { useEffect, useState } from "react";

export const useFaucet = () => {
  const [faucetWallet, setFaucetWallet] = useState<WalletUnlocked>();

  useEffect(() => {
    (async () => {
      if (!faucetWallet) {
        const provider = await Provider.create(NODE_URL);
        const wallet = Wallet.fromPrivateKey("0x01", provider);
        setFaucetWallet(wallet);
      }
    })().catch(console.error);
  }, [faucetWallet]);

  return {
    faucetWallet,
  };
};
