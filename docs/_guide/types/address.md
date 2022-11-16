# Address

`Address` is a wrapper on `Bytes32` with similar methods and implements the same traits (see [fuel-types documentation](https://docs.rs/fuel-types/latest/fuel_types/struct.Address.html)). The available interface of the TS-SDK Address contains many useful functions to switch between Address formats:

[@code:typescript](./packages/interfaces/src/index.ts#typedoc:AbstractAddress)

These are the main ways of creating an `Address`

From a [Bech32](./bech32.md) Address:

[@code:typescript](./packages/address/src/address.test.ts#typedoc:Address-bech32)

From a Public Key:

[@code:typescript](./packages/address/src/address.test.ts#typedoc:Address-publicKey)

From a [256 Bit Address](./bits256.md) Address:

[@code:typescript](./packages/address/src/address.test.ts#typedoc:Address-b256)
