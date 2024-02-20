# Numbers

In Sway, there are multiple types of numbers:

1. `u8` (8-bit unsigned integer)
2. `u16` (16-bit unsigned integer)
3. `u32` (32-bit unsigned integer)
4. `u64` (64-bit unsigned integer)
5. `u256` (256-bit unsigned integer)

Conveniently, all of these types are handled the same way in the TS SDK. This guide explains how to create and interact with Sway numbers while using the SDK.

## Creating Numbers

Just like Ethereum, when you pass in a number to a Sway program from JavaScript, you must first convert it to a `BigNum` object. Here's how you can do that:

<<< @/../../docs-snippets/src/guide/types/numbers.test.ts#numbers-docs-1{ts:line-numbers}

You can also create a number from a string. This is useful when you want to pass in a number that is too large to be represented as a JavaScript number. Here's how you can do that:

<<< @/../../docs-snippets/src/guide/types/numbers.test.ts#numbers-docs-2{ts:line-numbers}

## Interacting with Numbers in Contract Methods

All numerical inputs and outputs to/from Sway program methods are `BigNumber` objects.

<<< @/../../docs-snippets/src/guide/types/numbers.test.ts#numbers-docs-3{ts:line-numbers}

> Note: If a contract call returns a number that is too large to be represented as a JavaScript number, you can convert it to a string using the `.toString()` method instead of `.toNumber()`.
