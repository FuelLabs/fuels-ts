<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const url = `https://fuellabs.github.io/sway/v${forc}/book/introduction/index.html`
</script>

# Deploying contracts

There are two main ways of working with contracts in the SDK: deploying a new contract or interacting with existing contracts.

This guide will walk you through the process of deploying a contract using the SDK, including loading contract artifacts, initializing a contract factory, and deploying the contract.

1. Obtaining Contract Artifacts

After writing a contract in Sway and compiling it with `forc build` (<a :href="url" target="_blank" rel="noreferrer">read more</a> on how to work with Sway), you will obtain two important artifacts: the compiled binary file and the JSON ABI file. These files are required for deploying a contract using the SDK.

2. Setting up the SDK Environment

Before deploying a contract, set up the necessary environment by importing the required SDK components and initializing a wallet and a provider.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-step-2{ts:line-numbers}

3. Loading Contract Artifacts

Load the contract bytecode and JSON ABI, generated from the Sway source, into the SDK.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-step-3{ts:line-numbers}

4. Deploying the Contract

Initialize a ContractFactory with the bytecode, ABI, and wallet. Deploy the contract and use its methods.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-step-4{ts:line-numbers}

5. And finally we can execute a contract call

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-step-5{ts:line-numbers}

For richer TypeScript-backed Fuel usage, learn how to [generate types from ABI](../abi-typegen/generating-types-from-abi.md)
