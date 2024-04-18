# Provider

The [`Provider`](../../api/Account/Provider.md) lets you connect to a Fuel node ([_*local*_](../../getting-started.md#connecting-to-a-local-node) or [_*external*_](../../getting-started.md#connecting-to-the-testnet)) and interact with it, encapsulating common client operations in the SDK. Those operations include querying the blockchain for network, block, and transaction-related info (and [more](../../api/Account/Provider.md)), as well as sending [transactions](../transactions/index.md) to the blockchain.

All higher-level abstractions (e.g. [`Wallet`](../wallets/index.md), [`Contract`](../contracts/index.md)) that interact with the blockchain go through the `Provider`, so it's used for various actions like getting a wallet's balance, deploying contracts, querying their state, etc.

<<< @/../../docs-snippets/src/guide/provider/provider.test.ts#provider-definition{ts:line-numbers}

You can find more examples of `Provider` usage [here](querying-the-chain.md).
