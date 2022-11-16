# Bech32

The `Bech32Address` enables the use of addresses and contract ids in the bech32 format (using bech32m). They can easily be converted to their counterparts using [Address](./address.md).

Here are the main ways of creating a `Bech32Address`
[@code:typescript](./packages/address/src/address.test.ts#typedoc:Address-bech32)

> **Note:** when using a `Bech32Address` with an `Address` the HRP (Human-Readable Part) is set to **"fuel"** per default:

[@code:typescript](./packages/interfaces/src/index.ts#typedoc:Bech32-HRP)
