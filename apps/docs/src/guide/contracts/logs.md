# Working with Contract Logs

When you log a value within a contract method, it generates a log entry that is added to the log receipt, and the variable type is recorded in the contract's ABI. The SDK enables you to parse these values into TypeScript types.

Consider the following example contract:

<<< @/../../docs/sway/log-values/src/main.sw#log-1{rust:line-numbers}

## Logs

To access the logged values in TypeScript, use the `logs` property in the response of a contract call. The logs data will be stored in an `Array<any>`:

<<< @./snippets/logs.ts#logs{ts:line-numbers}

This approach allows you to work seamlessly with logged values in your contract, making it easier to understand and debug the contract's behavior.

## Logs by Contract

We also provide a `logsByContract` property that will group the logs by contract id:

<<< @./snippets/logs.ts#logsByContract{ts:line-numbers}

This is particularly useful when you are working with multiple contracts.
