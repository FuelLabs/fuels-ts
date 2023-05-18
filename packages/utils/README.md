# `@fuel-ts/utils`

**@fuel-ts/utils** is a sub-module for interacting with **Fuel**.

It's a collection of utilities and test utilities that may be useful in other places.

# Table of contents

- [Documentation](#documentation)
- [Usage](#usage)
  - [Installation](#installation)
  - [Full SDK Installation](#full-sdk-installation)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Documentation

See [Fuel-ts Documentation](https://fuellabs.github.io/fuels-ts/packages/fuel-ts-utils/)

## Installation

```sh
yarn add @fuel-ts/utils
# or
npm add @fuel-ts/utils
```

### Utilities

```ts
import { normalizeString } from "@fuel-ts/utils";

console.log(normalizeString("fuel-labs"));
// FuelLabs
```

### Test Utilities

```ts
import { safeExec } from "@fuel-ts/utils/test"; // note the `test` suffix

console.log(safeExec(() => 123));
// { error: null, result: 123 }

console.log(
  safeExec(() => {
    throw new Error("Some error");
  })
);
// { error: (Error: 'Some error'), result: null }
```

## Contributing

In order to contribute to `@fuel-ts/utils`, please see the main [fuels-ts](https://github.com/FuelLabs/fuels-ts) monorepo.

## Changelog

The `@fuel-ts/utils` changelog can be found at [CHANGELOG](./CHANGELOG.md).

## License

The primary license for `@fuel-ts/utils` is `Apache 2.0`, see [LICENSE](./LICENSE).
