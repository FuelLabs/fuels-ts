# Custom Transactions From Contract Calls

In the previous example we demonstrated how you can instantiate a [`ScriptTransactionRequest`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.ScriptTransactionRequest.html) to customize and build out a more complex transaction via a script.

This cookbook demonstrates how we can utilize a contract call to build out a custom transaction, allowing us to update on-chain state and transfer assets to a recipient address.

<<< @/../../docs-snippets2/src/cookbook/custom-contract-calls.ts#custom-transactions-contract-calls{ts:line-numbers}
