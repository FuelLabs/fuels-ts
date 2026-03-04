# Combining UTXOs

When performing a funding operation or calling `getResourcesToSpend`, you may encounter the `INSUFFICIENT_FUNDS_OR_MAX_COINS` error if the number of coins fetched per asset exceeds the maximum limit allowed by the chain.

You may also want to do this if you want to reduce the number of inputs in your transaction, which can be useful if you are trying to reduce the size of your transaction or you are receiving the `MAX_INPUTS_EXCEEDED` error.

## Using the Account's `consolidateCoins` Method

The SDK provides a built-in method to consolidate your base asset UTXOs:

<<< @./snippets/combining-utxos.ts#combining-utxos{ts:line-numbers}

### Configuration Options

The `consolidateCoins` method accepts the following parameters:

- `assetId`: The ID of the asset to consolidate

- `mode` (optional): How to submit consolidation transactions
  - `'parallel'` (default): Submit all transactions simultaneously for faster processing
  - `'sequential'`: Submit transactions one after another, waiting for each to complete
- `outputNum` (optional): Number of output UTXOs to create (default is 1)

## Max Inputs and Outputs

It's also important to note that depending on the chain configuration, you may be limited on the number of inputs and/or outputs that you can have in a transaction. These amounts can be queried via the [TxParameters](https://docs.fuel.network/docs/graphql/reference/objects/#txparameters) GraphQL query.

<<< @./snippets/max-outputs.ts#max-outputs{ts:line-numbers}
