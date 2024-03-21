# Connecting to a Fuel node

At a high level, you can use the Fuel TypeScript SDK to build applications that can run computations on the Fuel Virtual Machine through interactions with smart contracts written in Sway.

For this interaction to work, the SDK must be able to communicate with a `fuel-core` node; you have two options at your disposal:

1. Use the [Testnet](../providers/connecting-to-testnet.md)
2. [Run a local Fuel-Core node](https://docs.fuel.network/guides/running-a-node/) and instantiate a provider that points to that node's IP and port

For application building, you should use the first option.

The second option is ideal for smart contract testing, as you can quickly spin up and tear down nodes between specific test cases.
