# Commands

The `fuels` CLI consists of a couple commands.

## `fuels init`

Creates a new `fuels.config.ts` file:

```console
npx fuels init -w ./sway-programs -o ./src/sway-programs-api
```

This will give you a minimal configuration:

```ts
// fuels.config.ts
import { createConfig } from 'fuels'

export createConfig({
  workspace: './sway-programs',
  output: './src/sway-programs-api',
})
```

In a nutshell:

```sh
. # current dir
├── frontend
│   ├── fuels.config.ts # your new config
│   └── src
│       └── sway-programs-api
└── sway-programs
```

### See more

- [Forc workspaces](https://docs.fuel.network/docs/forc/workspaces/)

## `fuels build`

```console
npx fuels build
```

1.  Build all Sway programs under your `workspace` using `forc` <sup>[1](#commands-for-wrapped-utiltities)</sup>
1.  Generate types for them using `fuels-typegen` <sup>[2](#typegen)</sup>

## `fuels deploy`

```console
npx fuels deploy
```

1. Deploy all Sway contracts under `workspace`
1. Saves their deployed IDs to:
   - _`./src/sway-programs-api/contracts.json`_

```json
{
  "myContract1": "0x..",
  "myContract2": "0x.."
}
```

Use it when instantiating your contracts:

```ts
import { MyContract__factory } from "./sway-programs-api";
import contractIds from './sway-programs-api/contracts.json'

const contractId = contractIds.myContract1;
const contract = MyContract__factory.connect(contractId, ..);
```

For a complete example, see:

- [Using Generated Types](https://docs.fuel.network/docs/fuels-ts/abi-typegen/using-generated-types/)

## `fuels dev`

```console
npx fuels dev
```

The `fuels dev` command do three things:

1. Auto-start a short-lived `fuel-core` node ([docs](./config-file.md#autostartfuelcore))
1. Runs `build` and `deploy` once at the start
1. Watches your Forc workspace and repeats previous step on every change

> _In `dev` mode, everytime you update a contract on your Forc `workspace`, we re-generate type definitions and factory classes for it, following your pre-configured [`output`](./config-file.md#output) directory. If it's part of another build system running in dev mode (i.e. `next dev`), you can expect it to re-build / auto-reload as well._

## `fuels typegen`

Manually generates type definitions and factory classes from ABI JSON files.

```console
npx fuels help typegen
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
npx fuels versions
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

## `fuels forc`

Simple [wrapper](./built-in-binaries.md) around the `forc` binary.

Check also:

- [Built-in Binaries](./built-in-binaries.md)
- [`forc` documentation](https://docs.fuel.network/docs/forc/commands/)

## `fuels core`

Simple [wrapper](./built-in-binaries.md) around the `fuel-core` binary.

Check also:

- [Built-in Binaries](./built-in-binaries.md)
- [`fuel-core` documentation](https://docs.fuel.network/guides/running-a-node/running-a-local-node/)
