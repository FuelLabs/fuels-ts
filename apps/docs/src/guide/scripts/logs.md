# Working with Script Logs

When you log a value within a script, you can generates a log entry that is added to the log receipt, and the variable type is recorded in the script's ABI. The SDK enables you to parse these values into TypeScript types.

## Simple

Consider the following example script:

<<< @/../../docs/sway/script-log-simple/src/main.sw#full{rust:line-numbers}

To access the logged values in TypeScript, use the `logs` property in the response of a script call.

<<< @./snippets/script-log-simple.ts#full{ts:line-numbers}

## Grouped logs

Consider the following example script:

<<< @/../../docs/sway/script-log-with-contract/src/main.sw#full{rust:line-numbers}

### With Contract

To access the fine-grained logs for each contract, use the `groupedLogs` property from the script call response.

<<< @./snippets/script-log-with-contract.ts#full{ts:line-numbers}

Although Scripts don't have IDs/addresses, they can still call contracts and generate logs, so we use a zeroed-out (hexadecimal) address as their key instead.

## Filtering logs

Consider the following example script:

<<< @/../../docs/sway/call-test-script/src/main.sw#full{rust:line-numbers}

We can filter the logs by type by using a `LogDecoder`. This can be achieved by using the `logDecoder` method on the script instance.

<<< @./snippets/script-log-decoder.ts#full{ts:line-numbers}

The `decodeLogsByType` method returns an array of objects, each containing the decoded log `data` with all the metadata.
