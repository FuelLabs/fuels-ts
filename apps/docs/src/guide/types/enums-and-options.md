# Enums

Here are some examples of `Enums` in Sway:

<<< @/../../../packages/fuel-gauge/test-projects/coverage-contract/src/main.sw#Enum{rust:line-numbers}

And the same structures represented in TypeScript, note that an `Enum` is essentially an `Object` in TypeScript.

Here is `SmallEnum`

<<< @/../../../packages/fuel-gauge/src/coverage-contract.test.ts#Enum-small{ts:line-numbers}

Here is `BigEnum`

<<< @/../../../packages/fuel-gauge/src/coverage-contract.test.ts#Enum-big{ts:line-numbers}

## Options

Sway supports the concept of the `Option` container, which allows for a variable to be either set with an expected value or to be exclusively marked as "no-value" (with an `undefined` in the case of TypeScript).

The `Option` is a special wrapper type of `Enum`.

This example shows that an input param with type `OptionalStringInput` can either be a `string` value or `undefined`

```ts:line-numbers
type OptionalStringInput = Option<string>;

let someInput: OptionalStringInput = "dogs";
let noneInput: OptionalStringInput = undefined;
```

To help us understand how the TS-SDK handles Optional params, take this Sway method that expects three optional params which it attempts to add together.

<<< @/../../../packages/fuel-gauge/test-projects/coverage-contract/src/main.sw#Option-echo_option_three_u8{rust:line-numbers}

Using this Contract, our Optional params can either be the values expected, like so:

<<< @/../../../packages/fuel-gauge/src/coverage-contract.test.ts#Option-Some{ts:line-numbers}

Or we can supply a partial list, where unsupplied values are converted to `Option<None>` (or `undefined`):

<<< @/../../../packages/fuel-gauge/src/coverage-contract.test.ts#Option-None{ts:line-numbers}
