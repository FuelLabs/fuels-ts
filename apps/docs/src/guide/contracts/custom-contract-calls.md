# Custom Contract Call

In certain scenarios, your use case may require more control over how contract calls are prepared and submitted.

For instance, imagine a liquidity pool contract where users can deposit a specific asset to receive some form of benefit. To enhance the experience and make it more attractive, one could use a predicate to cover the transaction fees. This way, users only need to provide the asset they wish to deposit without worrying about the fees.

There are two main ways to customize a contract call:

## Approach 1: Customize `assembleTx` Parameters

In most cases, this isn’t necessary. However, if you need precise control, you can specify the parameters passed to `assembleTx`, which is used internally to estimate and fund the transaction.

Here’s how it works:

<<< @./snippets/custom-contract-calls/assemble-tx-parameters.ts#assemble-tx-parameters-1{ts:line-numbers}

## Approach 2: Manually Call `assembleTx`

You can also retrieve the transaction request from the invocation scope and manually call `assembleTx` on it. Just like the approach 1 this gives you full control over how the transaction is assembled and funded.

<<< @./snippets/custom-contract-calls/call.ts#custom-contract-call-1{ts:line-numbers}

There are 2 details here that there are essential in this flow

1. `fromRequest`:
   This sets the transaction request extracted from the invocation scope. It ensures that any manual changes you’ve applied persist and are used when the transaction is executed.

1. `{ skipAssembleTx: true }` option:
   It tells the SDK to skip the automatic `assembleTx` step during the `.call()` execution, since we’ve already manually assembled and funded the transaction using `provider.assembleTx()`. Skipping this step prevents the SDK from re-estimating the transaction and ensures the custom logic remains intact, such as using a predicate as the fee payer.
