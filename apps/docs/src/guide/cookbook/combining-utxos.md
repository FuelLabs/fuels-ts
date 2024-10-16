# Combining UTXOs

When performing a funding operation or calling `getResourcesToSpend`, you may encounter the `MAX_COINS_REACHED` error if the number of coins fetched per asset exceeds the maximum limit allowed by the chain.

You may also want to do this if you want to reduce the number of inputs in your transaction, which can be useful if you are trying to reduce the size of your transaction or you are receiving the `MAX_INPUTS_EXCEEDED` error.

One way to avoid these errors is to combine your UTXOs. This can be done by performing a transfer that combines multiple UTXOs into a single UTXO, where the transaction has multiple inputs for the asset, but a smaller number of outputs.

> **Note:** You will not be able to have a single UTXO for the base asset after combining, as one output will be for the transfer, and you will have another for the fees.

<<< @/../../docs-snippets2/src/guide/cookbook/combining-utxos.test.ts#combining-utxos{ts:line-numbers}
