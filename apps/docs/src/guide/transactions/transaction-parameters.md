# Transaction Parameters

Transaction parameters allow you to configure various aspects of your blockchain transactions. Dependent on these parameters, it may introduce a [transaction policy](./transaction-policies.md). The parameters are:

1. Gas Price - The price you're willing to pay for each unit of [gas](https://docs.fuel.network/docs/intro/glossary/#gas) consumed during the transaction execution.
1. Gas Limit - The maximum amount of gas you're willing to allow the transaction to consume. If the amount of gas a transaction will use is greater than the gas limit, the transaction will fail.
1. Max Fee - The maximum amount you're willing to pay for the transaction using the base asset. This is the price of each unit of gas multiplied by the amount of gas used.
1. Maturity - The number of blocks that must pass before the transaction can be included in a block. This is useful for time-sensitive transactions, such as those involving time-locked assets.
1. Witness Limit - The maximum number of witnesses allowed in the transaction. Witnesses are used in transactions that require multiple signatures, such as those involving multi-signature wallets.
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
