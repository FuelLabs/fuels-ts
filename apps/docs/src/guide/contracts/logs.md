# Working with Contract Logs

When you log a value within a contract method, it generates a log entry that is added to the log receipt, and the variable type is recorded in the contract's ABI. The SDK enables you to parse these values into TypeScript types.

## Logs

Consider the following example contract:

<<< @/../../docs/sway/log-values/src/main.sw#full{rust:line-numbers}

To access the logged values in TypeScript, use the `logs` property in the response of a contract call. The logs data will be stored in an `Array<any>`:

<<< @./snippets/logs-values.ts#full{ts:line-numbers}

This approach allows you to work seamlessly with logged values in your contract. It's worth noting that the logs are stored in the order that they are executed.

## Grouped Logs

We also provide a `groupedLogs` property that will group the logs by their program. This is particularly useful when you are working with multiple contracts.

For example, if you have a contract:

<<< @./snippets/logs.ts#grouped-logs-for-contracts{ts:line-numbers}

Another example, if you are using a script:

