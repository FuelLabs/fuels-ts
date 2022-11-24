# Interacting with the blockchain

Once you have set up a provider, you're ready to interact with the Fuel blockchain. Here are a few examples of what you can do with a provider; for a more in-depth overview of the API, check the [official provider API documentation](https://docs.rs/fuels/latest/fuels/signers/provider/struct.Provider.html).

- [Interacting with the blockchain](#interacting-with-the-blockchain)
  - [Set up](#set-up)
  - [Get all coins from an address](#get-all-coins-from-an-address)
  - [Get spendable resources from an address](#get-spendable-resources-from-an-address)
  - [Get balances from an address](#get-balances-from-an-address)

## Set up

You might need to set up a test blockchain first. You can skip this step if you're connecting to an external blockchain.

See [connecting](./connecting.md)

## Get all coins from an address

This method returns all coins (of an optional given asset ID) from a wallet, including spent ones.

[@code:typescript](./packages/fuel-gauge/src/doc-examples.test.ts#typedoc:wallet-query)

## Get spendable resources from an address

The last argument says how much you want to spend. This method returns only spendable, i.e., unspent coins (of a given asset ID). If you ask for more spendable than the amount of unspent coins you have, it returns an error.

[@code:typescript](./packages/fuel-gauge/src/doc-examples.test.ts#typedoc:wallet-get-spendable-resources)

## Get balances from an address

Get all the spendable balances of all assets for an address. This is different from getting the coins because we only return the numbers (the sum of UTXOs coins amount for each asset id) and not the UTXOs coins themselves.

[@code:typescript](./packages/fuel-gauge/src/doc-examples.test.ts#typedoc:wallet-get-balances)
