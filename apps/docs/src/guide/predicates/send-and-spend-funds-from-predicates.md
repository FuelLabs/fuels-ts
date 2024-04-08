# Send And Spend Funds From Predicates

Predicates can be used to validate transactions. This implies that a predicate can safeguard assets, only allowing their transfer if the predicate conditions are met.

This guide will demonstrate how to send and spend funds using a predicate.

## Predicate Example

Consider the following predicate:

<<< @/../../docs-snippets/test/fixtures/forc-projects/simple-predicate/src/main.sw#send-and-spend-funds-from-predicates-1{rust:line-numbers}

This predicate accepts an address of type `b256` and compares it with a hard-coded address of the same type. If both addresses are equal, the predicate returns true, otherwise it will return false.

## Interacting with the Predicate Using SDK

Let's use the above predicate to validate our transaction.

Once you've compiled the predicate (`forc build`), you'll obtain two important artifacts: the JSON ABI and the predicate's binary code. These are needed to instantiate a new predicate.

This is where we also pass in the predicate's data. Note that the `main` function in our predicate example requires a parameter called `input_address` of type `b256`. We will pass this parameter to the `Predicate` constructor along with the bytecode and the JSON ABI.

<<< @/../../docs-snippets/src/guide/predicates/send-and-spend-funds-from-predicates.test.ts#send-and-spend-funds-from-predicates-2{ts:line-numbers}

> Note: If you want to pass in the predicate data _after_ instantiating the `Predicate` or if you want to use a different data than the one passed in the constructor, you will have to create a new `Predicate` instance.

With the predicate instantiated, we can transfer funds to its address. This requires us to have a wallet with sufficient funds. If you're unsure about using wallets with the SDK, we recommend checking out our [wallet](../wallets/) guide.

<<< @/../../docs-snippets/src/guide/predicates/send-and-spend-funds-from-predicates.test.ts#send-and-spend-funds-from-predicates-3{ts:line-numbers}

Now that our predicate holds funds, we can use it to validate a transaction and hence execute our transfer. We can achieve that by doing the following:

<<< @/../../docs-snippets/src/guide/predicates/send-and-spend-funds-from-predicates.test.ts#send-and-spend-funds-from-predicates-5{ts:line-numbers}

Note the method transfer has two parameters: the recipient's address and the intended transfer amount.

Once the predicate resolves with a return value `true` based on its predefined condition, our predicate successfully spends its funds by means of a transfer to a desired wallet.

---

In a similar approach, you can use the `createTransfer` method, which returns a [`ScriptTransactionRequest`](../../api/Account/ScriptTransactionRequest.md). Then, we can submit this transaction request by calling the `sendTransaction` method.

This can be useful if you need the transaction ID before actually submitting it to the node.

<<< @/../../docs-snippets/src/guide/predicates/send-and-spend-funds-from-predicates.test.ts#send-and-spend-funds-from-predicates-8{ts:line-numbers}

## Spending Entire Predicate Held Amount

Trying to forward the entire amount held by the predicate results in an error because no funds are left to cover the transaction fees. Attempting this will result in an error message like:

<<< @/../../docs-snippets/src/guide/predicates/send-and-spend-funds-from-predicates.test.ts#send-and-spend-funds-from-predicates-6{ts:line-numbers}

## Predicate Validation Failure

What happens when a predicate fails to validate? Recall our predicate only validates if the `input_address` matches the hard-coded `valid_address`. Hence, if we set a different data from the `valid_address`, the predicate will fail to validate.

When a predicate fails to validate, the SDK throws an error that starts like this:

<<< @/../../docs-snippets/src/guide/predicates/send-and-spend-funds-from-predicates.test.ts#send-and-spend-funds-from-predicates-7{ts:line-numbers}

## Pre-staging a Transaction

In some cases, you may want to pre-stage a predicate transaction before submitting it for execution. To do this, you can use the `createTransfer` method on the `Predicate` class.

In the following example, we are pre-staging a transaction to be able to know the transaction ID without actually submitting the transaction.

<<< @/../../docs-snippets/src/guide/predicates/send-and-spend-funds-from-predicates.test.ts#predicates-prestage-transaction{ts:line-numbers}
