# Connecting to a Local Node

Firstly, you will need a local node running on your machine. We recommend one of the following methods:

- [Testing utilities](../testing/launching-a-test-node.md) can assist in programmatically launching a short-lived node.
- Running [fuel-core](https://docs.fuel.network/guides/running-a-node/running-a-local-node/) directly.

In the following example, we create a provider to connect to the local node and sign a message.

<<< @./snippets/connecting-to-localnode.ts#main{ts:line-numbers}
