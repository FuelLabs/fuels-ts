# Fuels CLI

The quickest way to build full stack Fuel dApps.

- [`fuels init`](./commands.md#fuels-init) — Creates a new `fuels.config.ts` file
- [`fuels build`](./commands.md#fuels-build) — Build `forc` workspace and generate Typescript types for everything
- [`fuels deploy`](./commands.md#fuels-deploy) — Deploy workspace contracts and save their IDs to JSON file
- [`fuels dev`](./commands.md#fuels-dev) — Start local Fuel Core _node_ and `build` + `deploy` on every file change

## Getting started

Imagine you have this file structure:

```sh
my-fuel-dapp # NextJS app or similar
├── sway-programs # Forc's workspace
│   ├── src
│   ├── ...
│   └── Forc.toml
├── public
│   └── ...
├── src
│   ├── app
│   ├── ...
├   └── sway-programs-api # Type-safe generated API
└── package.json
```

## Installation

Add it to your `my-fuel-dapp` project:

::: code-group

```console [npm]
npm install fuels --save
```

```console [pnpm]
pnpm add fuels
```

:::

## Double-checking

```console
npx fuels -v
```

## Next Step

Use [`pnpm fuels init`](./commands#init) to create a [`fuel.config.ts`](./config-file) file.
