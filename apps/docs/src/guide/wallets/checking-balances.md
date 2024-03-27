# Checking balances

## Understanding UTXO Model

In UTXO (Unspent Transaction Output) based systems, each coin is unique, similar to how physical currency bills have different denominations.

A UTXO represents a coin with a specific amount, similar to having a $10 or $5 bill. It's crucial to understand this unique feature of UTXOs, as it differs significantly from Ethereum's account-based system.

In Ethereum, balances are tracked as cumulative totals, similar to a bank account, rather than as distinct 'coins' or 'bills.

## Why UTXOs Matter

Each UTXO corresponds to a unique coin and has an associated amount. This model allows for greater transparency and control in cryptocurrency transactions. Understanding UTXOs is key for effectively managing and tracking your digital assets.

## Using `getBalance` to Query a Single Asset

To check the balance of a specific asset, you can use [`getBalance`](../../api/Account/Account.html#getbalance) method. This function aggregates the amounts of all unspent coins of the given asset in your wallet.

<<< @/../../docs-snippets/src/guide/wallets/checking-balances.test.ts#checking-balances-1{ts:line-numbers}

## Using `getBalances` for All Wallet Balances

To retrieve the balances of all assets in your wallet, use the [`getBalances`](../../api/Account/Account.html#getbalances) method. This is useful for getting a comprehensive view of your holdings.

<<< @/../../docs-snippets/src/guide/wallets/checking-balances.test.ts#checking-balances-2{ts:line-numbers}
