# Locking and Unlocking

The kinds of operations we can perform with a [`Wallet`](https://fuels-ts-docs-api.vercel.app/Account/Wallet.md) instance depend on
whether or not we have access to the wallet's private key.

In order to differentiate between [`Wallet`](https://fuels-ts-docs-api.vercel.app/Account/Wallet.md) instances that know their private key
and those that do not, we use the [`WalletUnlocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletUnlocked.md) and [`WalletLocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletLocked.md) types
respectively.

## Wallet States

The [`WalletUnlocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletUnlocked.md) type represents a wallet whose private key is known and
stored internally in memory. A wallet must be of type [`WalletUnlocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletUnlocked.md) in order
to perform operations that involve [signing messages or transactions](./signing.md).

The [`WalletLocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletLocked.md) type represents a wallet whose private key is _not_ known or stored
in memory. Instead, [`WalletLocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletLocked.md) only knows its public address. A [`WalletLocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletLocked.md) cannot be
used to sign transactions, however it may still perform a whole suite of useful
operations including listing transactions, assets, querying balances, and so on.

Note that the [`WalletUnlocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletUnlocked.md) type implements most methods available on the [`WalletLocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletLocked.md)
type. In other words, [`WalletUnlocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletUnlocked.md) can be thought of as a thin wrapper around [`WalletLocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletLocked.md) that
provides greater access via its private key.

## Basic Example

<<< @/../../docs-snippets/src/guide/wallets/access.test.ts#wallets{ts:line-numbers}

## Optional Provider

You can choose not to pass through a provider argument on `Wallet` construction:

<<< @/../../docs-snippets/src/guide/wallets/access.test.ts#wallet-optional-provider{ts:line-numbers}

## Transitioning States

A [`WalletLocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletLocked.md) instance can be unlocked by providing the private key:

<<< @/../../docs-snippets/src/guide/wallets/access.test.ts#wallet-locked-to-unlocked{ts:line-numbers}

A [`WalletUnlocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletUnlocked.md) instance can be locked using the `lock` method:

<<< @/../../docs-snippets/src/guide/wallets/access.test.ts#wallet-unlocked-to-locked{ts:line-numbers}

Most wallet constructors that create or generate a new wallet are provided on
the [`WalletUnlocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletUnlocked.md) type. Consider locking the wallet with the `lock` method after the new private
key has been handled in order to reduce the scope in which the wallet's private
key is stored in memory.

## Design Guidelines

When designing APIs that accept a wallet as an input, we should think carefully
about the kind of access that we require. API developers should aim to minimise
their usage of [`WalletUnlocked`](https://fuels-ts-docs-api.vercel.app/Account/WalletUnlocked.md) in order to ensure private keys are stored in
memory no longer than necessary to reduce the surface area for attacks and
vulnerabilities in downstream libraries and applications.
