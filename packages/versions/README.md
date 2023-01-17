# `@fuel-ts/versions`

**@fuel-ts/versions** is a sub-module for interacting with **Fuel**.

It automatically assembles all supported versions of the Fuel toolchain, including:

- `FUELS` — comes from `packages/fuels/package.json`
- `FUEL_CORE` — comes from `services/fuel-core/Dockerfile`
- `FORC` — comes from `packages/forc-bin/package.json`

There is a `prebuild` script to ensure that the `src/index.ts` file never goes outdated.

Aditionally, the library can be used as a CLI tool to help checking/validating user environments.

# Table of contents

- [Documentation](#documentation)
- [Usage](#usage)
  - [Installation](#installation)
  - [Full SDK Installation](#full-sdk-installation)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Documentation

See [Fuel-ts Documentation](https://fuellabs.github.io/fuels-ts/packages/fuel-ts-versions/)

## Installation

```sh
yarn add @fuel-ts/versions
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
│           │ Supported │ Yours / Symstem │
├───────────┼───────────┼─────────────────┤
│ Forc      │ 0.30.0    │ 0.30.0          │
├───────────┼───────────┼─────────────────┤
│ Fuel-Core │ 0.14.0    │ 0.14.0          │
└───────────┴───────────┴─────────────────┘
```

## Full SDK Installation

Alternatively, we recommend you install the [complete SDK](https://github.com/FuelLabs/fuels-ts) using the umbrella package:

```sh
yarn add fuels
# or
npm add fuels
```

## Contributing

In order to contribute to `@fuel-ts/versions`, please see the main [fuels-ts](https://github.com/FuelLabs/fuels-ts) monorepo.

## Changelog

The `@fuel-ts/versions` changelog can be found at [CHANGELOG](./CHANGELOG.md).

## License

The primary license for `@fuel-ts/versions` is `Apache 2.0`, see [LICENSE](./LICENSE).
