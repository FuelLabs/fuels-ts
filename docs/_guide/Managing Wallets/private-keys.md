# Creating a wallet from a private key

A new wallet with a randomly generated private key can be created by supplying `Option<Provider>`.

```rust,ignore
{{#include ../../../examples/wallets/src/lib.rs:create_random_wallet}}
```

Alternatively, you can create a wallet from a predefined `SecretKey`.

```rust,ignore
{{#include ../../../examples/wallets/src/lib.rs:create_wallet_from_secret_key}}
```

> Note: if `None` is supplied instead of a provider, any transaction related to the wallet will result
> in an error until a provider is linked with `set_provider()`. The optional parameter
> enables defining owners (wallet addresses) of genesis coins before a provider is launched.
