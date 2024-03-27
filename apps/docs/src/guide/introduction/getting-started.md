<script setup>
  import { data } from '../../versions.data'
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

```html-vue
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

For this interaction to work, the SDK must be able to communicate with a `fuel-core` node; you have two options at your disposal:

1. Use the [Testnet](#connecting-to-the-testnet). (For application building)
2. Running a [local node](https://docs.fuel.network/guides/running-a-node/). (For smart contract testing)


### Connecting to the Testnet

We can interact with the `Testnet` node by using the following example.

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#provider-testnet{ts:line-numbers}

In the code example, we connected a new provider to the Testnet node and created a new wallet from a private key.

> **Note:** New wallets on the Testnet will not have any assets! They can be obtained by providing the wallet address to the faucet at
>
> [faucet-beta-5.fuel.network](https://faucet-beta-5.fuel.network/)
>
> Once the assets have been transferred to the wallet, you can reuse it in other tests by providing the private key!
>
> In addition to the faucet, there is a block explorer for the Testnet at
>
> [block-explorer](https://fuellabs.github.io/block-explorer-v2)

### Connecting to a local node

You will need a local node running on your machine. We recommend one of the following methods:

- [Testing utilities](../testing/index.md#wallet-test-utilities) can assist in programmatically launching a short-lived node.
- By running [fuel-core](https://docs.fuel.network/guides/running-a-node/running-a-local-node/) directly, or via the CLI [fuels](../fuels/commands.md#fuels-core).

In the following example, we create a provider to connect to the local node.

> **Note:** We use a [predefined constant](../providers/index.md#predefined-constants) `FUEL_NETWORK_URL` to connect to the local node.

<<< @/../../docs-snippets/src/guide/introduction/getting-started.test.ts#connecting-to-the-local-node{ts:line-numbers}

## Further Resources and Next Steps

For a more in-depth, step-by-step guide on working with the Fuels ecosystem, check out the [Developer Quickstart guide](https://fuelbook.fuel.network/master/quickstart/developer-quickstart.html). This guide covers:

1. Installing all tools needed to develop on the Fuels ecosystem.

2. Writing your first Sway Project.

3. Deploying your contract.

4. Building a simple front-end dApp to interact with your deployed contract.
