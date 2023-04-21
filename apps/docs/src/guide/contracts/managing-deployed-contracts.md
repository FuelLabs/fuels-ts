# Managing Deployed Contracts

To interact with a deployed contract using the SDK without redeploying it, you only need the contract ID and its JSON ABI. This allows you to bypass the deployment setup.

## Contract ID

The `contractId` property from the `Contract` class is of type `AbstractAddress`, an abstract class that is exclusively extended by the `Address` class.

The `Address` class wrapps all methods from the `AbstractAddress` class and adds a single property: `bech32Address`. This property is a string encoded in [Bech32](../types/bech32.md) format, recognizable by the human-readable prefix `fuel` followed by the separator `1`.

When you log the `contractId` property of an instantiated Contract using `console.log`, the output appears as follows:

```console
  Address {
    bech32Address: 'fuel1e5tdjlzufcvwut5dvs5yglweepmrevpnvuvt2djj6pyl3mygkwaq8m7f20'
  }
```

---

If you have already an instantiated and deployed contract in hands you can create another contract instance simply by using the `contractId` property and the contract JSON abi:

<<< @/../../docs-snippets/src/guide/contracts/managing-deployed-contracts.test.ts#managing-deployed-contracts-1{ts:line-numbers}

The previous example assumes that you have a `Contract` instance at hand. However, some Fuel tools and Sway use the [b256](../types/bits256.md) type format, a hex-encoded string-like type, for contract IDs.

You might have this format instead, for example, if you have deployed your contract with `forc deploy`.

The process of instantiating a `Contract` remains the same when using a contract ID of type `b256`:

<<< @/../../docs-snippets/src/guide/contracts/managing-deployed-contracts.test.ts#managing-deployed-contracts-2{ts:line-numbers}
