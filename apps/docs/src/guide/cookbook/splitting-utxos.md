# Splitting UTXOs

There may be times when you want to split one large UTXO into multiple smaller UTXOs. This can be useful if you want to send multiple concurrent transactions without having to wait for them to be processed sequentially.

> **Note:** Depending on how many smaller UTXOs you want to create, you may need to fund the wallet with additional funds to cover the fees. As we see in the example below, we fund the sending wallet with 500 to cover the fees for the batch transfer.

<<< @./snippets/splitting-utxos.ts#splitting-utxos{ts:line-numbers}
