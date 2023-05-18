# Working with Contract Logs

When you log a value within a contract method, it generates a log entry that is added to the log receipt, and the variable type is recorded in the contract's ABI. The SDK enables you to parse these values into TypeScript types.

Consider the following example contract:

<<< @/../../docs-snippets/projects/log-values/src/main.sw#log-1{rust:line-numbers}

To access the logged values in TypeScript, use the `logs` property in the `FunctionInvocationResult` of a contract call result. The logs data will be stored in an `Array<any>`:

<<< @/../../docs-snippets/src/guide/contracts/logs.test.ts#log-2{ts:line-numbers}

This approach allows you to work seamlessly with logged values in your contract, making it easier to understand and debug the contract's behavior.
