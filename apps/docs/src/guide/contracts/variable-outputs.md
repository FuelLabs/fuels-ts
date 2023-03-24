# Variable outputs

In some cases, you might want to send funds to the output of a transaction. Sway has a specific method for that: `transfer_to_address(coins, asset_id, recipient)`. So, if you have a contract that does something like this:

<!-- TODO: stop using hardcoded snippets -->

```rust:line-numbers
    fn transfer_coins_to_output(coins: u64, asset_id: ContractId, recipient: Address) {
        transfer_to_address(coins, asset_id, recipient);
    }
```

With the SDK, you can call `transfer_coins_to_output` by chaining `append_variable_outputs(amount)` to your contract call. Like this:

<<< @/../../../packages/fuel-gauge/src/token-test-contract.test.ts#variable-outputs{ts:line-numbers}

In the TS-SDK, the Output variables are automatically added to the transaction's list of outputs. The output's amount and the owner may vary based on transaction execution.

Note that the Sway `lib-std` function `mint_to_address` calls `transfer_to_address` under the hood.
