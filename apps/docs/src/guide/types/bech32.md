# Bech32

The `Bech32Address` enables the use of addresses and contract ids in the bech32 format (using bech32m). They can easily be converted to their counterparts using [Address](./address.md).

Here are the main ways of creating a `Bech32Address`

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#Address-bech32{ts:line-numbers}

> **Note:** when using a `Bech32Address` with an `Address` the HRP (Human-Readable Part) is set to **"fuel"** per default:

<<< @/../../../packages/interfaces/src/index.ts#Bech32-HRP{ts:line-numbers}
