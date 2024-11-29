# Unit conversion

Internally, we use [Arbitrary-precision](https://mathworld.wolfram.com/ArbitraryPrecision.html) arithmetic (also known as Big Number arithmetic) to allow for the handling of large numbers and different assets.

On the Fuel network, we work with 9 decimals to represent amounts under a unit. This differs from chain to chain, so it is important to know the number of decimals used on the chain you are working with.

> Note: The package [`@fuels/assets`](https://www.npmjs.com/package/@fuels/assets) provides a list of assets and their decimals.

Below we will go over some common use cases for unit conversion.

Using our `BN` class we can instantiate these numbers.

<<< @./snippets/unit-conversion.ts#instantiation-1{ts:line-numbers}

Or using our `bn` utility function.

<<< @./snippets/unit-conversion.ts#instantiation-2{ts:line-numbers}

## Contract calls

Generally, we will need to convert `u64` and `u256` numbers to a `BN` object when passing them to a Sway program from JavaScript. More information on this can be found [here](../types/numbers.md).

<<< @./snippets/unit-conversion.ts#contract-calls-1{ts:line-numbers}

> Note: If a contract call returns a number that is too large to be represented as a JavaScript number, you can convert it to a string using the `toString` method instead of `toNumber`.

## Parsing

Parsing string-represented numbers (from user input) has never been easier, than using the `parseUnits` function.

<<< @./snippets/unit-conversion.ts#parse-units-1{ts:line-numbers}

We can parse large numbers.

<<< @./snippets/unit-conversion.ts#parse-units-2{ts:line-numbers}

Or numbers formatted for human readability.

<<< @./snippets/unit-conversion.ts#parse-units-3{ts:line-numbers}

We can also parse numbers in other units of measure.

<<< @./snippets/unit-conversion.ts#parse-units-4{ts:line-numbers}

## Formatting

We can format common units of measure using the `format` function.

In the following example, we format a BigNumber representation of one Gwei, into units for the Fuel network (with 3 decimal place precision).

<<< @./snippets/unit-conversion.ts#format-1{ts:line-numbers}

We can also format numbers in other units of measure by specifying the `units` variable.

<<< @./snippets/unit-conversion.ts#format-2{ts:line-numbers}

A `precision` variable will allow for the formatting of numbers with a specific number of decimal places.

<<< @./snippets/unit-conversion.ts#format-3{ts:line-numbers}

### Format units

The `formatUnits` function is a lesser alternative to the `format` function, as it will maintain the same precision as the input value.

<<< @./snippets/unit-conversion.ts#format-units-1{ts:line-numbers}

We can also format numbers in other units of measure by specifying the `units` variable.

<<< @./snippets/unit-conversion.ts#format-units-2{ts:line-numbers}

## See also

- [Sway Numbers](../types/numbers.md)

## Full Example

For the full example of unit conversion see the snippet below:

<<< @./snippets/unit-conversion.ts#full{ts:line-numbers}
