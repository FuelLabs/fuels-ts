# StdString

A dynamic string of variable length can be represented using the `StdString` type, also known as a Standard Lib String or `std-lib-string`. It behaves much like a dynamic string in most languages, and is essentially an array of characters.

<<< @/../../docs-snippets/src/guide/types/std-string.test.ts#std-string-1{ts:line-numbers}

## Using a StdString

The `StdString` type can be integrated with your contract calls. Consider the following contract that can compare and return a String:

<<< @/../../docs-snippets/projects/echo-std-string/src/main.sw#std-string-1{ts:line-numbers}

A string can be created using a native JavaScript string, and sent to a Sway contract:

<<< @/../../docs-snippets/src/guide/types/std-string.test.ts#std-string-2{ts:line-numbers}
