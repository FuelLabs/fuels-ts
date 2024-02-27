---
"@fuel-ts/abi-coder": minor
"@fuel-ts/abi-typegen": minor
---

feat: add missing support for the `u256` type

The TS SDK is now capable of handling `u256` types, and hence capable of interacting (encoding/decoding) with any Sway programs that use the `u256` type.

**Breaking Change**:

- The `U64Coder` was removed in favour of the new `BigNumberCoder` which handles the encoding/decoding logic for both `u64` and `u256`. (`abi-coder` package)
