# Address

In Sway, the [`Address`](../../api/Address/Address.md) type serves as a type-safe wrapper around the primitive `b256` type. The SDK takes a different approach and has its own abstraction for the [Address](../../api/Address/Address.md) type.

## `AbstractAddress` Class

The SDK defines the [AbstractAddress](../../api/Interfaces/AbstractAddress.md) class, which provides a set of utility functions for easy manipulation and conversion between address formats.

<<< @/../../../packages/interfaces/src/index.ts#address-1{ts:line-numbers}

## Address Class

Besides conforming to the interface of the [`AbstractAddress`](../../api/Interfaces/AbstractAddress.md), the [`Address`](../../api/Address/Address.md) class also defines one property; `bech32Address`, which is of the [`Bech32`](./bech32.md) type.

<<< @/../../../packages/address/src/address.ts#address-2{ts:line-numbers}

## Creating an Address

Thanks to the utility functions provided by the [`AbstractAddress`](../../api/Interfaces/AbstractAddress.md) class, there are several ways to create an [`Address`](../../api/Address/Address.md) instance:

### From a `Bech32` Address

To create an [`Address`](../../api/Address/Address.md) from a `Bech32` address, use the following code snippet:

<<< @./snippets/address/creating-an-address.ts#full{ts:line-numbers}

### From a Public Key

To create an [`Address`](../../api/Address/Address.md) from a public key, use the following code snippet:

<<< @./snippets/address/from-a-public-key.ts#full{ts:line-numbers}

### From a 256-bit Address

To create an [`Address`](../../api/Address/Address.md) from a 256-bit address, use the following code snippet:

<<< @./snippets/address/from-a-b256.ts#full{ts:line-numbers}

## Utility Functions

The [`Address`](../../api/Address/Address.md) class also provides some practical utility functions:

1. `fromString`: Create a new [`Address`](../../api/Address/Address.md) from an ambiguous source that may be a `Bech32` or `B256` address:

<<< @./snippets/address/utilities-function-1.ts#full{ts:line-numbers}

2. `fromDynamicInput`: Create a new [`Address`](../../api/Address/Address.md) when the address source is unknown:

<<< @./snippets/address/utilities-function-2.ts#full{ts:line-numbers}

3. `equals:` As you may already notice, the `equals` function can compare addresses instances:

<<< @./snippets/address/utilities-function-3.ts#full{ts:line-numbers}
