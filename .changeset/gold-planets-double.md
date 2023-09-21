---
"docs": minor
"@fuel-ts/docs-snippets": minor
"@fuel-ts/abi-coder": minor
"@fuel-ts/errors": minor
"@fuel-ts/predicate": minor
"@fuel-ts/program": minor
"@fuel-ts/providers": minor
"@fuel-ts/script": minor
"@fuel-ts/wallet": minor
"@fuel-ts/wallet-manager": minor
---

Remove `chainId` from the `Predicate` constructor. You don't need to pass in `chainId` anymore since you are passing in a `provider` already.
