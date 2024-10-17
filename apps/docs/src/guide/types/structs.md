# Structs

In Sway, a `struct` serves a similar purpose as an `Object` in TypeScript. It defines a custom data structure with specified property names and types. The property names and types in the Sway struct must match the corresponding TypeScript definition.

## Example

Here is an example of a `struct` in Sway:

<<< @/../../docs-snippets2/sway/employee-data/src/lib.sw#struct-1{rust:line-numbers}

And here is the equivalent structure represented in TypeScript:

<<< @/../../docs-snippets2/src/types/structs.ts#struct-2{ts:line-numbers}

## Handling Different Data Types

Please note that TypeScript does not have native support for `u8` and `u64` types. Instead, use the `number` type to represent them.

Additionally, TypeScript does not support specifying string length, so just use `string` for the `name`.

In a similar way, since the type `b256` on the SDK is just an hexlified string, we use `string` as well.
