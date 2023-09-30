---
"@fuel-ts/providers": minor
---

bugfix in `TransactionResponse.waitForResult` where iteration happened over `statusChange.__typename` instead of `statusChange.type`
