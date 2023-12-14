<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const indexUrl = `https://docs.fuel.network/docs/sway/introduction/`
  const jsonAbiUrl = `https://docs.fuel.network/docs/sway/introduction/sway_quickstart/`
</script>

# Deploying Contracts

This guide walks you through deploying a contract using the SDK, covering loading contract artifacts, initializing a contract factory, and deploying the contract.

## 1. Obtaining Contract Artifacts

After writing a contract in Sway and compiling it with `forc build` (<a :href="indexUrl" target="_blank" rel="noreferrer">read more</a> on how to work with Sway), you will obtain two important artifacts: the compiled binary file and the JSON ABI file. These files are required for deploying a contract using the SDK.

## 2. Setting up the SDK Environment

Before deploying a contract, set up the necessary environment by importing the required SDK components and initializing a wallet and a provider.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-1{ts:line-numbers}

## 3. Loading Contract Artifacts

Load the contract bytecode and JSON ABI, generated from the Sway source, into the SDK.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-2{ts:line-numbers}

## 4. Deploying the Contract

Initialize a `ContractFactory` with the bytecode, ABI, and wallet. Deploy the contract and use its methods.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-3{ts:line-numbers}

## 5. Executing a Contract Call

Now that the contract is deployed, you can interact with it. In the following steps, you'll learn how to execute contract calls.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-4{ts:line-numbers}

For a more comprehensive TypeScript-backed Fuel usage, learn how to [generate types from ABI](../abi-typegen/generating-types-from-abi.md)
