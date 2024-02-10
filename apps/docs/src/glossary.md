# Glossary

These are the common terms you will find across this documentation and while using the SDK.

## Contract

A contract, in the SDK, is an abstraction that represents a connection to a specific smart contract deployed on the Fuel Network. This contract instance can be used as a regular JS object, with methods attached to it that reflect those in its smart contract equivalent.

## Provider

A Provider is a Class that provides an abstraction for a connection to a Fuel node. It provides read-only access to the node. You can use this provider as-is or through the wallet.

## Wallet and signer

A [`Wallet`](./api/Account/Wallet.md) is a Class with direct or indirect access to a private key. You can use a [`Wallet`](./api/Account/Wallet.md) to sign messages and transactions to authorize the network to charge your account to perform operations. The terms wallet and signer in the SDK are often used interchangeably, but, technically, a `Signer` enables the signing of transactions and messages; the [`Wallet`](./api/Account/Wallet.md) implements the `Signer` functionality.
