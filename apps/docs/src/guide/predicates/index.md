<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const introUrl = `https://fuellabs.github.io/sway/v${forc}/book/introduction/index.html`
  const debugUrl = `https://fuellabs.github.io/sway/v${forc}/book/sway-program-types/predicates.html?#debugging-predicates`
</script>

# Predicates

Predicates in Sway are specific types of programs that return a boolean value, meaning they function like rules that a transaction must follow to be valid.

They don't have access to the information written on the blockchain – they make decisions based solely on the received parameters.

These predicates are pure functions, which means they don't cause any unintended side effects.

The key difference here is that instead of checking these rules directly on the blockchain, we check them 'off' the blockchain first. Once we're confident they're valid, we then record the transaction on the blockchain.

This method is not only more efficient but also helps to prevent traffic jams on the network and makes transactions cheaper. It does so by reducing the need for repetitive calculations on the blockchain.

## Instantiating predicates

A predicate in Sway can be as simple as the following:

<<< @/../../docs-snippets/test/fixtures/forc-projects/return-true-predicate/src/main.sw#predicate-index-1{rust:line-numbers}

In this minimal example, the `main` function does not accept any parameters and simply returns true.

Just like contracts in Sway, once you've created a predicate, you can compile it using `forc build`. For more information on working with Sway, refer to the <a :href="introUrl" target="_blank" rel="noreferrer">Sway documentation</a>.

After compiling, you will obtain the binary of the predicate and its JSON ABI (Application Binary Interface). Using these, you can instantiate a predicate in TypeScript as shown in the code snippet below:

<<< @/../../docs-snippets/src/guide/predicates/index.test.ts#predicate-index-2{ts:line-numbers}

The created [Predicate](../../api/Predicate/Predicate.md) instance, among other things, has three important properties: the predicate `bytes` (byte code), the `chainId`, and the predicate `address`.

This address, generated from the byte code, corresponds to the Pay-to-Script-Hash (P2SH) address used in Bitcoin.

## Working with Predicates

Users can send assets to the predicate address as they would to any other address on the blockchain. To spend funds stored at the predicate address, users must provide the original byte code of the predicate and, if required, the predicate data.

The predicate data relates to the parameters received by the predicate's `main` function. This data comes into play during the byte code's execution. If the `main` function does not have any parameters then there is no data to be provided, therefore we do not provide the predicate data.

If the predicate is validated successfully, the funds will be accessible. Otherwise, the SDK will throw a validation error.

In the next section, we provide a step-by-step guide on how to interact with a predicate to validate your transactions.

## Debugging Predicates

Currently there is no way to <a :href="debugUrl" target="_blank" rel="noreferrer">debug a predicate</a> yet. In the meantime, a practical workaround is to initially write, test, and debug your predicate as a script, which has more debugging tools available. Once it's working as expected, you can then convert it back into a predicate.
