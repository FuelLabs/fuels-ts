# Arrays

In Sway, an `Array` is a fixed-size collection of elements of the same type, similar to a `Tuple`. `Arrays` can hold arbitrary types, including non-primitive types, with their size determined at compile time.

## Using Arrays in the SDK

You can pass a TypeScript `Array` into your contract method seamlessly just like you would pass an `Array` to a TypeScript function.

The SDK handles the conversion from TypeScript to Sway in the background, allowing the expected data to be passed through the type regardless of the `Array` type.

An `Array` in Sway is simply a typed `Array`, as demonstrated in the following example:

<<< @/../../docs-snippets2/src/types/arrays.ts#arrays-1{ts:line-numbers}

In Sway, `Arrays` are fixed in size, so the storage size is determined at the time of program compilation, not during runtime.

Let's say you have a contract that takes an `Array` of type `u64` with a size length of 2 as a parameter and returns it:

<<< @/../../docs-snippets2/sway/echo-values/src/main.sw#arrays-2{rust:line-numbers}

To execute the contract call using the SDK, you would do something like this:

<<< @/../../docs-snippets2/src/types/arrays.ts#arrays-3{ts:line-numbers}

You can easily access and validate the `Array` returned by the contract method, as demonstrated in the previous example.

As previously mentioned, Sway `Arrays` have a predefined type and size, so you need to be careful when passing `Arrays` as parameters to contract calls.

Passing an Array with an incorrect size, whether it has more or fewer elements than the specified length, will result in an error:

<<< @/../../docs-snippets2/src/types/arrays.ts#arrays-4{ts:line-numbers}

Similarly, passing an `Array` with an incorrect type will also result in an error:

<<< @/../../docs-snippets2/src/types/arrays.ts#arrays-5{ts:line-numbers}

## Vectors

If your `Array` size is unknown until runtime, consider using the [Vectors](./vectors.md) type, which is more suitable for dynamic-sized collections.

## Full Example

<<< @/../../docs-snippets2/src/types/arrays.ts#full{ts:line-numbers}
