---
"@fuel-ts/program": minor
"@fuel-ts/providers": minor
---

- Transaction execution can now be await with the `{awaitExecution: true}` option on `Provider.sendTransaction`
- `BaseInvocationScope` internally now uses `{awaitExecution: true}` to reduce amount of network calls
