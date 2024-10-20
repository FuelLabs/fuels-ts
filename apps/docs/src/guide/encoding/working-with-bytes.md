# Working with Bytes

This guide aims to give a high-level overview of how to work with bytes in the SDK and the structures we expect them to take. For a complete overview of ABI Encoding generally, within the Fuel network, we recommend you see the [ABI Encoding documentation](https://docs.fuel.network/docs/specs/abi/).

## Core Types

We know the sizes of all core types at compile time. They are the building blocks of the more complex types and are the most common types you will encounter.

### Unsigned Integer (`u8` / `u16` / `u32` / `u64` / `u128` / `u256`)

Each type will only contain the number of bits specified in the name. For example, a `u8` will contain 8 bits, and a `u256` will contain 256 bits and take up the exact property space with no additional padding.

<<< @/../../docs-snippets/src/guide/encoding/working-with-bytes.test.ts#working-with-bytes-1{ts:line-numbers}

### Boolean

A boolean is encoded as a single byte like a `u8`, its value being either `0` or `1`.

<<< @/../../docs-snippets/src/guide/encoding/working-with-bytes.test.ts#working-with-bytes-2{ts:line-numbers}

### Fixed Length String

A fixed-length string's size is known at compile time due to the argument declaration of `str[n]` with `n` denoting its length. Each character in the string is encoded as a `utf-8` bit.

<<< @/../../docs-snippets/src/guide/encoding/working-with-bytes.test.ts#working-with-bytes-3{ts:line-numbers}

### `b256` / `b512`

These are fixed-length byte arrays, with `b256` containing 256 bits and `b512` containing 512 bits. You can use them for address and signature formats.

<<< @/../../docs-snippets/src/guide/encoding/working-with-bytes.test.ts#working-with-bytes-4{ts:line-numbers}

## Automatically Encoded Types

These are the types that will contain nested types and no additional encoding is required other than the encoding of the nested types. This is relevant to `array`s, `tuple`s, `struct`s, and `enum`s. The only caveat here, is an `enum` will also contain a `u64` representing the `enum` case value. `option`s are encoded in the same way as `enum`s.

<<< @/../../docs-snippets/src/guide/encoding/working-with-bytes.test.ts#working-with-bytes-5{ts:line-numbers}

## Heap types

Heap types are types with a dynamic length that we do not know at compile time. These are `Vec`, `String`, and `raw_slice`. These types are encoded with a `u64` representing the length of the data, followed by the data itself.

<<< @/../../docs-snippets/src/guide/encoding/working-with-bytes.test.ts#working-with-bytes-6{ts:line-numbers}
