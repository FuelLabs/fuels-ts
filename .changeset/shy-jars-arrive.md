---
"@fuel-ts/account": minor
"@fuel-ts/program": minor
---

- For a contract call, reduced the number of dry run calls before the call from 4 to 1
- For a contract simulation, reduced the number of dry run calls before the simulation from 3 to 1
- Optimized predicate estimation so that there are no calls to the node if all predicates in a transaction have been estimated
- For a transfer of funds from a predicate, eliminated need for dry runs (previously two were happening)
- `Predicate.estimateTxDependencies` now returns receipts which are used for the purposes of the optimizations mentioned above
- `BaseInvocationScope.fundWithRequiredCoins` now calculates the `fee` parameter internally so it was removed from the function signature
