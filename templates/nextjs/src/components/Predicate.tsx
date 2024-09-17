import { useBalance, useWallet } from "@fuels/react";
import { useEffect, useState } from "react";
import { bn, Predicate as FuelPredicate, InputValue } from "fuels";
import { toast } from "react-toastify";

import { TestPredicate } from "../sway-api/predicates";
import Button from "./Button";
import LocalFaucet from "./LocalFaucet";
import { isLocal } from "../lib";
export default function Predicate() {
  const [predicate, setPredicate] = useState<FuelPredicate<InputValue[]>>();
  const [predicatePin, setPredicatePin] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const { wallet } = useWallet();
  const address = wallet?.address.toB256() || "";
  const { balance: walletBalance, refetch: refetchWallet } = useBalance({
    address,
  });
  const predicateAddress = predicate?.address?.toB256();
  const { balance: predicateBalance, refetch: refetchPredicate } = useBalance({
    address: predicateAddress,
  });

  useEffect(() => {
    if (wallet) {
      const testPredicate = new TestPredicate(wallet);
      setPredicate(testPredicate);
    }
  }, [wallet]);

  const refetch = () => {
    refetchWallet();
    refetchPredicate();
  };

  const transferToPredicate = async () => {
    if (!wallet || !predicate) return;
    setIsLoading(true);

    try {
      const tx = await wallet.transfer(predicate.address, bn(1_000_000));
      toast.info(`Transaction submitted: ${tx.id}`);
      await tx.waitForResult();
      toast.success(`Transfer successful: ${tx.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Error transferring funds.");
    }
    setIsLoading(false);
    refetch();
  };

  const transferToWallet = async () => {
    if (!wallet || !predicate) return;
    setIsLoading(true);

    try {
      const newPredicate = new TestPredicate({
        provider: wallet.provider,
        data: [bn(predicatePin)],
      });

      const tx = await newPredicate.transfer(wallet.address, bn(1_000_000));
      toast.info(`Transaction submitted: ${tx.id}`);
      await tx.waitForResult();
      toast.success(`Transfer successful: ${tx.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Error transferring funds. Check that ");
    }
    setIsLoading(false);
    refetch();
  };

  return (
    <>
      <div>
        <p>
          Predicates are another core program type, they function like
          transactions but with some conditional logic that returns a boolean
          value. You can read more about them{" "}
          <a
            href="https://docs.fuel.network/docs/fuels-ts/predicates/"
            className="text-green-500/80 transition-colors hover:text-green-500"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
        <p className="pt-2">
          In the below example, we transfer{" "}
          <span className="font-mono font-bold">0.001 ETH</span> to the
          predicate but need to pass a pin to unlock the predicate and transfer
          the funds back to us.
        </p>
        <p className="pt-2">
          You can alter the logic in the predicate at{" "}
          <code>sway-programs/predicates/src/main.sw</code>.
        </p>
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
          Wallet Balance
        </h3>
        <div className="flex items-center justify-between text-base dark:text-zinc-50">
          <input
            type="text"
            value={walletBalance ? `${walletBalance?.format()} ETH` : ""}
            className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
          <Button
            onClick={transferToPredicate}
            className="w-1/3"
            disabled={isLoading}
          >
            Transfer
          </Button>
        </div>
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
          Predicate Balance & Pin
        </h3>
        <div className="flex items-center justify-between text-base dark:text-zinc-50">
          <input
            type="text"
            value={predicateBalance ? `${predicateBalance?.format()} ETH` : ""}
            className="w-1/2 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
          <input
            type="text"
            value={predicatePin}
            onChange={(e) => setPredicatePin(e.target.value)}
            className="w-1/2 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            placeholder="Pin: 1337"
          />
        </div>
      </div>
      <div>
        <Button
          onClick={transferToWallet}
          className="w-full"
          disabled={isLoading}
        >
          Unlock and Transfer
        </Button>
      </div>
      {isLocal && <LocalFaucet refetch={refetch} />}
    </>
  );
}
