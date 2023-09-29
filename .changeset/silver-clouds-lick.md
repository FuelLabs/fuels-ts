---
"@fuel-ts/providers": patch
---

Fix a bug in `tx.waitForResult()` where the code would freeze in case a tx was already finalized by the time `waitForResult` was called.
