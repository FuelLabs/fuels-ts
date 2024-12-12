# `@fuel-ts/versions`

**@fuel-ts/versions** is a sub-module for interacting with **Fuel**.

It automatically assembles all supported versions of the Fuel toolchain, including:

- `FUELS` — comes from `/packages/fuels/package.json`
- `FUEL_CORE` — comes from `/internal/fuel-core/VERSION`
- `FORC` — comes from `/internal/forc/VERSION`

There is a `prebuild` script to ensure that the `src/index.ts` file never goes outdated.

Additionally, the library can be used as a CLI tool to help checking/validating user environments.

# Table of contents

- [Documentation](#documentation)
- [Installation](#installation)
  - [Programmatic Usage](#programmatic-usage)
  - [CLI Usage](#cli-usage)
- [Full SDK Installation](#full-sdk-installation)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Documentation

<!-- TODO: Replace this link with specific docs for this package if and when we re-introduce a API reference section to our docs -->

See [Fuels-ts Documentation](https://docs.fuel.network/docs/fuels-ts/)

## Installation

```sh
pnpm add @fuel-ts/versions
# or
npm add @fuel-ts/versions
```

### Programmatic Usage

```ts
import { versions } from "@fuel-ts/versions";

console.log(versions);
// { FUELS: '0.21.2', FUEL_CORE: '0.14.0', FORC: '0.30.0' }
```

### CLI Usage

```console
$ npx fuels-versions
You have all the right versions! ⚡
┌───────────┬───────────┬─────────────────┐
│           │ Supported │ Yours / System  │
├───────────┼───────────┼─────────────────┤
│ Forc      │ 0.30.0    │ 0.30.0          │
├───────────┼───────────┼─────────────────┤
│ Fuel-Core │ 0.14.0    │ 0.14.0          │
└───────────┴───────────┴─────────────────┘
```

## Full SDK Installation

Alternatively, we recommend you install the [complete SDK](https://github.com/FuelLabs/fuels-ts) using the umbrella package:

```sh
pnpm add fuels
# or
npm add fuels
```

## Contributing

In order to contribute to `@fuel-ts/versions`, please see the main [fuels-ts](https://github.com/FuelLabs/fuels-ts) monorepo.

## Changelog

The `@fuel-ts/versions` changelog can be found at [CHANGELOG](./CHANGELOG.md).

## License

The primary license for `@fuel-ts/versions` is `Apache 2.0`, see [LICENSE](./LICENSE).
