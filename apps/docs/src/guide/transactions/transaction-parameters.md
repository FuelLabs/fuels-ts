# Transaction Parameters

Transaction parameters allow you to configure various aspects of your blockchain transactions. The parameters are:

1. Gas Price - The price you're willing to pay for each unit of gas consumed during the transaction execution.
1. Gas Limit - The maximum amount of gas you're willing to allow the transaction to consume. If the transaction execution requires more gas than the specified gas limit, the transaction will fail and any state changes made during the execution will be reverted.
1. Variable Outputs - The number of variable outputs allowed in the transaction. Variable outputs are used in transactions that have a dynamic number of outputs, such as those involving multiple recipients or complex contract interactions. By setting this value, you can control the number of variable outputs permitted in the transaction, which can be useful for managing transaction size and complexity.

> **Note**: Setting transaction parameters is optional. If you don't specify them, the SDK will fetch some sensible defaults from the chain.

All available parameters are shown below:

<<< @/../../docs-snippets/src/guide/transactions/transaction-parameters.test.ts#transaction-parameters-1{ts:line-numbers}

## Setting Transaction Parameters

To set the transaction parameters, you have access to the `txParams` method on a transaction request.

<<< @/../../docs-snippets/src/guide/transactions/transaction-parameters.test.ts#transaction-parameters-2{ts:line-numbers}

The same method is also accessible within a function invocation scope, so it can also be used when calling contract functions.

<<< @/../../docs-snippets/src/guide/transactions/transaction-parameters.test.ts#transaction-parameters-3{ts:line-numbers}

> **Note:** When performing an action that results in a transaction (e.g. contract deployment, contract call with `.call()`, asset transfer), the SDK will automatically estimate the fee based on the gas limit and the transaction's byte size. This estimation is used when building the transaction. As a side effect, your wallet must own at least one coin of the base asset, regardless of the amount.
