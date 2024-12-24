<script setup>
  import { data } from '../../versions.data'
  const { fuels } = data
</script>

# Installation

You must install the [Fuel Toolchain](https://docs.fuel.network/guides/installation/) before using this library.

Then add the `fuels` dependency to your project:

::: code-group

```sh-vue [bun]
bun add fuels@{{fuels}}
```

```sh-vue [pnpm]
pnpm add fuels@{{fuels}}
```

```sh-vue [npm]
npm install fuels@{{fuels}} --save
```

:::

Now you are ready to:

- [Connect to the Network](./connecting-to-network.md)
