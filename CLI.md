# Installation

Add it to your project.

```sh
cd my-project
pnpm add fuels
```

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

# Getting Started

Imagine you have this:

```sh
tree .
.
├── frontend-ui # your frontend ui
│   ├── src
│   ├── ..
│   └── package.json
└── backend # workspace with your sway programs
    ├── ..
    └── Forc.toml
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
├── frontend-ui
│   ├── fuels.config.ts # your new config
│   └── src
│       └── backend-api
└── backend
```

For all the options, check:

- [Config Specs](./CONFIG.md)

## 2) Build

```sh
pnpm fuels build
```

1.  Build all Sway programs under your `workspace` using `fuels-forc` <sup>[1](#commands-for-wrapped-utiltities)</sup>
1.  Generate types for them using `fuels-typegen`

## 3) Deploy

```sh
pnpm fuels deploy
```

1. Deploy all Sway programs under `workspace`
1. Saves their deployed IDs to:
   - _`./src/sway-progras/programs.json`_

```json
// programs.json
{
  "myContract1": "0x..",
  "myContract2": "0x.."
}
```

You can use them when instantiating your your programs:

```ts
import programIds from 'programs.json'
import { MyContract__factory } from "./backend-api";

const contractId = programIds.myContract1;
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
3. Rinse, repeat

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

- [packages/abi-typegen](https://github.com/FuelLabs/fuels-ts/tree/master/packages/versions)

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

They come both pinned to their latest versions supported by the Typescript SDK.

You can use then like:

```console
pnpm fuels forc <command> [options]
pnpm fuels core <command> [options]
```

For example, let's check their shipped versions:

```console
pnpm fuels forc --version
0.46.0
```

```console
pnpm fuels core --version
fuel-core 0.20.4
```

## Notes:

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

# Next Steps

Create a scaffolding tool for generating a ready-to-go Fullstack Fuel dApps.

```sh
pnpm create fuels@latest my-fuel-dapp
pnpm create fuels@latest my-fuel-dapp -t <template-name>
```

Quickstart in single command:

```sh
pnpm create fuels@latest my-fuel-dapp -t nextjs && \
  cd my-fuel-dapp && \
  pnmp fuels dev
```
