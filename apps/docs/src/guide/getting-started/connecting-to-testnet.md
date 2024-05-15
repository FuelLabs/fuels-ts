# Connecting to Testnet

The **Testnet** is a public network that allows you to interact with a Fuel Virtual Machine and is used for testing and development purposes.

> [!NOTE] Latest Testnet
> Beta 5
>
> `https://beta-5.fuel.network/graphql`

We have some useful resources for the Testnet:

- [**Faucet**](https://faucet-beta-5.fuel.network/) - for funding wallets that have been created.
- [**Explorer**](https://app.fuel.network/) - for viewing transactions and blocks.
- [**GraphQL Playground**](https://beta-5.fuel.network/playground) - for testing GraphQL queries and mutations.

---

In the example below, we connect a [Provider](../provider/index.md) to the latest testnet and create a new wallet from a private key.

> **Note:** New wallets on the Testnet will not have any assets! You can use the [Faucet](https://faucet-beta-5.fuel.network/) to fund your wallet.

<<< @/../../docs-snippets/src/guide/introduction/getting-started.test.ts#connecting-to-the-testnet{ts:line-numbers}
