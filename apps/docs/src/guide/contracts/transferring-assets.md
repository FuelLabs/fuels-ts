# Transferring assets

Consider a scenario where you're interacting with a smart contract and need to transfer assets to a recipient's wallet. The `addTransfer` enables you to combine these actions into a single transaction seamlessly.

The `addTransfer` method allows you to append an asset transfer to your contract call transaction. You can use it is shown in the following example:

<<< @/../../docs-snippets/src/guide/contracts/add-transfer.test.ts#add-transfer-1{ts:line-numbers}

In the previous example, we first use a contract call to the `echo_u64` function. Following this, `addTransfer` is added to chain call to include a transfer of `100` units of the `BaseAssetId` in the transaction.

## Multiple Transfers

You can chain multiple `addTransfer` calls to include various transfers in a single transaction. Here's how you can concatenate these calls:

<<< @/../../docs-snippets/src/guide/contracts/add-transfer.test.ts#add-transfer-2{ts:line-numbers}
