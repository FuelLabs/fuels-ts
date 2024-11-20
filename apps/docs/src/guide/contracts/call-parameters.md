# Call Parameters

<!-- This section should explain call params -->
<!-- call_params:example:start -->

When interacting with contracts, you can configure specific parameters for contract calls using the `callParams` method. The available call parameters are:

1. `forward`
2. `gasLimit`
<!-- call_params:example:end -->

> **Note**: Setting transaction parameters is also available when calling contracts. More information on this can be found at [Transaction Parameters](../transactions/transaction-parameters.md).

The contract in use in this section has the following implementation:

<<< @/../../docs/sway/return-context/src/main.sw#return-context-contract{rust:line-numbers}

## Forward Parameter

<!-- This section should explain the `forward` param -->
<!-- forward:example:start -->

The `forward` parameter allows the sending of a specific amount of coins to a contract when a function is called. This is useful when a contract function requires coins for its execution, such as paying fees or transferring funds. The forward parameter helps you control the resources allocated to the contract call and offers protection against potentially costly operations.

<!-- forward:example:end -->

<<< @./snippets/call-parameters/forward.ts#forward{ts:line-numbers}

## Gas Limit Parameter

<!-- This section should explain the `gasLimit` param -->
<!-- gas_limit:example:start -->

The `gasLimit` refers to the maximum amount of gas that can be consumed specifically by the contract call itself, separate from the rest of the transaction.

<!-- gas_limit:example:end -->

<<< @./snippets/call-parameters/gas-fee.ts#gas-fee{ts:line-numbers}

## Call Parameter `gasLimit` vs Transaction Parameter `gasLimit`

The call parameter `gasLimit` sets the maximum gas allowed for the actual contract call, whereas the transaction parameter `gasLimit` _(see [Transaction Parameters](../transactions/transaction-parameters.md))_ sets the maximum gas allowed for the entire transaction and constrains the `gasLimit` call parameter. If the call parameter `gasLimit` is set to a value greater than the _available_ transaction gas, then the entire available transaction gas will be allocated for the contract call execution.

If you don't set the `gasLimit` for the call, the transaction `gasLimit` will be applied.

## Setting Both Parameters

You can set both call parameters and transaction parameters within the same contract function call.

<<< @./snippets/call-parameters/setting-both-parameters.ts#setting-both-parameters{ts:line-numbers}
