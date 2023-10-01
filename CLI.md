# TL;DR

The Fuels CLI is here for onboarding Fullstack dApp engineers.

# Getting Started

Imagine you have this file structure:

```sh
my-fuel-dapp
├── backend # <—— your sway programs' workspace
│   ├── ...
│   └── Forc.toml
└── frontend # <—— tipically your nextjs app, or similar
    ├── src
    └── package.json
```

# Installation

Add it to your Frontend project.

```sh
cd my-fuel-dapp/frontend
pnpm add fuels@XYZ # this PR's respective build tag
```

# Fuels CLI

Run your first command:

```sh
pnpm fuels help
```

```yaml
Usage: fuels [options] [command]

Options:
  -D, --debug        Enables verbose logging (default: false)
  -S, --silent       Omit output messages (default: false)
  -v, --version      Output the version number
  -h, --help         Display help

Commands:
  init [options]     Create a sample `fuel.config.ts` file
  dev [options]      Start a Fuel node and run build + deploy on every file change
  build [options]    Build Sway programs and generate Typescript for them
  deploy [options]   Deploy contracts to Fuel network
  typegen [options]  Generate Typescript from Sway ABI JSON files
  versions           Check for version incompatibilities
  core               Wrapper around Fuel Core binary
  forc               Wrapper around Forc binary
  help [command]     Display help for command
```

# Essential Commands

## 1) Init

Use it to create a new `fuels.config.ts` file:

```console
pnpm fuels init -w ../backend -o ./src/backend-api
```

This will give you a minimal configuration:

```ts
// fuels.config.ts
import { createConfig } from 'fuels'

export createConfig({
  workspace: '../backend',
  output: './src/backend-api',
})
```

In a nutshell:

```sh
. # current dir
├── frontend
│   ├── fuels.config.ts # your new config
│   └── src
│       └── backend-api
└── backend
```

## 2) Build

```sh
pnpm fuels build
```

1.  Build all Sway programs under your `workspace` using `fuels-forc` <sup>[1](#commands-for-wrapped-utiltities)</sup>
1.  Generate types for them using `fuels-typegen` <sup>[2](#1-typegen)</sup>

## 3) Deploy

```sh
pnpm fuels deploy
```

1. Deploy all Sway contracts under `workspace`
1. Saves their deployed IDs to:
   - _`./src/backend-api/contracts.json`_

```json
// contracts.json
{
  "myContract1": "0x..",
  "myContract2": "0x.."
}
```

You can use them when instantiating your your programs:

```ts
import { MyContract__factory } from "./backend-api";
import contractIds from './backend-api/contracts.json'

const contractId = contractIds.myContract1;
const contract = MyContract__factory.connect(contractId, ..);
```

For a complete examplem, see:

- [Using Generated Types](https://docs.fuel.network/docs/fuels-ts/abi-typegen/using-generated-types/)

## 4) Dev

```sh
pnpm fuels dev
```

1. Runs `build` and `deploy` once at the start
2. Watches your Sway programs for changes, and do it again

# Commands for sub-packages

These are our other individual CLIs, all shipped together for convenience.

## 1) Typegen

Sub-command inherited from:

- [packages/abi-typegen](https://github.com/FuelLabs/fuels-ts/tree/master/packages/abi-typegen)

```
pnpm fuels help typegen
```

```
Usage: fuels typegen [options]

Generate Typescript from Sway ABI JSON files

Options:
  -i, --inputs <path|glob...>  Input paths/globals to your abi json files
  -o, --output <dir>           Directory path for generated files
  -c, --contract               Generate types for Contracts [default]
  -s, --script                 Generate types for Scripts
  -p, --predicate              Generate types for Predicates
  -S, --silent                 Omit output messages
  -h, --help                   Display help
```

For more info, check:

- [Generating Types from ABI](https://docs.fuel.network/docs/fuels-ts/abi-typegen/generating-types-from-abi/)

## 2) Versions

Sub-command inherited from:

- [packages/versions](https://github.com/FuelLabs/fuels-ts/tree/master/packages/versions)

```
pnpm fuels help versions
```

```
Usage: fuels versions [options]

Check for version incompatibilities

Options:
  -h, --help  Display help
```

# Commands for wrapped utiltities

## 1) Forc & Fuel-Core

`fuels` conventiently ships with the the last compatibile binaries for:

- [`forc`](https://docs.fuel.network/docs/forc/commands/)
- [`fuel-core`](https://docs.fuel.network/guides/running-a-node/running-a-local-node/)

Both comes pinned to their latest versions supported by the Typescript SDK.

```console
pnpm fuels forc <command> [options]
pnpm fuels core <command> [options]
```

For example:

```console
pnpm fuels forc --version
0.46.0
```

```console
pnpm fuels core --version
fuel-core 0.20.4
```

## Notes:

The internally shippied Forc and FuelCore binaries are used by default.

Do you have your Rust toolchain setup using [`fuel-up`](https://docs.fuel.network/docs/fuelup/)?

You can tell the Typescript SDK to use them instead:

```ts
// fuels.config.ts
import { createConfig } from 'fuels'

export createConfig({
  // ...
  useSystemForc: true,
  useSystemFuelCore: true,
})
```

You can check which versions you have with:

```console
forc --version
fuel-core --version
```

Check the docs about `forc` and `fuel-core`:

- [Forc Commands](https://docs.fuel.network/docs/forc/commands/)
- [Running a local Node using `fuel-core`](https://docs.fuel.network/guides/running-a-node/running-a-local-node/)

# Config Specs

## Inputs

You can configure using a workwspace:

```ts
/**
  * Instead of informing `contracts`, `scripts` and `predicates`
  * individually, you can also use workspaces (recommended)
  * @param workspace - Path to Sway/Forc Workspace
  */
workspace: '../backend',
```

Or individual seetings for Contracts, Predicates and Scripts:

```ts
/**
 * This property should not be used alongside `workspace`
 * @param contracts - Paths to Sway Contracts
 */
contracts: ['../backend/contracts'],
```

```ts
/**
 * This property should not be used alongside `workspace`
 * @param predicates - Paths to Sway Predicates
 */
predicates: ['../backend/predicates'],
```

```ts
/**
 * This property should not be used alongside `workspace`
 * @param scripts - Path to Sway scripts
 */
scripts: ['../backend/scripts'],
```

## Output

Here's where your Typescript definitions and factory classes will be created:

```ts
/**
  * @param output - Where to generate Typescript definitions
  */
output: './src/backend-api',
```

## Deploy Configs

```ts
/**
  * @param privateKey - Your wallet private key
  */
// Should ideally como from env — `process.env.MY_PRIVATE_KEY`
privateKey: '0x..',
```

```ts
/**
 * Defaults to http://localhost:4000
 * @param providerUrl - Contracts will be deployed using this provider
 */
providerUrl: '...',
```

```ts
/**
 * @param chainConfig - Path to custom `chainConfig.json` file
 */
chainConfig: '...',
```

```ts
/**
 * This method can be used for crafting custon deployment flows.
 *
 * Sometimes we need to deploy two contracts, and the second
 * depends on the first—in such cses, you can use the contracts
 * object to get the necessary contract id's. Amother option is,
 * you could also fetch remote data for some reason.
 */
deployConfig: async (options: DeployOptions) => {
  await Promise.resolve(`simulating remote data fetch`);

  const contract = options.contracts.find(
    (c) => c.name === "<my contract deployed name>"
  );

  if (!contract) {
    throw new Error("Contract not found!");
  }

  return {
    gasPrice: 1,
    storageSlots: [
      {
        // storage slot to initialize w/ previous contract id
        key: "0x..",
        value: contract.contractId,
      },
    ],
  };
};
```

## Configs for `forc` and `fuel-core`

These let you chose to use the built-in shipped binaries or your system ones:

```ts
/**
 * Optional property, defaults to false
 * @param useSystemForc - Skip using internal wrapped Forc binaries
 */
useSystemForc: false,
```

```ts
/**
 * Optional property, defaults to false
 * @param useSystemFuelCore - Skip using internal wrapped FuelCore binaries
 */
useSystemFuelCore: false,
```

Use this to enable the auto-start of a Fuel node when your you run `pnpm fuels dev`:

```ts
/**
 * Optional property, defaults to true
 * @param autoStartFuelCore - When set to false, it will skip spinning up
 * a FuelCore node. In this case, you'll need to start the node yourself
 */
autoStartFuelCore: true,
```

## Calbacks

```ts
/**
  * This function is called after a successful run
  * @param event - The event that triggered this execution
  * @param config - The loaded `fuels.config`
  */
onSuccess: (event: CommandEvent, config: FuelsConfig) => {
  // console.log('fuels:onSuccess', { event, config });
},
```

```ts
/**
  * This function is called in case of errors
  * @param error - The error that interrupted the execution
  */
onFailure: (error: Error) => {
  // console.log('fuels:onFailure', { error });
},
```

# Outro

> _This is not included in this PR, but it is the end goal._

Create a scaffolding tool for generating ready-to-go Fullstack Fuel dApps.

It should support templates, and provide a single-command frictionless entry point for newcomers.

```sh
pnpm create fuels@latest my-fuel-dapp
pnpm create fuels@latest my-fuel-dapp -t <template-name>
```

Quickstart in single command:

```sh
pnpm create fuels@latest my-fuel-dapp -t counter

#
# At the end, create will automatically run these commands:
#
#   cd my-fuel-dapp
#   npm install
#   npm fuels dev
#   open http://localhost:<server:port>
#

# Use the `--skip-launch` flag to disable this behavior:
pnpm create fuels@latest my-fuel-dapp -t counter --skip-launch
```

## End goal

- Single-command, no-brainer, frictionless entrypoint for Fullstack dApp engineers
- Gets you prototyping Fuel dApps in seconds
- _Blazingly fast_ development cycle
