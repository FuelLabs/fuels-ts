# Querying the Chain

Once you have set up a provider, you're ready to interact with the Fuel blockchain.

We can connect to either a _*local*_ or an _*external*_ node:

> 1. _Running a [local node](../getting-started/connecting-to-a-local-node.md)_
> 1. _Connecting to an [external node](../getting-started/connecting-to-testnet.md)_

Let's look at a few examples below.

## `getBaseAssetId`

The base asset is the underlying asset used to perform any transaction on a chain. This should be fetched from a provider to then be used in transactions.

<<< @/../../docs-snippets2/src/provider/functionality-get-base-asset-id.ts#getBaseAssetId{ts:line-numbers}

## `getCoins`

Returns UTXOs coins from an account address, optionally filtered by asset ID. This method supports [pagination](./pagination.md).

<<< @/../../docs-snippets2/src/provider/functionality-get-coins.ts#getCoins-1{ts:line-numbers}

This method is also implemented on the `Account` class and can be used without providing the `address`:

<<< @/../../docs-snippets2/src/provider/functionality-get-coins.ts#getCoins-2{ts:line-numbers}

## `getResourcesToSpend`

Returns spendable resources (coins or messages) for a transaction request. It accepts an optional third parameter, `excludedIds`, to exclude specific UTXO IDs or coin message nonces:

<<< @/../../docs-snippets2/src/provider/functionality-get-resources-to-spend.ts#getResourcesToSpend-1{ts:line-numbers}

This method is also available in the `Account` class and can be used without providing the `address`:

<<< @/../../docs-snippets2/src/provider/functionality-get-resources-to-spend.ts#getResourcesToSpend-2{ts:line-numbers}

## `getBalances`

Returns the sum of all UTXOs coins and unspent message coins amounts for all assets. Unlike `getCoins`, it only returns the total amounts, not the individual coins:

<<< @/../../docs-snippets2/src/provider/functionality-get-balances.ts#getBalances-1{ts:line-numbers}

This method is also available in the `Account` class and can be used without providing the `address` parameter:

<<< @/../../docs-snippets2/src/provider/functionality-get-balances.ts#getBalances-2{ts:line-numbers}

## `getBlocks`

The `getBlocks` method returns blocks from the blockchain matching the given `paginationArgs` parameter, supporting [pagination](./pagination.md). The below code snippet shows how to get the last 10 blocks.

<<< @/../../docs-snippets2/src/provider/functionality-get-blocks.ts#getBlocks{ts:line-numbers}

## `getMessageByNonce`

You can use the `getMessageByNonce` method to retrieve a message by its nonce.

<<< @/../../docs-snippets2/src/provider/functionality-get-messages-by-nonce.ts#getMessageByNonce{ts:line-numbers}

## `getMessages`

You can use the `getMessages` method to retrieve a list of messages from the blockchain.

<<< @/../../docs-snippets2/src/provider/functionality-get-messages.ts#getMessages{ts:line-numbers}

## `getMessageProof`

A message proof is a cryptographic proof that a message was included in a block. You can use the `getMessageProof` method to retrieve a message proof for a given transaction ID and message ID.

You can retrieve a message proof by either using it's block ID:

<<< @/../../docs-snippets2/src/provider/functionality-get-message-proof.ts#getMessageProof-blockId{ts:line-numbers}

Or by it's block height:

<<< @/../../docs-snippets2/src/provider/functionality-get-message-proof.ts#getMessageProof-blockHeight{ts:line-numbers}

## `getTransactions`

You can use the `getTransactions` method to retrieve a list of transactions from the blockchain. This is limited to 30 transactions per page.

<<< @/../../docs-snippets/src/guide/provider/querying-the-chain.test.ts#get-transactions{ts:line-numbers}
