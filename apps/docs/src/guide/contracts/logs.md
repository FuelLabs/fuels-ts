# Logs

Whenever you log a value within a contract method, the resulting log entry is added to the log receipt and the variable type is recorded in the contract's ABI. The SDK lets you parse those values into TypeScript types.

Consider the following contract method:

<<< @/../../../packages/fuel-gauge/test-projects/coverage-contract/src/main.sw#Log-demo{rust:line-numbers}

You can access the logged values in TypeScript by using the `logs` property in the `FunctionInvocationResult` from a contract call result. The logs data will be in a `Array<any>`:

<<< @/../../../packages/fuel-gauge/src/coverage-contract.test.ts#Log-output{ts:line-numbers}
