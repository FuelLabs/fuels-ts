# Custom Transactions

There may be scenarios where you need to build out transactions that involve multiple program types and assets; this can be done by instantiating a [`ScriptTransactionRequest`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.ScriptTransactionRequest.html). This class allows you to a append multiple program types and assets to a single transaction.

Consider the following script that transfers multiple assets to a contract:

<<< @/../../docs-snippets2/sway/script-transfer-to-contract/src/main.sw#custom-transactions-1{rust:line-numbers}

This script can be executed by creating a [`ScriptTransactionRequest`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.ScriptTransactionRequest.html), appending the resource and contract inputs/outputs and then sending the transaction, as follows:

<<< @/../../docs-snippets2/src/scripts/script-custom-transaction.ts#custom-transactions-2{ts:line-numbers}

## Full Example

For a full example, see below:

<<< @/../../docs-snippets2/src/scripts/script-custom-transaction.ts#full{ts:line-numbers}
