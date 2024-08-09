import type { TestContractAbi } from "../sway-api";
import { TestContractAbi__factory } from "../sway-api";
import contractIds from "../sway-api/contract-ids.json";
import { FuelLogo } from "../components/FuelLogo";
import { bn } from "fuels";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import toast from "react-hot-toast";
import { useActiveWallet } from "../hooks/useActiveWallet";
import useAsync from "react-use/lib/useAsync";
import { CURRENT_ENVIRONMENT } from "../lib";
import LaunchIcon from "@mui/icons-material/Launch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const contractId =
  CURRENT_ENVIRONMENT === "local"
    ? contractIds.testContract
    : (process.env.VITE_PUBLIC_TESTNET_CONTRACT_ID as string); // Testnet Contract ID

export default function Home() {
  const { wallet, walletBalance, refetchBalance, isConnected } =
    useActiveWallet();
  const [contract, setContract] = useState<TestContractAbi>();
  const [counter, setCounter] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * useAsync is a wrapper around useEffect that allows us to run asynchronous code
   * See: https://github.com/streamich/react-use/blob/master/docs/useAsync.md
   */
  useAsync(async () => {
    if (wallet) {
      const testContract = TestContractAbi__factory.connect(contractId, wallet);
      setContract(testContract);
      const { value } = await testContract.functions.get_count().get();
      setCounter(value.toNumber());
    }
  }, [wallet]);

  // eslint-disable-next-line consistent-return
  const onIncrementPressed = async () => {
    if (!isConnected)
      return toast.error("Please connect your wallet to increment the counter");
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Faucet' button in the top right corner, or use the local faucet.",
      );
    }

    try {
      setIsLoading(true);

      const { waitForResult } = await contract.functions
        .increment_counter(bn(1))
        .call();

      const { value, transactionId } = await waitForResult();

      toast(() => (
        <span>
          <CheckCircleIcon color="success" />
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

      await refetchBalance?.();
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
        <Link to="https://docs.fuel.network/docs/fuels-ts/fuels/#fuels-cli">
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

      <Link to="/predicate" className="text-fuel-green hover:underline">
        Predicate Example
      </Link>

      <Link to="/script" className="text-fuel-green hover:underline">
        Script Example
      </Link>
    </>
  );
}
