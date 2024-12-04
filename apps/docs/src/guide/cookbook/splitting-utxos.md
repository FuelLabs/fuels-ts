# Splitting UTXOs

There may be times when you want to split one large UTXO into multiple smaller UTXOs. This can be useful if you want to send multiple concurrent transactions without having to wait for them to be processed sequentially.

To split a UTXO, you can use the `splitUTXOs` function. This will return an array of the number of UTXOs each with the specified amount, as long as the balance is greater than the amount.

<<< @./snippets/splitting-utxos.ts#splitting-utxos{ts:line-numbers}
