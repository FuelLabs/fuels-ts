# Usage

With the Fuels dependency set up, you can now create a React component that will connect to the Fuel provider and retrieve the base asset balance for a given wallet address. Here's an example of how to do this:

<!-- TODO: Create properly code snippet on new package: `app/react-app` after https://github.com/FuelLabs/fuels-ts/pull/827 got merged -->

```tsx
import { BN, Provider, Wallet } from "fuels";
import { useEffect, useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async () => {
      const provider = await Provider.create("https://testnet.fuel.network/v1/graphql");
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
      "https://testnet.fuel.network/v1/graphql",
    );
    const { name } = provider.getChain();
    console.log(name);
  };
  exec();
</script>
```
