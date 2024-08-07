 <script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const indexUrl = `https://docs.fuel.network/docs/sway/introduction/`
  const jsonAbiUrl = `https://docs.fuel.network/docs/sway/introduction/sway_quickstart/`
</script>

# Deploying Contracts

Deploying contracts using the SDK is handled by the `ContractFactory`. The process involves collecting the contract artifacts, initializing the contract factory, and deploying the contract.

The SDK utilizes two different deployment processes. Either simply using a single create transaction to deploy the entire contract bytecode, or, by splitting the contract into multiple chunks, deploying them as blobs (on chain data accessible to the VM) and then generating a contract from the associated blob IDs. That generated contract is then deployed as a create transaction.

The `ContractFactory` offers the following methods for the different processes:

- `deploy` for deploying contacts of any size (will automatically choose the appropriate deployment process).
- `deployContract` for deploying the entire contract bytecode in a single create transaction.
- `deployContractAsBlobs` for deploying the contract in chunks as blobs, and then deploying the contract as a create transaction.

> **Note:** Due to the nature of blob deployments, both `deploy` and `deployContractAsBlobs` may require multiple transactions to deploy the contract.

The deployment process used by the `ContractFactory` is dependent on the size of the contract you are attempting to deploy. The threshold for the contract size is dictated by the chain. You can find the maximum contract size supported by the chain by querying the chains consensus parameters.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#get-contract-max-size{ts:line-numbers}

This guide will cover the process of deploying a contract using the `deploy` method, however all these methods can be used interchangeably dependent on the contract size.

## 1. Setup

After writing a contract in Sway you can build the necessary deployment artifacts either by running `forc build` (<a :href="indexUrl" target="_blank" rel="noreferrer">read more</a> on how to work with Sway) or by using the [Fuels CLI](../fuels-cli/index.md) and running `fuels build` using your chosen package manager. We recommend using the Fuels CLI as it provides a more comprehensive usage including end to end type support.

Once you have the contract artifacts, it can be passed to the `ContractFactory` for deployment, like so:

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#setup{ts:line-numbers}

## 2. Contract Deployment

As mentioned earlier, there are two different processes for contract deployment handled by the `ContractFactory`. These can be used interchangeably, however, the `deploy` method is recommended as it will automatically choose the appropriate deployment process based on the contract size.

This call resolves as soon as the transaction to deploy the contract is submitted and returns three items: the `contractId`, the `transactionId` and a `waitForResult` function.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#deploy{ts:line-numbers}

The `contract` instance will be returned only after calling `waitForResult` and waiting for it to resolve. To avoid blocking the rest of your code, you can attach this promise to a hook or listener that will use the contract only after it is fully deployed.

## 3. Executing a Contract Call

Now that the contract is deployed, you can interact with it by submitting a contract call:

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#call{ts:line-numbers}
