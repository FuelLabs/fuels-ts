# Vectors

## Passing in vectors

You can pass a JS `Array` into your contract method transparently, allowing passthrough of expected data via the type regardless of Array type.

A basic Vector is just a Typed Array:

```typescript
// aka Vec<u8>
let basicNumberVector = [1, 2, 3];
```

Here is an example of a sample `struct` in Sway:
[@code:rust](./packages/fuel-gauge/test-projects/coverage-contract/src/main.sw#typedoc:ComplexStruct)

And the contract method using this `struct` in a `Vector`:
[@code:rust](./packages/fuel-gauge/test-projects/coverage-contract/src/main.sw#typedoc:Vector-ComplexStruct)

The following code calls this Sway contract method which accepts a `Vec<ComplexStruct>`.
[@code:typescript](./packages/fuel-gauge/src/coverage-contract.test.ts#typedoc:Vector-Struct)

You can use a vector just like you would use any other type -- e.g. a `[Vec<u32>; 2]` or a `SomeStruct<Vec<Bits256>>` etc.

## Returning vectors

This is currently not supported. If you try returning a type that is or contains a vector you will get a compile time error.
