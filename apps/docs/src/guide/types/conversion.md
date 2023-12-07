# Converting Between Native Types and Addresses

This guide demonstrates how to convert between `Addresses` and Fuel's native types (`Bytes32`, `b256`) using helper functions. Native types are wrappers for bytes, and you can perform conversions between them by leveraging these functions.

## 1. `Bytes32` and `b256` Conversion

The following example demonstrates how to convert between `Bytes32` and to `b256`:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-1{ts:line-numbers}

## 2. `ContractId`

The Contract `id` property has the [`AbstractAddress`](./address#abstractaddress-class) type. This means that a contract ID can be converted among all the supported conversions from the `AbstractClass`.

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-2{ts:line-numbers}

## 3. Wallet Address

The Wallet `address` property has the [`AbstractAddress`](./address#abstractaddress-class) type. So just like a contract ID, it can be converted among all the supported conversions from the `AbstractClass`.

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-3{ts:line-numbers}

## 4. Asset ID

Asset IDs have the type of [b256](./bits256.md). The following example shows how to create an `Address` from an `b256` type:

<<< @/../../docs-snippets/src/guide/types/conversion.test.ts#conversion-4{ts:line-numbers}

By following this guide, you should now be able to convert between Fuels native types using helper functions.
