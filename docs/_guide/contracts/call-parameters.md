# Call parameters

Call parameters are:

1. Amount;
2. Asset ID;
3. Gas forwarded.

You can use these to forward coins to a contract. You can configure these parameters by creating an instance of `CallParams` and passing it to a chain method called `callParams`.

At a basic level we can invoke the `callParams` method as part of the transaction flow to set these params:
[@code:typescript](./packages/fuel-gauge/src/call-test-contract.test.ts#typedoc:Contract-call-params)

Here we set call params alongside [transaction parameters](./transaction-parameters.md):
[@code:typescript](./packages/fuel-gauge/src/contract.test.ts#typedoc:Contract-call-params-with-tx-params)

The `forward` parameter defines the limit for the actual contract call as opposed to the gas limit for the whole transaction. This means that it is constrained by the transaction limit. If it is set to an amount greater than the available gas, all available gas will be forwarded.

### MultiCall with multiple callParams

Here we set call params as part of a [Multicall](./multicalls.md)
[@code:typescript](./packages/fuel-gauge/src/contract.test.ts#typedoc:Contract-call-params-with-multicall)
