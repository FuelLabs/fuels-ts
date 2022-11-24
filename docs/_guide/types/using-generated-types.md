# Using Generated Types

See also [Generate Contract Types from ABI](../contracts/generate-contract-types-from-abi).

```ts
import { Wallet } from "fuels";
import { MyContract__factory } from "./types";

const contractId = "0x...";
const wallet = new Wallet("0x...");
const contract = MyContract__factory.connect(contractId, wallet);

// All contract methods are available under functions with the correct types
const { transactionId, value } = await contract.functions.my_fn(1n).call();
console.log(transactionId, value);
```
