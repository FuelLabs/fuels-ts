---
title: "Calling a script"
parent: "Scripts"
grand_parent: "Guide"
nav_order: 2
---

# Calling a script

We will use the `script` instance created in the [previous section](./index.md) to call the script.

```typescript
import { ScriptTransactionRequest } from "fuels";
import type { CoinQuantityLike } from "fuels";

const request = new ScriptTransactionRequest({
  gasLimit: 1000000,
});
request.setScript(script, data);

// Keep a list of coins we need to input to this transaction
const requiredCoinQuantities: CoinQuantityLike[] = [];

requiredCoinQuantities.push(request.calculateFee());

// Get and add required coins to the transaction
if (requiredCoinQuantities.length) {
  const resources = await wallet.getResourcesToSpend(requiredCoinQuantities);
  request.addResources(resources);
}

const response = await wallet.sendTransaction(request);
const transactionResult = await response.waitForResult();
const result = script.decodeCallResult(transactionResult);
```

###### [see code in context](https://github.com/FuelLabs/fuels-ts/blob/master/packages/script/src/script.test.ts#L39-L57)
