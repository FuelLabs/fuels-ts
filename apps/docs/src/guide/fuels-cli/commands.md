<script setup>
  import { data } from '../../versions.data'
  const { fuels, forc, fuelCore } = data
</script>

# Commands

The `fuels` CLI consists of a couple of commands.

## `fuels init`

```console-vue
npx fuels@{{fuels}} help init
```

```console
Options:
  -w, --workspace <path>          Relative dir path to Forc workspace
  -c, --contracts <path|global>   Relative path/globals to  Contracts
  -s, --scripts <path|global>     Relative path/globals to  Scripts
  -p, --predicates <path|global>  Relative path/globals to  Predicates
  -o, --output <path>             Relative dir path for Typescript generation
```

Creating a sample `fuel.config.ts` file:

```console-vue
npx fuels@{{fuels}} init --contracts ./my-contracts/* --output ./src/sway-contracts-api
```

Using [Forc workspaces](https://docs.fuel.network/docs/forc/workspaces/)? Try this instead:

```console-vue
npx fuels@{{fuels}} init --workspace ./sway-programs --output ./src/sway-programs-api
```

This will give you a minimal configuration:

<<< @/../../demo-fuels/fuels.config.minimal.ts#config{ts:line-numbers}

In a nutshell:

```sh
.
├── sway-programs # <— forc workspace
├── src
│   └── sway-programs-api # <— output
├── fuels.config.ts
└── package.json
```

### See more

- [Forc workspaces](https://docs.fuel.network/docs/forc/workspaces/)

## `fuels build`

```console-vue
npx fuels@{{fuels}} help build
```

```console
Options:
  --path <path>  Path to project root (default: "/Users/anderson/Code/fuel/fuels-ts/apps/docs")
  -d, --deploy       Deploy contracts after build (auto-starts a `fuel-core` node if needed)
  -h, --help         Display help
```

Examples:

```console-vue
npx fuels@{{fuels}} build
```

1.  Build all Sway programs under your `workspace` using `forc` <sup>[1](https://docs.fuel.network/docs/forc/commands/forc_build/)</sup>
1.  Generate types for them using `fuels-typegen` <sup>[2](#fuels-typegen)</sup>

```console-vue
npx fuels@{{fuels}} build --deploy
```

Using the `--deploy` flag will additionally:

1. Auto-start a short-lived `fuel-core` node if _needed_ ([docs](./config-file.md#autostartfuelcore))
1. Run `deploy` on that node

> _This is useful when working with contracts because a contract's ID is generated only on deployment._

## `fuels deploy`

```console-vue
npx fuels@{{fuels}} deploy
```

The `fuels deploy` command does two things:

1. Deploy all Sway contracts under `workspace`.
1. Saves their deployed IDs to:
   - _`./src/sway-programs-api/contract-ids.json`_

```json
{
  "myContract1": "0x..",
  "myContract2": "0x.."
}
```

Use it when instantiating your contracts:

<<< @/../../demo-fuels/src/index.test.ts#using-generated-files{ts:line-numbers}

For a complete example, see:

- [Using Generated Types](./using-generated-types.md)

### Proxy Contracts Deployment

Automatic deployment of proxy contracts can be enabled in `Forc.toml`.

For more info, please check these docs:

- [Proxy Contracts](https://docs.fuel.network/docs/forc/plugins/forc_client/#proxy-contracts)
- [Sway Libs / Upgradability Library](https://docs.fuel.network/docs/sway-libs/upgradability/#upgradability-library)
- [Sway Standards / SRC-14 - Simple Upgradable Proxies](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/#src-14-simple-upgradeable-proxies)

## `fuels dev`

```console-vue
npx fuels@{{fuels}} dev
```

The `fuels dev` command does three things:

1. Auto-start a short-lived `fuel-core` node ([docs](./config-file.md#autostartfuelcore))
1. Runs `build` and `deploy` once at the start
1. Watches your Forc workspace and repeats the previous step on every change

> _In `dev` mode, every time you update a contract on your Forc `workspace`, we re-generate type definitions and factory classes for it, following your pre-configured [`output`](./config-file.md#output) directory. If it's part of another build system running in dev mode (i.e. `next dev`), you can expect it to re-build / auto-reload as well._

## `fuels node`

```console-vue
npx fuels@{{fuels}} node
```

Starts a short-lived `fuel-core` node, and a requires `fuels.config.ts` config file.

Generate one with [`fuels init`](#fuels-init):

<<< @/../../demo-fuels/fuels.config.minimal.ts#config{ts:line-numbers}

## `fuels typegen`

Manually generates type definitions and factory classes from ABI JSON files.

```console-vue
npx fuels@{{fuels}} help typegen
```

```console
Options:
  -i, --inputs <path|glob...>  Input paths/globals to your Abi JSON files
  -o, --output <dir>           Directory path for generated files
  -c, --contract               Generate types for Contracts [default]
  -s, --script                 Generate types for Scripts
  -p, --predicate              Generate types for Predicates
  -S, --silent                 Omit output messages
```

For more info, check:

- [Generating Types from ABI](./generating-types.md)

## `fuels versions`

Check for version incompatibilities between your [Fuel Toolchain](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/#the-fuel-toolchain) component versions, matching them against the ones supported by the Typescript SDK version that you have.

```console-vue
npx fuels@{{fuels}} versions
```

```console-vue
┌───────────┬───────────┬────────────────┬─────────────┐
│           │ Supported │ Yours / System │ System Path │
├───────────┼───────────┼────────────────┼─────────────┤
│ Forc      │ {{forc}}    │ {{forc}}         │ forc        │
├───────────┼───────────┼────────────────┼─────────────┤
│ Fuel-Core │ {{fuelCore}}    │ {{fuelCore}}         │ fuel-core   │
└───────────┴───────────┴────────────────┴─────────────┘

You have all the right versions! ⚡
```
