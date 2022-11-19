# Address

`Address` is a wrapper on `Bytes32` and `Bech32` (see [Address documentation](../../packages/fuel-ts-address/)). The available interface of the TS-SDK Address contains many useful functions to switch between Address formats:

[@code:typescript](./packages/interfaces/src/index.ts#typedoc:AbstractAddress)

These are the main ways of creating an `Address`

From a [Bech32](./bech32.md) Address:

[@code:typescript](./packages/fuel-gauge/src/doc-examples.test.ts#typedoc:Address-bech32)

From a Public Key:

[@code:typescript](./packages/fuel-gauge/src/doc-examples.test.ts#typedoc:Address-publicKey)

From a [256 Bit Address](./bits256.md) Address:

[@code:typescript](./packages/fuel-gauge/src/doc-examples.test.ts#typedoc:Address-b256)

You can also use a number of utilities as part of the Address Class:

[@code:typescript](./packages/fuel-gauge/src/doc-examples.test.ts#typedoc:Address-utils)
