<script setup>
  import { data } from '../../versions.data'
  const { fuels } = data
</script>

# Installation

We expect you to install the [Fuel Toolchain](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/#the-fuel-toolchain) before using this library. Follow [this guide](https://docs.fuel.network/guides/installation/) to get this installed.

The next step is to add the `fuels` dependency to your project. You can do this using the following command:

::: code-group

```sh-vue [npm]
npm install fuels@{{fuels}} --save
```

```sh-vue [pnpm]
pnpm add fuels@{{fuels}}
```

```sh-vue [bun]
bun add fuels@{{fuels}}
```

:::

**Note**: Use version `{{fuels}}` to ensure compatibility with `testnet` network—check the [docs](https://docs.fuel.network/guides/installation/#using-the-latest-toolchain).
