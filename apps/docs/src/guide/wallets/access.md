# Wallet Access

The kinds of operations we can perform with a `Wallet` instance depend on
whether or not we have access to the wallet's private key.

In order to differentiate between `Wallet` instances that know their private key
and those that do not, we use the `WalletUnlocked` and `WalletLocked` types
respectively.

## Wallet States

The `WalletUnlocked` type represents a wallet whose private key is known and
stored internally in memory. A wallet must be of type `WalletUnlocked` in order
to perform operations that involve [signing messages or
transactions](./signing.md).

The `WalletLocked` type represents a wallet whose private key is _not_ known or stored
in memory. Instead, `WalletLocked` only knows its public address. A `WalletLocked` cannot be
used to sign transactions, however it may still perform a whole suite of useful
operations including listing transactions, assets, querying balances, and so on.

Note that the `WalletUnlocked` type implements most methods available on the `WalletLocked`
type. In other words, `WalletUnlocked` can be thought of as a thin wrapper around `WalletLocked` that
provides greater access via its private key.

## Basic Example

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#wallets{ts:line-numbers}

## Transitioning States

A `WalletLocked` instance can be unlocked by providing the private key:

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#wallet-locked-to-unlocked{ts:line-numbers}

A `WalletUnlocked` instance can be locked using the `lock` method:

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#wallet-unlocked-to-locked{ts:line-numbers}

Most wallet constructors that create or generate a new wallet are provided on
the `WalletUnlocked` type. Consider locking the wallet with the `lock` method after the new private
key has been handled in order to reduce the scope in which the wallet's private
key is stored in memory.

## Design Guidelines

When designing APIs that accept a wallet as an input, we should think carefully
about the kind of access that we require. API developers should aim to minimise
their usage of `WalletUnlocked` in order to ensure private keys are stored in
memory no longer than necessary to reduce the surface area for attacks and
vulnerabilities in downstream libraries and applications.
