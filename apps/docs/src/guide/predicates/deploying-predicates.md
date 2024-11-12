# Deploying Predicates

In order to optimize the cost of your recurring predicate executions, we recommend first deploying your predicate. This can be done using the [Fuels CLI](../fuels-cli/index.md) and running the [deploy command](../fuels-cli/commands.md#fuels-deploy).

By deploying the predicate, its bytecode is stored on chain as a blob. The SDK will then produce bytecode that can load the blob on demand to execute the original predicate. This far reduces the repeat execution cost of the predicate.

## How to Deploy a Predicate

To deploy a predicate, we can use the [Fuels CLI](../fuels-cli/index.md) and execute the [deploy command](../fuels-cli/commands.md#fuels-deploy).

This will perform the following actions:

1. Compile the predicate using your `forc` version
1. Deploy the built predicate binary to the chain as a blob
1. Generate a new, smaller predicate that loads the deployed predicate's blob
1. Generate types for both the predicate and the loader that you can use in your application

We can then utilize the above generated types like so:

<<< @/../../docs-snippets2/src/predicates/deploying-predicates.ts#full{ts:line-numbers}
