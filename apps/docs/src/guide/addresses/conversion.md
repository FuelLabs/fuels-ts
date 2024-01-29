# Converting Between Address Formats and Native Types

This guide demonstrates how to convert between address formats and Sway Standard Types using helper functions. Native types are wrappers for bytes, and you can perform conversions between them by leveraging these functions and classes.

## From `Bech32` to `b256`

By instantiating an [`Address`](../../api/Address/Address.md), we can validate a `Bech32` address and easily convert it to a `b256`:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-5{ts:line-numbers}

Or, if you'd prefer to use utility functions directly for validation and conversion, you can use `isBech32` and `toB256`:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-6{ts:line-numbers}

## From `b256` to `Bech32`

In a similar fashion, we have both class functions on the [`Address`](../../api/Address/Address.md) and utilities available for `b256` validation and conversion:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-7{ts:line-numbers}

And by using the `isB256` and `toBech32` utilities:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-8{ts:line-numbers}

## Converting a Contract ID

The Contract `id` property has the [`AbstractAddress`](../types/address#abstractaddress-class) type. Therefore, it can be converted using the [`Address`](../../api/Address/Address.md) class functions such as `toAddress` and `toB256`:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-2{ts:line-numbers}

## Converting a Wallet Address

Similarly, the Wallet `address` property is also of type [`AbstractAddress`](../types/address#abstractaddress-class) and can therefore use the same [`Address`](../../api/Address/Address.md) class functions for conversion:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-3{ts:line-numbers}

## Converting an Asset ID

[Asset IDs](../types/asset-id.md) are a wrapped [b256](../types/bits256.md) value. The following example shows how to create an [`Address`](../../api/Address/Address.md) from a `b256` type:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-4{ts:line-numbers}
