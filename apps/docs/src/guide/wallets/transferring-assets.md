# Asset Transfers

This documentation provides a guide on how to transfer assets between wallets and to contracts using methods in our SDK.

## Transferring Assets Between Wallets

The `wallet.transfer` function is used to initiate a transaction that transfers an asset from one wallet to another. This function requires three parameters:

1. The receiver's wallet address.
2. The amount of the asset to be transferred.
3. The ID of the asset to be transferred.

Upon execution, this function returns a promise that resolves to a transaction response. To wait for the transaction to be mined, call `response.wait()`.

### Example

Here is an illustration on how to use the `wallet.transfer` function:

<<< @/../../docs-snippets/src/guide/wallets/transferring-assets.test.ts#transferring-assets-1{ts:line-numbers}

## Transferring Assets To Contracts

When transferring assets to a deployed contract, we use the `transferToContract` method. This method closely mirrors the `transfer` function in terms of parameter structure.

However, instead of supplying the target wallet's address, as done in `wallet.address` for the transfer method, we input the `id` property of the [Contract](../contracts/) instance representing the target contract.

### Example

Here's an example demonstrating how to use `transferToContract`:

<<< @/../../docs-snippets/src/guide/wallets/transferring-assets.test.ts#transferring-assets-2{ts:line-numbers}

Remember to always invoke the `waitForResult()` function on the transaction response. This ensures that the transaction has been successfully mined before proceeding.
