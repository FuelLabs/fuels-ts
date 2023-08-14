# Simulate Transactions

<!-- This section should explain simulate transactions -->
<!-- simulate:example:start -->

Simulating a transaction is a powerful feature that allows you to validate whether a given transaction meets its requirements without modifying the blockchain. It's a safe way to ensure that a transaction will behave as expected without spending any real resources.

You can use the `simulate()` method to test your transactions:

<<< @/../../docs-snippets/src/guide/contracts/simulate-transactions.test.ts#simulate-transactions-1{ts:line-numbers}

Simulating a transaction allows you to catch potential errors or issues before submitting the real transaction, making it a valuable tool for development and user interaction.

<!-- simulate:example:end -->

## Read-only Calls Using `simulate()`

<!-- This section should explain read-only calls -->
<!-- read:example:start -->

When interacting with a contract, you might want to execute a method that does not change the state of the blockchain—for example, reading a value from storage without modifying it.

In such cases, you can use the `simulate()` method:

<<< @/../../docs-snippets/src/guide/contracts/simulate-transactions.test.ts#simulate-transactions-2{ts:line-numbers}

Using `simulate()` for read-only calls or to test transactions provides a way to safely and efficiently access information from the blockchain or validate how a transaction would behave. It ensures that no changes will be made to the blockchain and no resources will be spent, making it a valuable tool for data retrieval and development.

<!-- read:example:end -->

## When to use `simulate()` vs `call()`

<!-- This section should explain when to use the simulate vs call methods -->
<!-- simulate_call:example:start -->

`simulate()`: Suitable for both read-only calls and testing transactions that could modify the blockchain's state, this method allows you to safely validate how functions will behave without making changes. It's a robust validation, development, and data retrieval utility method, providing confidence in your transactions and interactions with the blockchain.

`call()`: Use this method when calling a function that modifies the blockchain's state, such as transferring funds or updating values. Remember that if you use `call()` on a contract method that changes the blockchain state, it _**will**_ spend your resources.

<!-- simulate_call:example:end -->

---

It is worth noting that while `call()` can be used to execute read-only contract methods without spending resources, it's recommended to use `simulate()` for such calls. Using `simulate()` guarantees that no resources will be spent even if you accidentally execute a contract method that would typically change the blockchain. This additional safeguard makes `simulate()` preferable for read-only interactions.

> **Note:** Although a `simulate()` call won't modify the blockchain's state and does not spend resources, the transaction must still meet its requirements to be considered valid.
