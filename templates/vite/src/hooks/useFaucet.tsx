import { FAUCET_PRIVATE_KEY, NODE_URL } from "../lib";
import { Provider, Wallet, WalletUnlocked } from "fuels";
import { useState } from "react";
import useAsync from "react-use/lib/useAsync";

/**
 * This hook returns an instance of a faucet wallet.
 * The value of `FAUCET_PRIVATE_KEY` depends on your chain config.
 */
export const useFaucet = () => {
  const [faucetWallet, setFaucetWallet] = useState<WalletUnlocked>();

  useAsync(async () => {
    if (!faucetWallet) {
      const provider = await Provider.create(NODE_URL);
      const wallet = Wallet.fromPrivateKey(FAUCET_PRIVATE_KEY, provider);
      setFaucetWallet(wallet);
    }
  }, [faucetWallet]);

  return {
    faucetWallet,
  };
};
