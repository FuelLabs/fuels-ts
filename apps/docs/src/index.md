<script setup>
  import { data } from './versions.data'
  const { forc, fuels, fuelCore } = data
  const url = `https://docs.fuel.network/docs/forc/`
  const logoSrc = './fuel-logo.png'
</script>

# The Fuel TypeScript SDK

The Fuel TypeScript SDK provides methods and utilities in TypeScript for developing on or interacting with the Fuel network and it's [ecosystem](https://docs.fuel.network/docs/intro/what-is-fuel/).

Using the SDK you can:

- Deploy, interact with, and test [Sway](https://docs.fuel.network/docs/sway/) contracts.
- Generate and import wallets from private key, mnemonic, or JSON and safely store them on the client.
- Craft custom transactions and mutate them by adding resources, policies and signers and submit them.
- Bootstrap a dApp and local development environment using the [Fuels CLI](https://fuellabs.github.io/fuels-ts/guide/fuels-cli/).
- Generate types for [sway programs](https://docs.fuel.network/docs/sway/sway-program-types/) using [typegen](https://docs.fuel.network/docs/fuels-ts/fuels-cli/abi-typegen/) to give end to end type safety.

## Version

This documentation was generated using Fuels `v{{fuels}}`, Fuel Core `v{{fuelCore}}`, Sway `v{{forc}}`, and Forc `v{{forc}}`.
