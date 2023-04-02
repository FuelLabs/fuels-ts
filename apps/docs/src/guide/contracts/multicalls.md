# Multiple contract calls

At a basic level, you can call the same contract function multiple times in the same transaction:

<<< @/../../../packages/fuel-gauge/src/contract.test.ts#Contract-multicall{ts:line-numbers}

## Different contracts in multicalls

You can execute multiple contract calls to distinct contracts within a single transaction. To achieve this, you first prepare all the contract calls that you want to bundle:

<<< @/../../../packages/fuel-gauge/src/contract.test.ts#Contract-multicall-multiple-contracts{ts:line-numbers}

You can also set call parameters, variable outputs, or external contracts for every contract call, as long as you don't execute it with `call()` or `simulate()`. See also [call parameters](./call-parameters.md).

Next, you provide the prepared calls to the `multiCall` method and optionally configure transaction parameters:

<<< @/../../../packages/fuel-gauge/src/contract.test.ts#Contract-multicall-multiple-contracts-p2{ts:line-numbers}

> **Note:** any transaction parameters configured on separate contract calls are disregarded in favor of the parameters provided to `multiCall`.

## Output values

To get the output values of the bundled calls, invoke of `call()` or `simulate()`:

<<< @/../../../packages/fuel-gauge/src/contract.test.ts#Contract-multicall-multiple-contracts-p3{ts:line-numbers}
