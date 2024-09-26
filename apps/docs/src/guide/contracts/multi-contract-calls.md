# Multiple Contract Calls

<!-- This section should explain making multiple contract calls -->
<!-- calls:example:start -->

You can execute multiple contract calls in a single transaction, either to the same contract or to different contracts. This can improve efficiency and reduce the overall transaction costs.

<!-- calls:example:end -->

## Same Contract Multi Calls

<!-- This section should explain how make multiple calls with the SDK -->
<!-- multicall:example:start -->

Use the `multiCall` method to call multiple functions on the same contract in a single transaction:

<!-- multicall:example:end -->

<<< @/../../docs-snippets/src/guide/contracts/multicalls.test.ts#multicall-1{ts:line-numbers}

## Different Contracts Multi Calls

The `multiCall` method also allows you to execute multiple contract calls to distinct contracts within a single transaction:

<<< @/../../docs-snippets/src/guide/contracts/multicalls.test.ts#multicall-2{ts:line-numbers}

You can also chain supported contract call methods, like `callParams`, for each contract call:

<<< @/../../docs-snippets/src/guide/contracts/multicalls.test.ts#multicall-3{ts:line-numbers}

When chaining contract call methods within `multiCall`, avoid executing the contract functions themselves, such as `.call`, `.get`, and `.simulate`.

The `multiCall` method creates a scope for all contract calls, which will only be executed after invoking the `.call` method.
