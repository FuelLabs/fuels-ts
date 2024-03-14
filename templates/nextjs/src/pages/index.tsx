import type { TestContractAbi } from "@/sway-api";
import { TestContractAbi__factory } from "@/sway-api";
import contractIds from "@/sway-api/contract-ids.json";
import { FuelLogo } from "@/components/FuelLogo";
import { bn } from "fuels";
import { useContext, useEffect, useState } from "react";
import { Link } from "@/components/Link";
import { Button } from "@/components/Button";
import { AppContext } from "@/components/Layout";
import toast from "react-hot-toast";

const contractId = contractIds.testContract;

const hasContract = process.env.NEXT_PUBLIC_HAS_CONTRACT === "true";
const hasPredicate = process.env.NEXT_PUBLIC_HAS_PREDICATE === "true";
const hasScript = process.env.NEXT_PUBLIC_HAS_SCRIPT === "true";

export default function Home() {
  const { burnerWallet, burnerWalletBalance } = useContext(AppContext);
  const [contract, setContract] = useState<TestContractAbi>();
  const [counter, setCounter] = useState<number>();

  useEffect(() => {
    (async () => {
      if (hasContract && burnerWallet && burnerWalletBalance?.gt(0)) {
        const testContract = TestContractAbi__factory.connect(
          contractId,
          burnerWallet,
        );
        setContract(testContract);
        const { value } = await testContract.functions.get_count().simulate();
        setCounter(value.toNumber());
      }

      // eslint-disable-next-line no-console
    })().catch(console.error);
  }, [burnerWallet, burnerWalletBalance]);

  // eslint-disable-next-line consistent-return
  const onIncrementPressed = async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (burnerWalletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }

    const { value } = await contract.functions.increment_counter(bn(1)).call();
    setCounter(value.toNumber());
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <FuelLogo />
        <h1 className="text-2xl font-semibold ali">Welcome to Fuel</h1>
      </div>

      {hasContract && (
        <span className="text-gray-400">
          Get started by editing <i>sway-programs/contract/main.sw</i> or{" "}
          <i>src/pages/index.tsx</i>.
        </span>
      )}

      <span className="text-gray-400">
        This template uses the new{" "}
        <Link href="https://fuellabs.github.io/fuels-ts/guide/cli/">
          Fuels CLI
        </Link>{" "}
        to enable type-safe hot-reloading for your Sway programs.
      </span>

      {hasContract && (
        <>
          <h3 className="text-xl font-semibold">Counter</h3>

          <span className="text-gray-400 text-6xl">{counter}</span>

          <Button onClick={onIncrementPressed} className="mt-6">
            Increment Counter
          </Button>
        </>
      )}

      {hasPredicate && (
        <Link href="/predicate" className="mt-4">
          Predicate Example
        </Link>
      )}

      {hasScript && (
        <Link href="/script" className="mt-4">
          Script Example
        </Link>
      )}

      <Link href="https://docs.fuel.network" target="_blank" className="mt-12">
        Fuel Docs
      </Link>
    </>
  );
}
