# Deploying Scripts

In order to optimize the cost of your recurring script executions, we recommend first deploying your script. This can be done using the [Fuels CLI](../fuels-cli/index.md) and running the [deploy command](../fuels-cli/commands.md#fuels-deploy).

By deploying the script, its bytecode is stored on chain as a blob. The SDK will then produce bytecode that can load the blob on demand to execute the original script. This far reduces the repeat execution cost of the script.

## How to Deploy a Script

To deploy a script, we can use the [Fuels CLI](../fuels-cli/index.md) and execute the [deploy command](../fuels-cli/commands.md#fuels-deploy).

This will perform the following actions:

1. Compile the script using your `forc` version
1. Deploy the built script binary to the chain as a blob
1. Generate a script that loads the blob that can be used to execute the script
1. Generate types for both the script and the loader that you can use in your application

We can then utilize the above generated types like so:

<<< @/../../docs-snippets/src/guide/scripts/deploying-scripts.test.ts#deploying-scripts{ts:line-numbers}
