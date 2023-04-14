# Transaction Parameters

Transaction parameters allow you to configure various aspects of your blockchain transactions. The main parameters are:

1. `gasPrice:` The price you're willing to pay for each unit of gas consumed during the transaction execution.

2. `gasLimit:` The maximum amount of gas you're willing to allow the transaction to consume. If the transaction execution requires more gas than the specified gas limit, the transaction will fail, and any state changes made during the execution will be reverted.

3. `variableOutputs:` Specifies the number of variable outputs allowed in the transaction. Variable outputs are used in transactions that have a dynamic number of outputs, such as those involving multiple recipients or complex contract interactions. By setting this value, you can control the number of variable outputs permitted in the transaction, which can be useful for managing transaction size and complexity.

<<< @/../../../packages/program/src/types.ts#transaction-params{ts:line-numbers}

## Setting Transaction Parameters

To set these parameters, use the optional `TxParams` object and pass it to the `txParams` chain method:

<<< @/../../docs-snippets/src/guide/contracts/transaction-parameters.test.ts#transaction-parameters-2{ts:line-numbers}

If you don't provide `TxParams`, the values will default to those specified in the `chainConfig` provided to your Fuel node.

You can also set `TxParams` when deploying contracts or transferring assets by passing the object to the respective methods.

> **Note:** When performing an action that results in a transaction (e.g., contract deployment, contract call with `.call()`, asset transfer), the SDK will automatically estimate the fee based on the gas limit and the transaction's byte size. This estimation is used when building the transaction. As a side effect, your wallet must own at least one coin of the base asset, regardless of the amount.

<<< @/../../docs-snippets/src/guide/contracts/transaction-parameters.test.ts#transaction-parameters-3{ts:line-numbers}
