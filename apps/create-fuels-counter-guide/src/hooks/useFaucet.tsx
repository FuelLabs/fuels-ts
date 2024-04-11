import { NODE_URL } from "@/lib";
import { Provider, Wallet, WalletUnlocked } from "fuels";
import { useState } from "react";
import useAsync from "react-use/lib/useAsync";

export const useFaucet = () => {
  const [faucetWallet, setFaucetWallet] = useState<WalletUnlocked>();

  useAsync(async () => {
    if (!faucetWallet) {
      const provider = await Provider.create(NODE_URL);
      const wallet = Wallet.fromPrivateKey("0x01", provider);
      setFaucetWallet(wallet);
    }
  }, [faucetWallet]);

  return {
    faucetWallet,
  };
};
