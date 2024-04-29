# Installation and Prerequisites

## Prerequisites

We expect you to install the [Fuel Toolchain](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/#the-fuel-toolchain) before using this library. Follow [this guide](https://docs.fuel.network/guides/installation/) to get this installed.

## Installation

To begin, you need to add the `fuels` dependency to your project. You can do this using the following command:

::: code-group

```sh-vue [npm]
npm install fuels@{{fuels}} --save
```

```sh-vue [pnpm]
pnpm add fuels@{{fuels}}
```

:::

**Note**: Use version `{{fuels}}` to ensure compatibility with `beta-5` network—check the [docs](https://docs.fuel.network/guides/installation/#using-the-latest-toolchain).

### Note

If you are using bun, you'll need to add a `trustedDependencies` field to your `package.json`:

```json
{
  // ...
  "trustedDependencies": ["@fuel-ts/fuel-core", "@fuel-ts/forc"]
}
```

This is to ensure that bun includes the `fuel-core` and `forc` binaries in your project.

> IMPORTANT: We don't officially support `bun` yet; use it at your own risk.
