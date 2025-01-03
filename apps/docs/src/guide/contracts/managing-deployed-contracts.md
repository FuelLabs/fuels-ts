# Managing Deployed Contracts

To interact with a deployed contract using the SDK without redeploying it, you only need the contract ID and its JSON ABI. This allows you to bypass the deployment setup.

## Contract ID

The `contractId` property from the [`Contract`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_program.Contract.html) class is of type [`AbstractAddress`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_interfaces.AbstractAddress.html), an abstract class that is exclusively extended by the [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) class.

The [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) class wraps all methods from the [`AbstractAddress`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_interfaces.AbstractAddress.html) class and adds a single property: `b256Address`. This property is a string encoded in [`B256`](../types/bits256.md) format.

When you log the `contractId` property of an instantiated Contract using `console.log`, the output appears as follows:

```console
  Address {
    b256Address: '0xcd16d97c5c4e18ee2e8d6428447dd9c8763cb0336718b53652d049f8ec88b3ba'
  }
```

---

If you have already an instantiated and deployed contract in hands you can create another contract instance simply by using the `contractId` property and the contract JSON ABI:

<<< @./snippets/managing-deployed-contracts.ts#with-contractId{ts:line-numbers}

The previous example assumes that you have a [`Contract`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_program.Contract.html) instance at hand. However, some Fuel tools and Sway use the [`b256`](../types/bits256.md) type format, a hex-encoded string-like type, for contract IDs.

You might have this format instead, for example, if you have deployed your contract with `forc deploy`.

The process of instantiating a [`Contract`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_program.Contract.html) remains the same when using a contract ID of type `b256`:

<<< @./snippets/managing-deployed-contracts.ts#with-b256{ts:line-numbers}
