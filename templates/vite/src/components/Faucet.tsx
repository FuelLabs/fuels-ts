import { useBalance, useWallet } from "@fuels/react";
import { useEffect, useState } from "react";

import LocalFaucet from "./LocalFaucet";
import Button from "./Button";
import { isLocal, renderFormattedBalance, testnetFaucetUrl } from "../lib.tsx";

export default function Faucet() {
  const { wallet } = useWallet();
  const connectedWalletAddress = wallet?.address.toB256() || "";

  const [addressToFund, setAddressToFund] = useState("");

  const { balance, refetch } = useBalance({ address: addressToFund });

  const [initialAddressLoaded, setInitialAddressLoaded] = useState(false);

  useEffect(() => {
    if (connectedWalletAddress && !initialAddressLoaded && !addressToFund) {
      setAddressToFund(connectedWalletAddress);
      setInitialAddressLoaded(true);
    }
  }, [connectedWalletAddress, addressToFund, initialAddressLoaded]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const interval = setInterval(() => refetch(), 5000);
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <>
      <div>
        <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
          Address
        </h3>
        <div className="flex items-center justify-between text-base dark:text-zinc-50">
          <input
            type="text"
            value={addressToFund}
            className="w-full bg-gray-800 rounded-md px-2 py-1 truncate font-mono"
            onChange={(e) => setAddressToFund(e.target.value)}
          />
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
            data-testid="balance"
          />
          <Button className="w-1/3" onClick={() => refetch()}>
            Refresh
          </Button>
        </div>
      </div>

      <div>
        {!isLocal && (
          <>
            <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
              Testnet Faucet
            </h3>
            <iframe
              src={`${testnetFaucetUrl}?address=${connectedWalletAddress}`}
              title="Faucet"
              className="w-full max-h-screen min-h-[500px] border-0 rounded-md mt-1"
            />
          </>
        )}
      </div>
      {isLocal && (
        <>
          <LocalFaucet refetch={refetch} addressToFund={addressToFund} />
          <p className="w-full px-2 py-1 mr-3 font-mono text-xs">
            If you would like to visit the testnet faucet, you can do so{" "}
            <a
              href={`${testnetFaucetUrl}?address=${connectedWalletAddress}&autoClose&redirectUrl=${window.location.href}`}
              target="_blank"
              className="text-green-500/80 transition-colors hover:text-green-500"
            >
              here
            </a>
            .
          </p>
        </>
      )}
    </>
  );
}
