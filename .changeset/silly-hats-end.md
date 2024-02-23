---
"@fuel-ts/abi-coder": patch
"@fuel-ts/abi-typegen": patch
---

feat: add missing support for the `u256` type

The TS SDK is now capable of handling `u256` types, and hence capable of interacting (encoding/decoding) any Sway programs that use the `u256` type.
