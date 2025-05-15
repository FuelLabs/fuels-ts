# Custom Contract Call

In certain scenarios, your use case may require more control over how contract calls are prepared and submitted.

For instance, imagine a liquidity pool contract where users can deposit a specific asset to receive some form of benefit. To enhance the experience and make it more attractive, one could use a predicate to cover the transaction fees. This way, users only need to provide the asset they wish to deposit without worrying about the fees.

Here’s how you can prepare and submit a customizable contract call in such a setup:

<<< @./snippets/custom-contract-calls/call.ts#custom-contract-call-1{ts:line-numbers}

The `{ skipAssembleTx: true }` option is essential in this flow.
It tells the SDK to skip the automatic `assembleTx` step during the `.call()` execution, since we’ve already manually assembled and funded the transaction earlier using `provider.assembleTx()`.

Skipping this step prevents the SDK from overwriting the prepared transaction and ensures the custom logic—such as using a predicate as the fee payer—remains intact.
