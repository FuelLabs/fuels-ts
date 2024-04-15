# Transaction Policies

Transaction policies are rules that can govern how a transaction is processed, introduced by the [transaction parameters](./transaction-parameters.md) that you pass to a transaction request. The available policies are as follows:

1. Gas Price - Maximum gas price for transaction.
1. Witness Limit - The maximum amount of witness data allowed for the transaction.
1. Maturity - Block until which the transaction cannot be included.
1. Max Fee - The maximum fee payable by this transaction.

## Setting Transaction Policies

The below snippet will show which transaction parameters set which policy:

<<< @/../../docs-snippets/src/guide/transactions/transaction-policies.test.ts#transaction-policies-1{ts:line-numbers}

## Retrieving Transaction Policies from a Transaction

Policies used for a transaction can be retrieved from a transaction using a `TransactionResponse`. The below snippet will show how to retrieve the policies from a transaction:

<<< @/../../docs-snippets/src/guide/transactions/transaction-policies.test.ts#transaction-policies-2{ts:line-numbers}
