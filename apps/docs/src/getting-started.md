<script setup>
  import { data } from './versions.data'
  const { fuels } = data
</script>

# Getting Started with Fuels-ts

This guide will walk you through the process of setting up and using the Fuels-ts library in your front-end project.

## Installing the Fuels-ts Library

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

## Creating a React Component to Connect to the Blockchain

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

## Further Resources and Next Steps

For a more in-depth, step-by-step guide on working with the Fuels ecosystem, check out the [Developer Quickstart guide](https://fuelbook.fuel.network/master/quickstart/developer-quickstart.html). This guide covers:

1. Installing all tools needed to develop on the Fuels ecosystem.

2. Writing your first Sway Project.

3. Deploying your contract.

4. Building a simple front-end dApp to interact with your deployed contract.
