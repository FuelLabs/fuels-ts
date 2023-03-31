# Structs

A `struct` in Sway is equivalent to an `Object` in TypeScript, where the property names and types must match what is defined in Sway.

Here is an example of the `struct` in Sway:

<<< @/../../../packages/fuel-gauge/test-projects/coverage-contract/src/main.sw#ComplexStruct{rust:line-numbers}

And the same structure represented in TypeScript:

<!-- TODO: stop using hardcoded snippets -->

```ts:line-numbers
type ComplexStruct {
    foo: u8,
    bar: u64,
    baz: str[9],
}

let myStruct: ComplexStruct = {
  foo: 1,
  bar: 11337n,
  baz: "123456789",
};
```
