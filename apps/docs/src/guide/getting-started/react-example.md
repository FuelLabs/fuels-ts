# React Example

<!-- TODO: Create properly code snippet on new package: `app/react-app` after https://github.com/FuelLabs/fuels-ts/pull/827 got merged -->

```tsx
import { BN, Provider, Wallet } from "fuels";
import { useEffect, useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const main = async () => {
      const provider = await Provider.create(
        "https://mainnet.fuel.network/v1/graphql",
      );

      const wallet = Wallet.fromAddress("0x...", provider);
      const { balances } = await wallet.getBalances();

      setBalance(new BN(balances[0].amount).toNumber());
    };

    main();
  }, []);

  return <div>My Balance: {balance}</div>;
}

export default App;
```
