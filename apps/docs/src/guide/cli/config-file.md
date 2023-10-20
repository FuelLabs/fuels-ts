# Config File

Here you can know more about all configuration options.

## `workspace`

Relative directory path to Forc workspace.

```ts
workspace: '../sway-programs',
```

## `contracts`

List of relative directory paths to Sway contracts.

```ts
contracts: ['../sway-programs/contracts'],
```

## `predicates`

List of relative directory paths to Sway predicates.

```ts
predicates: ['../sway-programs/predicates'],
```

## `scripts`

List of relative directory paths to Sway scripts.

```ts
scripts: ['../sway-programs/scripts'],
```

## `output`

Relative directory path for generating Typescript definitions.

```ts
output: './src/sway-programs-api',
```

## `privateKey`

Wallet private key, used when deploying contracts.

Should ideally come from env — `process.env.MY_PRIVATE_KEY`.

```ts
privateKey: '0x..',
```

## `providerUrl`

Contracts will be deployed using the provider URL supplied in here.

```ts
// Default: FUEL_NETWORK_URL (from 'fuels')
providerUrl: 'http://network:port/graphql',
```

> When auto-starting a `fuel-core` node as part of a `fuels dev` command, this property is overriden with details for the short-lived node.

## `chainConfig`

Relative filepath to custom `chainConfig.json` file to use with `fuel-core`.

```ts
chainConfig: './my/custom/chainConfig.json',
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

## `useBuiltinForc`

Opt-in or out from using builtin `forc` binaries.

When not supplied, will default to using the `system` binaries.

If `system` binaries are not present, will print warning and use `built-in` ones instead.

```ts
// Default: undefined
useBuiltinForc: false,
```

## `useBuiltinFuelCore`

Opt-in or out from using builtin `fuel-core` binaries.

When not supplied, will default to using the `system` binaries.

If `system` binaries are not present, will print warning and use `built-in` ones instead.

```ts
// Default: undefined
useBuiltinFuelCore: false,
```

## `autoStartFuelCore`

If set to false, you will need to spin up a `fuel-core` node by yourself.

This is relevant only for the [`fuels dev`](./commands.md#fuels-dev) command.

```ts
autoStartFuelCore: true,
```

## `fuelCorePort`

Port to use when starting a `fuel-core` node.

```ts
// Default: first free port, starting from 4000
autoStartFuelCore: true,
```

## `onSuccess`

Function callback, will be called after a successful run.

Parameters:

- `event` — The event that triggered this execution
- `config` — The loaded config (`fuels.config.ts`)

```ts
onSuccess: (event: CommandEvent, config: FuelsConfig) => {
  console.log('fuels:onSuccess', { event, config });
},
```

## `onFailure`

Function callback, will be called in case of errors.

Parameters:

- `error` — Original error object
- `config` — The loaded config (`fuels.config.ts`)

```ts
onSuccess: (event: CommandEvent, config: FuelsConfig) => {
  console.log('fuels:onSuccess', { event, config });
},
```
