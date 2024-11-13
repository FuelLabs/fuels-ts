# String

In Sway, strings are statically-sized, which means you must define the size of the string beforehand. Statically-sized strings are represented using the `str[x]` syntax, where `x` indicates the string's size.
This guide explains how to create and interact with statically-sized strings while using the SDK.

## Creating Statically-Sized Strings

<<< @/../../docs/src/snippets/types/string.ts#string-1{ts:line-numbers}

## Interacting with Statically-Sized Strings in Contract Methods

When a contract method accepts and returns a `str[8]`, the corresponding SDK wrapper method will also take and return a string of the same length. You can pass a string to the contract method like this:

<<< @/../../docs/src/snippets/types/string.ts#string-2{ts:line-numbers}

When working with statically-sized strings, ensure that the input and output strings have the correct length to avoid erroneous behavior.

If you pass a string that is either too long or too short for a contract method, the call will fail like this:

<<< @/../../docs/src/snippets/types/string.ts#string-3{ts:line-numbers}
