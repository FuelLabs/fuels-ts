# Arrays

## Passing in arrays

You can pass a JS `Array` into your contract method transparently, allowing passthrough of expected data via the type regardless of Array type. An Array in Sway is fixed in size, so maximum storage size is determined at time of program compile, not during runtime.

An Array is just a Typed Array:

```typescript
// aka [u8; 2]
let basicNumberArray = [1, 23];
// aka [bool; 4]
let basicBooleanArray = [true, false, true, false];
```

## Vectors

If your Array size is unknown until runtime, you can also use [Vectors](./vectors.md)
