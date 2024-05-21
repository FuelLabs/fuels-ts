# Interacting With Predicates

The `Predicate` class extends the [`Account`](https://docs.fuel.network/docs/fuels-ts/account/) class, and therefore it inherits all of it's methods.  Therefore, there are multiple ways to interact with predicates, but broadly speaking there are 3 general use cases that would be of interest to a user.We cna think of them in terms of `Checking Balances`, `Transactions` and `Transfers`


## Checking Balances

### `getBalances`

This will return the balances of the wallet that is being used to interact with the predicate.

<<< @/../../docs-snippets/src/guide/wallets/checking-balances.test.ts#checking-balances-2{ts:line-numbers}

### `getResourcesToSpend`

This will return the resources that will be spent when calling the predicate. This is useful when creating the predicate transaction so that you can ensure that the wallet has sufficient funds to cover the transaction fees.

<<< @/../../docs-snippets/src/guide/predicates/interacting-with-predicates.test.ts#interacting-with-predicates-1{ts:line-numbers}

## Transactions

## `sendTransaction`

Once you've populated the transaction with the populated data you can send the transaction to the node using the `sendTransaction` method.

<<< @/../../docs-snippets/src/guide/predicates/interacting-with-predicates.test.ts#interacting-with-predicates-2{ts:line-numbers}

## `simulateTransaction`

The `simulateTransaction` method should be used to dry-run a predicate call, ensuring that the wallet used has sufficient funds to cover the transaction fees, without consuming any resources.

<<< @/../../docs-snippets/src/guide/predicates/interacting-with-predicates.test.ts#interacting-with-predicates-3{ts:line-numbers}

### `populateTransactionPredicateData`

Once you've instantiated a `new Predicate` you will want to create a transaction request containing the `gasLimit` and `maxFee` then pass this to the `populateTransactionPredicateData` method which will populate the transaction with the required data to be sent to the node.

<<< @/../../docs-snippets/src/guide/predicates/interacting-with-predicates.test.ts#interacting-with-predicates-4{ts:line-numbers}

## Transfers

### `createTransfer`

The `createTransfer` method is used to create a transfer object that can be used to send funds to another wallet. This can be useful should you need to modify the transfer object or use it's properties before sending it to the node.

<<< @/../../docs-snippets/src/guide/predicates/send-and-spend-funds-from-predicates.test.ts#send-and-spend-funds-from-predicates-8{ts:line-numbers}

### `transfer`

Once you've created a `transfer` object using the `createTransfer` method can send the funds to another wallet using the `transfer` method.

<<< @/../../docs-snippets/src/guide/cookbook/transferring-assets.test.ts#transferring-assets-1{ts:line-numbers}
