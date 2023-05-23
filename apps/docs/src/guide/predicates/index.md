<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const url = `https://fuellabs.github.io/sway/v${forc}/book/introduction/index.html`
</script>

# Predicates

Predicates in Sway are specific types of programs that return a boolean value. Since they are pure functions, they do not produce side effects.

## Instantiating predicates

A predicate can be as simple as the following:

<<< @/../../docs-snippets/projects/return-true-predicate/src/main.sw#predicate-index-1{rust:line-numbers}

In this minimal example, the `main` function does not accept any parameters and simply returns true.

Just like contracts in Sway, once you've created a predicate, you can compile it using `forc build`. For more information on working with Sway, refer to our <a :href="url" target="_blank" rel="noreferrer">Sway documentation</a>.

After compiling, you will obtain the binary of the predicate and its JSON ABI (Application Binary Interface). Using these, you can instantiate a predicate as shown in the code snippet below:

<<< @/../../docs-snippets/src/guide/predicates/index.test.ts#predicate-index-2{ts:line-numbers}

The created `Predicate` instance, among other things, has two important properties: the predicate `bytes` (byte code) and the predicate `address`.

This address, generated from the byte code, corresponds to the Pay-to-Script-Hash (P2SH) address used in Bitcoin.

## Working with Predicates

Users can send assets to the predicate address as they would to any other address on the blockchain. To spend funds stored at the predicate address, users must provide the original byte code of the predicate and, at times, the predicate data as well.

The predicate data is related to the parameters received by the predicate's `main` function. This data comes into play during the byte code's execution. If the `main` function does not have any parameters, there is no data to be provided, therefore, we do not provide the predicate data.

If the predicate is validated successfully, the funds will be accessible. Otherwise, the SDK will throw a validation error.

In the next section, we provide a step-by-step guide on how to interact with a predicate to validate your transactions.
