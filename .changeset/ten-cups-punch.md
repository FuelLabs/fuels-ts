---
"@fuel-ts/account": minor
"fuels": minor
---

- Implemented transaction signing through an Account
- Add signers to a transaction request through `addSigner` or `addSigners`
- Renamed `createWitness` -> `addEmptyWitness` and implemented `addWitness`