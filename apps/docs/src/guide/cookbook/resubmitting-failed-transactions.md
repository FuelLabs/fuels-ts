# Resubmitting Failed Transactions

In certain scenarios, you might need to implement a solution to resubmit failed transactions to the Fuel Network. While this approach can be effective, there are important considerations to remember.


## Submission and Processing

When submitting a transaction, you will first get a response.

<<< @/../../docs-snippets/src/guide/cookbook/resubmitting-failed-transactions.test.ts#resubmitting-failed-transactions-1{ts:line-numbers}

If the `sendTransaction` method resolves without an error, we know that the transaction was successfully submitted and accepted by the network. However, this does not guarantee that the transaction has been processed; it only indicates that the transaction has been accepted and placed in a queue for processing.

To determine whether the transaction has been processed, you must call `waitForResult`, which will either resolve (with the processed transaction) or reject with an error.

<<< @/../../docs-snippets/src/guide/cookbook/resubmitting-failed-transactions.test.ts#resubmitting-failed-transactions-2{ts:line-numbers}

In other words:
 - If `sendTransaction` is rejected with an error, the transaction was not accepted by the network and is not processed.
 - If `waitForResult` is rejected with an error, the transaction was accepted but reverted during processing.

## Resources Spent When a Transaction Is Processed

If a transaction is reverted during processing, the Fuel VM will still consume the funded resources to cover the gas used up to the point of failure. After deducting the gas cost, the remaining funds will be added to a new UTXO (Unspent Transaction Output) addressed to the owner.

Attempting to resubmit the same transaction request that failed during processing will likely result in an error, as the resources that were initially spent no longer exist.

<<< @/../../docs-snippets/src/guide/cookbook/resubmitting-failed-transactions.test.ts#resubmitting-failed-transactions-3{ts:line-numbers}

The attempt from the above snippet will result in the error:

```console
FuelError: Transaction is not inserted. UTXO does not exist: {{utxoId}}
```

To safely retry a transaction that failed during processing, you should reassemble the request from scratch and resubmit it.

<<< @/../../docs-snippets/src/guide/cookbook/resubmitting-failed-transactions.test.ts#resubmitting-failed-transactions-4{ts:line-numbers}
