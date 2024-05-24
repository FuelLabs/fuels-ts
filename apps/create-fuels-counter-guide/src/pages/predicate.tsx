import { Button } from "@/components/Button";
import { FuelLogo } from "@/components/FuelLogo";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { useActiveWallet } from "@/hooks/useActiveWallet";
import { TestPredicateAbi__factory } from "@/sway-api/predicates/index";
import { BN, InputValue, Predicate } from "fuels";
import { bn } from "fuels";
import { useState } from "react";
import toast from "react-hot-toast";
import useAsync from "react-use/lib/useAsync";

export default function PredicateExample() {
  let baseAssetId: string;

  const { wallet, walletBalance, refreshWalletBalance } = useActiveWallet();

  const [predicate, setPredicate] = useState<Predicate<InputValue[]>>();

  const [predicateBalance, setPredicateBalance] = useState<BN>();

  const [pin, setPin] = useState<string>();

  useAsync(async () => {
    if (wallet) {
      baseAssetId = wallet.provider.getBaseAssetId();
      const predicate = TestPredicateAbi__factory.createInstance(wallet.provider);
      setPredicate(predicate);
      setPredicateBalance(await predicate.getBalance());
    }
  }, [wallet]);

  const refreshBalances = async () => {
    await refreshWalletBalance?.();
    setPredicateBalance(await predicate?.getBalance());
  };

  const transferFundsToPredicate = async (amount: BN) => {
    if (!predicate) {
      return toast.error("Predicate not loaded");
    }

    if (!wallet) {
      return toast.error("Wallet not loaded");
    }

    await wallet.transfer(predicate.address, amount, baseAssetId, {
      gasLimit: 10_000,
    });

    await refreshBalances();

    return toast.success("Funds transferred to predicate.");
  };

  const unlockPredicateAndTransferFundsBack = async (amount: BN) => {
    try {
      if (!wallet) {
        return toast.error("Wallet not loaded");
      }

      const reInitializePredicate = TestPredicateAbi__factory.createInstance(wallet.provider, [bn(pin)]);

      if (!reInitializePredicate) {
        return toast.error("Failed to initialize predicate");
      }

      const tx = await reInitializePredicate.transfer(wallet.address, amount, baseAssetId);
      const { isStatusSuccess } = await tx.wait();

      if (!isStatusSuccess) {
        toast.error("Failed to unlock predicate");
      }

      if (isStatusSuccess) {
        toast.success("Predicate unlocked");
      }

      await refreshBalances();
    } catch (e) {
      console.error(e);
      toast.error(
        "Failed to unlock predicate. You probably entered the wrong pin, or the predicate does not have enough balance. Try again."
      );
    }
  };

  // #region change-pin-react-function
  const changePin = async () => {
    if (!wallet) {
      return toast.error("Wallet not loaded");
    }
    if (!predicate) {
      return toast.error("Predicate not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet."
      );
    }

    if (!pin) {
      return toast.error("Please enter a pin");
    }

    const configurable = { PIN: bn(pin) };
    // instantiate predicate with configurable constants
    const reInitializePredicate = TestPredicateAbi__factory.createInstance(wallet.provider, [bn(configurable.PIN)], configurable);

    if (!reInitializePredicate) {
      return toast.error("Failed to initialize predicate");
    }

    // transferring funds to the predicate
    const tx = await wallet.transfer(reInitializePredicate.address, 1000, baseAssetId, {
      gasLimit: 10_000,
    });

    const { isStatusSuccess } = await tx.wait();

    if (!isStatusSuccess) {
      toast.error("Failed to update pin in  predicate");
    }

    if (isStatusSuccess) {
      toast.success("Predicate pin updated");
    }

    await refreshWalletBalance?.();
  };
  // #endregion change-pin-react-function

  return (
    <>
      <div className="flex gap-4">
        <FuelLogo />
        <h3 className="text-2xl font-semibold">Predicate</h3>
      </div>

      <div className="mt-12 items-baseline flex gap-2">
        <h5 className="font-semibold text-xl">Wallet Balance:</h5>
        <span className="text-gray-400">{walletBalance?.toString()}</span>
      </div>

      <div className="items-baseline flex gap-2">
        <h5 className="font-semibold text-xl">Predicate Balance:</h5>
        <span className="text-gray-400">{predicateBalance?.toString()}</span>
      </div>

      <Button onClick={async () => await transferFundsToPredicate(bn(1000))}>Transfer 1000 to Predicate</Button>

      <Button onClick={changePin}>Change Pin</Button>

      <Input
        className="w-[300px] mt-8"
        value={pin as string}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter a new pin"
      />

      <Button onClick={async () => await unlockPredicateAndTransferFundsBack(bn(1000))}>
        Unlock Predicate and Transfer 1000 back to Wallet
      </Button>

      <span className="mt-8 w-[400px] text-gray-400">
        Do note that when you 'unlock' a predicate, the predicate also pays for the gas of the transaction. <br />
        This is why you will notice that the balance of the predicate gets reduced by 1000 + a nominal gas fee.
      </span>

      <Link href="https://docs.fuel.network/docs/intro/glossary/#predicate" target="_blank">
        Learn more about Predicates
      </Link>

      <Link href="/" className="mt-12">
        Back to Home
      </Link>
    </>
  );
}
