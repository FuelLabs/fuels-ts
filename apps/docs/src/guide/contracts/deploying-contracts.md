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

To deploy the contract, instantiate the [`ContractFactory`](../../api/Contract/ContractFactory.md) with the bytecode, ABI, and wallet. Then, call the `deployContract` method. This method resolves as soon as the transaction to deploy the contract is submitted and returns two objects: a `TransactionResponse` and a `Contract` instance.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-3{ts:line-numbers}

**Important**: The contract instance can only be safely used after the promise from `transactionResponse.waitForResult` is resolved. To avoid blocking your code, attach this promise to a hook or listener that awaits it to ensure you don't use the contract before its deployment finishes.

You can also call `deployContract` in a way that waits for the transaction execution by using the `awaitExecution` flag.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-5{ts:line-numbers}

## 5. Executing a Contract Call

Now that the contract is deployed, you can interact with it. In the following steps, you'll learn how to execute contract calls.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-4{ts:line-numbers}

For a more comprehensive TypeScript-backed Fuel usage, learn how to [generate types from ABI](../fuels-cli/generating-types.md)
