# `@fuel-ts/versions`

**@fuel-ts/versions** is a sub-module for interacting with **Fuel**.

It automatically assembles all compatible versions of the Fuel toolchain curentlu in use across the packages.

This includes:

- `FUELS_TS_SDK` — comes from `packages/fuels/package.json`
- `FUEL_CORE` — comes from `services/fuel-core/Dockerfile`
- `FORC` — comes from `packages/forc-bin/package.json`

This should be an automatic build step, which require'sa commit to be made.

There is a `prebuild` script to ensure this file never goes outdated.

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

## Usage

TODO: Add CLI usage

### Installation

```sh
yarn add @fuel-ts/versions
# or
npm add @fuel-ts/versions
```

### Full SDK Installation

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
