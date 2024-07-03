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

To deploy the contract, instantiate the [`ContractFactory`](../../api/Contract/ContractFactory.md) with the bytecode, ABI, and wallet. Then, call the `deployContract` method. This method returns a promise that will resolve to a `Contract` instance, ready to be used to interact with the deployed smart contract.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-3{ts:line-numbers}

The `deployContract` method resolves only after the deploy contract transaction has been processed and the smart contract is deployed on the blockchain. This process can take several seconds and will block any subsequent code execution.

If this blocking is not suitable for your dApp, you can use the `deployContractAsync` method.

## 5. Deploying the Contract Asynchronously

In some cases, you may not want to wait for the deploy contract transaction to finish processing. In these instances, you can use `deployContractAsync`. This method resolves as soon as the transaction to deploy the contract is submitted and returns three things:

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-4{ts:line-numbers}

The `contract` instance will be returned only after calling `waitForDeploy` and waiting for it to resolve. To avoid blocking the rest of your code, you can attach this promise to a hook or listener that will use the contract only after it is fully deployed.

## 6. Executing a Contract Call

Now that the contract is deployed, you can interact with it. In the following steps, you'll learn how to execute contract calls.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-5{ts:line-numbers}

For a more comprehensive TypeScript-backed Fuel usage, learn how to [generate types from ABI](../fuels-cli/generating-types.md)
