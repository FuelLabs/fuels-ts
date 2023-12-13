# Addresses

Addresses and varying address formats are commonplace when interacting with decentralized applications. Furthermore, different networks may enforce different address formats.

The Fuel Network uses the [`Bech32`](../types/bech32.md) address format for its interactions, an example of which can be seen below:

<<< @/../../docs-snippets/src/guide/types/bech32.test.ts#addresses-1{ts:line-numbers}

However, a hexlified [Bits256](../types/bits256.md) (hex) is another common address format; an example can be seen below:

<<< @/../../docs-snippets/src/guide/types/bits256.test.ts#addresses-2{ts:line-numbers}

At times, these can even be wrapped in a [Struct](../types/structs.md). Such as an [Asset ID](../types/asset-id.md) or a [EVM Address](../types/evm-address.md):

<<< @/../../docs-snippets/src/guide/types/evm-address.test.ts#addresses-3{ts:line-numbers}

The TS-SDK makes converting between these addresses simple using the [Address](../types/address.md) helper, which provides various utilities for conversion.

The following [conversion guide](./conversion.md) will show how to utilize this class to convert between address formats, as well as Sway Standard Types.
