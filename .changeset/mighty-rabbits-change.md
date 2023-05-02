---
"docs": patch
"@fuel-ts/providers": patch
---

The second param timeParameters in the produceBlocks helper was required until now. This is now an optional param, in line with the GQL API and the Rust SDK.
