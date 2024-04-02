# Unit conversion

Internally, we use [Arbitrary-precision](https://mathworld.wolfram.com/ArbitraryPrecision.html) arithmetic (also known as Big Number arithmetic) to allow for the handling of large numbers. Below we will go over some common use cases for unit conversion.

Using our `BN` class we can instantiate these numbers.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#instantiation-1{ts:line-numbers}

Or using our `bn` utility function.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#instantiation-2{ts:line-numbers}

## Parsing

Parsing string-represented numbers (from user input) has never been easier, than using the `parseUnits`` function.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#parse-units-1{ts:line-numbers}

We can parse large numbers.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#parse-units-2{ts:line-numbers}

Or numbers formatted for human readability.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#parse-units-3{ts:line-numbers}

We can also parse numbers in other units of measure.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#parse-units-4{ts:line-numbers}

## Formatting

We can format common units of measure using the `format` function.

In the following example, we format a BigNumber representation of one Ether, into Gwei units (with 3 decimal place precision).

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#format-1{ts:line-numbers}

We can also format numbers in other units of measure by specifying the `units` variable.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#format-2{ts:line-numbers}

A `precision` variable will allow for the formatting of numbers with a specific number of decimal places.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#format-3{ts:line-numbers}

## Format units

The `formatUnits` function is a lesser alternative to the `format` function, as it will maintain the same precision as the input value.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#format-units-1{ts:line-numbers}

We can also format numbers in other units of measure by specifying the `units` variable.

<<< @/../../docs-snippets/src/guide/utilities/unit-conversion.test.ts#format-units-2{ts:line-numbers}
