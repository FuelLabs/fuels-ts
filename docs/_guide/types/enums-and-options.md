# Enums

Here is an example of some `Enums` in Sway:
[@code:rust](./packages/fuel-gauge/test-projects/coverage-contract/src/main.sw#typedoc:Enum)

And the same structures represented in TypeScript, note that an `Enum` is essentially an `Object` in TypeScript.

Here is `SmallEnum`
[@code:typescript](./packages/fuel-gauge/src/coverage-contract.test.ts#typedoc:Enum-small)

Here is `BigEnum`
[@code:typescript](./packages/fuel-gauge/src/coverage-contract.test.ts#typedoc:Enum-big)

## Options

Sway supports the concept of the `Option` container, which allows for a variable to be either set with an expected value or to be exclusively marked as "no-value" (with an `undefined` in the case of TypeScript).

The `Option` is a special wrapper type of `Enum`.

This example shows that an input param with type `OptionalStringInput` can either be a `string` value or `undefined`

```typescript
type OptionalStringInput = Option<string>;

let someInput: OptionalStringInput = "dogs";
let noneInput: OptionalStringInput = undefined;
```

To help us understand how the TS-SDK handles Optional params, take this Sway method that expects three optional params which it attempts to add together.
[@code:rust](./packages/fuel-gauge/test-projects/coverage-contract/src/main.sw#typedoc:Option-echo_option_three_u8)

Using this Contract, our Optional params can either be the values expected, like so:
[@code:typescript](./packages/fuel-gauge/src/coverage-contract.test.ts#typedoc:Option-Some)

Or we can supply a partial list, where unsupplied values are converted to `Option<None>` (or `undefined`):
[@code:typescript](./packages/fuel-gauge/src/coverage-contract.test.ts#typedoc:Option-None)
