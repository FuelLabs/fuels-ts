# Deploying Scripts

In order to optimize the cost of your recurring script executions, we recommend first deploying your script. Deploying stores the script bytecode on chain as a blob, and the SDK produces bytecode that loads the blob on demand. This far reduces the repeat execution cost of the script.

There are two ways to deploy a script:

1. **CLI deployment** — Using the [Fuels CLI](../fuels-cli/index.md) via [`fuels deploy`](../fuels-cli/commands.md#fuels-deploy)
2. **Dynamic deployment** — Programmatically using the `deploy` method on a script instance

## The Sway Script

Here's an example script written in Sway:

<<< @/../../sway/script-sum/src/main.sw#script-with-configurable-contants-1{rust:line-numbers}

## CLI Deployment

The simplest way to deploy a script is via the [Fuels CLI](../fuels-cli/index.md) using the [`fuels deploy`](../fuels-cli/commands.md#fuels-deploy) command. This will:

1. Compile the script using your `forc` version
1. Deploy the built script binary to the chain as a blob
1. Generate a script that loads the blob that can be used to execute the script
1. Generate types for both the script and the loader that you can use in your application

## Dynamic Deployment

You can also deploy a script programmatically using the `deploy` method directly on a script instance. This is useful for runtime deployments or when you need more control over the process.

The following example demonstrates deploying the script dynamically and then using the generated loader types:

<<< @./snippets/deploying-scripts.ts#deploying-scripts{ts:line-numbers}
