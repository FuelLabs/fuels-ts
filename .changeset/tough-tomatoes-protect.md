---
"@fuel-ts/account": patch
"@fuel-ts/errors": patch
---

- Handling `SqueezedOut` status update when calling `submitAndAwait` subscription at `Provider.sendTransaction`
- Handling `SqueezedOut` status update when calling statusChange subscrition at `TransactionResponse.waitForResult`
