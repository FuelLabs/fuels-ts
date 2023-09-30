# Config Specs

## Inputs

You can configure using a workwspace:

```ts
/**
  * Instead of informing `contracts`, `scripts` and `predicates`
  * individually, you can also use workspaces (recommended)
  * @param workspace - Path to Sway/Forc Workspace
  */
workspace: '../backend',
```

Or individual seetings for Contracts, Predicates and Scripts:

```ts
/**
 * This property should not be used alongside `workspace`
 * @param contracts - Paths to Sway Contracts
 */
contracts: ['../backend/contracts'],
```

```ts
/**
 * This property should not be used alongside `workspace`
 * @param predicates - Paths to Sway Predicates
 */
predicates: ['../backend/predicates'],
```

```ts
/**
 * This property should not be used alongside `workspace`
 * @param scripts - Path to Sway scripts
 */
scripts: ['../backend/scripts'],
```

## Output

Here's where your Typescript definitions and factory classes will be created:

```ts
/**
  * @param output - Where to generate Typescript definitions
  */
output: './src/backend-api',
```

## Deploy Configs

```ts
/**
  * @param privateKey - Your wallet private key
  */
// Should ideally como from env — `process.env.MY_PRIVATE_KEY`
privateKey: '0x..',
```

```ts
/**
 * Defaults to http://localhost:4000
 * @param providerUrl - Contracts will be deployed using this provider
 */
providerUrl: '...',
```

```ts
/**
 * @param chainConfig - Path to custom `chainConfig.json` file
 */
chainConfig: '...',
```

```ts
/**
 * This method can be used for crafting custon deployment flows.
 *
 * Sometimes we need to deploy two contracts, and the second
 * depends on the first—in such cses, you can use the contracts
 * object to get the necessary contract id's. Amother option is,
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

## Configs for `forc` and `fuel-core`

These let you chose to use the built-in shipped binaries or your system ones:

```ts
/**
 * Optional property, defaults to false
 * @param useSystemForc - Skip using internal wrapped Forc binaries
 */
useSystemForc: false,
```

```ts
/**
 * Optional property, defaults to false
 * @param useSystemFuelCore - Skip using internal wrapped FuelCore binaries
 */
useSystemFuelCore: false,
```

Use this to enable the auto-start of a Fuel node when your you run `pnpm fuels dev`:

```ts
/**
 * Optional property, defaults to true
 * @param autoStartFuelCore - When set to false, it will skip spinning up
 * a FuelCore node. In this case, you'll need to start the node yourself.
 */
autoStartFuelCore: true,
```

## Calbacks

```ts
/**
  * This function is called after a successful run
  * @param event - The event that triggered this execution
  * @param config - The loaded `fuels.config`
  */
onSuccess: (event: CommandEvent, config: FuelsConfig) => {
  // console.log('fuels:onSuccess', { event, config });
},
```

```ts
/**
  * This function is called in case of errors
  * @param error - The error that interrupted the execution
  */
onFailure: (error: Error) => {
  // console.log('fuels:onFailure', { error });
},
```
