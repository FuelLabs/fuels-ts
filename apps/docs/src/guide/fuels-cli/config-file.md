# Config File

Here, you can learn more about all configuration options.

## `workspace`

Relative directory path to Forc workspace.

<<< @../../../demo-fuels/fuels.config.full.ts#workspace{ts:line-numbers}

> _The property `workspace` is incompatible with [`contracts`](#contracts), [`predicates`](#predicates), and [`scripts`](#scripts)._

## `contracts`

List of relative directory paths to Sway contracts.

<<< @../../../demo-fuels/fuels.config.full.ts#contracts{ts:line-numbers}

> _The property `contracts` is incompatible with [`workspace`](#workspace)._

## `predicates`

List of relative directory paths to Sway predicates.

<<< @../../../demo-fuels/fuels.config.full.ts#predicates{ts:line-numbers}

> _The property `predicates` is incompatible with [`workspace`](#workspace)._

## `scripts`

List of relative directory paths to Sway scripts.

<<< @../../../demo-fuels/fuels.config.full.ts#scripts{ts:line-numbers}

> _The property `scripts` is incompatible with [`workspace`](#workspace)._

## `output`

Relative directory path to use when generating Typescript definitions.

<<< @../../../demo-fuels/fuels.config.full.ts#output{ts:line-numbers}

## `providerUrl`

The URL to use when deploying contracts.

<<< @../../../demo-fuels/fuels.config.full.ts#providerUrl{ts:line-numbers}

> _When [`autostartFuelCore`](#autostartfuelcore) property is set to `true`, the `providedUrl` is overridden by that of the local short-lived `fuel-core` node started by the [`fuels dev`](./commands.md#fuels-dev) command._

## `privateKey`

Wallet private key, used when deploying contracts.

This property should ideally come from env — `process.env.MY_PRIVATE_KEY`.

<<< @../../../demo-fuels/fuels.config.full.ts#privateKey{ts:line-numbers}

> _When [`autostartFuelCore`](#autostartfuelcore) property is set to `true`, the `privateKey` is overridden with the `consensusKey` of the local short-lived `fuel-core` node started by the [`fuels dev`](./commands.md#fuels-dev) command._

## `snapshotDir`

> - _Used by [`fuels dev`](./commands.md#fuels-dev) only_.

Relative path to directory containing custom configurations for `fuel-core`, such as:

- `chainConfig.json`
- `metadata.json`
- `stateConfig.json`

This will take effect only when [`autoStartFuelCore`](#autostartfuelcore) is `true`.

<<< @../../../demo-fuels/fuels.config.full.ts#snapshotDir{ts:line-numbers}

## `autoStartFuelCore`

> - _Used by [`fuels dev`](./commands.md#fuels-dev) only_.

When set to `true`, it will automatically:

1. Starts a short-lived `fuel-core` node as part of the [`fuels dev`](./commands.md#fuels-dev) command
1. Override property [`providerUrl`](#providerurl) with the URL for the recently started `fuel-core` node

<<< @../../../demo-fuels/fuels.config.full.ts#autoStartFuelCore{ts:line-numbers}

If set to `false`, you must spin up a `fuel-core` node by yourself and set the URL for it via [`providerUrl`](#providerurl).

## `fuelCorePort`

> - _Used by [`fuels dev`](./commands.md#fuels-dev) only_.
> - _Ignored when [`autoStartFuelCore`](#autostartfuelcore) is set to `false`._

Port to use when starting a local `fuel-core` node.

<<< @../../../demo-fuels/fuels.config.full.ts#fuelCorePort{ts:line-numbers}

## `forcBuildFlags`

> - _Used by [`fuels build`](./commands.md#fuels-build) and [`fuels deploy`](./commands.md#fuels-deploy)_.

Sway programs are compiled in `debug` mode by default.

Here you can customize all build flags, e.g. to build programs in `release` mode.

<<< @../../../demo-fuels/fuels.config.full.ts#forcBuildFlags{ts:line-numbers}

Check also:

- [Forc docs](https://docs.fuel.network/docs/forc/commands/forc_build/#forc-build)

## `deployConfig`

You can supply a ready-to-go deploy configuration object:

<<< @../../../demo-fuels/fuels.config.full.ts#deployConfig-obj{ts:line-numbers}

Or use a function for crafting dynamic deployment flows:

- If you need to fetch and use configs or data from a remote data source
- If you need to use IDs from already deployed contracts — in this case, we can use the `options.contracts` property to get the necessary contract ID. For example:

<<< @../../../demo-fuels/fuels.config.full.ts#deployConfig-fn{ts:line-numbers}

## `onBuild`

A callback function that is called after a build event has been successful.

Parameters:

- `config` — The loaded config (`fuels.config.ts`)

<<< @../../../demo-fuels/fuels.config.full.ts#onBuild{ts:line-numbers}

## `onDeploy`

A callback function that is called after a deployment event has been successful.

Parameters:

- `config` — The loaded config (`fuels.config.ts`)
- `data` — The data (an array of deployed contracts)

<<< @../../../demo-fuels/fuels.config.full.ts#onDeploy{ts:line-numbers}

## `onDev`

A callback function that is called after the [`fuels dev`](./commands.md#fuels-dev) command has successfully restarted.

Parameters:

- `config` — The loaded config (`fuels.config.ts`)

<<< @../../../demo-fuels/fuels.config.full.ts#onDev{ts:line-numbers}

## `onNode`

A callback function that is called after the [`fuels node`](./commands.md#fuels-node) command has successfully refreshed.

Parameters:

- `config` — The loaded config (`fuels.config.ts`)

<<< @../../../demo-fuels/fuels.config.full.ts#onNode{ts:line-numbers}

## `onFailure`

Pass a callback function to be called in case of errors.

Parameters:

- `config` — The loaded config (`fuels.config.ts`)
- `error` — Original error object

<<< @../../../demo-fuels/fuels.config.full.ts#onFailure{ts:line-numbers}

## `forcPath`

Path to the `forc` binary.

When not supplied, will default to using the `system` binaries (`forc`).

<<< @../../../demo-fuels/fuels.config.full.ts#forcPath{ts:line-numbers}

## `fuelCorePath`

Path to the `fuel-core` binary.

When not supplied, will default to using the `system` binaries (`fuel-core`).

<<< @../../../demo-fuels/fuels.config.full.ts#fuelCorePath{ts:line-numbers}

## Loading environment variables

If you want to load environment variables from a `.env` file, you can use the `dotenv` package.

First, install it:

::: code-group

```sh [pnpm]
pnpm install dotenv
```

```sh [npm]
npm install dotenv
```

```sh [bun]
bun install dotenv
```

:::

Then, you can use it in your `fuels.config.ts` file:

<<< @../../../create-fuels-counter-guide/fuels.config.ts#fuels-config-file-env{ts:line-numbers}
