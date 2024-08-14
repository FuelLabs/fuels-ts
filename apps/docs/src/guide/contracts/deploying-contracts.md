<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const indexUrl = `https://docs.fuel.network/docs/sway/introduction/`
  const jsonAbiUrl = `https://docs.fuel.network/docs/sway/introduction/sway_quickstart/`
</script>

# Deploying Contracts

To deploy a contract using the SDK, you can use the `ContractFactory`. This process involves collecting the contract artifacts, initializing the contract factory, and deploying the contract.

The SDK utilizes two different deployment processes, depending on the contract's size. The threshold for the contract size is dictated by the chain and can be queried:

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#get-contract-max-size{ts:line-numbers}

It either uses a single create transaction to deploy the entire contract bytecode, or it splits the contract bytecode into multiple chunks, deploys them as blobs (on chain data accessible to the VM), and then generates a contract from the associated blob IDs. That generated contract is then deployed as a create transaction.

The `ContractFactory` offers the following methods for the different processes:

- `deploy` for deploying contacts of any size (will automatically choose the appropriate deployment process).
- `deployAsCreateTx` for deploying the entire contract bytecode in a single create transaction.
- `deployAsBlobTx` for deploying the contract in chunks as blobs, and then deploying the contract as a create transaction.

> **Note:** If the contract is deployed via blob deployments, multiple transactions will be required to deploy the contract.

## Deploying a Contract Guide

This guide will cover the process of deploying a contract using the `deploy` method, however all these methods can be used interchangeably dependent on the contract size. In the guide we use a contract factory that has been built using [Typegen](../fuels-cli/abi-typegen.md). This tool provided by the [Fuels CLI](../fuels-cli/index.md) provides a better developer experience and end to end type support for your smart contracts.

### 1. Setup

After writing a contract in Sway you can build the necessary deployment artifacts either by running `forc build` (<a :href="indexUrl" target="_blank" rel="noreferrer">read more</a> on how to work with Sway) or by using the [Fuels CLI](../fuels-cli/index.md) and running `fuels build` using your chosen package manager. We recommend using the Fuels CLI as it provides a more comprehensive usage including end to end type support.

Once you have the contract artifacts, it can be passed to the `ContractFactory` for deployment, like so:

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#setup{ts:line-numbers}

### 2. Contract Deployment

As mentioned earlier, there are two different processes for contract deployment handled by the `ContractFactory`. These can be used interchangeably, however, the `deploy` method is recommended as it will automatically choose the appropriate deployment process based on the contract size.

This call resolves as soon as the transaction to deploy the contract is submitted and returns three items: the `contractId`, a `waitForTransactionId` function and a `waitForResult` function.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#deploy{ts:line-numbers}

The `contract` instance will be returned only after calling `waitForResult` and waiting for it to resolve. To avoid blocking the rest of your code, you can attach this promise to a hook or listener that will use the contract only after it is fully deployed. Similarly, the transaction ID is only available once the underlying transaction has been funded. To avoid blocking the code until the ID is ready, you can use the `waitForTransactionId` function to await it's retrieval.

### 3. Executing a Contract Call

Now that the contract is deployed, you can interact with it by submitting a contract call:

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#call{ts:line-numbers}

## Deploying a Large Contract as Blobs

In the above guide we use the recommended `deploy` method. If you are working with a contract that is too large to be deployed in a single transaction, then the SDK will chunk the contract for you and submit it as blobs, to then be accessed later by a create transaction. This process is handled by the `deployAsBlobTx` method, also available on the `ContractFactory` should you want to use that directly.

<<< @/../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#blobs{ts:line-numbers}

In the above example, we also pass a `chunkSizeMultiplier` option to the deployment method. The SDK will attempt to chunk the contract to the most optimal about, however the transaction size can fluctuate and you can also be limited by request size limits against the node. By default we set a multiplier of 0.95, meaning the chunk size will be 95% of the potential maximum size, however you can adjust this to suit your needs and ensure the transaction passes. It must be set to a value between 0 and 1.

> **Note:** Deploying large contracts using blob transactions will take more time. Each transaction is dependent and has to wait for a block to be produced before it gets mined. Then a create transaction is submitted as normal. So you will need to wait longer than usual for the contract to be fully deployed and can be interacted with.