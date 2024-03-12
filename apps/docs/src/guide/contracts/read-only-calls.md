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

The `get` method can also be used without a wallet.

<<< @/../../docs-snippets/src/guide/contracts/read-only-calls.test.ts#read-only-calls-3{ts:line-numbers}

## The method `get()` does not write on the blockchain

It is important to be aware that, while `get` can be used to dry-run contract calls that are performing write operations within the blockchain, it does not actually change its state.

Take a look into the following contract snippet:

<<< @/../../docs-snippets/test/fixtures/forc-projects/counter/src/main.sw#read-only-calls-5{rs:line-numbers}

This contract have a storage property named `counter`, and it is initialized with `0`.

The function `increment_count` can be used to increment the `counter` value, and `get_count` can be used to get its current value.

It is possible to use `get` to dry-run a call for the `increment_count` function:

<<< @/../../docs-snippets/src/guide/contracts/read-only-calls.test.ts#read-only-calls-6{ts:line-numbers}

The dry-run returns the incremented value, but the real `counter` value remains the same because everything happened on the context of a dry-run transaction.

We can validate that `counter` was never really modified:

<<< @/../../docs-snippets/src/guide/contracts/read-only-calls.test.ts#read-only-calls-7{ts:line-numbers}

The `counter` value it is only modified when we actually execute a real transaction:

<<< @/../../docs-snippets/src/guide/contracts/read-only-calls.test.ts#read-only-calls-8{ts:line-numbers}
