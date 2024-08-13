# Wallet Transferring

This guide provides instructions for transferring assets between wallets and contracts using the SDK. It includes methods to validate balances and initiate and configure transfer requests.

## Transferring Assets Between Accounts

The `transfer` method initiates a transaction request that transfers an asset from one wallet to another. This method requires three parameters:

1. The receiver's wallet address
2. The amount of the asset to be transferred
3. The ID of the asset to be transferred (optional - defaults to the base asset ID)

Upon execution, this function returns a promise that resolves to a transaction response. To wait for the transaction to be processed, call `response.waitForResult()`.

### Example

Here is an example of how to use the `transfer` function:

<<< @/../../docs-snippets/src/guide/cookbook/transferring-assets.test.ts#transferring-assets-1{ts:line-numbers}

In the previous example, we used the `transfer` method which creates a `ScriptTransactionRequest`, populates its data with the provided transfer information and submits the transaction.

However, there may be times when you need the Transaction ID before actually submitting it to the node. To achieve this, you can simply call the `createTransfer` method instead.

This method also creates a `ScriptTransactionRequest` and populates it with the provided data but returns the request object prior to submission.

<<< @/../../docs-snippets/src/guide/cookbook/transferring-assets.test.ts#transferring-assets-2{ts:line-numbers}

> **Note**: Any changes made to a transaction request will alter the transaction ID. Therefore, you should only get the transaction ID after all modifications have been made.

<<< @/../../docs-snippets/src/guide/cookbook/transferring-assets.test.ts#transferring-assets-3{ts:line-numbers}

## Transferring Assets To Contracts

When transferring assets to a deployed contract, we use the `transferToContract` method, which shares a similar parameter structure with the `transfer` method.

However, instead of supplying the target wallet's address, as done in `destination.address` for the transfer method, we need to provide an instance of [Address](../types/address.md) created from the deployed contract id.

If you have the [Contract](../contracts/) instance of the deployed contract, you can simply use its `id` property. However, if the contract was deployed with `forc deploy` or not by you, you will likely only have its ID in a hex string format. In such cases, you can create an [Address](../types/address.md) instance from the contract ID using `Address.fromAddressOrString('0x123...')`.

Here's an example demonstrating how to use `transferToContract`:

<<< @/../../docs-snippets/src/guide/cookbook/transferring-assets.test.ts#transferring-assets-4{ts:line-numbers}

Always remember to call the `waitForResult()` function on the transaction response. That ensures the transaction has been mined successfully before proceeding.

## Transferring Assets To Multiple Wallets

To transfer assets to multiple wallets, use the `Account.batchTransfer` method:

<<< @/../../docs-snippets/src/guide/wallets/wallet-transferring.test.ts#wallet-transferring-6{ts:line-numbers}

This section demonstrates additional examples of transferring assets between wallets and to contracts.

## Checking Balances

Before transferring assets, ensure your wallet has sufficient funds. Attempting a transfer without enough funds will result in an error: `The transaction does not have enough funds to cover its execution.`.

You can see how to check your balance at the [`checking-balances`](./checking-balances.md) page.
