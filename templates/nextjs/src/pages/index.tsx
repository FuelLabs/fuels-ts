import type { TestContractAbi } from "@/sway-api";
import { TestContractAbi__factory } from "@/sway-api";
import contractIds from "@/sway-api/contract-ids.json";
import {
  Button,
  FuelLogo,
  HStack,
  Heading,
  Link,
  Text,
  VStack,
} from "@fuel-ui/react";
import { Provider, Wallet, bn } from "fuels";
import { useEffect, useState } from "react";

const contractId = contractIds.testContract;

export default function Home() {
  const [contract, setContract] = useState<TestContractAbi>();
  const [counter, setCounter] = useState<number>();

  useEffect(() => {
    (async () => {
      const provider = await Provider.create("http://127.0.0.1:4000/graphql");
      const wallet = Wallet.fromPrivateKey("0x01", provider); // 0x1 is the private key of one of the fauceted accounts on your local Fuel node
      const testContract = TestContractAbi__factory.connect(contractId, wallet);
      setContract(testContract);
      const { value } = await testContract.functions
        .get_count()
        .txParams({
          gasPrice: 1,
        })
        .simulate();
      setCounter(value.toNumber());
      // eslint-disable-next-line no-console
    })().catch(console.error);
  }, []);

  // eslint-disable-next-line consistent-return
  const onIncrementPressed = async () => {
    if (!contract) {
      // eslint-disable-next-line no-alert
      return alert("Contract not loaded");
    }
    const { value } = await contract.functions
      .increment_counter(bn(1))
      .txParams({
        gasPrice: 1,
      })
      .call();
    setCounter(value.toNumber());
  };

  return (
    <VStack className={`min-h-screen items-center p-24`}>
      <HStack>
        <FuelLogo />
        <Heading>Welcome to Fuel</Heading>
      </HStack>

      <Text>
        Get started by editing <i>sway-contracts/main.sw</i> or{" "}
        <i>src/pages/index.tsx</i>.
      </Text>

      <Text>
        This boilerplate uses the new{" "}
        <Link href="https://fuellabs.github.io/fuels-ts/guide/cli/">
          Fuels CLI
        </Link>{" "}
        enable type-safe hot-reloading for your Sway smart contracts.
      </Text>

      <Heading as="h3">Counter</Heading>

      <Text fontSize="5xl">{counter}</Text>

      <Button
        onPress={onIncrementPressed}
        style={{
          marginTop: 24,
        }}
      >
        Increment Counter
      </Button>
    </VStack>
  );
}
