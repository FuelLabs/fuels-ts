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

## `chainConfig`

> - _Used by [`fuels dev`](./commands.md#fuels-dev) only_.

Relative file path to custom `chainConfig.json` file to use with `fuel-core`.

This will take effect only when [`autoStartFuelCore`](#autostartfuelcore) is `true`.

<<< @../../../demo-fuels/fuels.config.full.ts#chainConfig{ts:line-numbers}

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

## `deployConfig`

You can supply a ready-to-go deploy configuration object:

<<< @../../../demo-fuels/fuels.config.full.ts#deployConfig-obj{ts:line-numbers}

Or use a function for crafting dynamic deployment flows:

- If you need to fetch and use configs or data from a remote data source
- If you need to use IDs from already deployed contracts — in this case, we can use the `options.contracts` property to get the necessary contract ID. For example:

<<< @../../../demo-fuels/fuels.config.full.ts#deployConfig-fn{ts:line-numbers}

## `onSuccess`

Pass a callback function to be called after a successful run.

Parameters:

- `event` — The event that triggered this execution
- `config` — The loaded config (`fuels.config.ts`)

<<< @../../../demo-fuels/fuels.config.full.ts#onSuccess{ts:line-numbers}

## `onFailure`

Pass a callback function to be called in case of errors.

Parameters:

- `error` — Original error object
- `config` — The loaded config (`fuels.config.ts`)

<<< @../../../demo-fuels/fuels.config.full.ts#onFailure{ts:line-numbers}

## `useBuiltinForc`

Opt-in or out from using [built-in](./built-in-binaries.md) `forc` binaries.

When not supplied, will default to using the `system` binaries.

If `system` binaries are absent, print a warning and use `built-in` ones instead.

<<< @../../../demo-fuels/fuels.config.full.ts#useBuiltInForc{ts:line-numbers}

Check also:

- [Built-in Binaries](./built-in-binaries.md)

## `useBuiltinFuelCore`

Opt-in or out from using [built-in](./built-in-binaries.md) `fuel-core` binaries.

When not supplied, will default to using the `system` binaries.

If `system` binaries are absent, print a warning and use `built-in` ones instead.

<<< @../../../demo-fuels/fuels.config.full.ts#useBuiltInFuelCore{ts:line-numbers}

Check also:

- [Built-in Binaries](./built-in-binaries.md)
