---
"@fuel-ts/account": minor
---

!feat: accept predicate data on the `Predicate` constructor

This is a _BREAKING_ change since the API for the `Predicate` constructor has changed:

```ts
// old API
const predicate = new Predicate(bytecode, provider, abi, configurableConstants);

// new API
const predicate = new Predicate({
  bytecode,
  abi, // optional
  provider,
  inputData, // optional
  configurableConstants, // optional
});
```

Notice how the `Predicate` constructor now accepts an _object_ with the following properties:

- `bytecode`: The bytecode of the predicate.
- `abi`: The JSON ABI of the predicate.
- `provider`: The provider for interacting with the predicate.
- `inputData`: The predicate input data (optional).
- `configurableConstants`: The configurable constants for the predicate (optional).

This change was made with readability and ease-of-use in mind, since having too many arguments in a 'flat' constructor can be confusing. Consider a scenario where you want to create a Predicate with configurables but no input data:

```ts
const predicate = new Predicate(
  bytecode,
  provider,
  abi,
  undefined,
  configurableConstants,
);
```

In this case, you would have to pass `undefined` as the `inputData` argument, which is not ideal. By using the object-based constructor, you can now pass an object with the properties you want to set, and the constructor will handle the rest:

```ts
const predicate = new Predicate({
  bytecode,
  abi,
  provider,
  configurableConstants,
});
```

The `setData` method has been removed. If you want to pass in the predicate data _after_ instantiating the `Predicate` or if you want to use a different data than the one passed in the constructor, you will have to create a new `Predicate` instance.
