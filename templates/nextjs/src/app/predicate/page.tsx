"use client";

import { Button } from "@/components/Button";
import { FuelLogo } from "@/components/FuelLogo";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { useActiveWallet } from "@/hooks/useActiveWallet";
import { TestPredicate } from "@/sway-api/predicates/index";
import { FAUCET_LINK } from "@/lib";
import { BN, InputValue, Predicate } from "fuels";
import { bn } from "fuels";
import { useState } from "react";
import toast from "react-hot-toast";
import useAsync from "react-use/lib/useAsync";
import { CURRENT_ENVIRONMENT, Environments } from "@/lib";

export default function PredicateExample() {
  let baseAssetId: string;

  const { wallet, walletBalance, refreshWalletBalance, isConnected } =
    useActiveWallet();

  const [predicate, setPredicate] = useState<Predicate<InputValue[]>>();

  const [predicateBalance, setPredicateBalance] = useState<BN>();

  const [pin, setPin] = useState<string>();

  const [isLoadingTransfer, setIsLoadingTransfer] = useState<boolean>(false);

  const [isLoadingUnlock, setIsLoadingUnlock] = useState<boolean>(false);

  useAsync(async () => {
    if (wallet) {
      baseAssetId = wallet.provider.getBaseAssetId();
      // Initialize a new predicate instance
      const predicate = new TestPredicate({
        provider: wallet.provider,
      });
      setPredicate(predicate);
      setPredicateBalance(await predicate.getBalance());
    }
  }, [wallet]);

  const refreshBalances = async () => {
    await refreshWalletBalance?.();
    setPredicateBalance(await predicate?.getBalance());
  };

  const getTransferSuccessMessage = (transactionId: string, action: string) => {
    if (CURRENT_ENVIRONMENT === Environments.LOCAL) {
      return `${action}!`;
    } else {
      return (
        <span>
          {action}! View it on the
          <a
            className="pl-1 underline"
            target="_blank"
            href={`https://app.fuel.network/tx/${transactionId}`}
          >
            block explorer
          </a>
        </span>
      );
    }
  };
  const transferFundsToPredicate = async (amount: BN) => {
    try {
      if (!isConnected) {
        return toast.error(
          "Please connect your wallet to transfer funds to Predicate",
        );
      }
      if (!predicate) {
        return toast.error("Predicate not loaded");
      }

      if (!wallet) {
        return toast.error("Wallet not loaded");
      }

      if (walletBalance?.lt(bn.parseUnits("0.002"))) {
        return toast.error(
          <span>
            Your wallet does not have enough funds. Please top it up using the{" "}
            <Link href={FAUCET_LINK} target="_blank">
              faucet.
            </Link>
          </span>,
        );
      }

      setIsLoadingTransfer(true);

      const tx = await wallet.transfer(predicate.address, amount, baseAssetId, {
        gasLimit: 10_000,
      });

      await refreshBalances();

      toast.success(
        getTransferSuccessMessage(tx?.id, "Funds transferred to predicate"),
      );
    } catch (e) {
      console.error(e);
      toast.error(
        <span>
          Failed to transfer funds. Please make sure your wallet has enough
          funds. You can top it up using the{" "}
          <Link href={FAUCET_LINK} target="_blank">
            faucet.
          </Link>
        </span>,
      );
    } finally {
      setIsLoadingTransfer(false);
    }
  };

  const unlockPredicateAndTransferFundsBack = async (amount: BN) => {
    try {
      if (!isConnected) {
        return toast.error(
          "Please connect your wallet to transfer funds back from Predicate",
        );
      }

      if (!wallet) {
        return toast.error("Wallet not loaded");
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
      if (!predicateBalance || predicateBalance.lt(bn.parseUnits("0.001"))) {
        return toast.error("Predicate balance is less than 0.001 ETH");
      }
      setIsLoadingUnlock(true);
      // Initialize a new predicate instance with the entered pin
      const reInitializePredicate = new TestPredicate({
        provider: wallet.provider,
        data: [bn(pin)],
      });

      if (!reInitializePredicate) {
        return toast.error("Failed to initialize predicate");
      }

      /*
        Try to 'unlock' the predicate and transfer the funds back to the wallet.
        If the pin is correct, this transfer transaction will succeed.
        If the pin is incorrect, this transaction will fail.
       */
      const tx = await reInitializePredicate.transfer(
        wallet.address,
        amount,
        baseAssetId,
      );
      const { isStatusSuccess } = await tx.wait();

      if (!isStatusSuccess) {
        toast.error("Failed to unlock predicate");
      }

      if (isStatusSuccess) {
        toast.success(
          getTransferSuccessMessage(tx?.id, "Funds transferred from predicate"),
        );
      }

      await refreshBalances();
    } catch (e) {
      console.error(e);
      toast.error(
        "Failed to unlock predicate. You probably entered the wrong pin, or the predicate does not have enough balance. Try again.",
      );
    } finally {
      setIsLoadingUnlock(false);
    }
  };
  const isPredicateWithdrawButtonDisabled =
    !isConnected ||
    !predicateBalance ||
    predicateBalance.lt(bn.parseUnits("0.001"));

  return (
    <>
      <div className="flex gap-4">
        <FuelLogo />
        <h3 className="text-2xl font-semibold">Predicate</h3>
      </div>

      <div className="mt-12 items-baseline flex gap-2">
        <h5 className="font-semibold text-xl">Wallet Balance:</h5>
        <span className="text-gray-400">
          {walletBalance?.format({
            precision: 3,
          })}{" "}
          ETH
        </span>
      </div>

      <div className="items-baseline flex gap-2">
        <h5 className="font-semibold text-xl">Predicate Balance:</h5>
        <span className="text-gray-400">
          {predicateBalance?.format({
            precision: 3,
          })}{" "}
          ETH
        </span>
      </div>

      <Button
        className={`${
          isLoadingTransfer
            ? "bg-transparent border border-gray-400 pointer-events-none"
            : !isConnected
              ? "bg-gray-500"
              : ""
        }`}
        onClick={async () =>
          await transferFundsToPredicate(bn.parseUnits("0.002"))
        }
      >
        {isLoadingTransfer
          ? "Transferring to Predicate..."
          : "Transfer 0.002 ETH to Predicate"}
      </Button>

      <Input
        className="w-[300px] mt-8"
        value={pin as string}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Hint - the correct pin is 1337"
      />

      <Button
        className={`w-11/12 sm:w-fit ${
          isLoadingUnlock
            ? "bg-transparent border border-gray-400 pointer-events-none"
            : isPredicateWithdrawButtonDisabled
              ? "bg-gray-500"
              : ""
        }`}
        onClick={async () =>
          await unlockPredicateAndTransferFundsBack(bn.parseUnits("0.001"))
        }
      >
        {isLoadingUnlock
          ? "Unlocking Predicate and Transferring to Wallet..."
          : "Unlock Predicate and Transfer 0.001 ETH back to Wallet"}
      </Button>

      <span className="mt-8 w-[360px] md:w-[400px] text-center text-gray-400">
        Do note that when you 'unlock' a predicate, the predicate also pays for
        the gas of the transaction. <br />
        This is why you will notice that the balance of the predicate gets
        reduced by 0.001 ETH + a nominal gas fee.
      </span>

      <Link
        href="https://docs.fuel.network/docs/fuels-ts/predicates"
        target="_blank"
      >
        Learn more about Predicates
      </Link>
    </>
  );
}
