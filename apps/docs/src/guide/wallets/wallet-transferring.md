# Wallet Transferring

## Transferring Between Wallets

Transferring assets between wallets is really simple within the SDK.

<<< @/../../docs-snippets/src/guide/wallets/wallet-transferring.test.ts#wallet-transferring-1{ts:line-numbers}

After waiting the transaction to be processed, the assets are successfully moved to the recipient's wallet.

It is also possible to specify the recipient's address as a string:

<<< @/../../docs-snippets/src/guide/wallets/wallet-transferring.test.ts#wallet-transferring-2{ts:line-numbers}

When transferring the base chain coin like ETH, you can omit the `assetId`:

<<< @/../../docs-snippets/src/guide/wallets/wallet-transferring.test.ts#wallet-transferring-3{ts:line-numbers}

## Transferring To Contracts

Transferring assets from your wallet to a deployed contract is straightforward. All you need is the contract's address.

You can transfer assets to a deployed contract instance by using its `id`:

<<< @/../../docs-snippets/src/guide/wallets/wallet-transferring.test.ts#wallet-transferring-4{ts:line-numbers}

Alternatively, you can simply use the contract's string address in the [`Bech32`](../types/bech32) format:

<<< @/../../docs-snippets/src/guide/wallets/wallet-transferring.test.ts#wallet-transferring-5{ts:line-numbers}

# Balances

Before transferring assets, ensure your wallet has sufficient funds. Attempting a transfer without enough funds will result in an error: `not enough coins to fit the target`.

You can see how to check your balance at the [`checking-balances`](./checking-balances) page.
