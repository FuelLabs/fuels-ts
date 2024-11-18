# Transaction Policies

Transaction policies are rules that can govern how a transaction is processed, introduced by the [transaction parameters](./transaction-parameters.md) that you pass to a transaction request. The available policies are as follows:

### Tip

Optional amount on the base asset to incentivise block producer to include transaction, ensuring faster processing for those willing to pay more. The value set here will be added to the transaction `maxFee`.

### Witness Limit

The maximum byte length allowed for the transaction witnesses array.

### Maturity

The number of blocks that must pass before the transaction can be included in a block.

### Max Fee

The maximum amount you're willing to pay for the transaction using the base asset.

## Setting Transaction Policies

The following snippet shows which transaction parameters correspond to which policies:

<<< @/../../docs-snippets2/src/transactions/transaction-policies/setting-policies.ts#transaction-policies-1{ts:line-numbers}

## Retrieving Transaction Policies from a Transaction

Policies used for a transaction can be retrieved from a transaction using a `TransactionResponse`. The below snippet will show how to retrieve the policies from a transaction:

<<< @/../../docs-snippets2/src/transactions/transaction-policies/policies-from-response.ts#transaction-policies-2{ts:line-numbers}
