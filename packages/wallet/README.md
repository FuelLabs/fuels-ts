# `@fuel-ts/wallet`

**@fuel-ts/wallet** is a sub-module for interacting with **Fuel**.

This module contains the class to manage a private key and signing for a standard Externally Owned Account (EOA)

# Table of contents

- [Documentation](#documentation)
- [Usage](#usage)
  - [Installation](#installation)
  - [Full SDK Installation](#full-sdk-installation)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Documentation

See [Fuels-ts Documentation](https://fuellabs.github.io/fuels-ts/guide/wallets/)

## Usage

### Installation

```sh
yarn add @fuel-ts/wallet
# or
npm add @fuel-ts/wallet
```

### Full SDK Installation

Alternatively, we recommend you install the [complete SDK](https://github.com/FuelLabs/fuels-ts) using the umbrella package:

```sh
yarn add fuels
# or
npm add fuels
```

# Test Utilities

These test utilities are exported to assist in testing apps using Fuels.

```ts
import { bn } from "@fuel-ts/math";
import { BaseAssetId } from "fuels";
import { seedTestWallet, generateTestWallet } from "@wallet/test-utils";

const provider = await Provider.create("http://127.0.0.1:4000/graphql");

// seeding
const wallet = Wallet.fromPrivateKey("0x...", provider);
seedTestWallet(wallet, [{ assetId: BaseAssetId, amount: bn(100_000) }]);

// generating
const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);
```

## Contributing

In order to contribute to `@fuel-ts/wallet`, please see the main [fuels-ts](https://github.com/FuelLabs/fuels-ts) monorepo.

## Changelog

The `@fuel-ts/wallet` changelog can be found at [CHANGELOG](./CHANGELOG.md).

## License

The primary license for `@fuel-ts/wallet` is `Apache 2.0`, see [LICENSE](./LICENSE).
