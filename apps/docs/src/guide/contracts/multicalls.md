# Multiple Contract Calls

You can execute multiple contract calls in a single transaction, either to the same contract or to different contracts. This can improve efficiency and reduce the overall transaction costs.

## Calling the Same Contract Functions Multiple Times

Use the `multiCall` method to call the same contract functions multiple times in a single transaction:

<<< @/../../docs-snippets/src/guide/contracts/multicalls.test.ts#multicall-1{ts:line-numbers}

## Different contracts in multicalls

The `multiCall` method also allows you to execute multiple contract calls to distinct contracts within a single transaction:

<<< @/../../docs-snippets/src/guide/contracts/multicalls.test.ts#multicall-2{ts:line-numbers}

You can also chain supported contract call methods, like `callParams`, for each contract call:

<<< @/../../docs-snippets/src/guide/contracts/multicalls.test.ts#multicall-3{ts:line-numbers}

> **Note:** When chaining contract call methods within `multiCall`, avoid executing the contract functions themselves, such as `.call`, `.get`, and `.simulate`.
