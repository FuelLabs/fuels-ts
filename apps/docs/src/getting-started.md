<script setup>
  import { data } from './versions.data'
  const { fuels } = data
</script>

# Getting Started

This guide will walk you through the process of setting up and using the Fuels-ts library in your front-end project.

## Installation

To begin, you need to add the `fuels` dependency to your project. You can do this using the following command:

::: code-group

```sh [npm]
npm install fuels --save
```

```sh [pnpm]
pnpm add fuels
```

:::

### Note

If you are using bun, you'll need to add a `trustedDependencies` field to your `package.json`:

```json
{
  // ...
  "trustedDependencies": ["@fuel-ts/fuel-core", "@fuel-ts/forc"]
}
```

This is to ensure that bun includes the `fuel-core` and `forc` binaries in your project.

> IMPORTANT: We don't officially support `bun` yet; use it at your own risk.

## Usage

With the Fuels dependency set up, you can now create a React component that will connect to the Fuel provider and retrieve the base asset balance for a given wallet address. Here's an example of how to do this:

<!-- TODO: Create properly code snippet on new package: `app/react-app` after https://github.com/FuelLabs/fuels-ts/pull/827 got merged -->

```tsx
import { BN, Provider, Wallet } from "fuels";
import { useEffect, useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async () => {
      const provider = await Provider.create("https://beta-5.fuel.network/graphql");
      const myWallet = Wallet.fromAddress("0x...", provider);
      myWallet.getBalances().then((data) => {
        setBalance(new BN(data[0].amount).toNumber());
      });
    }()
  }, []);

  return <div>My Balance: {balance}</div>;
}

export default App;
```

## CDN Usage (browser only)

For a quick test or just playing around, you can load it in your Web Apps straight from our CDN.

```html
<script type="module">
  import {
    Wallet,
    Provider,
  } from "https://cdnjs.cloudflare.com/ajax/libs/fuels/{{fuels}}/browser.mjs";

  const exec = async () => {
    const provider = await Provider.create(
      "https://beta-5.fuel.network/graphql",
    );
    const { name } = provider.getChain();
    console.log(name);
  };
  exec();
</script>
```

## Connecting to the Network

At a high level, you can use the Fuel TypeScript SDK to build applications that can run computations on the Fuel Virtual Machine through interactions with smart contracts written in Sway.

For this interaction to work, the SDK must be able to communicate with a [`fuel-core`](https://github.com/FuelLabs/fuel-core) node; you have two options at your disposal:

1. Connecting to the [Testnet](#connecting-to-the-testnet). (For application building)
2. Running a [local node](https://docs.fuel.network/guides/running-a-node/). (For smart contract testing)

### Connecting to the Testnet

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

In the example below, we connect a [Provider](./guide/provider/index.md) to the latest testnet and create a new wallet from a private key.

> **Note:** New wallets on the Testnet will not have any assets! You can use the [Faucet](https://faucet-beta-5.fuel.network/) to fund your wallet.

<<< @/../../docs-snippets/src/guide/introduction/getting-started.test.ts#connecting-to-the-testnet{ts:line-numbers}

### Connecting to a local node

Firstly, you will need a local node running on your machine. We recommend one of the following methods:

- [Testing utilities](./guide/testing/index.md#wallet-test-utilities) can assist in programmatically launching a short-lived node.
- Running [fuel-core](https://docs.fuel.network/guides/running-a-node/running-a-local-node/) directly, or via the CLI [fuels](./guide/fuels/commands.md#fuels-core).

In the following example, we create a provider to connect to the local node and sign a message.

<<< @/../../docs-snippets/src/guide/introduction/getting-started.test.ts#connecting-to-the-local-node{ts:line-numbers}

## Further Resources and Next Steps

For a more in-depth, step-by-step guide on working with the wider Fuel ecosystem, check out the [Developer Quickstart](https://docs.fuel.network/guides/quickstart/). This guide covers:

1. Installing all tools needed to develop with the Fuel ecosystem.

2. Writing your first Sway Project.

3. Deploying your contract.

4. Building a simple front-end dApp to interact with your deployed contract.
