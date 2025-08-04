# Working with Contract Logs

When you log a value within a contract method, you can generate a log entry that is added to the log receipt, and the variable type is recorded in the contract's ABI. The SDK enables you to parse these values into TypeScript types.

## Simple Logs

Consider the following example contract:

<<< @/../../docs/sway/log-simple/src/main.sw#full{rust:line-numbers}

To access the logged values in TypeScript, use the `logs` (typed as `Array<any>`) property from the response of a contract call.

<<< @./snippets/logs-simple.ts#logs{ts:line-numbers}

## Grouped Logs

We also provide a `groupedLogs` property that groups the logs by their program identifier. This is particularly useful when working with inter-contract or multi-calls.

We will use the same [`LogSimple`](#simple-logs) contract as in the previous example.

### Multi-call

We can make a multi-call to the contract

<<< @./snippets/logs-grouped-for-single-contract.ts#single{ts:line-numbers}

### Inter-contract

Consider the following example contract:

In this example, we are making a call an inter-contract call to the [`LogSimple`](#simple-logs) contract from the previous example.

<<< @/../../docs/sway/log-inter-calls/src/main.sw#full{rust:line-numbers}

The `log_inter_call` function makes a call to the `log_simple` function of the [`LogSimple`](#simple-logs) contract.

<<< @./snippets/logs-grouped-for-inter-contract-call.ts#inter{ts:line-numbers}

## Filtering logs

Consider the following example contract:

<<< @/../../docs/sway/log-struct/src/main.sw#full{rust:line-numbers}

We can filter the logs by type by using a `LogDecoder`. This can be achieved by using the `logDecoder` method on the contract instance.

<<< @./snippets/contract-log-decoder.ts#full{ts:line-numbers}

The `decodeLogsByType` method returns an array of objects, each containing the decoded log `data` with all the metadata.
