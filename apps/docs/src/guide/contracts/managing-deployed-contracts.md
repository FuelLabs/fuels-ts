# Managing Deployed Contracts

Once a contract is deployed to the Fuel network, you can connect to it and interact with it using just its **contract ID** and **ABI** — there is no need to redeploy. This is the most common pattern in dApp development, where contracts are deployed once and then used by many clients.

## Connecting to a Deployed Contract

To interact with an already-deployed contract, create a [`Contract`](DOCS_API_URL/classes/_fuel_ts_program.Contract.html) instance with the contract ID, ABI, and a wallet or provider:

<<< @./snippets/managing-deployed-contracts.ts#with-contractId{ts:line-numbers}

## Using a B256 Contract ID

Some Fuel tools and Sway use the [`B256`](../types/b256.md) type format (a hex-encoded string) for contract IDs. You might have this format if you deployed your contract with `forc deploy` or copied it from a block explorer.

The process of instantiating a [`Contract`](DOCS_API_URL/classes/_fuel_ts_program.Contract.html) remains the same when using a contract ID of type `B256`:

<<< @./snippets/managing-deployed-contracts.ts#with-b256{ts:line-numbers}

## Contract ID Format

The `contractId` property from the [`Contract`](DOCS_API_URL/classes/_fuel_ts_program.Contract.html) class is an instance of the [`Address`](DOCS_API_URL/classes/_fuel_ts_address.Address.html) class, which provides utility functions for easy manipulation and conversion between address formats.

When you log the `contractId` property of an instantiated Contract using `console.log`, the output appears as follows:

```console
  Address {
    b256Address: '0xcd16d97c5c4e18ee2e8d6428447dd9c8763cb0336718b53652d049f8ec88b3ba'
  }
```
