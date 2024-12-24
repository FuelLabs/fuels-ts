# Provider

The [`Provider`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Provider.html) lets you connect to a Fuel node ([_*docs*_](../getting-started/connecting-to-network.md)) and interact with it, encapsulating common client operations in the SDK. Those operations include querying the blockchain for network, block, and transaction-related info (and [more](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Provider.html)), as well as sending [transactions](../transactions/index.md) to the blockchain.

All higher-level abstractions (e.g. [`Wallet`](../wallets/index.md), [`Contract`](../contracts/index.md)) that interact with the blockchain go through the `Provider`, so it's used for various actions like getting a wallet's balance, deploying contracts, querying their state, etc.

<<< @./snippets/provider-instantiation.ts#provider-instantiation{ts:line-numbers}

You can find more examples of `Provider` usage [here](./querying-the-chain.md).
