<script setup>
  import { data } from '../../versions.data'
  const { sway } = data
  const url = `https://fuellabs.github.io/sway/v${sway}/book/introduction/index.html`
</script>

# Deploying contracts

There are two main ways of working with contracts in the SDK: deploying a contract with SDK or using the SDK to interact with existing contracts.

## Deploying a contract binary

Once you've written a contract in Sway and compiled it with `forc build` (read <a :href="url" target="_blank" rel="noreferrer">here</a> for more on how to work with Sway), you'll have in your hands two important artifacts: the compiled binary file and the JSON ABI file.

Below is how you can deploy your contracts using the SDK. For more details about each component in this process, read about [the FuelVM binary file](./the-fuelvm-binary-file.md) and [the JSON ABI file](../abi-typegen/).

### The deploy functions

If you are only interested in a single instance of your contract, then use `deploy`

<<< @/../../../packages/fuel-gauge/src/contract-factory.test.ts#contract-setup{ts:line-numbers}

You can then use the contract methods very simply:

```ts:line-numbers
const contact = await factory.deployContract();
```

Also read about how to [generate-contract-types-from-abi](../abi-typegen/generate-contract-types-from-abi.md), allowing for rich TypeScript backed Fuel usage.
