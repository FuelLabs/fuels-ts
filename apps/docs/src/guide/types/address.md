# Address

In Sway, the [`Address`](DOCS_API_URL/classes/_fuel_ts_address.Address.html) type serves as a type-safe wrapper around the primitive `B256` type. The SDK takes a different approach and has its own abstraction for the [Address](DOCS_API_URL/classes/_fuel_ts_address.Address.html) type.

## Address Class

The [`Address`](DOCS_API_URL/classes/_fuel_ts_address.Address.html) class also provides a set of utility functions for easy manipulation and conversion between address formats along with one property; `b256Address`, which is of the [`B256`](./b256.md) type.

<<< @/../../../packages/address/src/address.ts#address-2{ts:line-numbers}

## Creating an Address

There are several ways to create an [`Address`](DOCS_API_URL/classes/_fuel_ts_address.Address.html) instance:

### From a b256 address

To create an [`Address`](DOCS_API_URL/classes/_fuel_ts_address.Address.html) from a 256-bit address, use the following code snippet:

<<< @./snippets/address/from-a-b256.ts#full{ts:line-numbers}

### From a Public Key

To create an [`Address`](DOCS_API_URL/classes/_fuel_ts_address.Address.html) from a public key, use the following code snippet:

<<< @./snippets/address/from-a-public-key.ts#full{ts:line-numbers}

### From an EVM Address

To create an [`Address`](DOCS_API_URL/classes/_fuel_ts_address.Address.html) from an EVM address, use the following code snippet:

<<< @./snippets/address/from-an-evm-address.ts#full{ts:line-numbers}

### From an existing Address

To create an [`Address`](DOCS_API_URL/classes/_fuel_ts_address.Address.html) from an existing [`Address`](DOCS_API_URL/classes/_fuel_ts_address.Address.html) instance, use the following code snippet:

<<< @./snippets/address/from-an-existing-address.ts#full{ts:line-numbers}

## Utility functions

### `equals`

As you may already notice, the `equals` function can compare addresses instances:

<<< @./snippets/address/utilities-function-equals.ts#full{ts:line-numbers}

### `toChecksum`

To convert an address to a checksum address, use the `toChecksum` function:

<<< @./snippets/address/utilities-function-to-checksum.ts#full{ts:line-numbers}
