---
"@fuel-ts/account": patch
---

- Implemented transaction signing through an Account
- Add signers to a transaction request through `addSigner` or `addSigners`
- Renamed `createWitness` -> `addDummyWitness` and implemented `addWitness`
