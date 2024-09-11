"use client";

import { Button } from "@/components/Button";
import { FuelLogo } from "@/components/FuelLogo";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { useActiveWallet } from "@/hooks/useActiveWallet";
import { TestScript } from "@/sway-api";
import { FAUCET_LINK } from "@/lib";
import { BN, BigNumberish, Script, bn } from "fuels";
import { useState } from "react";
import toast from "react-hot-toast";
import useAsync from "react-use/lib/useAsync";

export default function ScriptExample() {
  const { wallet, walletBalance, refreshWalletBalance, isConnected } =
    useActiveWallet();

  const [script, setScript] = useState<Script<[input: BigNumberish], BN>>();
  const [input, setInput] = useState<string>();
  const [result, setResult] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useAsync(async () => {
    if (wallet) {
      // Initialize script instance
      const script = new TestScript(wallet);
      setScript(script);
    }
  }, [wallet]);

  const runScript = async () => {
    try {
      if (!isConnected) {
        return toast.error("Please connect your wallet to run the script");
      }
      if (!script) {
        return toast.error("Script not loaded");
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
      setIsLoading(true);

      // Call the script with the input value
      const { waitForResult } = await script.functions.main(bn(input)).call();
      const { value, transactionId } = await waitForResult();

      setResult(value.toString());
      await refreshWalletBalance?.();
      toast.success(() => (
        <span>
          Transaction Success! View it on the
          <a
            className="pl-1 underline"
            target="_blank"
            href={`https://app.fuel.network/tx/${transactionId}`}
          >
            block explorer
          </a>
        </span>
      ));
    } catch (error) {
      console.error(error);
      toast.error(
        <span>
          Error running script. Please make sure your wallet has enough funds.
          You can top it up using the{" "}
          <Link href={FAUCET_LINK} target="_blank">
            faucet.
          </Link>
        </span>,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <FuelLogo />
        <h3 className="text-2xl font-semibold">Script</h3>
      </div>

      <Input
        className="mt-8"
        value={input as string}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a number"
        type="number"
      />

      <Button
        className={`${
          isLoading
            ? "bg-transparent border border-gray-400 pointer-events-none"
            : !isConnected
              ? "bg-gray-500"
              : ""
        }`}
        onClick={runScript}
      >
        {isLoading ? "Running..." : "Run Script"}
      </Button>

      {result && (
        <div className="flex gap-4 align-baseline">
          <h5 className="font-semibold text-xl">Result:</h5>
          <p className="text-gray-400">{result}</p>
        </div>
      )}

      <span className="text-gray-400">
        This script takes a number and simply echoes it back.
      </span>

      <Link
        href="https://docs.fuel.network/docs/fuels-ts/scripts"
        target="_blank"
        className="mt-4"
      >
        Learn more about Scripts
      </Link>
    </>
  );
}
