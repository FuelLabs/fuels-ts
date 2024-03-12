# Read Only Calls

When interacting with a contract, you may need to validate if a contract function behaves as intended without spending any real resources.

The `get()` method can be used for this purpose.

## Read-only Calls Using `get()`

The `get` method allows you to dry-run a contract call to validate its intended behavior.

It can be used to read a contract state or retrieve a returned value from a contract function without executing a real transaction.

Here's an example of using the `get` method:

<<< @/../../docs-snippets/src/guide/contracts/read-only-calls.test.ts#read-only-calls-1{ts:line-numbers}

It can be used with a wallet that has no funds available:

<<< @/../../docs-snippets/src/guide/contracts/read-only-calls.test.ts#read-only-calls-2{ts:line-numbers}

The `get` method can also be used without a wallet to perform read-only calls.

<<< @/../../docs-snippets/src/guide/contracts/read-only-calls.test.ts#read-only-calls-3{ts:line-numbers}
