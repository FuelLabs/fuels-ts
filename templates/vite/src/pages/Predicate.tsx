import { Button } from "../components/Button";
import { FuelLogo } from "../components/FuelLogo";
import { Input } from "../components/Input";
import { useActiveWallet } from "../hooks/useActiveWallet";
import { TestPredicateAbi__factory } from "../sway-api/predicates/index";
import { BN, InputValue, Predicate } from "fuels";
import { bn } from "fuels";
import { useState } from "react";
import toast from "react-hot-toast";
import useAsync from "react-use/lib/useAsync";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function PredicateExample() {
  let baseAssetId: string;

  const { wallet, walletBalance, refetchBalance, isConnected } =
    useActiveWallet();

  const [predicate, setPredicate] = useState<Predicate<InputValue[]>>();

  const [predicateBalance, setPredicateBalance] = useState<BN>();

  const [pin, setPin] = useState<string>();

    const [isLoadingTransfer, setIsLoadingTransfer] = useState<boolean>(false);

    const [isLoadingUnlock, setIsLoadingUnlock] = useState<boolean>(false);

  useAsync(async () => {
    if (wallet) {
      baseAssetId = wallet.provider.getBaseAssetId();
      const predicate = TestPredicateAbi__factory.createInstance(
        wallet.provider
      );
      setPredicate(predicate);
      setPredicateBalance(await predicate.getBalance());
    }
  }, [wallet]);

  const refreshBalances = async () => {
    await refetchBalance?.();
    setPredicateBalance(await predicate?.getBalance());
  };

  const transferFundsToPredicate = async (amount: BN) => {
    if (!isConnected)
      return toast.error(
        "Please connect your wallet to transfer funds to Predicate"
      );
    if (!predicate) {
      return toast.error("Predicate not loaded");
    }

    if (!wallet) {
      return toast.error("Wallet not loaded");
    }
    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Faucet' button in the top right corner, or use the local faucet."
      );
    }

    try {
      setIsLoadingTransfer(true);
      const tx = await wallet.transfer(predicate.address, amount, baseAssetId, {
        gasLimit: 10_000,
      });
      console.log(tx);
      await refreshBalances();

      return toast(() => (
        <span>
          <CheckCircleIcon color="success" />
          Funds transferred to predicate! View it on the
          <a
            className="pl-1 underline"
            target="_blank"
            href={`https://app.fuel.network/tx/${tx?.id}`}
          >
            block explorer
          </a>
        </span>
      ));
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while transferring funds.");
    } finally {
      setIsLoadingTransfer(false);
    }
  };

  const unlockPredicateAndTransferFundsBack = async (amount: BN) => {
    try {
      if (!isConnected)
        return toast.error(
          "Please connect your wallet to transfer funds back from Predicate"
        );
      if (!wallet) {
        return toast.error("Wallet not loaded");
      }
      if (walletBalance?.eq(0)) {
        return toast.error(
          "Your wallet does not have enough funds. Please click the 'Faucet' button in the top right corner, or use the local faucet."
        );
      }
      if (!predicateBalance || predicateBalance.lt(bn.parseUnits("0.09"))) {
        return toast.error("Predicate balance is less than 0.09 ETH");
      }
      setIsLoadingUnlock(true);
      const reInitializePredicate = TestPredicateAbi__factory.createInstance(
        wallet.provider,
        [bn(pin)]
      );

      if (!reInitializePredicate) {
        return toast.error("Failed to initialize predicate");
      }

      const tx = await reInitializePredicate.transfer(
        wallet.address,
        amount,
        baseAssetId
      );
      const { isStatusSuccess } = await tx.wait();

      if (!isStatusSuccess) {
        toast.error("Failed to unlock predicate");
      }

      if (isStatusSuccess) {
        toast(() => (
          <span>
            <CheckCircleIcon color="success" />
            Funds transferred from predicate! View it on the
            <a
              className="pl-1 underline"
              target="_blank"
              href={`https://app.fuel.network/tx/${tx?.id}`}
            >
              block explorer
            </a>
          </span>
        ));
      }

      await refreshBalances();
    } catch (e) {
      console.error(e);
      toast.error(
        "Failed to unlock predicate. You probably entered the wrong pin, or the predicate does not have enough balance. Try again."
      );
    } finally {
      setIsLoadingUnlock(false);
    }
  };

  const isButtonDisabled =
    !isConnected ||
    !predicateBalance ||
    predicateBalance.lt(bn.parseUnits("0.09"));

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <FuelLogo />
        <h3 className="text-2xl font-semibold">Predicate</h3>
      </div>

      <div className="mt-8 items-baseline flex gap-2">
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
          await transferFundsToPredicate(bn.parseUnits("0.1"))
        }
      >
        {isLoadingTransfer
          ? "Transferring to Predicate..."
          : "Transfer 0.1 ETH to Predicate"}
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
            : isButtonDisabled
            ? "bg-gray-500"
            : ""
        }`}
        onClick={async () =>
          await unlockPredicateAndTransferFundsBack(bn.parseUnits("0.09"))
        }
      >
        {isLoadingUnlock
          ? "Unlocking Predicate and Transferring to Wallet..."
          : "Unlock Predicate and Transfer 0.09 ETH back to Wallet"}
      </Button>

      <span className="mt-4 w-[360px] text-center text-gray-400">
        Do note that when you 'unlock' a predicate, the predicate also pays for
        the gas of the transaction. <br />
        This is why you will notice that the balance of the predicate gets
        reduced by 0.09 ETH + a nominal gas fee.
      </span>

      <Link
        to="https://docs.fuel.network/docs/intro/glossary/#predicate"
        target="_blank"
        className="text-fuel-green hover:underline"
      >
        Learn more about Predicates
      </Link>
    </>
  );
}
