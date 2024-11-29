# Instantiating Wallets

Wallets can be instantiated in multiple ways within the SDK.

## Generating new wallets

To generate a new, unlocked wallet, use the [`generate`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Wallet.html#generate) method. This method creates a new [`WalletUnlocked`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html) instance, which is immediately ready for use.

<<< @./snippets/instantiating/generate.ts#instantiating-wallets-1{ts:line-numbers}

## Instantiating Unlocked Wallets

Creating [`WalletUnlocked`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html) instances of your existing wallets is easy and can be done in several ways:

From a private key:

<<< @./snippets/instantiating/from-private-key.ts#instantiating-wallets-2{ts:line-numbers}

From a mnemonic phrase:

<<< @./snippets/instantiating/from-mnemonic-phrase.ts#instantiating-wallets-3{ts:line-numbers}

From a seed:

<<< @./snippets/instantiating/from-seed.ts#instantiating-wallets-4{ts:line-numbers}

From a Hierarchical Deterministic (HD) derived key:

<<< @./snippets/instantiating/from-hd-derived-key.ts#instantiating-wallets-5{ts:line-numbers}

From a JSON wallet:

<<< @./snippets/instantiating/from-json-wallet.ts#instantiating-wallets-6{ts:line-numbers}

It's possible to instantiate a `WalletUnlocked` from a `WalletLocked`:

<<< @./snippets/instantiating/unlock-from-private-key.ts#instantiating-wallets-7{ts:line-numbers}

## Instantiating Locked Wallets

You can also instantiate [`WalletLocked`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletLocked.html) instances using just the wallet address:

<<< @./snippets/instantiating/from-bech32-address.ts#instantiating-wallets-8{ts:line-numbers}

## Connecting to a Provider

While wallets can be used independently of a [`Provider`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Provider.html), operations requiring blockchain interaction will need one.

Connecting an existing wallet to a Provider:

<<< @./snippets/instantiating/connect-existing-wallet.ts#instantiating-wallets-9{ts:line-numbers}

Instantiating a wallet with a Provider:

<<< @./snippets/instantiating/connect-new-wallet.ts#instantiating-wallets-10{ts:line-numbers}
