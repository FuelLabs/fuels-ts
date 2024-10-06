# Deploying Predicates

In order to optimize the cost of your recurring predicate executions, we recommend first deploying your predicate. This can be done using the [Fuels CLI](../fuels-cli/index.md) and running the [deploy command](../fuels-cli/commands#fuels-deploy).

By deploying the predicate, it's bytecode is stored on chain as a blob. The SDK will then produce bytecode that can load the blob on demand that can execute the predicate. This far reduces the repeat execution cost of the predicate.

## How to Deploy a Predicate

To deploy a predicate, we can use the [Fuels CLI](../fuels-cli/index.md) and execute the [deploy command](../fuels-cli/commands#fuels-deploy).

This will perform the following actions:

1. Compile the script using your `forc` version
1. Deploys the built script binary to the chain as a blob
1. Generates a script that loads the blob that can be used to execute the script
1. Generates types for both the script and the loader that you can use in your application

We can then utilize the above generated types like so:

<<< @/../../docs-snippets/src/guide/predicates/deploying-predicates.test.ts#deploying-predicates{ts:line-numbers}
