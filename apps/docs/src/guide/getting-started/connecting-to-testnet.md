# Connecting to Testnet

The **Testnet** is a public network that allows you to interact with a Fuel Virtual Machine and is used for testing and development purposes.

> [!NOTE] Latest Testnet
> Dev Testnet
>
> `https://testnet.fuel.network/v1/graphql`

We have some useful resources for the Testnet:

- [**Faucet**](https://faucet-testnet.fuel.network/) - for funding wallets that have been created.
- [**Explorer**](https://app.fuel.network/) - for viewing transactions and blocks.
- [**GraphQL Playground**](https://testnet.fuel.network/v1/playground) - for testing GraphQL queries and mutations.

---

In the example below, we connect a [Provider](../provider/index.md) to the latest testnet and create a new wallet from a private key.

> **Note:** New wallets on the Testnet will not have any assets! You can use the [Faucet](https://faucet-testnet.fuel.network/) to fund your wallet.

<<< @/../../docs/src/snippets/introduction/connecting-to-testnet.ts#main{ts:line-numbers}
