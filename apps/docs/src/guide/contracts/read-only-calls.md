# Read-only Calls

<!-- This section should explain read-only calls -->
<!-- read:example:start -->

When interacting with a contract, you might want to call a method that does not change the state of the blockchain. For example, a method that reads a value from storage and returns it without modifying the storage.

In such cases, there's no need to create an actual blockchain transaction; you only want to read a value quickly. You can achieve this using the `.get()` method:

<!-- read:example:end -->

<<< @/../../docs-snippets/src/guide/contracts/read-only-calls.test.ts#read-only-call-1{ts:line-numbers}

## When to use `get()` vs `call()`

<!-- This section should explain when to use the get vs call methods -->
<!-- get_call:example:start -->

`get()`: Appropriate for read-only calls; use this method when calling a function that does not modify the blockchain's state. It is intended for read-only operations, like fetching data from the blockchain without making any changes. Since it doesn't require any gas or transaction fees, `get()` is a more efficient way to access data stored on the blockchain.

`call()`: Appropriate for state-changing calls; use this method when calling a function that modifies the blockchain's state, like transferring funds or updating values. Since these things involve changing the blockchain state, `call()` requires gas and transaction fees to be paid.

<!-- get_call:example:end -->

> **Note:** Although a `get()` call will not modify the blockchain's state and therefore does not require gas; both functions require a spendable input to be set on the transaction for it to be considered valid.