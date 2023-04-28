# Bech32

The SDK uses the `Bech32` type as the core property of the `Address` class, specifically through the `bech32Address` property.

Originally designed for Bitcoin, the `Bech32` format offers numerous advantages such as enhanced error detection, simplified integrations, and improved compatibility with future upgrades. Given these benefits, the `Address` class is constructed around the `Bech32` type.

You can read more about the `Bech32` type [here](https://thebitcoinmanual.com/articles/btc-bech32-address/).

## Default Human-Readable Part (HRP)

A `Bech32` address consists of an HRP (Human-Readable Part) followed by the number `1`, which acts as a separator:

<<< @/../../../packages/interfaces/src/index.ts#bech32-1{ts:line-numbers}

A complete `Bech32` address will resemble the following:

<<< @/../../docs-snippets/src/guide/types/bech32.test.ts#bech32-2{5 ts:line-numbers}

The HRP in the example above is `fuel`. This human-readable prefix is included to provide better readability and prevent users from accidentally using addresses on the wrong network.
