# Checking balances and coins

First, one should remember that, with UTXOs, each _coin_ is unique. Each UTXO corresponds to a unique _coin_, and said _coin_ has a corresponding _amount_ (the same way a dollar bill has either 10$ or 5$ face value). So, when you want to query the balance for a given asset ID, you want to query the sum of the amount in each unspent coin. This querying is done very easily with a wallet:

[@code:typescript](./packages/fuel-gauge/src/doc-examples.test.ts#typedoc:wallet-check-balance)

If you want to query all the balances (i.e., get the balance for each asset ID in that wallet), then it is as simple as:

[@code:typescript](./packages/fuel-gauge/src/doc-examples.test.ts#typedoc:wallet-check-balances)
