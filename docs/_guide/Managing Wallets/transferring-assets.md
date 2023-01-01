# Transferring assets

With `wallet.transfer` you can initiate a transaction to transfer an asset from your wallet to a target address.

```rust,ignore
{{#include ../../../examples/wallets/src/lib.rs:wallet_transfer}}
```

You can transfer assets to a contract via `wallet.force_transfer_to_contract`.

```rust,ignore
{{#include ../../../examples/wallets/src/lib.rs:wallet_contract_transfer}}
```

For transferring assets to the base layer chain, you can use `wallet.withdraw_to_base_layer`.

```rust,ignore
{{#include ../../../examples/wallets/src/lib.rs:wallet_withdraw_to_base}}
```

The above example creates an `Address` from a string and converts it to a `Bech32Address`. Next, it calls `wallet.withdraw_to_base_layer` by providing the address, the amount to be transferred, and the transaction parameters. Lastly, to verify that the transfer succeeded, the relevant message proof is retrieved with `provider.get_message_proof,` and the amount and the recipient is verified.
