# Interacting With Predicates

The `Predicate` class extends the [`Account`](DOCS_API_URL/modules/_fuel_ts_account.html) class, inheriting all its methods. Therefore, there are multiple ways to interact with predicates, but broadly speaking, we can think about three:

- `Checking Balances`
- `Transactions`
- `Transfers`

## Checking Balances

### `getBalances`

This will return the balances of all assets owned by the predicate.

See also: [Checking Wallet Balances](https://docs.fuel.network/docs/fuels-ts/wallets/checking-balances/#getting-a-wallets-balance)

### `getResourcesToSpend`

This will return the resources owned by a predicate so that they can be added to a transaction request.

This method is called under the hood when using [`transfer`](./methods.md#transfer) or [`createTransfer`](./methods.md#createtransfer).

You may want to use this method when using a predicate in an existing transaction request.

<<< @./snippets/methods/get-resources-to-spend.ts#getResourcesToSpend{ts:line-numbers}

## Transactions

### `setData`

The `setData` method can be used to update the predicate data (i.e., predicate arguments) after the predicate has already been instantiated. Since the predicate data is initially set during instantiation, `setData` provides a way to modify it afterward if needed.

<<< @./snippets/methods/set-predicate-new-data.ts#set-predicate-new-data{ts:line-numbers}

> Note: Using `setData` only updates the predicate data inside the predicate instance itself. It does not affect predicate data already embedded in a transaction request that includes predicate UTXOs. This is because each predicate UTXO carries its own copy of the predicate data.

<<< @./snippets/methods/no-modified-data.ts#no-modified-data{ts:line-numbers}

If you need to modify the predicate data within a transaction request, use the `populateTransactionPredicateData` method after setting the new data.

<<< @./snippets/methods/modified-data.ts#modified-data{ts:line-numbers}

### `sendTransaction`

This is used to send a transaction to the node.

<<< @./snippets/methods/send-transaction.ts#sendTransaction{ts:line-numbers}

### `simulateTransaction`

You can use the `simulateTransaction` method to dry-run a predicate call without consuming resources. A typical use case of a dry-run call is to validate that sufficient funds are available to cover the transaction fees.

<<< @./snippets/methods/simulate-transaction.ts#simulateTransaction{ts:line-numbers}

## Transfers

### `createTransfer`

The `createTransfer` method creates a transaction request with all the necessary transfer details. It automatically estimates the transaction costs via a dry-run call and funds the request with the required predicate resources. After this, one can submit the returned transaction request with greater certainty that it will succeed.

However, please remember that you can still modify the transfer request details and use its properties before submitting it to the node.

<<< @./snippets/methods/create-transfer.ts#createTransfer{ts:line-numbers}

### `transfer`

You can send funds to another address using the `transfer` method.

<<< @./snippets/methods/transfer.ts#transfer{ts:line-numbers}
