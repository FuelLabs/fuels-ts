<script setup>
  import { data } from './versions.data'
  const { forc, fuels, fuelCore } = data
  const url = `https://docs.fuel.network/docs/forc/`
  const logoSrc = './fuel-logo.png'
</script>

# The Fuel TypeScript SDK

The Fuel TypeScript SDK provides methods and utilities in TypeScript, for developing on or interacting with the Fuel network and its [ecosystem](https://docs.fuel.network/docs/intro/what-is-fuel/).

Using the SDK you can:

- Deploy, interact with, and test [Sway](https://docs.fuel.network/docs/sway/) contracts.
- Bootstrap a dApp and local development environment using the [create fuels CLI](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/).
- Generate and import wallets from private key, mnemonic, or JSON and safely store them on the client.
- Craft custom transactions and mutate them by adding resources, policies and signers and submit them.
- Generate types for [Sway programs](https://docs.fuel.network/docs/sway/sway-program-types/) using [typegen](https://docs.fuel.network/docs/fuels-ts/fuels-cli/abi-typegen/) to give end-to-end type safety.

## Version

This documentation was generated using Fuels `v{{fuels}}`, Fuel Core `v{{fuelCore}}`, Sway `v{{forc}}`, and Forc `v{{forc}}`.

## API Documentation

The API documentation for the SDK is available [here](https://fuels-ts-docs-api.vercel.app/).
