import { Button } from "@/components/Button";
import { FuelLogo } from "@/components/FuelLogo";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { TestPredicateAbi__factory } from "@/sway-api/predicates/index";
import type { BN, InputValue, Predicate, WalletUnlocked } from "fuels";
import { BaseAssetId, Provider, Wallet, bn } from "fuels";
import { useEffect, useState } from "react";

export default function PredicateExample() {
  const [predicate, setPredicate] = useState<Predicate<InputValue[]>>();
  const [wallet, setWallet] = useState<WalletUnlocked>();

  const [walletBalance, setWalletBalance] = useState<BN>();
  const [predicateBalance, setPredicateBalance] = useState<BN>();

  const [pin, setPin] = useState<string>();

  useEffect(() => {
    (async () => {
      const provider = await Provider.create("http://127.0.0.1:4000/graphql");

      // 0x1 is the private key of one of the fauceted accounts on your local Fuel node
      const wallet = Wallet.fromPrivateKey("0x01", provider);
      setWallet(wallet);
      setWalletBalance(await wallet.getBalance());

      const predicate = TestPredicateAbi__factory.createInstance(provider);
      setPredicate(predicate);
      setPredicateBalance(await predicate.getBalance());

      // eslint-disable-next-line no-console
    })().catch(console.error);
  }, []);

  const refreshBalances = async () => {
    setWalletBalance(await wallet?.getBalance());
    setPredicateBalance(await predicate?.getBalance());
  };

  const transferFundsToPredicate = async (amount: BN) => {
    if (!predicate) {
      // eslint-disable-next-line no-alert
      return alert("Predicate not loaded");
    }

    if (!wallet) {
      // eslint-disable-next-line no-alert
      return alert("Wallet not loaded");
    }

    await wallet.transfer(predicate.address, amount, BaseAssetId, {
      gasPrice: 1,
      gasLimit: 10_000,
    });

    await refreshBalances();
  };

  const unlockPredicateAndTransferFundsBack = async (amount: BN) => {
    try {
      if (!predicate) {
        // eslint-disable-next-line no-alert
        return alert("Predicate not loaded");
      }

      if (!wallet) {
        // eslint-disable-next-line no-alert
        return alert("Wallet not loaded");
      }

      const tx = await predicate
        .setData(bn(pin))
        .transfer(wallet.address, amount, BaseAssetId);
      const { isStatusSuccess } = await tx.wait();

      if (!isStatusSuccess) {
        // eslint-disable-next-line no-alert
        return alert("Failed to unlock predicate");
      }

      if (isStatusSuccess) {
        // eslint-disable-next-line no-alert
        alert("Predicate unlocked");
      }

      await refreshBalances();
    } catch (e) {
      console.error(e);
      alert(
        "Failed to unlock predicate. You probably entered the wrong pin, or the predicate does not have enough balance. Try again.",
      );
    }
  };

  return (
    <div className={`min-h-screen items-center p-24 flex flex-col gap-6`}>
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

      <Button onClick={() => transferFundsToPredicate(bn(10_000))}>
        Transfer 10_000 to Predicate
      </Button>

      <Input
        className="w-[300px] mt-8"
        value={pin as string}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Hint - the correct pin is 1337"
      />

      <Button onClick={() => unlockPredicateAndTransferFundsBack(bn(10_000))}>
        Unlock Predicate and Transfer 10_000 back to Wallet
      </Button>

      <span className="mt-8 w-[400px] text-gray-400">
        Do note that when you 'unlock' a predicate, the predicate also pays for
        the gas of the transaction. <br />
        This is why you will notice that the balance of the predicate gets
        reduced by 10_000 + a nominal gas fee.
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
    </div>
  );
}
