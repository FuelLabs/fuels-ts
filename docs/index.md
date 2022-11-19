---
layout: default
title: Home
nav_order: -5
---

![Fuels-ts SDK logo](./assets/fuels-ts-logo.png)

## Version

This doc was generated using Fuels `v{{site.data.versions.fuels}}`, Fuel Core `v{{site.data.versions.fuel-core}}`, Sway `v{{site.data.versions.sway}}`, and Forc `v{{site.data.versions.forc}}`.

## Guide

We recommend starting with the [Guide](./guide) to speed-up and build your first DApp using Fuel.

- [Usage and Examples](./guide)
- [Other example projects](https://github.com/FuelLabs/sway-applications)

## The Fuel Ecosystem

Learn more about the Fuel Ecosystem.

- [🌴 Sway](https://fuellabs.github.io/sway/) the new language. Empowering everyone to build reliable and efficient smart contracts.
- [🧰 Forc](https://fuellabs.github.io/sway/v0.30.1/forc/index.html) the Fuel toolbox. Build, deploy and manage your sway projects.
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

```ts
import { Wallet } from "fuels";

// Random Wallet
console.log(Wallet.generate());

// Using privateKey Wallet
console.log(new Wallet("0x0000...0000"));
```

## Calling Contracts

```ts
import { Wallet, Contract, BigNumberish, BN } from "fuels";
import abi from "./abi.json";

const wallet = new Wallet("0x..."); // private key with coins
const contractId = "0x...";
const contract = new Contract(contractId, abi, wallet);

// All contract methods are available under functions
// with the correct types
const { transactionId, value } = await contract.functions
  .foo<[BigNumberish], BN>("bar")
  .call();

console.log(transactionId, value);
```

[READ MORE](./guide/contracts)
`target`: will always be `fuels`
`out-dir`: the output directory for the generated types
`abi.json`: the relative path to the JSON file for the ABI 

## Deploying Contracts

```ts
import { Provider, Contract } from "fuels";
// Byte code generated using: forc build
import bytecode from "./bytecode.bin";

const factory = new ContractFactory(bytecode, [], wallet);
const contract = await factory.deployContract(factory);

console.log(contract.id);
```

## License

The primary license for this repo is `Apache 2.0`, see [`LICENSE`](./LICENSE).
