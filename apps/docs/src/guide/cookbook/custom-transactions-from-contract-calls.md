# Custom Transactions From Contract Calls

In the previous example we demonstrated how you can instantiate a [`ScriptTransactionRequest`](../../api/Account/ScriptTransactionRequest.md) to customize and build out a more complex transaction via a script. The same can be done using contracts, but this allows us to utilize functions available in the contract and access on-chain state. Allowing us to harness all of the power from an invocation scope and a transaction request.

This cookbook demonstrates how we can utilize a contract call to build out a custom transaction, allowing us to update on-chain state and transfer assets to a recipient address.

<<< @./snippets/custom-contract-calls.ts#custom-transactions-contract-calls{ts:line-numbers}
