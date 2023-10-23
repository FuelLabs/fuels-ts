# Config File

Here, you can learn more about all configuration options.

## `workspace`

Relative directory path to Forc workspace.

```ts
workspace: '../sway-programs',
```

> _The property `workspace` is incompatible with [`contracts`](#contracts), [`predicates`](#predicates), and [`scripts`](#scripts)._

## `contracts`

List of relative directory paths to Sway contracts.

```ts
contracts: ['../sway-programs/contracts'],
```

> _The property `contracts` is incompatible with [`workspace`](#workspace)._

## `predicates`

List of relative directory paths to Sway predicates.

```ts
predicates: ['../sway-programs/predicates'],
```

> _The property `predicates` is incompatible with [`workspace`](#workspace)._

## `scripts`

List of relative directory paths to Sway scripts.

```ts
scripts: ['../sway-programs/scripts'],
```

> _The property `scripts` is incompatible with [`workspace`](#workspace)._

## `output`

Relative directory path to use when generating Typescript definitions.

```ts
output: './src/sway-programs-api',
```

## `privateKey`

Wallet private key, used when deploying contracts.

This property should ideally come from env — `process.env.MY_PRIVATE_KEY`.

```ts
privateKey: '0x..',
```

## `providerUrl`

The URL to use when deploying contracts.

```ts
providerUrl: 'http://network:port/graphql',
// Default: http://127.0.0.1:4000/graphql
```

> _When [`autostartFuelCore`](#autostartfuelcore) property is set to `true`, the `providedUrl` is overridden by that of the local short-lived `fuel-core` node started by the [`fuels dev`](./commands.md#fuels-dev) command._

## `chainConfig`

> - _Used by [`fuels dev`](./commands.md#fuels-dev) only_.

Relative file path to custom `chainConfig.json` file to use with `fuel-core`.

This will take effect only when [`autoStartFuelCore`](#autostartfuelcore) is `true`.

```ts
chainConfig: './my/custom/chainConfig.json',
```

## `autoStartFuelCore`

> - _Used by [`fuels dev`](./commands.md#fuels-dev) only_.

When set to `true`, it will automatically:

1. Starts a short-lived `fuel-core` node as part of the [`fuels dev`](./commands.md#fuels-dev) command
1. Override property [`providerUrl`](#providerurl) with the URL for the recently started `fuel-core` node

```ts
autoStartFuelCore: true,
```

If set to `false`, you must spin up a `fuel-core` node by yourself and set the URL for it via [`providerUrl`](#providerurl).

## `fuelCorePort`

> - _Used by [`fuels dev`](./commands.md#fuels-dev) only_.
> - _Ignored when [`autoStartFuelCore`](#autostartfuelcore) is set to `false`._

Port to use when starting a local `fuel-core` node.

```ts
fuelCorePort: 4000,
// Default: first free port, starting from 4000
```

## `deployConfig`

You can supply a ready-to-go deploy configuration object:

```ts
deployConfig: {
  gasPrice: 1,
};
```

Or use a function for crafting dynamic deployment flows:

- If you need to fetch and use configs or data from a remote data source
- If you need to use IDs from already deployed contracts — in this case, we can use the `options.contracts` property to get the necessary contract ID. For example:

```ts
deployConfig: async (options: ContractDeployOptions) => {
  // ability to fetch data remotely
  await Promise.resolve(`simulating remote data fetch`);

  // get contract by name
  const contract = options.contracts.find(
    ({ name }) => name === MY_FIRST_DEPLOYED_CONTRACT_NAME
  );

  if (!contract) {
    throw new Error("Contract not found!");
  }

  return {
    gasPrice: 1,
    storageSlots: [
      {
        key: "0x..",
        /**
         * Gere we could initialize a storage slot,
         * using the relevant contract ID.
         */
        value: contract.contractId,
      },
    ],
  };
};
```

## `onSuccess`

Pass a callback function to be called after a successful run.

Parameters:

- `event` — The event that triggered this execution
- `config` — The loaded config (`fuels.config.ts`)

```ts
onSuccess: (event: CommandEvent, config: FuelsConfig) => {
  console.log('fuels:onSuccess', { event, config });
},
```

## `onFailure`

Pass a callback function to be called in case of errors.

Parameters:

- `error` — Original error object
- `config` — The loaded config (`fuels.config.ts`)

```ts
onSuccess: (event: CommandEvent, config: FuelsConfig) => {
  console.log('fuels:onSuccess', { event, config });
},
```

## `useBuiltinForc`

Opt-in or out from using [built-in](./built-in-binaries.md) `forc` binaries.

When not supplied, will default to using the `system` binaries.

If `system` binaries are absent, print a warning and use `built-in` ones instead.

```ts
// Default: undefined
useBuiltinForc: false,
```

Check also:

- [Built-in Binaries](./built-in-binaries.md)

## `useBuiltinFuelCore`

Opt-in or out from using [built-in](./built-in-binaries.md) `fuel-core` binaries.

When not supplied, will default to using the `system` binaries.

If `system` binaries are absent, print a warning and use `built-in` ones instead.

```ts
// Default: undefined
useBuiltinFuelCore: false,
```

Check also:

- [Built-in Binaries](./built-in-binaries.md)
