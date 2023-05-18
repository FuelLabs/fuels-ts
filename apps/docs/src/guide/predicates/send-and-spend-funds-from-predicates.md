# Send And Spend Funds From Predicates

Predicates can be used to validate transactions. This implies that a predicate can safeguard assets, only allowing their transfer if the predicate conditions are met.

This guide will demonstrate how to send and spend funds using a predicate.

## Predicate Example

Consider the following predicate:

<<< @/../../docs-snippets/projects/validate-signature-predicate/src/main.sw#send-and-spend-funds-from-predicates-1{rust:line-numbers}

This predicate accepts three signatures and checks each one against a predefined public key.

The `ec_recover_address` function is used to recover the public key from the signatures.

If at least two of the three extracted public keys match the predefined keys, the funds can be spent. Note that the order of the signatures must match the order of the predefined keys.

## Using SDK to Interact with Predicate

We will use the SDK to interact with the predicate. First, we'll create three wallets with specific keys.

<<< @/../../docs-snippets/src/guide/predicates/send-and-spend-funds-from-predicates.test.ts#send-and-spend-funds-from-predicates-2{ts:line-numbers}

Next, we'll add funds to these wallets.

<<< @/../../docs-snippets/src/guide/predicates/send-and-spend-funds-from-predicates.test.ts#send-and-spend-funds-from-predicates-3{ts:line-numbers}

After adding funds, we can instantiate a new predicate and send funds to it.

<<< @/../../docs-snippets/src/guide/predicates/send-and-spend-funds-from-predicates.test.ts#send-and-spend-funds-from-predicates-4{ts:line-numbers}

The transferred funds are now locked by the predicate and can only be transferred again if the predicate verifies its predefined condition has been satisfied, denoted by a return value of true.

To spend the funds now locked in the predicate, we must provide at least two of the three signatures whose public keys match the predefined keys in the predicate.

<<< @/../../docs-snippets/src/guide/predicates/send-and-spend-funds-from-predicates.test.ts#send-and-spend-funds-from-predicates-5{ts:line-numbers}

After generating the signatures, we can send a transaction to spend the predicate funds.

<<< @/../../docs-snippets/src/guide/predicates/send-and-spend-funds-from-predicates.test.ts#send-and-spend-funds-from-predicates-6{ts:line-numbers}
