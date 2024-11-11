# Custom Transactions

Utilizing predicate logic unlocks a wide range of possibilities for your dApps when creating transactions. Therefore, pairing predicates with custom transactions can help you achieve more complex use cases. This can be achieved by instantiating a custom transaction, appending the predicate resources, and submitting the transaction via a successfully validated predicate.

Custom transactions can be shaped via a `ScriptTransactionRequest` instance. For more information on crafting custom transactions and the methods available to them, please refer to the [Transaction Request](../transactions/transaction-request.md) guide.

However, this guide will demonstrate how to use a predicate in a custom transaction. Consider the following predicate, where a configurable pin must be used to validate the predicate and unlock the funds:

<<< @/../../docs-snippets2/sway/configurable-pin/src/main.sw#full{rust:line-numbers}

We can interact with the above and include it in a custom transaction like so:

<<< @/../../docs-snippets2/src/predicates/custom-transactions.ts#predicate-custom-transaction{ts:line-numbers}
