# Interacting With Predicates

There are 4 ways to interact with predicates: `populateTransactionPredicateData`, `sendTransaction`, `simulateTransaction`, `getResourcesToSpend`


## `populateTransactionPredicateData`

Once you've instantiated a `new Predicate` you will want to create a transaction request containing the `gasLimit` and `maxFee` then pass this to the `populateTransactionPredicateData` method which will populate the transaction with the required data to be sent to the node.

<<< @/../../docs-snippets/src/guide/predicates/interacting-with-predicates.test.ts#interacting-with-predicates-1{ts:line-numbers}

## `sendTransaction`

Once you've populated the transaction with the populated data you can send the transaction to the node using the `sendTransaction` method.

<<< @/../../docs-snippets/src/guide/predicates/interacting-with-predicates.test.ts#interacting-with-predicates-2{ts:line-numbers}

## `simulateTransaction`

The `simulateTransaction` method should be used to dry-run a predicate call, ensuring that the wallet used has sufficient funds to cover the transaction fees, without consuming any resources.

<<< @/../../docs-snippets/src/guide/predicates/interacting-with-predicates.test.ts#interacting-with-predicates-3{ts:line-numbers}

## `getResourcesToSpend`

This will return the resources that will be spent when calling the predicate. This is useful when creating the predicate transaction so that you can ensure that the wallet has sufficient funds to cover the transaction fees.

<<< @/../../docs-snippets/src/guide/predicates/interacting-with-predicates.test.ts#interacting-with-predicates-4{ts:line-numbers}