/** @knipignore */
import type { TestContractAbi } from "@/sway-api";
/** @knipignore */
import { TestContractAbi__factory } from "@/sway-api";
import contractIds from "@/sway-api/contract-ids.json";

import { FuelLogo } from "@/components/FuelLogo";
import { bn } from "fuels";
import { useState } from "react";
import { Link } from "@/components/Link";
import { Button } from "@/components/Button";
import toast from "react-hot-toast";
import { useActiveWallet } from "@/hooks/useActiveWallet";
import useAsync from "react-use/lib/useAsync";

const contractId = contractIds.testContract;

const hasContract = process.env.NEXT_PUBLIC_HAS_CONTRACT === "true";
const hasPredicate = process.env.NEXT_PUBLIC_HAS_PREDICATE === "true";
const hasScript = process.env.NEXT_PUBLIC_HAS_SCRIPT === "true";

export default function Home() {
  const { wallet, walletBalance, refreshWalletBalance } = useActiveWallet();
  const [contract, setContract] = useState<TestContractAbi>();
  const [counter, setCounter] = useState<number>();

  /**
   * useAsync is a wrapper around useEffect that allows us to run asynchronous code
   * See: https://github.com/streamich/react-use/blob/master/docs/useAsync.md
   */
  useAsync(async () => {
    if (hasContract && wallet) {
      const testContract = TestContractAbi__factory.connect(contractId, wallet);
      setContract(testContract);
      const { value } = await testContract.functions.get_count().get();
      setCounter(value.toNumber());
    }
  }, [wallet]);

  // eslint-disable-next-line consistent-return
  const onIncrementPressed = async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }

    const { value } = await contract.functions.increment_counter(bn(1)).call();
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
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }

    const { value } = await contract.functions.decrement_counter(bn(1)).call();
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

      {hasContract && (
        <span className="text-gray-400">
          Get started by editing <i>sway-programs/contract/main.sw</i> or{" "}
          <i>src/pages/index.tsx</i>.
        </span>
      )}

      <span className="text-gray-400">
        This template uses the new{" "}
        <Link href="https://docs.fuel.network/docs/fuels-ts/fuels/#fuels-cli">
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

          {/* #region create-fuels-counter-guide-on-decrement-ui */}
          <Button onClick={onDecrementPressed} className="mt-6">
            Decrement Counter
          </Button>
          {/* #endregion create-fuels-counter-guide-on-decrement-ui */}
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
