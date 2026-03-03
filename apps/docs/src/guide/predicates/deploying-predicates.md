# Deploying Predicates

In order to optimize the cost of your recurring predicate executions, we recommend first deploying your predicate. Deploying stores the predicate bytecode on chain as a blob, and the SDK produces smaller bytecode that loads the blob on demand. This far reduces the repeat execution cost of the predicate.

There are two ways to deploy a predicate:

1. **CLI deployment** — Using the [Fuels CLI](../fuels-cli/index.md) via [`fuels deploy`](../fuels-cli/commands.md#fuels-deploy)
2. **Dynamic deployment** — Programmatically using the `deploy` method on a predicate instance

## The Sway Predicate

Here's an example predicate written in Sway:

<<< @/../../sway/configurable-pin/src/main.sw#full{rust:line-numbers}

## CLI Deployment

The simplest way to deploy a predicate is via the [Fuels CLI](../fuels-cli/index.md) using the [`fuels deploy`](../fuels-cli/commands.md#fuels-deploy) command. This will:

1. Compile the predicate using your `forc` version
1. Deploy the built predicate binary to the chain as a blob
1. Generate a new, smaller predicate that loads the deployed predicate's blob
1. Generate types for both the predicate and the loader that you can use in your application

## Dynamic Deployment

You can also deploy a predicate programmatically using the `deploy` method directly on a predicate instance. This is useful for runtime deployments or when you need more control over the process.

The following example demonstrates both approaches — deploying the predicate dynamically and then using the generated loader types:

<<< @./snippets/deploying-predicates.ts#full{ts:line-numbers}
