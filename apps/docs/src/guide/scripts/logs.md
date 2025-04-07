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

To access the find grained logs for each contract, use the `groupedLogs` property in the response of a script call.

<<< @./snippets/script-log-with-contract.ts#full{ts:line-numbers}

All script logs will be grouped using a zero'd out address as the key. This is because although they are executed on chain, and can execute functionality. They can not have any ownership over resources.
