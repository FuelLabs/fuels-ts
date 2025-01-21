# Optimized React Example

This example implements the strategies outlined in [Optimizing Frontend Apps](../transactions/optimizing-frontend-apps.md) and demonstrates how to improve the perceived speed of transactions in a React application.

```tsx
import { Provider, Wallet, ScriptTransactionRequest } from "fuels";
import { useEffect, useState } from "react";

import { TestContract } from "./typegend";
import contractIds from "./typegend/contract-ids.json";

function App() {
  const [request, setRequest] = useState<ScriptTransactionRequest | null>(null);

  // Initialize the provider and wallet
  const NETWORK_URL = "https://mainnet.fuel.network/v1/graphql";
  const provider = new Provider(NETWORK_URL);
  const wallet = Wallet.fromAddress("0x...", provider);

  /**
   * Here we'll prepare our transaction upfront on page load, so that
   * by the time the user interacts with your app (i.e. clicking a btn),
   * the transaction is ready to be submitted
   */
  useEffect(() => {
    const onPageLoad = async () => {
      // 1. Connect to the contract
      const contractInstance = new TestContract(
        contractIds.testContract,
        wallet,
      );

      // 2. Invoke the contract function whilst estimating and funding the
      // call, which gives us the transaction request
      const preparedRequest = await contractInstance.functions
        .increment_counter(1)
        .fundWithRequiredCoins();

      setRequest(preparedRequest);
    };

    onPageLoad();
  }, []);

  /**
   * By the time user user clicks the submit button, we only need to
   * submit the transaction to the network
   */
  const handleSubmit = async () => {
    if (!request) return;

    // 1. Submit the transaction to the network
    const response = await wallet.sendTransaction(request);

    // 2. Wait for the transaction to settle and get the result
    const result = await response.waitForResult();

    console.log("result", result);
  };

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
```
