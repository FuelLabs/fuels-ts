# Splitting UTXOs

There may be times when you want to split a UTXO into multiple UTXOs. This can be useful if you want to reduce the size of your transaction or you are receiving the `MAX_INPUTS_EXCEEDED` error.

To split a UTXO, you can use the `splitUTXOs` function. This will return an array of the number of UTXOs each with the specified amount, as long as the balance is greater than the amount.

<<< @./snippets/splitting-utxos.ts#splitting-utxos{ts:line-numbers}
