# Instantiating Wallets

Wallets can be instantiated in multiple ways within the SDK.

## Generating new wallets

To generate a new, unlocked wallet, use the [`generate`](../../api/Account/Wallet.md#generate) method. This method creates a new [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) instance, which is immediately ready for use.

<<< @/../../docs-snippets2/src/wallets/instantiating/generate.ts#instantiating-wallets-1{ts:line-numbers}

## Instantiating Unlocked Wallets

Creating [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) instances of your existing wallets is easy and can be done in several ways:

From a private key:

<<< @/../../docs-snippets2/src/wallets/instantiating/from-private-key.ts#instantiating-wallets-2{ts:line-numbers}

From a mnemonic phrase:

<<< @/../../docs-snippets2/src/wallets/instantiating/from-private-key.ts#instantiating-wallets-3{ts:line-numbers}

From a seed:

<<< @/../../docs-snippets2/src/wallets/instantiating/from-seed.ts#instantiating-wallets-4{ts:line-numbers}

From a Hierarchical Deterministic (HD) derived key:

<<< @/../../docs-snippets2/src/wallets/instantiating/from-hd-derived-key.ts#instantiating-wallets-5{ts:line-numbers}

From a JSON wallet:

<<< @/../../docs-snippets2/src/wallets/instantiating/from-json-wallet.ts#instantiating-wallets-6{ts:line-numbers}

It's possible to instantiate a `WalletUnlocked` from a `WalletLocked`:

<<< @/../../docs-snippets2/src/wallets/instantiating/unlock-from-private-key.ts#instantiating-wallets-7{ts:line-numbers}

## Instantiating Locked Wallets

You can also instantiate [`WalletLocked`](../../api/Account/WalletLocked.md) instances using just the wallet address:

<<< @/../../docs-snippets2/src/wallets/instantiating/from-bech32-address.ts#instantiating-wallets-8{ts:line-numbers}

## Connecting to a Provider

While wallets can be used independently of a [`Provider`](../../api/Account/Provider.md), operations requiring blockchain interaction will need one.

Connecting an existing wallet to a Provider:

<<< @/../../docs-snippets2/src/wallets/instantiating/connect-existing-wallet.ts#instantiating-wallets-9{ts:line-numbers}

Instantiating a wallet with a Provider:

<<< @/../../docs-snippets2/src/wallets/instantiating/connect-new-wallet.ts#instantiating-wallets-10{ts:line-numbers}
