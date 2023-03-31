# Read-only calls

Sometimes you want to call a contract method that does not change the state of the blockchain. For instance, a method that only _reads_ a value from storage and returns it without making any changes to storage.

In this case, there is no need to create an actual blockchain transaction; you only want to read a value quickly.

You can do this with the SDK. Instead of `.call()`ing the method, use `.get()`:

<<< @/../../../packages/fuel-gauge/src/contract.test.ts#Contract-read-only-call{ts:line-numbers}

`get()` doesn't take funding, as it is a read-only call that doesn't alter the chain state.

If you want to dry run a transaction call that takes funding without altering the chain state, use `dryRun()`.

## When to use `get()` vs `call()`

Anytime you want to call a method that does _not_ change the state of the blockchain, use `get()`. If you want to call a method that _does_ change the state of the blockchain, use `call()`.

`get()` is intended to be used only for read-only calls.
