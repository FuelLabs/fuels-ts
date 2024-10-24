# Custom Transactions

There may be scenarios where you need to build out transactions that involve multiple program types and assets; this can be done by instantiating a [`ScriptTransactionRequest`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.ScriptTransactionRequest.html).

Consider the following script that transfers multiple assets to a contract:

<<< @/../../docs-snippets/test/fixtures/forc-projects/script-transfer-to-contract/src/main.sw#custom-transactions-1{ts:line-numbers}

This script can be executed by creating a [`ScriptTransactionRequest`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_), appending the resource and contract inputs/outputs and then sending the transaction, as follows:

<<< @/../../docs-snippets/src/guide/scripts/script-custom-transaction.test.ts#custom-transactions-2{ts:line-numbers}
