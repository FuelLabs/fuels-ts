# Optimising Contract Calls

When you call a contract function via the SDK, it makes two major network requests:

1. **Preparing the transaction**: This involves creating the transaction request, fetching dependencies for it, and funding it properly.

2. **Sending the transaction**: This involves sending the transaction to the network and waiting for it to be confirmed.

The below flowchart shows this entire process:

![Transaction Lifecycle in the SDK without prefetching](/public/txdep1.png)

Since the SDK prepares the contract call _after_ the user presses 'Submit Transaction' (or your code invokes the `call` method), the chain feels slower to the user than it actually is. This is because of the network request needed to prepare the transaction.

This can be mitigated by preparing the contract call _before_ the user presses 'Submit Transaction'. If the transaction is prepared beforehand, the SDK only has to send the transaction to the network and wait for it to be confirmed. This reflects the actual speed of the chain to the user.

You can experience this yourself by trying out this [demo](https://fuel-wallet-prefetch-experiment-75ug.vercel.app/).

![Transaction Lifecycle in the SDK with prefetching](/public/txdep2.png)

Because of the massive performance gains, we recommend this strategy for all contract calls.

## Recommended Implementation

> [!Note] This is an example for React, but the same logic can be applied to any framework.

We recommend creating a `usePrepareContractCall` hook:

```tsx
import { FunctionInvocationScope, ScriptTransactionRequest } from "fuels";
import { useEffect, useState, useCallback, useRef } from "react";

export const usePrepareContractCall = (fn?: FunctionInvocationScope) => {
  const [preparedTxReq, setPreparedTxReq] =
    useState<ScriptTransactionRequest>();
  const fnRef = useRef(fn);

  useEffect(() => {
    if (fn && fn !== fnRef.current) {
      fnRef.current = fn;
      (async () => {
        const txReq = await fn.fundWithRequiredCoins();
        setPreparedTxReq(txReq);
      })();
    }
  }, [fn]);

  const reprepareTxReq = useCallback(async () => {
    if (!fnRef.current) {
      return;
    }
    const txReq = await fnRef.current.fundWithRequiredCoins();
    setPreparedTxReq(txReq);
  }, []);

  return {
    preparedTxReq,
    reprepareTxReq,
  };
};
```

This hook will prepare the transaction request for your contract call beforehand, and you can use the `reprepareTxReq` function to reprepare the transaction request if needed.

You can use this hook in your UI logic like this:

```tsx
function YourPage() {
  // It is important to memoize the function call object.
  const incrementFunction = useMemo(() => {
    if (!contract || !wallet) return undefined;
    return contract.functions.increment_counter(amount);
  }, [contract, wallet, amount]);

  const { preparedTxReq, reprepareTxReq } =
    usePrepareContractCall(incrementFunction);

  const onIncrementPressed = async () => {
    if (preparedTxReq) {
      // Use the prepared transaction request if it is available. Much faster.
      await wallet.sendTransaction(preparedTxReq);
    } else {
      // Fallback to the regular call if the transaction request is not available.
      await contract.functions.increment_counter(1).call();
    }

    /*
     * Reprepare the transaction request since the user may want to increment again.
     * This is important, since the old `preparedTxReq` will not be valid anymore
     * because it contains UTXOs that have been used among other things.
     *
     * You *must* re-prepare any prepared transaction requests whenever
     * the user does any transaction.
     */
    await reprepareTxReq();
  };
}
```

You can view the full code for this example [here](https://github.com/Dhaiwat10/fuel-wallet-prefetch-experiment/blob/main/src/components/Contract.tsx).

## Important Things to Note

- You _must_ re-prepare any prepared transaction requests whenever the user does any transaction. This is because the prepared transaction request will contain UTXOs that have been used among other things, and will therefore not be valid anymore.

- You _must_ memoize the function call object. This is because the function call object is used to prepare the transaction request, and if it is not memoized, the function call object will be recreated on every render, and the transaction request will not be prepared correctly.
