# `fuelchain`

**fuelchain** is a CLI to help you to build Types from a ABI JSON. This package is a fork from the original
[TypeChain tool](https://github.com/dethcrypto/TypeChain).

# Table of contents

- [Documentation](#documentation)
- [Usage](#usage)
  - [Installation](#installation)
  - [How to use](#how-to-use)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Documentation

See [Fuel-ts Documentation](https://fuellabs.github.io/fuels-ts/packages/fuel-ts-contract/)

## Usage

### Installation

```sh
yarn add fuelchain typechain-target-fuels
# or
npm add fuelchain typechain-target-fuels
```

### How to use

```
npx fuelchain --target=typechain-target-fuels --out-dir=src/types out/debug/*-abi.json
```

## Contributing

In order to contribute to `fuelchain`, please see the main [fuels-ts](https://github.com/FuelLabs/fuels-ts) monorepo.

## Changelog

The `fuelchain` changelog can be found at [CHANGELOG](./CHANGELOG.md).

## License

The primary license for `fuelchain` is `Apache 2.0`, see [LICENSE](./LICENSE).
