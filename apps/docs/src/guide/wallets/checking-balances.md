# Checking balances

To check the balance of a specific asset, you can use [`getBalance`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Account.html#getBalance) method. This function aggregates the amounts of all unspent coins of the given asset in your wallet.

<<< @/../../docs-snippets/src/guide/wallets/checking-balances.test.ts#checking-balances-1{ts:line-numbers}

To retrieve the balances of all assets in your wallet, use the [`getBalances`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Account.html#getBalances) method, it returns an array of [`CoinQuantity`](https://fuels-ts-docs-api.vercel.app/types/_fuel_ts_account.CoinQuantity.html). This is useful for getting a comprehensive view of your holdings.

<<< @/../../docs-snippets/src/guide/wallets/checking-balances.test.ts#checking-balances-2{ts:line-numbers}
