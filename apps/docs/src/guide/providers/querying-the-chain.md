# Querying the Chain

Once you have set up a provider, you're ready to interact with the Fuel blockchain.

We can connect to either a _*local*_ or an _*external*_ node:

> 1. _Running a [local node](https://docs.fuel.network/guides/running-a-node/)_
> 1. _Connecting to an [external node](./connecting-to-testnet.md)_

Let's look at a few examples below.

## Get all coins from an address

This method returns all coins (of an optional given asset ID) from a wallet, including spent ones.

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#wallet-query{ts:line-numbers}

## Get spendable resources from an address

The last argument says how much you want to spend. This method returns only spendable, i.e., unspent coins (of a given asset ID). If you ask for more spendable than the amount of unspent coins you have, it returns an error.

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#wallet-get-spendable-resources{ts:line-numbers}

## Get balances from an address

Get all the spendable balances of all assets for an address. This is different from getting the coins because we only return the numbers (the sum of UTXOs coins amount for each asset id) and not the UTXOs coins themselves.

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#wallet-get-balances{ts:line-numbers}

## Get blocks

This method returns all the blocks from the blockchain that match the given query. The below code snippet shows how to get the last 10 blocks.

<<< @/../../../packages/account/src/providers/provider.test.ts#Provider-get-blocks{ts:line-numbers}

### Get messages

You can use the `getMessages` method to retrieve a list of messages from the blockchain.

<<< @/../../../packages/fuel-gauge/src/coverage-contract.test.ts#Message-getMessages{ts:line-numbers}

### Get resources

You can use the `getResourcesToSpend` method to retrieve a list of all the resources (coins + assets) that can be spent by a given address.

<<< @/../../../packages/account/src/account.test.ts#Message-getResourcesToSpend{ts:line-numbers}

### Get message proof

A message proof is a cryptographic proof that a message was included in a block. You can use the `getMessageProof` method to retrieve a message proof for a given transaction ID and message ID.

<<< @/../../../packages/account/src/account.test.ts#Message-getMessageProof{ts:line-numbers}

<!-- TODO: Add docs for the two new parameters `commitBlockId` and `commitBlockHeight` -->