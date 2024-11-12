# Locking and Unlocking

The kinds of operations we can perform with a [`Wallet`](../../api/Account/Wallet.md) instance depend on
whether or not we have access to the wallet's private key.

In order to differentiate between [`Wallet`](../../api/Account/Wallet.md) instances that know their private key
and those that do not, we use the [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) and [`WalletLocked`](../../api/Account/WalletLocked.md) types
respectively.

## Wallet States

The [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) type represents a wallet whose private key is known and
stored internally in memory. A wallet must be of type [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) in order
to perform operations that involve [signing messages or transactions](./signing.md).

The [`WalletLocked`](../../api/Account/WalletLocked.md) type represents a wallet whose private key is _not_ known or stored
in memory. Instead, [`WalletLocked`](../../api/Account/WalletLocked.md) only knows its public address. A [`WalletLocked`](../../api/Account/WalletLocked.md) cannot be
used to sign transactions, however it may still perform a whole suite of useful
operations including listing transactions, assets, querying balances, and so on.

Note that the [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) type implements most methods available on the [`WalletLocked`](../../api/Account/WalletLocked.md)
type. In other words, [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) can be thought of as a thin wrapper around [`WalletLocked`](../../api/Account/WalletLocked.md) that
provides greater access via its private key.

## Basic Example

<<< @/../../docs-snippets2/src/wallets/access.ts#wallets{ts:line-numbers}

## Optional Provider

You can choose not to pass through a provider argument on `Wallet` construction:

<<< @/../../docs-snippets2/src/wallets/wallet-optional-provider.ts#wallet-optional-provider{ts:line-numbers}

## Transitioning States

A [`WalletLocked`](../../api/Account/WalletLocked.md) instance can be unlocked by providing the private key:

<<< @/../../docs-snippets2/src/wallets/locked-to-unlocked.ts#wallet-locked-to-unlocked{ts:line-numbers}

A [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) instance can be locked using the `lock` method:

<<< @/../../docs-snippets2/src/wallets/unlocked-to-locked.ts#wallet-unlocked-to-locked{ts:line-numbers}

Most wallet constructors that create or generate a new wallet are provided on
the [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) type. Consider locking the wallet with the `lock` method after the new private
key has been handled in order to reduce the scope in which the wallet's private
key is stored in memory.

## Design Guidelines

When designing APIs that accept a wallet as an input, we should think carefully
about the kind of access that we require. API developers should aim to minimise
their usage of [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) in order to ensure private keys are stored in
memory no longer than necessary to reduce the surface area for attacks and
vulnerabilities in downstream libraries and applications.

## Full Example

For a full example of how to lock and unlock a wallet, see the snippet below:

<<< @/../../docs-snippets2/src/wallets/access.ts#full{ts:line-numbers}
