import { TestScriptAbi__factory } from "@/sway-api";
import {
  Button,
  FuelLogo,
  HStack,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@fuel-ui/react";
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

      const { value } = await script.functions
        .main(bn(input))
        .txParams({
          gasPrice: 1,
          gasLimit: 10_000,
        })
        .call();

      setResult(value.toString());
    } catch (error) {
      console.error(error);
      alert("Error running script.");
    }
  };

  return (
    <VStack className={`min-h-screen items-center p-24`}>
      <HStack>
        <FuelLogo />
        <Heading as="h3">Script</Heading>
      </HStack>

      <Input
        css={{
          marginTop: 32,
        }}
      >
        <Input.Number
          name="inputValue"
          placeholder="Enter a number"
          inputMode="numeric"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Input>

      <Button onClick={runScript}>Run Script</Button>

      {result && (
        <HStack
          css={{
            alignItems: "baseline",
          }}
        >
          <Heading as="h5">Result:</Heading>
          <p>{result}</p>
        </HStack>
      )}

      <Text>This script takes a number and simply echoes it back.</Text>

      <Link
        href="https://docs.fuel.network/docs/intro/glossary/#script"
        style={{ marginTop: 16 }}
      >
        Learn more about Scripts
      </Link>

      <Link
        href="/"
        style={{
          marginTop: 48,
        }}
      >
        Back to home
      </Link>
    </VStack>
  );
}
