# Transactions with Multiple Signers

When a transaction contains a spendable input such as a coin, it must also contain the signature of the coin owner for it to be spent. If the coin owner is also submitting the transaction, then this is straightforward. However, if an external address is required to sign the transaction, then the transaction must contain multiple signatures. Within the SDK, an account signature can be added to a transaction by calling `addAccountWitnesses` on the transaction request.

Consider a script that requires two signatures to be spent:

<<< @/../../docs/sway/script-signing/src/main.sw#multiple-signers-1{rust:line-numbers}

In the snippet above, we use the built-in Sway function `tx_witness_data()` to retrieve the witness signatures and `tx_id()` for the transaction hash. Then, we retrieve the signing address to validate the script.

We would interact with this script in the SDK by creating a transaction request from an invocation scope. The same can be done for a contract. Consider the following script:

<<< @./snippets/signing-transactions/script.ts#multiple-signers-2{ts:line-numbers}

The same approach can be used for a predicate by instantiating it and adding it to a transaction request. Consider the following predicate:

<<< @/../../docs/sway/predicate-signing/src/main.sw#multiple-signers-3{rust:line-numbers}

We can interact with this predicate in the SDK with the following implementation:

<<< @./snippets/signing-transactions/predicate.ts#multiple-signers-4{ts:line-numbers}
