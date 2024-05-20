# Connecting to a Local Node

Firstly, you will need a local node running on your machine. We recommend one of the following methods:

- [Testing utilities](../testing/index.md#launching-a-test-node) can assist in programmatically launching a short-lived node.
- Running [fuel-core](https://docs.fuel.network/guides/running-a-node/running-a-local-node/) directly, or via the CLI [fuels](../fuels-cli/commands.md#fuels-core).

In the following example, we create a provider to connect to the local node and sign a message.

<<< @/../../docs-snippets/src/guide/introduction/getting-started.test.ts#connecting-to-the-local-node{ts:line-numbers}
