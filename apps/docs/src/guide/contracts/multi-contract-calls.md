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

When using `multiCall`, the contract calls are queued and executed only after invoking one of the following methods: `.get`, `.simulate`, or `.call`.

## Using `multiCall` for Read-Only Contract Calls

In scenarios where you need to read data from multiple contracts, the `multiCall` method can be used to perform multiple [read-only](./methods.md#get) contract calls in a single transaction. This approach minimizes the number of requests sent to the network and consolidates the retrieval of data, making your Dapp interactions more efficient.

<<< @/../../docs-snippets/src/guide/contracts/multicalls.test.ts#multicall-4{ts:line-numbers}
