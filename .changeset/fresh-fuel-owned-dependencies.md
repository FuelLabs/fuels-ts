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

Wait for a successful GraphQL health query before returning a launched local test node, avoiding connection resets while Fuel Core services are still starting.

Cancel readiness polling and clean up the child process and temporary snapshot when launching a local node fails. Include the exit code and signal when the node exits before becoming ready. Decode packed panic indices for ABI versions 1.2 and later while retaining legacy decoding for earlier ABIs and ABIs without version metadata.

Raise the SDK's Node.js 20 minimum to 20.18, consistently across published packages, create-fuels and both generated templates, matching the wallet connector dependencies used by the templates. Node.js 22 and 24 remain supported.

Package the matching WASM executor when building Fuel Core from a Git branch and invalidate generated executor caches when its bytes change, even if the configured branch name remains the same.

Scope panic error decoding to the reverting program using its receipt's contract ID, preserving the primary contract's identity across call results. Contracts with the same panic index now report their own message and source location. If the program's ABI is unavailable, retain the generic revert reason instead of using another program's panic entry.

The default local-node snapshot now uses the V7 gas-cost table shipped in the Core 0.48.3 binary. Snapshot gas costs accept either V4 or V7; code that reads `gas_costs.V4` directly must first narrow the variant. Explicit V4 snapshots remain supported; partial V4 overrides retain the SDK’s previous V4 defaults, including nested operations. Empty overrides retain the new V7 defaults. Recompiling Sway with Forc 0.72.1 can change bytecode, gas usage and dynamic-bytes hashes, and older source may need standard-library migrations.

chore(deps)!: update Fuel-owned dependencies and toolchains
