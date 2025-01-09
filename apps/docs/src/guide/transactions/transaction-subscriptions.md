# Transaction Subscriptions

When submitting transactions via the SDK, usually this is done by calling a method in a [script](../scripts/running-scripts.md) or [contract](../contracts/methods.md#call), or sending a transaction via a [predicate](../predicates/methods.md#sendtransaction) or [wallet](../wallets/index.md). These methods submit the transaction and then return a [TransactionResponse](./transaction-response.md) that allows you to view the result of a transaction at your convenience, leaving the rest of your app processing unblocked.

However, if you want to send a transaction and wait until it's processed, for convenience the SDK also exposes the `sendTransactionAndAwaitStatus` available on a [Provider](../provider/index.md) which behaves the same as `sendTransaction` but waits until the transaction is processed by the node and then returns the transaction result.

This functionality can be used like so:

<<< @./snippets/transaction-subscriptions/transaction-request.ts#main{ts:line-numbers}

Or used with a contract call like so:

<<< @./snippets/transaction-subscriptions/contract-call.ts#main{ts:line-numbers}

> [!NOTE] Note
> This is a blocking call, which means the rest of your app logic could be blocked for several seconds until the transaction is processed. If this is a problem for your app then we recommend using the previous submission methods mentioned in this guide.
