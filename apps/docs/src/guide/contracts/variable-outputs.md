<!-- NOTE: Review the relevance of this documentation page. The TypeScript SDK manages Output variables automatically, which may make the current content lack sufficient context. Consider providing a detailed explanation of how transactions work in a UTXO-based blockchain before discussing Output variables. This approach will ensure users have a better understanding of the topic and its importance. -->

# Variable Outputs

You may need to send funds to the transaction output in certain scenarios. Sway provides a method called `transfer_to_address(amount, asset_id, recipient)` that we can use for this purpose, which allows you to transfer a specific number of coins for a given asset to a recipient address.

## Example: Using `transfer_to_address` in a Contract

Here's an example of a contract function that utilizes the `transfer_to_address` method:

```rust:line-numbers
    fn transfer_to_address(amount: u64, asset_id: AssetId, recipient: Address) {
        transfer_to_address(amount, asset_id, recipient);
    }
```

## Using the SDK to Call the `transfer_to_address` Function

With the SDK, you can call `transfer_to_address` by chaining the `txParams` and adding the property `variableOutputs: amount` to your contract call. Like this:

<<< @/../../docs-snippets/src/guide/contracts/transaction-parameters.test.ts#variable-outputs-1{ts:line-numbers}

In the TypeScript SDK, the output variables are automatically added to the transaction's list of outputs. The output's amount and owner may vary based on the transaction execution.
