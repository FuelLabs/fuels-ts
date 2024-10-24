# Address

In Sway, the [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) type serves as a type-safe wrapper around the primitive `b256` type. The SDK takes a different approach and has its own abstraction for the [Address](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) type.

## `AbstractAddress` Class

The SDK defines the [AbstractAddress](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_interfaces.AbstractAddress.html) class, which provides a set of utility functions for easy manipulation and conversion between address formats.

<<< @/../../../packages/interfaces/src/index.ts#address-1{ts:line-numbers}

## Address Class

Besides conforming to the interface of the [`AbstractAddress`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_interfaces.AbstractAddress.html), the [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) class also defines one property; `bech32Address`, which is of the [`Bech32`](./bech32.md) type.

<<< @/../../../packages/address/src/address.ts#address-2{ts:line-numbers}

## Creating an Address

Thanks to the utility functions provided by the [`AbstractAddress`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_interfaces.AbstractAddress.html) class, there are several ways to create an [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) instance:

### From a `Bech32` Address

To create an [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) from a `Bech32` address, use the following code snippet:

<<< @/../../docs-snippets2/src/types/address/creating-an-address.ts#full{ts:line-numbers}

### From a Public Key

To create an [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) from a public key, use the following code snippet:

<<< @/../../docs-snippets2/src/types/address/from-a-public-key.ts#full{ts:line-numbers}

### From a 256-bit Address

To create an [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) from a 256-bit address, use the following code snippet:

<<< @/../../docs-snippets2/src/types/address/from-a-b256.ts#full{ts:line-numbers}

## Utility Functions

The [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) class also provides some practical utility functions:

1. `fromString`: Create a new [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) from an ambiguous source that may be a `Bech32` or `B256` address:

<<< @/../../docs-snippets2/src/types/address/utilities-function-1.ts#full{ts:line-numbers}

2. `fromDynamicInput`: Create a new [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) when the address source is unknown:

<<< @/../../docs-snippets2/src/types/address/utilities-function-2.ts#full{ts:line-numbers}

3. `equals:` As you may already notice, the `equals` function can compare addresses instances:

<<< @/../../docs-snippets2/src/types/address/utilities-function-3.ts#full{ts:line-numbers}
