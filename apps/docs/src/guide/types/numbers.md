# Numbers

In Sway, there are multiple types of numbers:

1. `u8` (8-bit unsigned integer)
2. `u16` (16-bit unsigned integer)
3. `u32` (32-bit unsigned integer)
4. `u64` (64-bit unsigned integer)
5. `u256` (256-bit unsigned integer)

This guide explains how to create and interact with Sway numbers while using the SDK.

> Note: The TS SDK does not have support for the `u256` type yet.

## Creating Numbers

### For `u64`

When you pass in a `u64` to a Sway program from JavaScript, you must first convert it to a `BigNum` object. Here's how you can do that:

<<< @/../../docs-snippets/src/guide/types/numbers.test.ts#numbers-docs-1{ts:line-numbers}

You can also create a `BigNum` from a string. This is useful when you want to pass in a number that is too large to be represented as a JavaScript number. Here's how you can do that:

<<< @/../../docs-snippets/src/guide/types/numbers.test.ts#numbers-docs-2{ts:line-numbers}

### For `u8`, `u16`, `u32` and `u64`

You don't need to do anything special to create these numbers. You can pass in a JavaScript number directly. See the examples below for more details.

## Examples: Interacting with Numbers in Contract Methods

### For `u64`

<<< @/../../docs-snippets/src/guide/types/numbers.test.ts#numbers-docs-3{ts:line-numbers}

> Note: If a contract call returns a number that is too large to be represented as a JavaScript number, you can convert it to a string using the `.toString()` method instead of `.toNumber()`.

### For `u8`, `u16`, `u32` and `u64`

<<< @/../../docs-snippets/src/guide/types/numbers.test.ts#numbers-docs-4{ts:line-numbers}

### Using a `BigNum` from `ethers` with `fuels`

<<< @/../../docs-snippets/src/guide/types/numbers.test.ts#numbers-docs-5{ts:line-numbers}
