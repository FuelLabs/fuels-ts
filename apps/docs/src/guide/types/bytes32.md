# Bytes32

In Sway and the FuelVM, `Bytes32` represents hashes. They hold a 256-bit (32-byte) value.

These are the main ways of creating a `Bytes32`:

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#byte32{ts:line-numbers}

> **Note:** In Fuel, there's a special type called `b256`, which is similar to `Bytes32`; also used to represent hashes, and it holds a [256 Bit](./bits256.md) value.
