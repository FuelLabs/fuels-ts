# Signing

Once you've instantiated your wallet in an unlocked state using one of the previously discussed methods, you can sign a message with `wallet.sign_message`. Below is a full example of how to sign and recover a message.

```rust,ignore
{{#include ../../../packages/fuels-signers/src/lib.rs:sign_message}}
```

You can also sign a _transaction_ by using `wallet.sign_transaction`. Below is a full example of how to sign and recover a transaction.

```rust,ignore
{{#include ../../../packages/fuels-signers/src/lib.rs:sign_tx}}
```
