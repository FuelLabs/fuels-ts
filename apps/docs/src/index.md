<script setup>
  import { data } from './versions.data'
  const { forc, fuels, fuelCore } = data
  const url = `https://fuellabs.github.io/sway/v${forc}/book/forc/index.html`
  const logoSrc = './fuel-logo.png'
</script>

## Version

This doc was generated using Fuels `v{{fuels}}`, Fuel Core `v{{fuelCore}}`, Sway `v{{forc}}`, and Forc `v{{forc}}`.

## Installation Guide

Please visit the Fuel's [installation guide](https://docs.fuel.network/guides/installation) to install The Fuel toolchain binaries and pre requisites.

## Developer Quickstart Guide

We recommend starting with the [Developer Quickstart](https://fuellabs.github.io/fuel-docs/master/quickstart/developer-quickstart.html) for a walk through on building your first DApp on Fuel.

- [Guide](./guide/)
- [Sample Application](https://github.com/FuelLabs/beta2-quickstart)
- [Other examples and projects](https://github.com/FuelLabs/sway-applications)

## The Fuel Ecosystem

Learn more about the Fuel Ecosystem.

- [🌴 Sway](https://fuellabs.github.io/sway/) the new language. Empowering everyone to build reliable and efficient smart contracts.
- <a :href="url" target="_blank" rel="noreferrer">🧰 Forc</a> the Fuel toolbox. Build, deploy and manage your sway projects.
- [⚙️ Fuel Core](https://github.com/FuelLabs/fuel-core) the new FuelVM, a blazingly fast blockchain VM.
- [🔗 Fuel Specs](https://github.com/FuelLabs/fuel-specs) the Fuel protocol specifications.
- [🦀 RUST SDK](https://github.com/FuelLabs/fuels-rs) a robust SDK in rust.
- [⚡ Fuel Network](https://fuel.network/) the project.

## Install

::: code-group

```sh [pnpm]
pnpm add fuels
```

```sh [npm]
npm install fuels --save
```

:::

## Import

<!-- TODO: stop using hard-coded snippets -->

```ts:line-numbers
import { Wallet } from "fuels";

// Random Wallet
console.log(Wallet.generate());

// Using privateKey Wallet
console.log(Wallet.fromPrivateKey(PRIVATE_KEY));
```

## Calling Contracts

<!-- TODO: stop using hard-coded snippets -->

```ts:line-numbers
import { Provider, Wallet, Contract, BigNumberish, BN } from "fuels";
import abi from "./abi.json";

const provider = await Provider.create('https://beta-5.fuel.network/graphql');
const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider); // private key with coins
const contractId = "0x...";
const contract = new Contract(contractId, abi, wallet);

// All contract methods are available under functions
const { transactionId, value } = await contract.functions
  .foo<[BigNumberish], BN>("bar")
  .call();

console.log(transactionId, value);
```

[READ MORE](./guide/contracts/)

## Deploying Contracts

<!-- TODO: stop using hard-coded snippets -->

```ts:line-numbers
import { Provider, ContractFactory } from "fuels";
// Byte code generated using: forc build
import bytecode from "./bytecode.bin";

const factory = new ContractFactory(bytecode, [], wallet);
const contract = await factory.deployContract();

console.log(contract.id);
```

## License

The primary license for this repo is `Apache 2.0`, see [`LICENSE`](https://github.com/FuelLabs/fuels-ts/blob/master/LICENSE).
