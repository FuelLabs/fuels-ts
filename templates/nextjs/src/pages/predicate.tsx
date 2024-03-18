import { Button } from "@/components/Button";
import { FuelLogo } from "@/components/FuelLogo";
import { Input } from "@/components/Input";
import { AppContext } from "@/components/Layout";
import { Link } from "@/components/Link";
import { TestPredicateAbi__factory } from "@/sway-api/predicates/index";
import type { BN, InputValue, Predicate } from "fuels";
import { BaseAssetId, bn } from "fuels";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PredicateExample() {
  const { burnerWallet, burnerWalletBalance, refreshBurnerWalletBalance } =
    useContext(AppContext);

  const [predicate, setPredicate] = useState<Predicate<InputValue[]>>();

  const [predicateBalance, setPredicateBalance] = useState<BN>();

  const [pin, setPin] = useState<string>();

  useEffect(() => {
    (async () => {
      if (burnerWallet) {
        const predicate = TestPredicateAbi__factory.createInstance(
          burnerWallet.provider,
        );
        setPredicate(predicate);
        setPredicateBalance(await predicate.getBalance());
      }

      // eslint-disable-next-line no-console
    })().catch(console.error);
  }, [burnerWallet]);

  const refreshBalances = async () => {
    console.log(refreshBurnerWalletBalance);
    await refreshBurnerWalletBalance?.();
    setPredicateBalance(await predicate?.getBalance());
  };

  const transferFundsToPredicate = async (amount: BN) => {
    if (!predicate) {
      return toast.error("Predicate not loaded");
    }

    if (!burnerWallet) {
      return toast.error("Wallet not loaded");
    }

    await burnerWallet.transfer(predicate.address, amount, BaseAssetId, {
      gasPrice: 1,
      gasLimit: 10_000,
    });

    await refreshBalances();

    return toast.success("Funds transferred to predicate.");
  };

  const unlockPredicateAndTransferFundsBack = async (amount: BN) => {
    try {
      if (!burnerWallet) {
        return toast.error("Wallet not loaded");
      }

      const reInitializePredicate = TestPredicateAbi__factory.createInstance(
        burnerWallet.provider,
        [bn(pin)],
      );

      if (!reInitializePredicate) {
        return toast.error("Failed to initialize predicate");
      }

      const tx = await reInitializePredicate.transfer(
        burnerWallet.address,
        amount,
        BaseAssetId,
      );
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
        "Failed to unlock predicate. You probably entered the wrong pin, or the predicate does not have enough balance. Try again.",
      );
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <FuelLogo />
        <h3 className="text-2xl font-semibold">Predicate</h3>
      </div>

      <div className="mt-12 items-baseline flex gap-2">
        <h5 className="font-semibold text-xl">Wallet Balance:</h5>
        <span className="text-gray-400">{burnerWalletBalance?.toString()}</span>
      </div>

      <div className="items-baseline flex gap-2">
        <h5 className="font-semibold text-xl">Predicate Balance:</h5>
        <span className="text-gray-400">{predicateBalance?.toString()}</span>
      </div>

      <Button onClick={async () => await transferFundsToPredicate(bn(1000))}>
        Transfer 1000 to Predicate
      </Button>

      <Input
        className="w-[300px] mt-8"
        value={pin as string}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Hint - the correct pin is 1337"
      />

      <Button
        onClick={async () =>
          await unlockPredicateAndTransferFundsBack(bn(1000))
        }
      >
        Unlock Predicate and Transfer 1000 back to Wallet
      </Button>

      <span className="mt-8 w-[400px] text-gray-400">
        Do note that when you 'unlock' a predicate, the predicate also pays for
        the gas of the transaction. <br />
        This is why you will notice that the balance of the predicate gets
        reduced by 1000 + a nominal gas fee.
      </span>

      <Link
        href="https://docs.fuel.network/docs/intro/glossary/#predicate"
        target="_blank"
      >
        Learn more about Predicates
      </Link>

      <Link href="/" className="mt-12">
        Back to Home
      </Link>
    </>
  );
}
