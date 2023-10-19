# Fuels CLI

The quickest way to build full stack Fuel dApps.

- [`fuels init`](./fuels-init.md) — Creates a new `fuels.config.ts` file
- [`fuels build`](./fuels-build.md) — Build Forc workspace and generate Typescript for everything
- [`fuels deploy`](./fuels-deploy.md) — Deploy Forc workspace and save deployed contract IDs in JSON file
- [`fuels dev`](./fuels-dev.md) — Start a local Fuel _node_ and run `build` + `deploy` on every file change

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

```console
npm install fuels --save
```

## Double-checking

```console
npx fuels -v
```

## Next Step

Use [`pnpm fuels init`](./commands#init) to create a [`fuel.config.ts`](./config-file) file.
