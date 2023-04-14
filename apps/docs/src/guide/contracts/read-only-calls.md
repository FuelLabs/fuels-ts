# Read-only Calls

When interacting with a contract, you might want to call a method that does not change the state of the blockchain. For example, a method that reads a value from storage and returns it without modifying the storage.

In such cases, there's no need to create an actual blockchain transaction; you only want to read a value quickly. You can achieve this using the `.get()` method:

<<< @/../../docs-snippets/src/guide/contracts/read-only-calls.test.ts#read-only-call-1{ts:line-numbers}

`get()` doesn't take funding, as it is a read-only call that doesn't alter the chain state.

<!-- TODO: review dryRun sentence. Consider creating a new doc page for it as it seems to be a different subject -->

If you want to dry run a transaction call that takes funding without altering the chain state, use `dryRun()`.

## When to use `get()` vs `call()`

Understanding the Difference between `get()` and `call()` Methods:

`get()`: Use this method when calling a function that does not modify the state of the blockchain. It is intended for read-only operations, like fetching data from the blockchain without making any changes. Since it doesn't require any gas or transaction fees, `get()` is a more efficient way to access data stored on the blockchain.

`call()`: Use this method when calling a function that does modify the state of the blockchain. It is intended for state-changing operations, like updating values or adding new entries to the blockchain. Since it involves making changes to the blockchain, `call()` requires gas and transaction fees to be paid.

In summary, choose `get()` for read-only calls and `call()` for state-changing calls.
