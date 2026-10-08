---
"@fuel-ts/account": patch
"@fuel-ts/contract": patch
"@fuel-ts/program": patch
"@fuel-ts/transactions": patch
"@fuel-ts/versions": patch
"@fuel-ts/utils": minor
"fuels": patch
"create-fuels": patch
---

Update Fuel-owned dependencies to VM ASM 0.66.4, Fuel Core 0.48.3, Forc 0.72.1, and React/connectors 0.45.0 in examples and templates. The assembler update reuses WASM initialization instead of allocating a module on each initialization request. Refresh the Core schema, panic reasons and local-node gas table, preserve panic error decoding for ABI 1.1 and 1.2, and migrate compiler fixtures to the newer standard library.

The default local-node snapshot now uses Core's V7 gas table. Snapshot gas costs accept either V4 or V7; code that reads `gas_costs.V4` directly must first narrow the variant. Explicit V4 snapshots remain supported. Recompiling Sway with Forc 0.72.1 can change bytecode, gas usage and dynamic-bytes hashes, and older source may need standard-library migrations.
