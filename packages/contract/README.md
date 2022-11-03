# `@fuel-ts/contract`

**@fuel-ts/contract** is a sub-module for interacting with **Fuel**.

This module allows for a simple way to serialize calls and transactions to an on-chain contract and deserialize their results and emitted logs.

# Table of contents

- [Documentation](#documentation)
- [Usage](#usage)
  - [Installation](#installation)
  - [How to use](#how-to-use)
  - [Full SDK Installation](#full-sdk-installation)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Documentation

See [Fuel-ts Documentation](https://fuellabs.github.io/fuels-ts/packages/fuel-ts-contract/)

## Usage

### Installation

```sh
yarn add @fuel-ts/contract
# or
npm add @fuel-ts/contract
```

### How to use

```ts
// typescript file
import { Wallet, BigNumberish, BN } from "fuels";

const provider = new Wallet("0x..."); // Wallet with coins
const contractId = "0x...";
const contract = new Contract(
  contractId,
  [
    {
      type: "function",
      inputs: [{ name: "amount", type: "u64" }],
      name: "add_one",
      outputs: [{ name: "amount", type: "u64" }],
    },
    {
      type: "function",
      name: "current_amount",
      outputs: [{ name: "amount", type: "u64" }],
    },
  ],
  wallet
);

// Submit
const { value, transactionId } = contract.functions.add_one(1).call();
console.log(value, transactionId);

// Simulate without change blockchain state or consume coins
// This is also use-full to measure how much gas the TX will use
const { value, gasUsed } = contract.functions.add_one(1).simulate();
console.log(value);
console.log(gasUsed);

// Run a read-only execution to call methods that return
// Contract values
const { value } = contract.functions.current_amount().get();
console.log(value);

// On projects with typescript without generated types you
// can pass the types on the contract call
const { value } = contract.functions.add_one<[BigNumberish], BN>().call();
console.log(value);
```

#### TypeScript projects

For best experience use `fuels typegen` command to generate types and use auto generate types on
the project.

- [fuels typegen](https://github.com/FuelLabs/fuels-ts#generating-contract-types)

### Full SDK Installation

Alternatively, we recommend you install the [complete SDK](https://github.com/FuelLabs/fuels-ts) using the umbrella package:

```sh
yarn add fuels
# or
npm add fuels
```

## Contributing

In order to contribute to `@fuel-ts/contract`, please see the main [fuels-ts](https://github.com/FuelLabs/fuels-ts) monorepo.

## Changelog

The `@fuel-ts/contract` changelog can be found at [CHANGELOG](./CHANGELOG.md).

## License

The primary license for `@fuel-ts/contract` is `Apache 2.0`, see [LICENSE](./LICENSE).
