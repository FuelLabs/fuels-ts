# Checking balances and coins

First, one should remember that, with UTXOs, each _coin_ is unique. Each UTXO corresponds to a unique _coin_, and said _coin_ has a corresponding _amount_ (the same way a dollar bill has either 10$ or 5$ face value). So, when you want to query the balance for a given asset ID, you want to query the sum of the amount in each unspent coin. This querying is done very easily with a wallet:

```rust,ignore
{{#include ../../../examples/wallets/src/lib.rs:get_asset_balance}}
```

If you want to query all the balances (i.e., get the balance for each asset ID in that wallet), then it is as simple as:

```rust,ignore
{{#include ../../../examples/wallets/src/lib.rs:get_balances}}
```

The return type is a `HashMap`, where the key is the _asset ID's_ hex string, and the value is the corresponding balance. For example, we can get the base asset balance with:

```rust,ignore
{{#include ../../../examples/wallets/src/lib.rs:get_balance_hashmap}}
```
