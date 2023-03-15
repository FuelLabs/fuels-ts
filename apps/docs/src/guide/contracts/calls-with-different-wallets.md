# Calls with different Wallets or Providers

You can assign to a Contract's `wallet` property on an existing contract instance as a shorthand for creating a new instance connected to the provided wallet. This lets you make contracts calls with different wallets in a chain like fashion.

```ts:line-numbers
contract.wallet = Wallet.fromAddress(someAddress);
```

In a similar fashion, assigning a custom Provider allows you to utilize a Provider wrapper of your choosing or design.

```ts:line-numbers
contract.provider = customProvider;
```

> **Note:** connecting a different wallet to an existing instance ignores its set provider in favor of the provider used to deploy the contract. If you have two wallets connected to separate providers (each communicating with a separate fuel-core), the one assigned to the deploying wallet will also be used for contract calls. This behavior is only relevant if multiple providers (i.e. fuel-core instances) are present and can otherwise be ignored.
