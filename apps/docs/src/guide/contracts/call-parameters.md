# Call Parameters

When interacting with contracts, you can configure specific parameters for contract calls using the `callParams` method. The available call parameters are:

1. `forward`
2. `callParams`

## Forward Parameter

The `forward` parameter allows the sending of a specific amount of coins to a contract when a function is called. This is useful when a contract function requires coins for its execution, such as paying fees or transferring funds. The forward parameter helps you control the resources allocated to the contract call and offers protection against potentially costly operations.

<<< @/../../docs-snippets/src/guide/contracts/call-parameters.test.ts#call-params-1{ts:line-numbers}

## Gas Limit Parameter

The `gasLimit` refers to the maximum amount of gas that can be consumed specifically by the contract call itself, separate from the rest of the transaction.

<<< @/../../docs-snippets/src/guide/contracts/call-parameters.test.ts#call-params-2{ts:line-numbers}

## Call Parameters `gasLimit` vs Transaction Parameters `gasLimit`

The `gasLimit` parameter in Call Parameters sets the maximum gas allowed for the actual contract call, whereas the `gasLimit` in [Transaction Parameters](./transaction-parameters.md) determines the gas limit for the entire transaction. This means that the `gasLimit` from Call Parameters is constrained by the transaction gas limit. If the `gasLimit` in Call Parameters is set to a value greater than the available gas for the transaction, the entire available transaction gas will be allocated for the contract call execution.

If you don't set the Call Parameters `gasLimit`, the Transaction Parameters `gasLimit` will be applied.

## Setting Both Parameters

You can set both Call Parameters and Transaction Parameters within the same contract function call.

<<< @/../../docs-snippets/src/guide/contracts/call-parameters.test.ts#call-params-3{ts:line-numbers}
