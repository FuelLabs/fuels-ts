# Commands

## `fuels init`

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

### See more

- [Forc workspaces](https://docs.fuel.network/docs/forc/workspaces/)

## `fuels build`

```console
pnpm fuels build
```

1.  Build all Sway programs under your `workspace` using `forc` <sup>[1](#commands-for-wrapped-utiltities)</sup>
1.  Generate types for them using `fuels-typegen` <sup>[2](#typegen)</sup>

## `fuels deploy`

```console
pnpm fuels deploy
```

1. Deploy all Sway contracts under `workspace`
1. Saves their deployed IDs to:
   - _`./src/backend-api/contracts.json`_

```json
{
  "myContract1": "0x..",
  "myContract2": "0x.."
}
```

Use it when instantiating your contracts:

```ts
import { MyContract__factory } from "./backend-api";
import contractIds from './backend-api/contracts.json'

const contractId = contractIds.myContract1;
const contract = MyContract__factory.connect(contractId, ..);
```

For a complete example, see:

- [Using Generated Types](https://docs.fuel.network/docs/fuels-ts/abi-typegen/using-generated-types/)

## `fuels dev`

```console
pnpm fuels dev
```

1. Runs `build` and `deploy` once at the start
2. Watches your Sway programs for changes, and do it again

> _In `dev` mode, everytime you update a contract on your Forc `workspace`, we re-generate type definitions and factory classs for it, following your pre-configured [`output`](./config-file.md#output) directory. If it's part of another build system running in dev mode (i.e. `next dev`), you can expect it to re-build / auto-reload as well._

## `fuels typegen`

Manually generates type definitions and factory classes from ABI JSON files.

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

## `fuels versions`

Check for version incompatibilities between your [Fuel Toolchain](#the-fuel-toolchain) component versions, matching them against the ones supported by the Typescript SDK version that you have.

```console
pnpm fuels versions
```

```
You have all the right versions! ⚡
┌───────────┬───────────┬─────────────────┐
│           │ Supported │ Yours / System  │
├───────────┼───────────┼─────────────────┤
│ Forc      │ 0.30.0    │ 0.30.0          │
├───────────┼───────────┼─────────────────┤
│ Fuel-Core │ 0.14.0    │ 0.14.0          │
└───────────┴───────────┴─────────────────┘
```

## The Fuel Toolchain

This guide assumes you have [The Fuel Toolchain](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/) installed already.

Otherwise, you can use [`fuel-up`](https://docs.fuel.network/docs/fuelup/installation/) to get it up and running.

Check if it's ok with:

```console
forc --version
```

```console
fuel-core --version
```

Make sure your config is _**not**_ set to use the SDK built-in versions:

```ts
// fuels.config.ts
import { createConfig } from 'fuels'

export createConfig({
  // ...
  useBuiltinForc: false,
  useBuiltinFuelCore: false,
})
```

Check the docs about `forc` and `fuel-core`:

- [Forc Commands](https://docs.fuel.network/docs/forc/commands/)
- [Running a local Node using `fuel-core`](https://docs.fuel.network/guides/running-a-node/running-a-local-node/)

## Batteries Included

In case you haven't configured [The Fuel Toolchain](#the-fuel-toolchain) _yet_, `fuels` conveniently ships with the last compatible binaries for:

- [`forc`](https://docs.fuel.network/docs/forc/commands/)
- [`fuel-core`](https://docs.fuel.network/guides/running-a-node/running-a-local-node/)

To use them, make sure your config _**is**_ set to use the SDK built-in versions:

```ts
// fuels.config.ts
import { createConfig } from 'fuels'

export createConfig({
  // ...
  useBuiltinForc: true,
  useBuiltinFuelCore: true,
})
```

You can also call them directly:

```console
pnpm fuels help forc
pnpm fuels forc --version
pnpm fuels forc test -h
```

```console
pnpm fuels help core
pnpm fuels core --version
pnpm fuels core run -h
```
