import { useBalance, useWallet } from "@fuels/react";
import { useEnvironment } from "../hooks/useEnvironment";
import Button from "./Button";

export default function Faucet() {
  const { wallet } = useWallet();
  const address = wallet?.address.toB256() || "";

  const { balance, refetch } = useBalance({ address });

  const { testnetFaucetUrl } = useEnvironment();

  return (
    <>
      <div>
        <h3 className="mb-1 text-sm font-medium md:mb-0 dark:text-zinc-300/70">
          Address
        </h3>
        <div className="flex items-center justify-between text-base md:text-[17px] dark:text-zinc-50">
          <input
            type="text"
            value={address}
            className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
        </div>
      </div>

      <div>
        <h3 className="mb-1 text-sm font-medium md:mb-0 dark:text-zinc-300/70">
          Balance
        </h3>
        <div className="flex items-center justify-between text-base md:text-[17px] dark:text-zinc-50">
          <input
            type="text"
            value={balance ? `${balance?.format()} ETH` : ""}
            className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
          <Button onClick={() => refetch()} className="w-1/3">
            Refetch
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-1 text-sm font-medium md:mb-0 dark:text-zinc-300/70">
          Testnet Faucet
        </h3>

        <iframe
          src={`${testnetFaucetUrl}?address=${address}`}
          title="Faucet"
          className="w-full max-h-screen min-h-[500px] border-0 rounded-md mt-1"
        />
      </div>
    </>
  );
}
