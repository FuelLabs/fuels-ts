---
"@fuel-ts/abi-coder": patch
"@fuel-ts/contract": patch
---

- Add support to `typeArguments` in JSON ABI (implemented in sway 0.18)
- Created our own ParamType as fuel abi is getting more and more different from ETH abi. -> Inspired by `@ethersproject/abi (v5.6.4) - src.ts/fragments.ts`
- Add support to use Arrays of Structs in contract method arguments - ABI
