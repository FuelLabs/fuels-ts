import { useWallet } from "@fuels/react";
import { BigNumberish, BN, Script as FuelScript } from "fuels";
import { useEffect, useState } from "react";
import { TestScript } from "../sway-api";
import Button from "./Button";
import LocalFaucet from "./LocalFaucet";

export default function Script() {
  const { wallet } = useWallet();

  const [script, setScript] = useState<FuelScript<[input: BigNumberish], BN>>();
  const [input, setInput] = useState<number>();
  const [result, setResult] = useState<number>();

  useEffect(() => {
    if (wallet) {
      const testScript = new TestScript(wallet);
      setScript(testScript);
    }
  }, [wallet]);

  const submit = async () => {
    if (!script || !input) return;
    try {
      const call = await script.functions.main(input).call();
      const { value } = await call.waitForResult();
      setResult(value.toNumber());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <p>
          Scripts are another core program type. They act as runnable bytecode
          on chain. You can read more about them{" "}
          <a
            href="https://docs.fuel.network/docs/fuels-ts/scripts/"
            className="text-green-500/80 transition-colors hover:text-green-500"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
        <p className="pt-2">
          In the below example we can pass a number input and it returns the
          same value in the transaction output.
        </p>
        <p className="pt-2">
          You can alter the logic in the script at{" "}
          <code>sway-programs/scripts/src/main.sw</code>.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="mb-1 text-sm font-medium md:mb-0 dark:text-zinc-300/70">
            Script Input
          </h3>
          <div className="flex items-center justify-between text-base md:text-[17px] dark:text-zinc-50">
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(Number(e.target.value))}
              className="w-full bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
              placeholder="Hint: 123"
            />
          </div>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium md:mb-0 dark:text-zinc-300/70">
            Script Output
          </h3>
          <div className="flex items-center justify-between text-base md:text-[17px] dark:text-zinc-50">
            <input
              type="number"
              value={result}
              className="w-full bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="w-full" onClick={submit}>
          Submit
        </Button>
      </div>
      <LocalFaucet />
    </>
  );
}
