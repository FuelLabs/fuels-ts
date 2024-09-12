import { useBalance, useWallet } from "@fuels/react";
import { useEnvironment } from "../hooks/useEnvironment";
import { useEffect } from "react";

export default function Faucet() {
  const { wallet } = useWallet();
  const address = wallet?.address.toB256() || "";

  const { balance, refetch } = useBalance({ address });

  useEffect(() => {
    const interval = setInterval(() => refetch(), 1000);
    return () => clearInterval(interval);
  }, [refetch]);

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
            className="w-full bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
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
            className="w-full bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
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
