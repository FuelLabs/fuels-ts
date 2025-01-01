# fuels-ts

Typescript SDK for Fuel.

[![test](https://github.com/FuelLabs/fuels-ts/actions/workflows/test.yaml/badge.svg)](https://github.com/FuelLabs/fuels-ts/actions/workflows/test.yaml)
[![docs](https://img.shields.io/badge/docs-fuels.ts-brightgreen.svg?style=flat)](https://docs.fuel.network/docs/fuels-ts/)
[![npm](https://img.shields.io/npm/v/fuels)](https://www.npmjs.com/package/fuels)
[![discord](https://img.shields.io/badge/chat%20on-discord-orange?&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/xfpK4Pe)

# Official Docs

- https://docs.fuel.network/docs/fuels-ts

# Install

- https://docs.fuel.network/docs/intro/getting-started/installation

```bash
npm install fuels --save
```

# Connecting

- https://docs.fuel.network/docs/intro/getting-started/connecting-to-the-network

| Network   | URL                                                                                             |
| --------- | ----------------------------------------------------------------------------------------------- |
| Mainnet   | `https://testnet.fuel.network/v1/graphql`                                                       |
| Testnet   | `https://mainnet.fuel.network/v1/graphql`                                                       |
| Localhost | [Running a local Fuel node](https://docs.fuel.network/docs/fuels-ts/running-a-local-fuel-node/) |

```ts
import { Provider, Wallet } from "fuels";

const NETWORK = "https://mainnet.fuel.network/v1/graphql";

const provider = await Provider.create(NETWORK);
const wallet = Wallet.fromAddress("0x...", provider);

const { balances } = await wallet.getBalances();

console.log("Balances", balances);
```

# Create a new dApp

- https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/

```bash
$ npm create fuels

◇ What is the name of your project? #
│ my-fuel-project
└

⚡️ Success! Created a fullstack Fuel dapp at: my-fuel-project.
```

```bash
$ cd my-fuel-project
$ npm fuels --help
```

# Enjoy the `fuels` CLI

- https://docs.fuel.network/docs/fuels-ts/fuels-cli/

```bash
$ npm install fuels --save
$ npm fuels --help

✅ Your fuels version is up to date: 0.97.2

Usage: fuels [options] [command]

Options:
  -D, --debug         Enables verbose logging (default: false)
  -S, --silent        Omit output messages (default: false)
  -v, --version       Output the version number
  -h, --help          Display help

Commands:
  init [options]      Create a sample `fuel.config.ts` file
  build [options]     Build Sway programs and generate Typescript for them
  deploy [options]    Deploy contracts to the Fuel network
  dev [options]       Start a Fuel node with hot-reload capabilities
  node [options]      Start a Fuel node using project configs
  typegen [options]   Generate Typescript from Sway ABI JSON files
  versions [options]  Check for version incompatibilities
  help [command]      Display help for command
```

# Contributing

- https://github.com/FuelLabs/fuels-ts/blob/master/CONTRIBUTING.md

# More of the Fuel Stack

- `Sway` — https://docs.fuel.network/docs/sway
- `Forc` — https://docs.fuel.network/docs/forc
- `Core` — https://github.com/FuelLabs/fuel-core
- `VM` — https://docs.fuel.network/docs/specs/fuel-vm
- `Specs` — https://docs.fuel.network/docs/specs
- `Wallet` — https://docs.fuel.network/docs/wallet/install
- `RustSDK` — https://docs.fuel.network/docs/fuels-rs

# Resources

- `GraphQL Playground` — https://docs.fuel.network/docs/graphql
- `Forum` — https://forum.fuel.network

# License

The primary license for this repo is `Apache 2.0`, see [`LICENSE`](https://github.com/FuelLabs/fuels-ts/blob/master/LICENSE).
