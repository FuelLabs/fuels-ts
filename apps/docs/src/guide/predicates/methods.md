# Interacting With Predicates

The `Predicate` class extends the [`Account`](https://docs.fuel.network/docs/fuels-ts/account/) class, inheriting all its methods. Therefore, there are multiple ways to interact with predicates, but broadly speaking, we can think about three:

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

<<< @/../../docs-snippets2/src/predicates/methods/get-resources-to-spend.ts#getResourcesToSpend{ts:line-numbers}

## Transactions

### `sendTransaction`

This is used to send a transaction to the node.

<<< @/../../docs-snippets2/src/predicates/methods/send-transaction.ts#sendTransaction{ts:line-numbers}

### `simulateTransaction`

You can use the `simulateTransaction` method to dry-run a predicate call without consuming resources. A typical use case of a dry-run call is to validate that sufficient funds are available to cover the transaction fees.

<<< @/../../docs-snippets2/src/predicates/methods/simulate-transaction.ts#simulateTransaction{ts:line-numbers}

## Transfers

### `createTransfer`

The `createTransfer` method creates a transaction request with all the necessary transfer details. It automatically estimates the transaction costs via a dry-run call and funds the request with the required predicate resources. After this, one can submit the returned transaction request with greater certainty that it will succeed.

However, please remember that you can still modify the transfer request details and use its properties before submitting it to the node.

<<< @/../../docs-snippets2/src/predicates/methods/create-transfer.ts#createTransfer{ts:line-numbers}

### `transfer`

You can send funds to another address using the `transfer` method.

<<< @/../../docs-snippets2/src/predicates/methods/transfer.ts#transfer{ts:line-numbers}
