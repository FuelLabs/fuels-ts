# Address

`Address` is a wrapper on `Bytes32` and `Bech32`. The available interface of the TS-SDK Address contains many useful functions to switch between Address formats:

<<< @/../../../packages/interfaces/src/index.ts#AbstractAddress{ts:line-numbers}

These are the main ways of creating an `Address`

From a [Bech32](./bech32.md) Address:

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#Address-bech32{ts:line-numbers}

From a Public Key:

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#Address-publicKey{ts:line-numbers}

From a [256 Bit Address](./bits256.md) Address:

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#Address-b256{ts:line-numbers}

You can also use a number of utilities as part of the Address Class:

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#Address-utils{ts:line-numbers}
