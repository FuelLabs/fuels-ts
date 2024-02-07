import type { TestContractAbi } from "@/sway-api";
import { TestContractAbi__factory } from "@/sway-api";
import contractIds from "@/sway-api/contract-ids.json";
import { FuelLogo } from "@/components/FuelLogo";
import { Provider, Wallet, bn } from "fuels";
import { useEffect, useState } from "react";
import { Link } from "@/components/Link";
import { Button } from "@/components/Button";

const contractId = contractIds.testContract;

const hasContract = process.env.NEXT_PUBLIC_HAS_CONTRACT === "true";
const hasPredicate = process.env.NEXT_PUBLIC_HAS_PREDICATE === "true";
const hasScript = process.env.NEXT_PUBLIC_HAS_SCRIPT === "true";

export default function Home() {
  const [contract, setContract] = useState<TestContractAbi>();
  const [counter, setCounter] = useState<number>();

  useEffect(() => {
    (async () => {
      if (hasContract) {
        const provider = await Provider.create("http://127.0.0.1:4000/graphql");
        // 0x1 is the private key of one of the fauceted accounts on your local Fuel node
        const wallet = Wallet.fromPrivateKey("0x01", provider);
        const testContract = TestContractAbi__factory.connect(
          contractId,
          wallet,
        );
        setContract(testContract);
        const { value } = await testContract.functions
          .get_count()
          .txParams({
            gasPrice: 1,
            gasLimit: 10_000,
          })
          .simulate();
        setCounter(value.toNumber());
      }

      // eslint-disable-next-line no-console
    })().catch(console.error);
  }, []);

  // eslint-disable-next-line consistent-return
  const onIncrementPressed = async () => {
    if (!contract) {
      // eslint-disable-next-line no-alert
      return alert("Contract not loaded");
    }
    const { value } = await contract.functions
      .increment_counter(bn(1))
      .txParams({
        gasPrice: 1,
        gasLimit: 10_000,
      })
      .call();
    setCounter(value.toNumber());
  };

  return (
    <div className={`min-h-screen items-center p-24 flex flex-col gap-6`}>
      <div className="flex gap-4 items-">
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
    </div>
  );
}
