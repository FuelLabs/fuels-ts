The `transfer()` method lets you transfer a single asset, but what if you needed to move all of your assets to a different wallet? You could repeatably call `transfer()`, initiating a transaction each time, or you bundle all the transfers into a single transaction. This chapter guides you through crafting your custom transaction for transferring all assets owned by a wallet.

Lets quickly go over the setup:

```rust,ignore
{{#include ../../../examples/cookbook/src/lib.rs:transfer_multiple_setup}}
```

We prepare two wallets with randomized addresses. Next, we want one of our wallets to have some random assets, so we set them up with `setup_multiple_assets_coins()`. Having created the coins, we can start a provider and assign it to the previously created wallets.

Transactions require us to define input and output coins. Let's assume we do not know the assets owned by `wallet_1`. We retrieve its balances, i.e. tuples consisting of a string representing the asset id and the respective amount. This lets us use the helpers `get_asset_inputs_for_amount()`, `get_asset_outputs_for_amount()` to create the appropriate inputs and outputs.

For the sake of simplicity, we avoid transferring the base asset so we don't have to worry about transaction fees:

```rust,ignore
{{#include ../../../examples/cookbook/src/lib.rs:transfer_multiple_inout}}
```

All that is left is to build the transaction with the helper `build_transfer_transaction()`, have `wallet_1` sign it, and we can send it. We confirm this by checking the number of balances present in the receiving wallet and their amount:

```rust,ignore
{{#include ../../../examples/cookbook/src/lib.rs:transfer_multiple_transaction}}
```
