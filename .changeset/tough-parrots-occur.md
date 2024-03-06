---
"@fuel-ts/account": patch
---

- Implemented transaction signing through an Account
- Add signers to a transaction request through `addAccountWitnesses`
- Renamed `createWitness` -> `addEmptyWitness` and implemented `addWitness`
