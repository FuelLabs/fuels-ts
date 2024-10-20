# Custom Transactions

There may be scenarios where you need to build out transactions that involve multiple program types and assets; this can be done by instantiating a [`ScriptTransactionRequest`](../../api/Account/ScriptTransactionRequest.md). This class allows you to append multiple program types and assets to a single transaction.

Consider the following script that transfers multiple assets to a contract:

<<< @/../../docs-snippets/test/fixtures/forc-projects/script-transfer-to-contract/src/main.sw#custom-transactions-1{ts:line-numbers}

This script can be executed by creating a [`ScriptTransactionRequest`](../../api/Account/ScriptTransactionRequest.md), appending the resource and contract inputs/outputs, and then sending the transaction, as follows:

<<< @/../../docs-snippets/src/guide/scripts/script-custom-transaction.test.ts#custom-transactions-2{ts:line-numbers}
