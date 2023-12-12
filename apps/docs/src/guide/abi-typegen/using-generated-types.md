<!-- TODO: Replace plan-text by code-snippets -->

# Using Generated Types

After generating types via:

```console
pnpm fuels typegen -i ./abis/*-abi.json -o ./types
```

We can use these files like so:

<!-- TODO: stop using hard-coded snippets -->

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

## Contract

Let's use the Contract class to deploy a contract:

```ts
import { Wallet } from "fuels";
import { MyContract__factory } from "./types";
import bytecode from "./types/MyContract.hex.ts";

const wallet = Wallet.fromAddress("...");

const contract = await MyContract__factory.deployContract(bytecode, wallet);

console.log(contract.id);
```

### Autoloading of Storage Slots

Typegen tries to resolve, auto-load, and embed the [Storage Slots](../contracts//storage-slots.md) for your Contract within the `MyContract__factory` class. Still, you can override it alongside other options from [`DeployContractOptions`](https://github.com/FuelLabs/fuels-ts/blob/a64b67b9fb2d7f764ab9151a21d2266bf2df3643/packages/contract/src/contract-factory.ts#L19-L24), when calling the `deployContract` method:

```ts
import storageSlots from "../contract/out/debug/storage-slots.json";

const contract = await MyContract__factory.deployContract(bytecode, wallet, {
  storageSlots,
});
```

## Script

After generating types via:

```console
pnpm fuels typegen -i ./abis/*-abi.json -o ./types --script
```

We can use these files like so:

<!-- TODO: stop using hard-coded snippets -->

```ts
import { Wallet } from "fuels";
import { MyScript__factory } from "./types";

const wallet = Wallet.fromAddress("...");
const script = ScriptAbi__factory.createInstance(wallet);

const { value, logs } = await script.functions.main(1).call();

console.log({ value, logs });
```

## Predicate

Consider the following predicate:

<<< @/../../../packages/fuel-gauge/test/fixtures/forc-projects/predicate-main-args-struct/src/main.sw#Predicate-main-args{ts:line-numbers}

Now, after generating types via:

```console
pnpm fuels typegen -i ./abis/*-abi.json -o ./types --predicate
```

We can use these files like so:

<!-- TODO: stop using hard-coded snippets -->

```ts
import { Wallet } from "fuels";
import { MyPredicate__factory } from "./types";

const wallet = Wallet.fromAddress("...");
const predicate = MyPredicate__factory.createInstance();

await predicate
  .setData({
    has_account: true,
    total_complete: 100,
  })
  .transfer(wallet.address, <amount>);

const walletBalance = await wallet.getBalance();
const predicateBalance = await predicate.getBalance();

console.log({
  walletBalance,
  predicateBalance,
});
```

See also:

- [Generating Types for Contracts](./generating-types-from-abi.md#generating-types-for-contracts)
- [Generating Types for Scripts](./generating-types-from-abi.md#generating-types-for-scripts)
- [Generating Types for Predicates](./generating-types-from-abi.md#generating-types-for-predicates)
