# `RawSlice`

A dynamic array of values can be represented using the `RawSlice` type. A raw slice can be a value reference or a raw pointer.

## Using a `RawSlice`

The `RawSlice` type can be integrated with your contract calls. Consider the following contract that can compare and return a `RawSlice`:

<<< @/../../docs-snippets2/sway/echo-raw-slice/src/main.sw#raw-slice-1{ts:line-numbers}

A `RawSlice` can be created using a native JavaScript array of numbers or Big Numbers, and sent to a Sway contract:

<<< @/../../docs-snippets2/src/types/raw-slice.ts#raw-slice-2{ts:line-numbers}

## Full Example

<<< @/../../docs-snippets2/src/types/raw-slice.ts#full{ts:line-numbers}
