# Address

Addresses and varying address formats are commonplace when interacting with decentralized applications. Furthermore, different networks may enforce different address formats.

The Fuel Network uses the [`Bech32`](../types/bech32.md) address format for its interactions, an example of which can be seen below:

<<< @/../../docs-snippets2/src/types/bech32.ts#addresses-1{ts:line-numbers}

However, a hexlified [Bits256](../types/bits256.md) (hex) is another common address format; an example can be seen below:

<<< @/../../docs-snippets2/src/types/evm-address/creating-an-evm.ts#snippet-2{ts:line-numbers}
apps/

At times, these can even be wrapped in a [Struct](../types/structs.md). Such as an [Asset ID](../types/asset-id.md) or a [EVM Address](../types/evm-address.md):

<<< @/../../docs-snippets2/src/types/evm-address/using-an-evm-address-1.ts#snippet-2{ts:line-numbers}

The TS-SDK makes converting between these addresses simple using the [Address](../types/address.md) helper, which provides various utilities for conversion.

The following [conversion guide](./address-conversion.md#address-conversion) will show how to utilize this class to convert between address formats, as well as Sway Standard Types.

## Address Conversion

This guide demonstrates how to convert between address formats and Sway Standard Types using helper functions. Native types are wrappers for bytes, and you can perform conversions between them by leveraging these functions and classes.

## From `Bech32` to `b256`

By instantiating an [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html), we can validate a `Bech32` address and easily convert it to a `b256`:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-5{ts:line-numbers}

Or, if you'd prefer to use utility functions directly for validation and conversion, you can use `isBech32` and `toB256`:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-6{ts:line-numbers}

## From `b256` to `Bech32`

In a similar fashion, we have both class functions on the [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) and utilities available for `b256` validation and conversion:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-7{ts:line-numbers}

And by using the `isB256` and `toBech32` utilities:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-8{ts:line-numbers}

## Converting a Contract ID

The Contract `id` property has the [`AbstractAddress`](../types/address.md#abstractaddress-class) type. Therefore, it can be converted using the [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) class functions such as `toAddress` and `toB256`:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-2{ts:line-numbers}

## Converting a Wallet Address

Similarly, the Wallet `address` property is also of type [`AbstractAddress`](../types/address.md#abstractaddress-class) and can therefore use the same [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) class functions for conversion:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-3{ts:line-numbers}

## Converting an Asset ID

[Asset IDs](../types/asset-id.md) are a wrapped [b256](../types/bits256.md) value. The following example shows how to create an [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) from a `b256` type:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-4{ts:line-numbers}
