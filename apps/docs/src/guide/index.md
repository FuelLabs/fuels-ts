<script setup>
  import { data } from '../versions.data'
  const { forc, fuels, fuelCore } = data
</script>

# The Fuel TypeScript SDK Guide

<!-- This section should explain what the Fuel TS SDK can be used for -->
<!-- fuels_ts:example:start -->

The Fuel TypeScript SDK can be used for a variety of things, including:

- Compiling, deploying, and testing [Sway](https://github.com/FuelLabs/sway) contracts
- Using the testnet or running a local Fuel node
- Crafting and signing transactions with hand-crafted scripts or contract calls
- Generating type-safe TypeScript bindings of contract ABI methods
<!-- fuels_ts:example:end -->

This book is an overview of the different things one can achieve using the TypeScript SDK, and how to implement them. Keep in mind that both the SDK and the documentation are works-in-progress!

#### Version Notice: Docs generated using Fuels `v{{fuels}}`, Fuel Core `v{{fuelCore}}`, Sway `v{{forc}}`, and Forc `v{{forc}}`.

[The Fuel TypeScript SDK](../index.md)

See also the main [The Fuel TypeScript SDK](../index.md) and [Contributing](https://github.com/FuelLabs/fuels-ts/blob/master/CONTRIBUTING.md) pages for additional resources.
