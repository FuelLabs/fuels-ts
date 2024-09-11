import { createLazyFileRoute } from "@tanstack/react-router";
import { TestContract } from "../sway-api";
import contractIds from "../sway-api/contract-ids.json";
import { FuelLogo } from "../components/FuelLogo";
import { bn } from "fuels";
import { useState } from "react";
import { Link } from "../components/Link";
import { Button } from "../components/Button";
import toast from "react-hot-toast";
import { useActiveWallet } from "../hooks/useActiveWallet";
import useAsync from "react-use/lib/useAsync";
import {
  CURRENT_ENVIRONMENT,
  DOCS_URL,
  Environments,
  FAUCET_LINK,
  TESTNET_CONTRACT_ID,
} from "../lib";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const contractId =
  CURRENT_ENVIRONMENT === Environments.LOCAL
    ? contractIds.testContract
    : TESTNET_CONTRACT_ID; // Testnet Contract ID

function Index() {
  const { wallet, walletBalance, refreshWalletBalance, isConnected } =
    useActiveWallet();

  const [contract, setContract] = useState<TestContract>();
  const [counter, setCounter] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * useAsync is a wrapper around useEffect that allows us to run asynchronous code
   * See: https://github.com/streamich/react-use/blob/master/docs/useAsync.md
   */
  useAsync(async () => {
    if (wallet) {
      // Create a new instance of the contract
      const testContract = new TestContract(contractId, wallet);
      setContract(testContract);

      // Read the current value of the counter
      const { value } = await testContract.functions.get_count().get();
      setCounter(value.toNumber());
    }
  }, [wallet]);

  const onIncrementPressed = async () => {
    if (!isConnected) {
      return toast.error("Please connect your wallet to increment the counter");
    }
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        <span>
          Your wallet does not have enough funds. Please top it up using the{" "}
          <Link href={FAUCET_LINK} target="_blank">
            faucet.
          </Link>
        </span>,
      );
    }
    try {
      setIsLoading(true);
      // Call the increment_counter function on the contract
      const { waitForResult } = await contract.functions
        .increment_counter(bn(1))
        .call();

      // Wait for the transaction to be mined, and then read the value returned
      const { value, transactionId } = await waitForResult();
      toast.success(() => (
        <span>
          Counter Incremented! View it on the
          <a
            target="_blank"
            className="pl-1 underline"
            href={`https://app.fuel.network/tx/${transactionId}`}
          >
            block explorer
          </a>
        </span>
      ));
      setCounter(value.toNumber());

      await refreshWalletBalance?.();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while incrementing the counter.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <FuelLogo />
        <h1 className="text-2xl font-semibold ali">Welcome to Fuel</h1>
      </div>

      <span className="text-gray-400 text-center">
        Get started by editing <i>sway-programs/contract/main.sw</i> or{" "}
        <i>src/pages/index.tsx</i>.
      </span>

      <span className="text-gray-400 text-center">
        This template uses the new{" "}
        <Link href={`${DOCS_URL}/docs/fuels-ts/fuels/#fuels-cli`}>
          Fuels CLI
        </Link>{" "}
        to enable type-safe hot-reloading for your Sway programs.
      </span>

      <>
        <h3 className="text-xl font-semibold">Counter</h3>

        <span data-testid="counter" className="text-gray-400 text-6xl">
          {counter}
        </span>

        <Button
          onClick={onIncrementPressed}
          className={`mt-6 ${
            isLoading
              ? "bg-transparent border border-gray-400 pointer-events-none"
              : !isConnected
                ? "bg-gray-500"
                : ""
          }`}
        >
          {isLoading ? "Incrementing..." : "Increment Counter"}
        </Button>
      </>

      <Link href="/predicate">Predicate Example</Link>

      <Link href="/script">Script Example</Link>
    </>
  );
}
