# Bits256

In Fuel, a type called `b256` represents hashes and holds a 256-bit value. The TypeScript SDK represents `b256` as `string` value for portability and can convert to `Uint8Array` as needed when the [raw bytes](./bytes32.md) are required.

Here are some example tools in the SDK:

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#b256{ts:line-numbers}

A Bit256 value is also supported as part of the [Address](./address.md) libraries.

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#Address-b256{ts:line-numbers}
