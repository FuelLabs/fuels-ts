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

// #region deploying-dapp-to-testnet-frontend-contract-id
const contractId =
  CURRENT_ENVIRONMENT === Environments.LOCAL
    ? contractIds.testContract
    : TESTNET_CONTRACT_ID; // Testnet Contract ID
// #endregion deploying-dapp-to-testnet-frontend-contract-id

function Index() {
  const { wallet, walletBalance, refreshWalletBalance } = useActiveWallet();
  const [contract, setContract] = useState<TestContract>();
  const [counter, setCounter] = useState<number>();

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

    // Call the increment_counter function on the contract
    const { waitForResult } = await contract.functions
      .increment_counter(bn(1))
      .call();

    // Wait for the transaction to be mined, and then read the value returned
    const { value } = await waitForResult();

    setCounter(value.toNumber());

    await refreshWalletBalance?.();
  };

  // #region create-fuels-counter-guide-on-decrement-react-function
  const onDecrementPressed = async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        <span>
          Your wallet does not have enough funds. Please top it up using the{" "}
          <Link href={FAUCET_LINK} target='_blank'>faucet.</Link>
        </span>,
      );
    }

    const { waitForResult } = await contract.functions.decrement_counter(bn(1)).call();
    const { value } = await waitForResult();

    setCounter(value.toNumber());

    await refreshWalletBalance?.();
  };
  // #endregion create-fuels-counter-guide-on-decrement-react-function


  return (
    <>
      <div className="flex gap-4 items-center">
        <FuelLogo />
        <h1 className="text-2xl font-semibold ali">Welcome to Fuel</h1>
      </div>

      <span className="text-gray-400">
        Get started by editing <i>sway-programs/contract/main.sw</i> or{" "}
        <i>src/pages/index.tsx</i>.
      </span>

      <span className="text-gray-400">
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

        <Button onClick={onIncrementPressed} className="mt-6">
          Increment Counter
        </Button>

        {/* #region create-fuels-counter-guide-on-decrement-ui */}
        <Button onClick={onDecrementPressed} className="mt-6">
          Decrement Counter
        </Button>
        {/* #endregion create-fuels-counter-guide-on-decrement-ui */}
      </>

      <Link href="/predicate" className="mt-4">
        Predicate Example
      </Link>

      <Link href="/script" className="mt-4">
        Script Example
      </Link>
      <Link href={DOCS_URL} target="_blank" className="mt-12">
        Fuel Docs
      </Link>
    </>
  );
}
