# Making Calls with Different Wallets or Providers

This guide demonstrates how to make contract calls using different wallets and providers by passing either an [`Account`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Account.html) or a [`Provider`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Provider.html) to the contract on instantiation.

## Changing Wallets

To change the wallet associated with a contract instance, assign a new wallet to the instance's `account` property. This allows you to make contract calls with different wallets in a concise manner:

<<< @/../../docs-snippets/src/guide/contracts/calls-with-different-wallets.test.ts#calls-with-different-wallets-1{ts:line-numbers}

## Changing Providers

Similarly, you can assign a custom provider to a contract instance by modifying its provider property. This enables you to use a provider wrapper of your choice:

<!-- TODO: Replace with a proper snippet. We lost this snippet because this test had to be removed/changed -->

```ts
const newProvider = await Provider.create(NEW_URL);
deployedContract.provider = newProvider;
```

> **Note:** When connecting a different wallet to an existing contract instance, the provider used to deploy the contract takes precedence over the newly set provider. If you have two wallets connected to separate providers (each communicating with a different fuel-core instance), the provider assigned to the deploying wallet will be used for contract calls. This behavior is only relevant when multiple providers (i.e., fuel-core instances) are present and can be ignored otherwise.
