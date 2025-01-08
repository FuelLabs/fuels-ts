# Address

In Sway, the [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) type serves as a type-safe wrapper around the primitive `b256` type. The SDK takes a different approach and has its own abstraction for the [Address](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) type.

## Address Class

The [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) class also provides a set of utility functions for easy manipulation and conversion between address formats along with one property; `b256Address`, which is of the [`B256`](./bits256.md) type.

<<< @/../../../packages/address/src/address.ts#address-2{ts:line-numbers}

## Creating an Address

There are several ways to create an [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) instance:

### From a b256 address

To create an [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) from a 256-bit address, use the following code snippet:

<<< @./snippets/address/from-a-b256.ts#full{ts:line-numbers}

### From a Public Key

To create an [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) from a public key, use the following code snippet:

<<< @./snippets/address/from-a-public-key.ts#full{ts:line-numbers}

## Utility Functions

The [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) class also provides some practical utility functions:

1. `fromString`: Create a new [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) from an ambiguous source that may be a `B256` address:

<<< @./snippets/address/utilities-function-1.ts#full{ts:line-numbers}

2. `fromDynamicInput`: Create a new [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) when the address source is unknown:

<<< @./snippets/address/utilities-function-2.ts#full{ts:line-numbers}

3. `equals:` As you may already notice, the `equals` function can compare addresses instances:

<<< @./snippets/address/utilities-function-3.ts#full{ts:line-numbers}
