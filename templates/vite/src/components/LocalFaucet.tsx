import { bn, sleep, WalletUnlocked } from "fuels";
import Button from "./Button";
import { useWallet } from "@fuels/react";
import { useProvider } from "../hooks/useProvider";
import { toast } from "react-toastify";
import { useState } from "react";

export default function LocalFaucet() {
  const [isLoading, setIsLoading] = useState(false);

  const { wallet } = useWallet();
  const { provider } = useProvider();

  async function localTransfer() {
    if (!wallet) return;
    setIsLoading(true);
    try {
      const genesis = new WalletUnlocked(
        process.env.VITE_GENESIS_WALLET_PRIVATE_KEY as string,
        provider,
      );
      const tx = await genesis.transfer(wallet.address, bn(5_000_000_000));
      toast.info(`Transaction submitted: ${tx.id}`);
      await tx.waitForResult();
      toast.success(`Transfer successful: ${tx.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Error transferring funds");
    }
    setIsLoading(false);
  }

  return (
    <>
      <hr className="border-zinc-700" />
      <div>
        <div className="flex items-center justify-between text-base md:text-[17px] dark:text-zinc-50">
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
