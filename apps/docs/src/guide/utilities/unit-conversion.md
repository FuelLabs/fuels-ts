# Unit conversion

Handling of very small and very large numbers is a common task in blockchain development. The SDK provides utility functions to handle these numbers.

## Parse

The `parseUnits` function is used to convert a string for specified units into our internal format.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#parse-units-1{ts:line-numbers}


## Format

We can format common units of measure using the `format` function.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#format-1{ts:line-numbers}

Also, with a varied degree of precision.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#format-2{ts:line-numbers}

## Format units

We can format common units of measure using the `formatUnits` function.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#format-units-1{ts:line-numbers}


<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#format-units-2{ts:line-numbers}
