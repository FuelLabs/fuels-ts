<script setup>
  import { data } from './versions.data'
  const { forc, sway, fuels, fuelCore } = data
  const url = `https://fuellabs.github.io/sway/v${sway}/book/forc/index.html`
  const logoSrc = './fuel-logo.png'
</script>

## Version

This doc was generated using Fuels `v{{fuels}}`, Fuel Core `v{{fuelCore}}`, Sway `v{{sway}}`, and Forc `v{{forc}}`.

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

#### YARN

```sh
yarn add fuels
```

#### NPM

```sh
npm install fuels --save
```

## Import

```ts:line-numbers
import { Wallet } from "fuels";

// Random Wallet
console.log(Wallet.generate());

// Using privateKey Wallet
console.log(new Wallet("0x0000...0000"));
```

## Calling Contracts

```ts:line-numbers
import { Wallet, Contract, BigNumberish, BN } from "fuels";
import abi from "./abi.json";

const wallet = new Wallet("0x..."); // private key with coins
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

```ts:line-numbers
import { Provider, Contract } from "fuels";
// Byte code generated using: forc build
import bytecode from "./bytecode.bin";

const factory = new ContractFactory(bytecode, [], wallet);
const contract = await factory.deployContract(factory);

console.log(contract.id);
```

## License

The primary license for this repo is `Apache 2.0`, see [`LICENSE`](https://github.com/FuelLabs/fuels-ts/blob/master/LICENSE).
