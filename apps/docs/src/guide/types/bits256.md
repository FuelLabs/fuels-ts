# `Bits256`

The type `b256` in Fuel represents hashes and holds a 256-bit (32-bytes) value. The TypeScript SDK represents `b256` as a hexlified string value for portability and provides utilities to convert to `Uint8Array` when the [raw bytes](./bytes32.md) are required.

## Generating random `b256` values

To generate a random `b256` value, you can use the `getRandomB256()` function:

<<< @./snippets/bits256/generating-random-b256.ts#full{ts:line-numbers}

### Converting between `b256` and `Uint8Array`

To convert between a `b256` hexlified string and a `Uint8Array`, you can use the `arrayify` and `hexlify` functions:

<<< @./snippets/bits256/converting-between-b256-uint8.ts#full{ts:line-numbers}

## Support from `Address` Class

A `b256` value is also supported as part of the [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) class, providing seamless integration with other components of your application. To create an [`Address`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) instance from a b256 value, use the `Address.fromB256()` method:

<<< @./snippets/bits256/support-from-address-class.ts#full{ts:line-numbers}
