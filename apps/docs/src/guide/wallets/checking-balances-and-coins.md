# Checking balances and coins

First, one should remember that, with UTXOs, each _coin_ is unique. Each UTXO corresponds to a unique _coin_, and said _coin_ has a corresponding _amount_ (the same way a dollar bill has either 10$ or 5$ face value). So, when you want to query the balance for a given asset ID, you want to query the sum of the amount in each unspent coin. This querying is done very easily with a wallet:

<<< @/../../docs-snippets/src/guide/wallets/wallet-examples.test.ts#wallet-check-balance{ts:line-numbers}

If you want to query all the balances (i.e., get the balance for each asset ID in that wallet), you can use the `getBalances` method:

<<< @/../../docs-snippets/src/guide/wallets/wallet-examples.test.ts#wallet-check-balances{ts:line-numbers}
