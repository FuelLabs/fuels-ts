---
"@fuel-ts/account": minor
---

!feat: accept predicate data on the `Predicate` constructor

This is a _BREAKING_ change since the API for the `Predicate` constructor has changed:

```ts
// old API
const predicate = new Predicate(bytecode, chainId, abi, configurableConstants);

// new API
const predicate = new Predicate(
  bytecode,
  provider,
  abi,
  predicateData,
  configurableConstants,
);
```

Nothing else has changed, the `setData` method is still available for setting the data of a predicate after it has been instantiated.
