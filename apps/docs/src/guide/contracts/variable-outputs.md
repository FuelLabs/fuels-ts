<!-- NOTE: Review the relevance of this documentation page. The TypeScript SDK manages Output variables automatically, which may make the current content lack sufficient context. Consider providing a detailed explanation of how transactions work in a UTXO-based blockchain before discussing Output variables. This approach will ensure users have a better understanding of the topic and its importance. -->

# Variable Outputs

In certain scenarios, you may need to send funds to the output of a transaction. Sway provides a dedicated method for this purpose called `transfer_to_address(coins, asset_id, recipient)`. This method allows you to transfer a specified number of coins of a given asset to a recipient address.

## Example: Using `transfer_to_address` in a Contract

Here's an example of a contract function that utilizes the `transfer_to_address` method:

```rust:line-numbers
    fn transfer_coins_to_output(coins: u64, asset_id: ContractId, recipient: Address) {
        transfer_to_address(coins, asset_id, recipient);
    }
```

## Using the SDK to Call the `transfer_coins_to_output` Function


With the SDK, you can call `transfer_coins_to_output` by chaining the `txParams` and adding the property `variableOutputs: amount` to your contract call. Like this:

<<< @/../../docs-snippets/src/guide/contracts/transaction-parameters.test.ts#variable-outputs-1{ts:line-numbers}

In the TypeScript SDK, the output variables are automatically added to the transaction's list of outputs. The output's amount and owner may vary based on the transaction execution.
