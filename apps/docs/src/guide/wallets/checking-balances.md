# Checking balances

To check the balance of a specific asset, you can use [`getBalance`](../../api/Account/Account.md#getbalance) method. This function aggregates the amounts of all unspent coins of the given asset in your wallet.

<<< @./snippets/checking-balances.ts#checking-balances-1{ts:line-numbers}

To retrieve the balances of all assets in your wallet, use the [`getBalances`](../../api/Account/Account.md#getbalances) method, it returns an array of [`CoinQuantity`](../../api/Account/index.md#coinquantity). This is useful for getting a comprehensive view of your holdings.

<<< @./snippets/checking-balances-two.ts#checking-balances-2{ts:line-numbers}
