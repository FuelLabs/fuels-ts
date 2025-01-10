# React Example

<!-- TODO: Create properly code snippet on new package: `app/react-app` after https://github.com/FuelLabs/fuels-ts/pull/827 got merged -->

```tsx
import { BN, Provider, Wallet } from "fuels";
import { useEffect, useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const main = async () => {
      const provider = new Provider("https://mainnet.fuel.network/v1/graphql");

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

## Advanced Example

```tsx
import { Provider, Wallet, ScriptTransactionRequest } from "fuels";
import { useEffect, useState } from "react";

function App() {
  const [request, setRequest] = useState<ScriptTransactionRequest | null>(null);
  const [status, setStatus] = useState<string>("n/a");

  const NETWORK_URL = "https://mainnet.fuel.network/v1/graphql";
  const provider = new Provider(NETWORK_URL);
  const wallet = Wallet.fromAddress("0x...", provider);

  const prePrepareTransaction = async () => {
    const recipient = Wallet.generate({ provider });
    const newRequest = new ScriptTransactionRequest();
    newRequest.addCoinOutput(
      recipient.address,
      1_000,
      await provider.getBaseAssetId(),
    );
    await newRequest.estimateAndFund(wallet);
    setRequest(newRequest);
  };

  useEffect(() => {
    prePrepareTransaction();
  }, []);

  const handleSubmit = async () => {
    if (!request) return;

    const signature = await wallet.signTransaction(request);
    request.updateWitnessByOwner(wallet.address, signature);

    const chainId = await provider.getChainId();
    const txId = await request.getTransactionId(chainId);

    setStatus(`Submitted - ${txId}`);
    const response = await provider.sendTransaction(request, {
      estimateTxDependencies: false,
    });

    const result = await response.waitForResult();
    setStatus(`Settled - ${result.id}`);

    prePrepareTransaction();
  };

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
      <p>
        <strong>Transaction Status:</strong> <code>{status}</code>
      </p>
    </div>
  );
}

export default App;
```

- [CDN Usage](./cdn-usage.md)
