---
"@fuel-ts/account": minor
"@fuel-ts/program": minor
---

- Add `outputVariables` and `missingContractIds` to the return of `estimateTxDependencies`
- Removed `estimatedOutputs` from return of `getTransactionCost`
- Add `outputVariables` and `missingContractIds` to the return of `getTransactionCost`
- Avoid reassigning `inputs` and `outputs` from the estimated TX at `BaseInvocationScope`
