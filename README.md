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

# Connect ([docs](https://docs.fuel.network/docs/fuels-ts/getting-started/connecting-to-the-network/))

| Network   | URL                                                                                                              |
| --------- | --------------------------------------------------------------------------------------------------------------- |
| Mainnet   | `https://testnet.fuel.network/v1/graphql`                                                                       |
| Testnet   | `https://mainnet.fuel.network/v1/graphql`                                                                       |
| Localhost | [Running a local Fuel node](https://docs.fuel.network/docs/fuels-ts/getting-started/running-a-local-fuel-node/) |

```ts
import { Provider } from 'fuels';

const NETWORK_URL = 'https://mainnet.fuel.network/v1/graphql';

const provider = await Provider.create(NETWORK_URL);

const baseAssetId = provider.getBaseAssetId();
const chainId = provider.getChainId();
const gasConfig = provider.getGasConfig();

console.log('chainId', chainId);
console.log('baseAssetId', baseAssetId);
console.log('gasConfig', gasConfig);
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

In-depth docs:
- [`fuels init`](https://docs.fuel.network/docs/fuels-ts/fuels-cli/commands#fuels-init) — Creates a new `fuels.config.ts` file
- [`fuels build`](https://docs.fuel.network/docs/fuels-ts/fuels-cli/commands#fuels-build) — Build `forc` workspace and generate Typescript types for everything
- [`fuels deploy`](https://docs.fuel.network/docs/fuels-ts/fuels-cli/commands#fuels-deploy) — Deploy workspace contracts and save their IDs to JSON file
- [`fuels dev`](https://docs.fuel.network/docs/fuels-ts/fuels-cli/commands#fuels-dev) — Start a Fuel node with hot-reload capabilities


# Official Docs

- Install The Fuel Toolchain — https://docs.fuel.network/guides/installation/
---
- Typescript SDK — https://docs.fuel.network/docs/fuels-ts
- Fuel Wallet SDK — https://docs.fuel.network/docs/wallet
- Rust SDK — https://docs.fuel.network/docs/fuels-rs
- GraphQL Playground — https://docs.fuel.network/docs/graphql
---
- Forc — https://docs.fuel.network/docs/forc
- Sway — https://docs.fuel.network/docs/sway
- Fuel Core — https://github.com/FuelLabs/fuel-core
- Fuel VM — https://docs.fuel.network/docs/specs/fuel-vm
- Fuel Specs — https://docs.fuel.network/docs/specs

# Apps & Ecosystem

- Fuel Bridge — https://app.fuel.network/bridge
- Block Explorer — https://app.fuel.network
- Ecosystem Apps — https://app.fuel.network/ecosystem

# Get in Touch

- `Forum` — https://forum.fuel.network
- `Discord` — https://discord.gg/xfpK4Pe


# Contribute

- [./CONTRIBUTING.md](https://github.com/FuelLabs/fuels-ts/blob/master/CONTRIBUTING.md)


# License

The primary license for this repo is `Apache 2.0`, see [`LICENSE`](https://github.com/FuelLabs/fuels-ts/blob/master/LICENSE).
