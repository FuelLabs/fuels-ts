# Instantiating Wallets

Wallets can be instantiated in multiple ways within the SDK.

## Generating new wallets

To generate a new, unlocked wallet, use the [`generate`](../../api/Account/Wallet.html#generate) method. This method creates a new [`WalletUnlocked`](../../api/Account/WalletUnlocked) instance, which is immediately ready for use.

<<< @/../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-1{ts:line-numbers}

## Instantiating Unlocked Wallets

Creating [`WalletUnlocked`](../../api/Account/WalletUnlocked) instances of your existing wallets is easy and can be done in several ways:

From a private key:

<<< @/../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-2{ts:line-numbers}

From a mnemonic phrase:

<<< @/../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-3{ts:line-numbers}

From a seed:

<<< @/../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-4{ts:line-numbers}

From a Hierarchical Deterministic (HD) derived key:

<<< @/../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-5{ts:line-numbers}

From a JSON wallet:

<<< @/../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-6{ts:line-numbers}

## Instantiating Locked Wallets

You can also instantiate [`WalletLocked`](../../api/Account/WalletLocked) instances using just the wallet address:

::: code-group

```ts [Bech32]
const address =
  "fuel14kjrdcdcp7z4l9xk0pm3cwz9qnjxxd04wx4zgnc3kknslclxzezqyeux5d";

const myWallet = Wallet.fromAddress(address);

expect(myWallet).toBeDefined();
```

```ts [Hex]
const address =
  "0xada436e1b80f855f94d678771c384504e46335f571aa244f11b5a70fe3e61644";

const myWallet = Wallet.fromAddress(address);

expect(myWallet).toBeDefined();
```

:::

## Connecting to a Provider

While wallets can be used independently of a [`Provider`](../../api/Account/Provider), operations requiring blockchain interaction will need one.

Connecting an existing wallet to a Provider:

<<< @/../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-7{ts:line-numbers}

Instantiating a wallet with a Provider:

<<< @/../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-8{ts:line-numbers}
