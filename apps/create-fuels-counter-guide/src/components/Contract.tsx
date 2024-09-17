import { useEffect, useState } from "react";
import { useWallet } from "@fuels/react";

import LocalFaucet from "./LocalFaucet";
import { TestContract } from "../sway-api";
import Button from "./Button";
import { isLocal, contractId } from "../lib";
import { useNotification } from "../hooks/useNotification";

export default function Contract() {
  const { infoNotification, successNotification, errorNotification } =
    useNotification();
  const [contract, setContract] = useState<TestContract>();
  const [counter, setCounter] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  const { wallet, refetch } = useWallet();

  useEffect(() => {
    if (wallet) {
      const testContract = new TestContract(contractId, wallet);
      setContract(testContract);
    }
  }, [wallet]);

  useEffect(() => {
    if (contract && !counter) {
      const getCount = async () => {
        const { value } = await contract.functions.get_count().get();
        setCounter(value.toNumber());
      };

      getCount();
    }
  }, [contract, counter]);

  async function incrementCounter() {
    if (!wallet || !contract) return;
    setIsLoading(true);

    try {
      const call = await contract.functions.increment_counter(1).call();
      infoNotification(`Transaction submitted: ${call.transactionId}`);
      const result = await call.waitForResult();
      successNotification(`Transaction successful: ${result.transactionId}`);
      setCounter(result.value.toNumber());
    } catch (error) {
      console.error(error);
      errorNotification("Error incrementing counter");
    }
    setIsLoading(false);
  }

  // #region create-fuels-counter-guide-on-decrement-react-function
  async function decrementCounter() {
    if (!wallet || !contract) return;
    setIsLoading(true);

    try {
      const call = await contract.functions.decrement_counter(1).call();
      infoNotification(`Transaction submitted: ${call.transactionId}`);
      const result = await call.waitForResult();
      successNotification(`Transaction successful: ${result.transactionId}`);
      setCounter(result.value.toNumber());
    } catch (error) {
      console.error(error);
      errorNotification("Error decrementing counter");
    }
    setIsLoading(false);
  }
  // #endregion create-fuels-counter-guide-on-decrement-react-function

  return (
    <>
      <div>
        <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
          Counter
        </h3>
        <div className="flex items-center justify-between text-base dark:text-zinc-50">
          <input
            type="text"
            value={counter}
            className="w-1/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
          <Button
            onClick={incrementCounter}
            className="w-1/3 mr-1"
            disabled={isLoading}
          >
            Increment
          </Button>

          <Button
            onClick={decrementCounter}
            className="w-1/3"
            disabled={isLoading}
          >
            Decrement
          </Button>
        </div>
      </div>
      <div>
        <p>
          Contracts are a core program type on the Fuel network. You can read
          more about them{" "}
          <a
            href="https://docs.fuel.network/docs/fuels-ts/contracts/"
            className="text-green-500/80 transition-colors hover:text-green-500"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
        <p className="pt-2">
          This is a simple counter contract which you can edit at{" "}
          <code>sway-programs/contract/src/main.sw</code>.
        </p>
        <p className="pt-2">
          Extend this example by adding decrement functionality by working
          through{" "}
          <a
            href="https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/#adding-decrement-functionality"
            className="text-green-500/80 transition-colors hover:text-green-500"
            target="_blank"
            rel="noreferrer"
          >
            this guide
          </a>
          .
        </p>
      </div>
      {isLocal && <LocalFaucet refetch={refetch} />}
    </>
  );
}
