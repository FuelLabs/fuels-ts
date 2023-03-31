# Interacting with the blockchain

Once you have set up a provider, you're ready to interact with the Fuel blockchain. Here are a few examples of what you can do with a provider; for a more in-depth overview of the API, check the [official provider API documentation](https://docs.rs/fuels/latest/fuels/signers/provider/struct.Provider.html).

## Set up

You might need to set up a test blockchain first. You can skip this step if you're connecting to an external blockchain.

See [connection](./connection.md)

## Get all coins from an address

This method returns all coins (of an optional given asset ID) from a wallet, including spent ones.

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#wallet-query{ts:line-numbers}

## Get spendable resources from an address

The last argument says how much you want to spend. This method returns only spendable, i.e., unspent coins (of a given asset ID). If you ask for more spendable than the amount of unspent coins you have, it returns an error.

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#wallet-get-spendable-resources{ts:line-numbers}

## Get balances from an address

Get all the spendable balances of all assets for an address. This is different from getting the coins because we only return the numbers (the sum of UTXOs coins amount for each asset id) and not the UTXOs coins themselves.

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#wallet-get-balances{ts:line-numbers}
