# String

Currently, all strings in Fuel and Sway are statically-sized, i.e., you must know the size of the string beforehand.

Here's how you can create a simple string using `TypeScript`:

<!-- TODO: stop using hardcoded snippets -->

```ts:line-numbers
// aka str[2]
let stringSize2 = "st";
// aka str[8]
let stringSize8 = "fuel-sdk";
```

If your contract's method takes and returns, a `str[8]`, the SDK wrapper method will take and return a string of same length with validation. You can pass a string to it like this:

<<< @/../../../packages/fuel-gauge/src/coverage-contract.test.ts#String-size8{ts:line-numbers}
