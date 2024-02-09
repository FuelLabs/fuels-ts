import { Button } from "@/components/Button";
import { FuelLogo } from "@/components/FuelLogo";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { TestScriptAbi__factory } from "@/sway-api";
import { BN, BigNumberish, Provider, Script, Wallet, bn } from "fuels";
import { useEffect, useState } from "react";

export default function ScriptExample() {
  const [script, setScript] = useState<Script<[input: BigNumberish], BN>>();
  const [input, setInput] = useState<string>();
  const [result, setResult] = useState<string>();

  useEffect(() => {
    (async () => {
      const provider = await Provider.create("http://127.0.0.1:4000/graphql");

      // 0x1 is the private key of one of the fauceted accounts on your local Fuel node
      const wallet = Wallet.fromPrivateKey("0x01", provider);

      const script = TestScriptAbi__factory.createInstance(wallet);
      setScript(script);

      // eslint-disable-next-line no-console
    })().catch(console.error);
  }, []);

  const runScript = async () => {
    try {
      if (!script) {
        // eslint-disable-next-line no-alert
        return alert("Script not loaded");
      }

      const { value } = await script.functions.main(bn(input)).call();

      setResult(value.toString());
    } catch (error) {
      console.error(error);
      alert("Error running script.");
    }
  };

  return (
    <div className={`min-h-screen items-center p-24 flex flex-col gap-6`}>
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

      <Button onClick={runScript}>Run Script</Button>

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
        href="https://docs.fuel.network/docs/intro/glossary/#script"
        className="mt-4"
      >
        Learn more about Scripts
      </Link>

      <Link href="/" className="mt-12">
        Back to home
      </Link>
    </div>
  );
}
