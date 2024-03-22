# Built-In Binaries

`fuels` conveniently ships with `built-in` binaries for [`forc`](https://docs.fuel.network/docs/forc/commands/) and [`fuel-core`](https://docs.fuel.network/guides/running-a-node/running-a-local-node/).

In case you haven't installed [The Fuel Toolchain](#the-fuel-toolchain) _yet_, these will be used.

Here's how to configure this explicitly:

- [`useBuiltinForc`](./config-file.md#usebuiltinforc): `true`
- [`useBuiltinFuelCore`](./config-file.md#usebuiltinfuelcore): `true`

<<< @../../../demo-fuels/fuels.config.explicit-built-in.ts#config-built-in{ts:line-numbers}

You can also call the `built-in` binaries directly:

```console
npx fuels help forc
npx fuels forc --version
npx fuels forc test -h
```

```console
npx fuels help core
npx fuels core --version
npx fuels core run -h
```

Check the docs for `forc` and `fuel-core`:

- [Forc Commands](https://docs.fuel.network/docs/forc/commands/)
- [Running a local Node using `fuel-core`](https://docs.fuel.network/guides/running-a-node/running-a-local-node/)

## The Fuel Toolchain

The Fuel Toolchain consists of several [components](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/).

You can use [`fuel-up`](https://docs.fuel.network/docs/fuelup/installation/) to get it up and running.

Check if it's working correctly with:

```console
forc --version
```

```console
fuel-core --version
```

The `forc` and `fuel-core` binaries will be available in your `system` and `fuels` automatically prioritize them instead of the `built-in` ones.

Here's how to configure this explicitly:

- [`useBuiltinForc`](./config-file.md#usebuiltinforc): `false`
- [`useBuiltinFuelCore`](./config-file.md#usebuiltinfuelcore): `false`

<<< @../../../demo-fuels/fuels.config.explicit-system.ts#config-system{ts:line-numbers}
