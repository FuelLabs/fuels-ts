# Interacting With Predicates

The `Predicate` class extends the [`Account`](https://docs.fuel.network/docs/fuels-ts/account/) class, inheriting all its methods. Therefore, there are multiple ways to interact with predicates, but broadly speaking, we can think about three:
 - `Checking Balances`
 - `Transactions`
 - `Transfers`


## Checking Balances

### `getBalances`

This will return the balances of the wallet that is being used to interact with the predicate.

<<< @/../../docs-snippets/src/guide/wallets/checking-balances.test.ts#checking-balances-2{ts:line-numbers}

### `getResourcesToSpend`

This will return the resources owned by a predicate so that they can be added to a transaction request.

This method is called under the hood when using `transfer` or `createTransfer`.

You may want to use this method when using a predicate in an existing transaction request.

<<< @/../../docs-snippets/src/guide/predicates/interacting-with-predicates.test.ts#interacting-with-predicates-1{ts:line-numbers}

## Transactions

### `sendTransaction`

Once you've populated the transaction with the populated data, you can send it to the node using the `sendTransaction` method.

<<< @/../../docs-snippets/src/guide/predicates/interacting-with-predicates.test.ts#interacting-with-predicates-2{ts:line-numbers}

## `simulateTransaction`

The `simulateTransaction` method should be used to dry-run a predicate call, ensuring that the wallet used has sufficient funds to cover the transaction fees, without consuming any resources.

<<< @/../../docs-snippets/src/guide/predicates/interacting-with-predicates.test.ts#interacting-with-predicates-3{ts:line-numbers}

### `populateTransactionPredicateData`

Once you've instantiated a `new Predicate` you will want to create a transaction request containing the `gasLimit` and `maxFee` and then pass this to the `populateTransactionPredicateData` method, which will populate the transaction with the required data to be sent to the node.

<<< @/../../docs-snippets/src/guide/predicates/interacting-with-predicates.test.ts#interacting-with-predicates-4{ts:line-numbers}

## Transfers

### `createTransfer`

The `createTransfer` method creates a transfer request and add the transfer details to that request. This method estimates the transaction cost via a dry-run, and then funds it with predicate resources, which is useful since the returned transaction request can now be submitted with greater certainty that it will succeed.

 This can be useful should you need to modify the transfer request or use its properties before sending it to the node.

<<< @/../../docs-snippets/src/guide/predicates/send-and-spend-funds-from-predicates.test.ts#send-and-spend-funds-from-predicates-8{ts:line-numbers}

### `transfer`

You can send funds to another wallet using the `transfer` method.

<<< @/../../docs-snippets/src/guide/cookbook/transferring-assets.test.ts#transferring-assets-1{ts:line-numbers}
