import { Address, bn, WalletUnlocked } from "fuels";
import { useWallet } from "@fuels/react";
import { useState } from "react";

import Button from "./Button";
import { useNotification } from "../hooks/useNotification.tsx";

type Props = {
  refetch: () => void;
  addressToFund?: string;
};

export default function LocalFaucet({ refetch, addressToFund }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    errorNotification,
    transactionSubmitNotification,
    transactionSuccessNotification,
  } = useNotification();

  const { wallet } = useWallet();

  async function localTransfer() {
    if (!wallet) return;
    setIsLoading(true);
    try {
      const genesis = new WalletUnlocked(
        process.env.VITE_GENESIS_WALLET_PRIVATE_KEY as string,
        wallet.provider,
      );
      const tx = await genesis.transfer(
        Address.fromB256(addressToFund || wallet.address.toB256()),
        bn(5_000_000_000),
      );
      transactionSubmitNotification(tx.id);
      await tx.waitForResult();
      transactionSuccessNotification(tx.id);
    } catch (error) {
      console.error(error);
      errorNotification("Error transferring funds.");
    }
    setIsLoading(false);
    refetch();
  }

  return (
    <>
      <hr className="border-zinc-700" />
      <div>
        <div className="flex items-center justify-between text-base dark:text-zinc-50">
          <p className="w-2/3 px-2 py-1 mr-3 font-mono text-xs">
            As the dApp is running locally, you can transfer 5 ETH to your
            address via the genesis wallet.
          </p>
          <Button
            onClick={localTransfer}
            className="w-1/3"
            disabled={isLoading}
          >
            Transfer 5 ETH
          </Button>
        </div>
      </div>
    </>
  );
}
