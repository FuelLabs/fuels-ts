"use client";

import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { FuelLogo } from "../components/FuelLogo";
import { Input } from "../components/Input";
// import { Link } from "../components/Link";
import { useActiveWallet } from "../hooks/useActiveWallet";
import { TestScriptAbi__factory } from "../sway-api";
import { BN, BigNumberish, Script, bn } from "fuels";
import { useState } from "react";
import toast from "react-hot-toast";
import useAsync from "react-use/lib/useAsync";
import LaunchIcon from "@mui/icons-material/Launch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ScriptExample() {
  const { wallet, walletBalance, isConnected } = useActiveWallet();

  const [script, setScript] = useState<Script<[input: BigNumberish], BN>>();
  const [input, setInput] = useState<string>();
  const [result, setResult] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useAsync(async () => {
    if (wallet) {
      const script = TestScriptAbi__factory.createInstance(wallet);
      setScript(script);
    }
  }, [wallet]);

  const runScript = async () => {
    try {
      if (!isConnected)
        return toast.error("Please connect your wallet to run the script");
      if (!script) {
        return toast.error("Script not loaded");
      }
      if (walletBalance?.eq(0)) {
        return toast.error(
          "Your wallet does not have enough funds. Please click the 'Faucet' button in the top right corner, or use the local faucet."
        );
      }

      setIsLoading(true);

      const { waitForResult } = await script.functions.main(bn(input)).call();
      const { value, transactionId } = await waitForResult();

      setResult(value.toString());
      toast(() => (
        <span>
          <CheckCircleIcon color="success" />
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
      toast.error("Error running script.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center">
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
        to="https://docs.fuel.network/docs/intro/glossary/#script"
        target="_blank"
        className="text-fuel-green hover:underline"
      >
        Learn more about Scripts
      </Link>

      {/* <Link href="/" className="mt-12">
        Back to home
      </Link> */}
    </>
  );
}
