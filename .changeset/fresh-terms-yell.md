---
"@fuel-ts/program": minor
"@fuel-ts/providers": minor
"@fuel-ts/wallet": minor
"@fuel-ts/predicate": minor
---

- Transaction execution can now be await with the `{awaitExecution: true}` option on `Provider.sendTransaction`
- Added same functionality to accounts (unlocked wallet, predicate)
- `BaseInvocationScope` internally now uses `{awaitExecution: true}` to reduce amount of network calls
