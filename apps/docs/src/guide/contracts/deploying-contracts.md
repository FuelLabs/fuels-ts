<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const indexUrl = `https://docs.fuel.network/docs/sway/introduction/`
  const jsonAbiUrl = `https://docs.fuel.network/docs/sway/introduction/sway_quickstart/`
</script>

# Deploying Contracts

There are two ways to deploy a contract to the Fuel network:

1. **CLI deployment** — Using the [Fuels CLI](../fuels-cli/index.md) via `fuels deploy`
2. **Dynamic deployment** — Programmatically using the [`ContractFactory`](DOCS_API_URL/classes/_fuel_ts_contract.index.ContractFactory.html)

Both approaches produce the same on-chain result, but serve different use cases. CLI deployment is best for standard workflows integrated with `fuels build` and `fuels deploy`, while dynamic deployment gives you full programmatic control over the deployment process.

## The Sway Contract

Before deploying, you need a Sway contract. Here's a simple example:

<<< @/../../sway/my-contract/src/main.sw#full{rust:line-numbers}

After writing your contract, compile it by running `forc build` (<a :href="indexUrl" target="_blank" rel="noreferrer">read more</a> on how to work with Sway) or by using the [Fuels CLI](../fuels-cli/index.md) with `fuels build`.

## CLI Deployment

The simplest way to deploy a contract is via the [Fuels CLI](../fuels-cli/index.md) using the [`fuels deploy`](../fuels-cli/commands.md#fuels-deploy) command. This will:

1. Build the contract using your configured `forc` version
2. Deploy the compiled contract to the network
3. Generate TypeScript types you can use in your application

For more information on configuring CLI deployment, see the [Fuels CLI documentation](../fuels-cli/commands.md#fuels-deploy).

## Dynamic Deployment

To deploy a contract programmatically, you can use the `ContractFactory`. This approach is useful when you need to deploy contracts at runtime or want fine-grained control over the deployment process.

The SDK utilizes two different deployment processes, depending on the contract's size. The threshold for the contract size is dictated by the chain and can be queried:

<<< @./snippets/deploying-contracts/get-max-size.ts#full{ts:line-numbers}

It either uses a single create transaction to deploy the entire contract bytecode, or it splits the contract bytecode into multiple chunks, deploys them as blobs (on chain data accessible to the VM), and then generates a contract from the associated blob IDs. That generated contract is then deployed as a create transaction.

The `ContractFactory` offers the following methods for the different processes:

- `deploy` for deploying contacts of any size (will automatically choose the appropriate deployment process).
- `deployAsCreateTx` for deploying the entire contract bytecode in a single create transaction.
- `deployAsBlobTx` for deploying the contract in chunks as blobs, and then deploying the contract as a create transaction.

> **Note:** If the contract is deployed via blob deployments, multiple transactions will be required to deploy the contract.

### 1. Setup

In the guide we use a contract factory that has been built using [Typegen](../fuels-cli/abi-typegen.md). This tool provided by the [Fuels CLI](../fuels-cli/index.md) provides a better developer experience and end to end type support for your smart contracts.

Once you have the contract artifacts, it can be passed to the `ContractFactory` for deployment, like so:

<<< @./snippets/deploying-contracts/deployment.ts#setup{ts:line-numbers}

### 2. Contract Deployment

The `deploy` method is recommended as it will automatically choose the appropriate deployment process based on the contract size.

This call resolves as soon as the transaction to deploy the contract is submitted and returns three items: the `contractId`, a `waitForTransactionId` function and a `waitForResult` function.

<<< @./snippets/deploying-contracts/deployment.ts#deploy{ts:line-numbers}

The `contract` instance will be returned only after calling `waitForResult` and waiting for it to resolve. To avoid blocking the rest of your code, you can attach this promise to a hook or listener that will use the contract only after it is fully deployed. Similarly, the transaction ID is only available once the underlying transaction has been funded. To avoid blocking the code until the ID is ready, you can use the `waitForTransactionId` function to await it's retrieval.

### 3. Executing a Contract Call

Now that the contract is deployed, you can interact with it by submitting a contract call:

<<< @./snippets/deploying-contracts/deployment.ts#call{ts:line-numbers}

## Deploying a Large Contract as Blobs

In the above guide we use the recommended `deploy` method. If you are working with a contract that is too large to be deployed in a single transaction, then the SDK will chunk the contract for you and submit it as blobs, to then be accessed later by a create transaction. This process is handled by the [`ContractFactory.deployAsBlobTx`](DOCS_API_URL/classes/_fuel_ts_contract.index.ContractFactory.html#deployAsBlobTx) method.

<<< @./snippets/deploying-contracts/deployment.ts#blobs{ts:line-numbers}

In the above example, we also pass a `chunkSizeMultiplier` option to the deployment method. The SDK will attempt to chunk the contract to the most optimal about, however the transaction size can fluctuate and you can also be limited by request size limits against the node. By default we set a multiplier of 0.95, meaning the chunk size will be 95% of the potential maximum size, however you can adjust this to suit your needs and ensure the transaction passes. It must be set to a value between 0 and 1.

> **Note:** Deploying large contracts using blob transactions will take more time. Each transaction is dependent and has to wait for a block to be produced before it gets mined. Then a create transaction is submitted as normal. So you will need to wait longer than usual for the contract to be fully deployed and can be interacted with.

## Next Steps

Once your contract is deployed, you can connect to it without redeploying. See [Managing Deployed Contracts](./managing-deployed-contracts.md) for how to interact with already-deployed contracts using just a contract ID and ABI.
