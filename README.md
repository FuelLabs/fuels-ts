# fuels-ts

Typescript SDK for Fuel.

[![test](https://github.com/FuelLabs/fuels-ts/actions/workflows/test.yaml/badge.svg)](https://github.com/FuelLabs/fuels-ts/actions/workflows/test.yaml)
[![docs](https://img.shields.io/badge/docs-fuels.ts-brightgreen.svg?style=flat)](https://docs.fuel.network/docs/fuels-ts/)
[![npm](https://img.shields.io/npm/v/fuels)](https://www.npmjs.com/package/fuels)
[![discord](https://img.shields.io/badge/chat%20on-discord-orange?&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/xfpK4Pe)

# Install ([docs](https://docs.fuel.network/docs/fuels-ts/getting-started/installation))

```console
npm install fuels --save
```

# Connecting ([docs](https://docs.fuel.network/docs/fuels-ts/getting-started/connecting-to-the-network))

| Network   | URL                                                                                                             |
| --------- | --------------------------------------------------------------------------------------------------------------- |
| Mainnet   | `https://testnet.fuel.network/v1/graphql`                                                                       |
| Testnet   | `https://mainnet.fuel.network/v1/graphql`                                                                       |
| Localhost | [Running a local Fuel node](https://docs.fuel.network/docs/fuels-ts/getting-started/running-a-local-fuel-node/) |

```ts
import { Provider, Wallet } from "fuels";

const NETWORK = "https://mainnet.fuel.network/v1/graphql";

const provider = await Provider.create(NETWORK);
const wallet = Wallet.fromAddress("0x...", provider);

const { balances } = await wallet.getBalances();

console.log("Balances", balances);
```

# Create a new dApp ([docs](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/))

```console
$ npm create fuels

◇ What is the name of your project? #
│ my-fuel-project
└

⚡️ Success! Created a fullstack Fuel dapp at: my-fuel-project.
```

# Enjoy the `fuels` CLI ([docs](https://docs.fuel.network/docs/fuels-ts/fuels-cli/))

- [`fuels init`](./commands.md#fuels-init) — Creates a new `fuels.config.ts` file
- [`fuels build`](./commands.md#fuels-build) — Build `forc` workspace and generate Typescript types for everything
- [`fuels deploy`](./commands.md#fuels-deploy) — Deploy workspace contracts and save their IDs to JSON file
- [`fuels dev`](./commands.md#fuels-dev) — Start local Fuel Core _node_ and `build` + `deploy` on every file change

```console
$ npm install fuels --save
$ npm fuels --help

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
- `FuelCore` — https://github.com/FuelLabs/fuel-core
- `FuelVM` — https://docs.fuel.network/docs/specs/fuel-vm
- `FuelSpecs` — https://docs.fuel.network/docs/specs
- `Wallet` — https://docs.fuel.network/docs/wallet/install
- `RustSDK` — https://docs.fuel.network/docs/fuels-rs

# Resources

- `GraphQL Playground` — https://docs.fuel.network/docs/graphql
- `Forum` — https://forum.fuel.network

# Official Docs

- https://docs.fuel.network/docs/fuels-ts

# License

The primary license for this repo is `Apache 2.0`, see [`LICENSE`](https://github.com/FuelLabs/fuels-ts/blob/master/LICENSE).
