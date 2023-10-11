# Config File

## workspace

```ts
/**
  * Instead of informing `contracts`, `scripts` and `predicates`
  * individually, you can also use workspaces (recommended)
  * @param workspace - Path to Sway/Forc Workspace
  */
workspace: '../backend',
```

## contracts

```ts
/**
 * This property should not be used alongside `workspace`
 * @param contracts - Paths to Sway Contracts
 */
contracts: ['../backend/contracts'],
```

## predicates

```ts
/**
 * This property should not be used alongside `workspace`
 * @param predicates - Paths to Sway Predicates
 */
predicates: ['../backend/predicates'],
```

## scripts

```ts
/**
 * This property should not be used alongside `workspace`
 * @param scripts - Path to Sway Scripts
 */
scripts: ['../backend/scripts'],
```

## output

```ts
/**
  * @param output - Where to generate Typescript definitions
  */
output: './src/backend-api',
```

## privateKey

```ts
/**
 * @param privat Key - Your wallet private key
  */
 // Should ideally come from env — `process.env.MY_PRIVATE_KEY`
privateKey: '0x..',
```

## providerUrl

```ts
/**
 * Defaults to http://localhost:4000
 * @param providerUrl - Contracts will be deployed using this provider
 */
providerUrl: '...',
```

## chainConfig

```ts
/**
 * @param chainConfig - Path to custom `chainConfig.json` file
 */
chainConfig: '...',
```

## deployConfig

```ts
/**
 * This method can be used for crafting custom deployment flows.
 *
 * Sometimes we need to deploy two contracts, and the second
 * depends on the first—in such cses, you can use the contracts
 * object to get the necessary contract id's. Another option is,
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

## useBuiltinForc

```ts
/**
 * Optional property, defaults to false
 * @param useBuiltinForc - Opt-in or out from using builtin Forc binaries
 */
useBuiltinForc: false,
```

## useBuiltinFuelCore

```ts
/**
 * Optional property, defaults to false
 * @param useBuiltinFuelCore - Skip using internal wrapped FuelCore binaries
 */
useBuiltinFuelCore: false,
```

## autoStartFuelCore

```ts
/**
 * Optional property, defaults to true
 * @param autoStartFuelCore - When set to false, it will skip spinning up
 * a FuelCore node. In this case, you'll need to start the node yourself
 */
autoStartFuelCore: true,
```

## onSuccess

```ts
/**
  * This function is called after a successful run
  * @param event - The event that triggered this execution
  * @param config - The loaded `fuels.config`
  */
onSuccess: (event: CommandEvent, config: FuelsConfig) => {
  console.log('fuels:onSuccess', { event, config });
},
```

## onFailure

```ts
/**
  * This function is called in case of errors
  * @param error - The error that interrupted the execution
  */
onFailure: (error: Error) => {
  console.log('fuels:onFailure', { error });
},
```
