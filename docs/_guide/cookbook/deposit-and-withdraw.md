Consider the following contract:

```rust,ignore
{{#include ../../../packages/fuels/tests/contracts/liquidity_pool/src/main.sw}}
```

As its name suggests, it represents a simplified example of a liquidity pool contract. The method `deposit()` expects you to supply an arbitrary amount of the `BASE_TOKEN`. As a result, it mints double the amount of the liquidity asset to the calling address. Analogously, if you call `withdraw()` supplying it with the liquidity asset, it will transfer half that amount of the `BASE_TOKEN` back to the calling address except for deducting it from the contract balance instead of minting it.

The first step towards interacting with any contract in the TypeScript SDK is calling the `abigen!` macro to generate type-safe Rust bindings for the contract methods:

```rust,ignore
{{#include ../../../examples/cookbook/src/lib.rs:liquidity_abigen}}
```

Next, we set up a wallet with custom-defined assets. We give our wallet some of the contracts `BASE_TOKEN` and the default asset (required for contract deployment):

```rust,ignore
{{#include ../../../examples/cookbook/src/lib.rs:liquidity_wallet}}
```

Having launched a provider and created the wallet, we can deploy our contract and create an instance of its methods:

```rust,ignore
{{#include ../../../examples/cookbook/src/lib.rs:liquidity_deploy}}
```

With the preparations out of the way, we can finally deposit to the liquidity pool by calling `deposit()` via the contract instance. Since we have to transfer assets to the contract, we create the appropriate `CallParameters` and chain them to the method call. To receive the minted liquidity pool asset, we have to append a variable output to our contract call.

```rust,ignore
{{#include ../../../examples/cookbook/src/lib.rs:liquidity_deposit}}
```

As a final demonstration, let's use all our liquidity asset balance to withdraw from the pool and confirm we retrieved the initial amount. For this, we get our liquidity asset balance and supply it to the `withdraw()` call via `CallParameters`.

```rust,ignore
{{#include ../../../examples/cookbook/src/lib.rs:liquidity_withdraw}}
```
