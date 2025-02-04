# Bytes

A dynamic array of byte values can be represented using the `Bytes` type, which represents raw bytes.

## Using Bytes

The `Bytes` type can be integrated with your contract calls. Consider the following contract that can compare and return a `Bytes`:

<<< @/../../docs/sway/echo-bytes/src/main.sw#bytes-1{ts:line-numbers}

A `Bytes` array can be created using a native JavaScript array of numbers or Big Numbers, and sent to a Sway contract:

<<< @./snippets/bytes.ts#snippet-1{ts:line-numbers}
