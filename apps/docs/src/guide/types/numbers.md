# Numbers

In Sway, there are multiple primitive number types:

1. `u8` (8-bit unsigned integer)
1. `u16` (16-bit unsigned integer)
1. `u32` (32-bit unsigned integer)
1. `u64` (64-bit unsigned integer)
1. `u256` (256-bit unsigned integer)

This guide explains how to create and interact with Sway numbers while using the SDK.

## Creating Numbers

### For `u64` and `u256`

When you pass in a `u64` or a `u256` to a Sway program from JavaScript, you must first convert it to a `BigNum` object. This is because these types can have extremely large maximum values (`2^64` and `2^256` respectively), and JavaScript's `Number` type can only hold up to 53 bits of precision (`2^53`).

<<< @./snippets/numbers/for-u64-and-u256-1.ts#snippet-1{ts:line-numbers}

You can also create a `BigNum` from a string. This is useful when you want to pass in a number that is too large to be represented as a JavaScript number. Here's how you can do that:

<<< @./snippets/numbers/for-u64-and-u256-2.ts#snippet-1{ts:line-numbers}

### For `u8`, `u16`, and `u32`

You don't need to do anything special to create these numbers. You can pass in a JavaScript number directly. See the examples below for more details.

## Examples: Interacting with Numbers in Contract Methods

### For `u64` and `u256`

<<< @./snippets/numbers/for-u64-and-u256-3.ts#snippet-1{ts:line-numbers}

> Note: If a contract call returns a number that is too large to be represented as a JavaScript number, you can convert it to a string using the `.toString()` method instead of `.toNumber()`.

### For `u8`, `u16`, and `u32`

<<< @./snippets/numbers/for-u8-u16-and-u32-1.ts#snippet-1{ts:line-numbers}

### Using a `BigNum` from `ethers` with `fuels`

<<< @./snippets/numbers/for-u8-u16-and-u32-2.ts#snippet-1{ts:line-numbers}
