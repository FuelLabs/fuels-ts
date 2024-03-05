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

Notice how the `Predicte` constructor now accepts an _object_ with the following properties:

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

The `setData` method has also been renamed to `setInputData`, to better reflect its purpose and for consistency with the parameter on the `Predicate` constructor.

```ts
// old API
predicate.setData(yourData);

// new API
predicate.setInputData(yourData);
```
