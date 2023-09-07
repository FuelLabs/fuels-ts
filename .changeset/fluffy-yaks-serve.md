---
"docs": minor
"@fuel-ts/docs-snippets": minor
"@fuel-ts/abi-coder": minor
"@fuel-ts/predicate": minor
"@fuel-ts/program": minor
"@fuel-ts/providers": minor
"@fuel-ts/script": minor
"@fuel-ts/wallet": minor
"@fuel-ts/wallet-manager": minor
---

`chainInfo` is now fetched and cached on all `Provider`s when they are initialized. With this release, you now need to initialize a `Provider` like so:

```ts
const provider = await Provider.connect(url);
```

For the full list of breaking-changes, please see [this PR](https://github.com/FuelLabs/fuels-ts/pull/1181).
