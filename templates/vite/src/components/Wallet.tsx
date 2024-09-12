import Button from "./Button";
import { useDisconnect, useWallet, useBalance } from "@fuels/react";
import { useEffect } from "react";
import { useRouter } from "../hooks/useRouter";
import LocalFaucet from "./LocalFaucet";

export default function Wallet() {
  const { setRoute } = useRouter();
  const { disconnect } = useDisconnect();
  const { wallet } = useWallet();
  const address = wallet?.address.toB256() || "";
  const { balance, refetch } = useBalance({ address });

  useEffect(() => {
    const interval = setInterval(() => refetch(), 1000);
    return () => clearInterval(interval);
  }, [refetch]);

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
          <Button onClick={() => disconnect()} className="w-1/3">
            Disconnect
          </Button>
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
          <Button onClick={() => setRoute("faucet")} className="w-1/3">
            Faucet
          </Button>
        </div>
      </div>
      <div>
        <p>
          Fuel supports a range of wallets. This dApp utilizes wallet connectors
          to provide simple wallet integration. You can read more about them{" "}
          <a
            href="https://docs.fuel.network/docs/wallet/dev/connectors/"
            className="text-green-500/80 transition-colors hover:text-green-500"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>
      <LocalFaucet />
    </>
  );
}
