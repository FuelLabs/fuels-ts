import { useDisconnect, useWallet, useBalance } from "@fuels/react";
import { useEffect } from "react";

import Button from "./Button";
import LocalFaucet from "./LocalFaucet";
import { isLocal, renderFormattedBalance } from "../lib.tsx";
import { useNotification } from "../hooks/useNotification.tsx";

export default function Wallet() {
  const { disconnect } = useDisconnect();
  const { wallet } = useWallet();
  const address = wallet?.address.toB256() || "";
  const { balance, refetch } = useBalance({ address });
  const { successNotification } = useNotification();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const interval = setInterval(() => refetch(), 5000);
    return () => clearInterval(interval);
  }, [refetch]);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    successNotification("Address copied to clipboard");
  };

  return (
    <>
      <div>
        <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
          Address
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-between text-base dark:text-zinc-50">
          <input
            type="text"
            value={address}
            className="w-full md:w-8/12 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
          <div className="flex mt-1 md:mt-0 items-center justify-between">
            <Button
              color="inactive"
              className="w-[45px] md:w-[70px] mr-1"
              onClick={() => copyAddress()}
            >
              <img src="/copy.svg" alt="Copy" className="w-full" />
            </Button>
            <Button onClick={() => disconnect()} className="w-9/12">
              Disconnect
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
          Balance
        </h3>
        <div className="flex items-center justify-between text-base dark:text-zinc-50">
          <input
            type="text"
            value={balance ? `${renderFormattedBalance(balance)} ETH` : ""}
            className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
          <Button onClick={() => refetch()} className="w-1/3">
            Refresh
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
      {isLocal && <LocalFaucet refetch={refetch} />}
    </>
  );
}
