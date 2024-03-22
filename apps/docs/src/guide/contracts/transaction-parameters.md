# Transaction Parameters

<!-- This section should explain tx params -->
<!-- tx_params:example:start -->

Transaction parameters allow you to configure various aspects of your blockchain transactions. The main parameters are:

1. `gasPrice:` The price you're willing to pay for each unit of gas consumed during the transaction execution.

2. `gasLimit:` The maximum amount of gas you're willing to allow the transaction to consume. If the transaction execution requires more gas than the specified gas limit, the transaction will fail, and any state changes made during the execution will be reverted.

3. `variableOutputs:` Specifies the number of variable outputs allowed in the transaction. Variable outputs are used in transactions that have a dynamic number of outputs, such as those involving multiple recipients or complex contract interactions. By setting this value, you can control the number of variable outputs permitted in the transaction, which can be useful for managing transaction size and complexity.
<!-- tx_params:example:end -->

<<< @/../../../packages/program/src/types.ts#transaction-params{ts:line-numbers}

> Note: Setting transaction parameters is optional. If you don't specify them, the SDK will fetch some sensible defaults from the chain.

## Setting Transaction Parameters

<!-- This section should explain how to set tx params -->
<!-- set_tx_params:example:start -->

To set these parameters, use the optional `TxParams` object and pass it to the `txParams` chain method:

<!-- set_tx_params:example:end -->

<<< @/../../docs-snippets/src/guide/contracts/transaction-parameters.test.ts#transaction-parameters-2{ts:line-numbers}

<!-- This section should explain the default tx params -->
<!-- default_tx_params:example:start -->

If you don't provide `TxParams`, the values will default to those specified in the `chainConfig` provided to your Fuel node.

<!-- default_tx_params:example:end -->

You can also set `TxParams` when deploying contracts or transferring assets by passing the object to the respective methods.

<!-- This section should explain how the SDK estimates fees for a tx -->
<!-- est:example:start -->

> **Note:** When performing an action that results in a transaction (e.g., contract deployment, contract call with `.call()`, asset transfer), the SDK will automatically estimate the fee based on the gas limit and the transaction's byte size. This estimation is used when building the transaction. As a side effect, your wallet must own at least one coin of the base asset, regardless of the amount.

<!-- est:example:end -->

<<< @/../../docs-snippets/src/guide/contracts/transaction-parameters.test.ts#transaction-parameters-3{ts:line-numbers}
