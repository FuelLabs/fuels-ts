# Simulate Transactions

<!-- This section should explain simulate transactions -->
<!-- simulate:example:start -->

Simulating a transaction allows you to validate whether a specific contract call meets its requirements without making any changes to the blockchain.

`simulate()` is a read-only call that does not spend resources. It provides a safe way to access information from the contract, validate how a contract function would behave, and check if the wallet has sufficient resources to cover the transaction fee.

<<< @/../../docs-snippets/src/guide/contracts/simulate-transactions.test.ts#simulate-transactions-1{ts:line-numbers}

<!-- simulate:example:end -->

## Validating if the wallet has enough resources

<!-- This section should explain read-only calls -->
<!-- read:example:start -->

When interacting with a contract, you may need to verify if the wallet has sufficient resources to cover the transaction fee.

This includes ensuring that the wallet has enough resources to cover any amount that may be forwarded to the contract call.

`simulate()` is the appropriate method to use in this case, as it always requires a funded wallet for execution.

<<< @/../../docs-snippets/src/guide/contracts/simulate-transactions.test.ts#simulate-transactions-2{ts:line-numbers}

<!-- TODO: add get doc page link -->

If you want to dry-run a contract call without a funded wallet or even without a wallet at all, please use the `get` method.

<!-- read:example:end -->

## When to use `simulate()` vs `get()` vs `call()`

<!-- This section should explain when to use the get vs simulate vs call methods -->
<!-- simulate_call:example:start -->

`simulate()`: Suitable for both read-only calls and testing calls that could modify the blockchain's state. It not only validates how contract functions will behave but also ensures that the wallet has sufficient resources to meet the requirements of the contract call.

`get()`: Suitable for both read-only calls and testing calls that could modify the blockchain's state. It can be executed without a wallet or even with an unfunded wallet, making it a versatile method for interacting with the contract.

`call()`: This method is used to submit the contract call transaction to the node. It should be used for write operations such as transferring funds or updating values. It's important to note that using `call()` _**will**_ consume your resources.

<!-- simulate_call:example:end -->

---

While `call()` can be used to execute read-only contract methods, it is generally recommended to use `simulate()` for such calls to ensure no resources are unintentionally spent.

This additional safeguard makes `simulate()` preferable for read-only interactions.

> **Note:** Although a `simulate()` call won't modify the blockchain's state and does not spend resources, the transaction must still meet its requirements to be considered valid, this includes using a wallet that has enough resources to pay for the transaction fees.
