<script setup>
  import { data } from '../../versions.data'
  const { fuels } = data
</script>

# Fuels CLI

The quickest way to build full stack Fuel dApps.

- [`fuels init`](./commands.md#fuels-init) — Creates a new `fuels.config.ts` file
- [`fuels build`](./commands.md#fuels-build) — Build `forc` workspace and generate Typescript types for everything
- [`fuels deploy`](./commands.md#fuels-deploy) — Deploy workspace contracts and save their IDs to JSON file
- [`fuels dev`](./commands.md#fuels-dev) — Start local Fuel Core _node_ and `build` + `deploy` on every file change

## Getting started

Imagine you have this file structure:

```sh
my-fuel-dapp # NextJS app or similar
├── sway-programs # Forc's workspace
│   ├── src
│   ├── ...
│   └── Forc.toml
├── public
│   └── ...
├── src
│   ├── app
│   ├── ...
├   └── sway-programs-api # Type-safe generated API
└── package.json
```

## Prerequisites

The [Fuel Toolchain](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/#the-fuel-toolchain) and its components (namely `forc` and `fuel-core`) are pre-requisite for several operations with the Fuels CLI. For example:

- Building out contracts using [`fuels build`](./commands.md#fuels-build) requires `forc`.
- Deploying contracts locally using [`fuels deploy`](./commands.md#fuels-deploy) requires `fuel-core`.

Follow the [installation guide](https://docs.fuel.network/guides/installation/) if you don't have them installed already.

## Installation

Add it to your `my-fuel-dapp` project:

::: code-group

```console-vue [npm]
npm install fuels@{{fuels}} --save
```

```console-vue [pnpm]
pnpm add fuels@{{fuels}}
```

```console-vue [bun]
bun add fuels@{{fuels}}
```

:::

## Double-checking

```console-vue
npx fuels@{{fuels}} -v
```

## Next Step

Use [`fuels init`](./commands.md#fuels-init) to create a [`fuel.config.ts`](./config-file.md) file.
