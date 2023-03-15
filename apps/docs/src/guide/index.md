<script setup>
  import { data } from '../versions.data'
  const { forc, sway, fuels, fuelCore } = data
</script>

# The Fuel TypeScript SDK Guide

TypeScript SDK for Fuel. It can be used for a variety of things, including but not limited to:

- Compiling, deploying, and testing [Sway](https://github.com/FuelLabs/sway) contracts;
- Use the [Testnet](./providers/connecting-to-an-external-node.md) or run a local Fuel node;
- Crafting and signing transactions with hand-crafted scripts or contract calls;
- Generating type-safe TypeScript bindings of contract ABI methods;
- And more. `fuels-ts` is still in active development.

This book is an overview of the different things one can achieve using the TypeScript SDK, and how to implement them. Keep in mind that both the SDK and the documentation are works-in-progress!

#### Version Notice: Docs generated using Fuels `v{{fuels}}`, Fuel Core `v{{fuelCore}}`, Sway `v{{sway}}`, and Forc `v{{forc}}`.

[The Fuel TypeScript SDK](../index.md)

See also the main [The Fuel TypeScript SDK](../index.md) and [Contributing](https://github.com/FuelLabs/fuels-ts/blob/master/CONTRIBUTING.md) pages for additional resources.
