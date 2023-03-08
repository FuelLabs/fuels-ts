[nav_order: 1]

# Using Generated Types

After generating types via:

```console
yarn exec fuels -i ./abis/*-abi.json -o ./types
```

We can use these files like so:

```ts
import { Wallet } from "fuels";
import { MyContract__factory } from "./types";

const contractId = "0x...";
const wallet = Wallet.fromAddress("...");
const contract = MyContract__factory.connect(contractId, wallet);

// All contract methods are available under functions with the correct types
const { transactionId, value } = await contract.functions.my_fn(1).call();

console.log(transactionId, value);
```

# Using Generated Script Types

After generating types via:

```console
yarn exec fuels -i ./abis/*-abi.json -o ./types --script
```

We can use these files like so:

```ts
import { Wallet } from "fuels";
import { MyScript__factory } from "./types";

const wallet = Wallet.fromAddress("...");
const script = ScriptAbi__factory.createInstance(wallet);

const { value, logs } = await script.functions.main(1).call();

console.log({ value, logs });
```

See also:

- [Generating Types for Contracts](./generating-types-from-abi.md#generating-types-for-contracts)
- [Generating Types for Scripts](./generating-types-from-abi.md#generating-types-for-scripts)
