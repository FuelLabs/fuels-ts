# Bytes32

In Sway and the FuelVM, `bytes32` is used to represent hashes. It holds a 256-bit (32-bytes) value.

## Generating Random bytes32 Values

To generate a random `bytes32` value, you can use the `randomBytes` function from the fuels module:

<<< @/../../docs/src/snippets/types/bytes32/generating-random-bytes32.ts#snippet-1{ts:line-numbers}

## Converting Between Byte Arrays and Strings

You can use the `hexlify` function to convert a byte array to a hex string, and the `arrayify` function to convert a hex string back to a byte array:

<<< @/../../docs/src/snippets/types/bytes32/converting-between-byte.ts#snippet-1{ts:line-numbers}

## Working with b256 in Fuel

In Fuel, there is a special type called b256, which is similar to `bytes32`. Like `bytes32`, `b256` is also used to represent hashes and holds a 256-bit value. You can learn more about working with `b256` values in the [Bits256 documentation](./bits256.md).
