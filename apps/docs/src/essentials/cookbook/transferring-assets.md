# Transferring Assets

This documentation provides a guide on how to transfer assets between wallets and to contracts using the SDK.

## Transferring Assets Between Accounts

The `account.transfer` method is used to initiate a transaction request that transfers an asset from one wallet to another. This method requires three parameters:

1. The receiver's wallet address.
2. The amount of the asset to be transferred.
3. The ID of the asset to be transferred (Optional - Defaults to the base asset id).

Upon execution, this function returns a promise that resolves to a transaction response. To wait for the transaction to be processed, call `response.wait()`.

### Example

Here is an illustration on how to use the `account.transfer` function:

<<< @/../../docs-snippets/src/guide/cookbook/transferring-assets.test.ts#transferring-assets-1{ts:line-numbers}

In the previous example, we used the `transfer` method, which essentially creates a `ScriptTransactionRequest`, populates its data with the provided transfer information, and submits the transaction request to the node.

However, there may be times when you need the Transaction ID before actually submitting it to the node. To achieve this, you can simply call the `createTransfer` method instead.

This method also creates a `ScriptTransactionRequest` and populates it with the provided data, but instead of submitting it to the node, it returns the request.

<<< @/../../docs-snippets/src/guide/cookbook/transferring-assets.test.ts#transferring-assets-2{ts:line-numbers}

It's important to be aware that once you have this transaction request, any modifications made to it will result in a new and distinct transaction. Consequently, this will lead to a different transaction ID. Therefore, make sure to not changing the transaction request if you expects the ID to remain the same.

<<< @/../../docs-snippets/src/guide/cookbook/transferring-assets.test.ts#transferring-assets-3{ts:line-numbers}

## Transferring Assets To Contracts

When transferring assets to a deployed contract, we use the `transferToContract` method. This method closely mirrors the `account.transfer` method in terms of parameter structure.

However, instead of supplying the target wallet's address, as done in `destination.address` for the transfer method, we need to provide an instance of [Address](../types/address.md) created from the deployed contract id.

If you have the [Contract](../contracts/) instance of the deployed contract, you can simply use its `id` property. However, if the contract was deployed with `forc deploy` or not by you, you will likely only have its ID in a hex string format. In such cases, you can create an [Address](../types/address.md) instance from the contract ID using `Address.fromAddressOrString('0x123...')`.

### Example

Here's an example demonstrating how to use `transferToContract`:

<<< @/../../docs-snippets/src/guide/cookbook/transferring-assets.test.ts#transferring-assets-4{ts:line-numbers}

Remember to always invoke the `waitForResult()` function on the transaction response. This ensures that the transaction has been successfully mined before proceeding.
