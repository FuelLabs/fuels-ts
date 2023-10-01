# Commands

## Init

Use it to create new `fuels.config.ts` file:

```console
pnpm fuels init -w ../backend -o ./src/backend-api
```

This will give you a minimal configuration

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

# Build

```console
pnpm fuels build
```

1.  Build all Sway programs under your `workspace` using `fuels-forc` <sup>[1](#commands-for-wrapped-utiltities)</sup>
1.  Generate types for them using `fuels-typegen` <sup>[2](#1-typegen)</sup>

## Deploy

```console
pnpm fuels deploy
```

1. Deploy all Sway con racts under `workspace`
1. Saves their deploye IDs to:
   - _`./src/backend-api/contracts.json`_

```json
{
  "myContract1": "0x..",
  "myContract2": "0x.."
}
```

You can use them when instantiating your programs:

```ts
import { MyContract__factory } from "./backend-api";
import contractIds from './backend-api/contracts.json'

const contractId = contractIds.myContract1;
const contract = MyContract__factory.connect(contractId, ..);
```

For a complete example, see:

- [Using Generated Types](https://docs.fuel.network/docs/fuels-ts/abi-typegen/using-generated-types/)

## Dev

```console
pnpm fuels dev
```

1. Runs `build` and `deploy` once at the start
2. Watches your Sway programs for changes, and do it again

## Typegen

Sub-command inherited from:

- [packages/abi-typegen](https://github.com/FuelLabs/fuels-ts/tree/master/packages/abi-typegen)

```console
pnpm fuels help typegen
```

```
Usage: fuels typegen [options]

Generate Typescript from Sway ABI JSON files

Options:
  -i, --inputs <path|glob...>  Input paths/globals to your Abi JSON files
  -o, --output <dir>           Directory path for generated files
  -c, --contract               Generate types for Contracts [default]
  -s, --script                 Generate types for Scripts
  -p, --predicate              Generate types for Predicates
  -S, --silent                 Omit output messages
  -h, --help                   Display help
```

For more info, check:

- [Generating Types from ABI](https://docs.fuel.network/docs/fuels-ts/abi-typegen/generating-types-from-abi/)

## Versions

Sub-command inherited from:

- [packages/versions](https://github.com/FuelLabs/fuels-ts/tree/master/packages/versions)

```console
pnpm fuels help versions
```

```
Usage: fuels versions [options]

Check for version incompatibilities

Options:
  -h, --help  Display help
```

## Forc & Fuel Core

`fuels` conveniently ships with the last compatible binaries for:

- [`forc`](https://docs.fuel.network/docs/forc/commands/)
- [`fuel-core`](https://docs.fuel.network/guides/running-a-node/running-a-local-node/)

> [!WARNING]
> The internally shipped Forc and FuelCore binaries are used by default.<br/>
> Want to use your system's `forc` and `fuel-core` instead? See [Customizing](#customizing).

Both come pinned to their latest versions supported by the Typescript SDK.

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

> [!INFO]
> Do you have your Rust toolchain setup using [`fuel-up`](https://docs.fuel.network/docs/fuelup/)? No problem. <br/>
> You can tell `fuels` to use them instead.

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
