# Transaction Parameters

Transaction parameters allow you to configure various aspects of your blockchain transactions. Dependent on these parameters, it may introduce a [transaction policy](./transaction-policies.md).

All available parameters are shown below:

<<< @/../../docs-snippets2/src/transactions/transaction-parameters.ts#transaction-parameters-6{ts:line-numbers}

## Gas Limit

The maximum amount of gas you're willing to allow the transaction to consume. If the transaction requires more gas than this limit, it will fail.

<<< @/../../docs-snippets2/src/transactions/transaction-parameters.ts#transaction-parameters-1{ts:line-numbers}

## Max Fee

The maximum amount you're willing to pay for the transaction using the base asset. This allows users to set an upper limit on the transaction fee they are willing to pay, preventing unexpected high costs due to sudden network congestion or fee spikes.

<<< @/../../docs-snippets2/src/transactions/transaction-parameters.ts#transaction-parameters-2{ts:line-numbers}

## Tip

An optional amount of the base asset to incentivise the block producer to include the transaction, ensuring faster processing for those willing to pay more. The value set here will be added to the transaction `maxFee`.

<<< @/../../docs-snippets2/src/transactions/transaction-parameters.ts#transaction-parameters-3{ts:line-numbers}

## Maturity

The number of blocks that must pass before the transaction can be included in a block. This is useful for time-sensitive transactions, such as those involving time-locked assets.

For example, if the chain produces a new block every second, setting Maturity to `10` means the transaction will be processed after approximately 10 seconds.

<<< @/../../docs-snippets2/src/transactions/transaction-parameters.ts#transaction-parameters-4{ts:line-numbers}

## Witness Limit

The maximum byte length allowed for the transaction witnesses array. For instance, imagine a transaction that will deploy a contract. The contract bytecode will be one of the entries in the transaction witnesses. If you set this limit to `5000` and the contract bytecode length is `6000`, the transaction will be rejected because the witnesses bytes length exceeds the maximum value set.

<<< @/../../docs-snippets2/src/transactions/transaction-parameters.ts#transaction-parameters-5{ts:line-numbers}

## Variable Outputs

The number of variable outputs that should be added to the transaction request. You can read more about it on this [guide](../contracts/variable-outputs.md)

> **Note**: Setting transaction parameters is optional. If you don't specify them, the SDK will fetch some sensible defaults from the chain.

## Setting Transaction Parameters

To set the transaction parameters, you have access to the `txParams` method on a transaction request.

<<< @/../../docs-snippets2/src/transactions/transaction-parameters.ts#transaction-parameters-7{ts:line-numbers}

The same method is also accessible within a function invocation scope, so it can also be used when calling contract functions.

<<< @/../../docs-snippets2/src/transactions/transaction-parameters.ts#transaction-parameters-8{ts:line-numbers}

> **Note:** When performing an action that results in a transaction (e.g. contract deployment, contract call with `.call()`, asset transfer), the SDK will automatically estimate the fee based on the gas limit and the transaction's byte size. This estimation is used when building the transaction. As a side effect, your wallet must own at least one coin of the base asset, regardless of the amount.

## Full Example

<<< @/../../docs-snippets2/src/transactions/transaction-parameters.ts#full{ts:line-numbers}
