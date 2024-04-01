# Unit conversion

It is often necessary to convert between values that are easily understood by humans (such as ether) and the machine-readable form that is used by contracts (such as wei).

## Parsing

Parsing string-represented numbers has never been easier, using the `parseUnits` function.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#parse-units-1{ts:line-numbers}

We can parse large numbers.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#parse-units-2{ts:line-numbers}

Or numbers formatted for human readability.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#parse-units-3{ts:line-numbers}

We can also parse numbers in other units of measure.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#parse-units-4{ts:line-numbers}

## Formatting

We can format common units of measure using the `format` function.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#format-1{ts:line-numbers}

Also, with a varied degree of precision.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#format-2{ts:line-numbers}

## Format units

We can format common units of measure using the `formatUnits` function.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#format-units-1{ts:line-numbers}


<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#format-units-2{ts:line-numbers}
