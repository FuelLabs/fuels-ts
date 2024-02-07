import { TestPredicateAbi__factory } from "@/sway-api/predicates/index";
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
        .transfer(wallet.address, amount, BaseAssetId, {
          gasPrice: 1,
          gasLimit: 10_000,
        });
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
    <VStack className={`min-h-screen items-center p-24`}>
      <HStack>
        <FuelLogo />
        <Heading as="h3">Predicate</Heading>
      </HStack>

      <HStack
        css={{
          alignItems: "baseline",
          marginTop: 48,
        }}
      >
        <Heading as="h5">Wallet Balance:</Heading>
        <Text>{walletBalance?.toString()}</Text>
      </HStack>

      <HStack
        css={{
          alignItems: "baseline",
          marginTop: -20,
        }}
      >
        <Heading as="h5">Predicate Balance:</Heading>
        <Text>{predicateBalance?.toString()}</Text>
      </HStack>

      <Button onClick={() => transferFundsToPredicate(bn(10_000))}>
        Transfer 10_000 to Predicate
      </Button>

      <Input
        css={{
          width: "300px",
          marginTop: 32,
        }}
      >
        <Input.Number
          name="pin"
          placeholder="Hint - the correct pin is 1337"
          inputMode="numeric"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
      </Input>

      <Button onClick={() => unlockPredicateAndTransferFundsBack(bn(10_000))}>
        Unlock Predicate and Transfer 10_000 back to Wallet
      </Button>

      <Text
        css={{
          marginTop: 32,
          width: "400px",
        }}
      >
        Do note that when you 'unlock' a predicate, the predicate also pays for
        the gas of the transaction. <br />
        This is why you will notice that the balance of the predicate gets
        reduced by 10_000 + a nominal gas fee.
      </Text>

      <Link
        href="https://docs.fuel.network/docs/intro/glossary/#predicate"
        target="_blank"
      >
        Learn more about Predicates
      </Link>

      <Link
        href="/"
        style={{
          marginTop: 48,
        }}
      >
        Back to Home
      </Link>
    </VStack>
  );
}
