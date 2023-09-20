# `@fuel-ts/errors`

**@fuel-ts/errors** is a sub-module for interacting with **Fuel**.

This package contains core utilities regarding throwing errors internally inside of the `fuels-ts` SDK.

# Table of contents

- [Documentation](#documentation)
- [Usage](#usage)
  - [Installation](#installation)
  - [Internal usage](#internal-usage)
  - [Test utilities](#test-utilities)
  - [External usage](#external-usage)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Documentation

<!-- TODO: Replace this link with specific docs for this package if and when we re-introduce a API reference section to our docs -->

See [Fuels-ts Documentation](https://fuellabs.github.io/fuels-ts/)

## Usage

### Installation

```sh
yarn add @fuel-ts/errors
# or
npm add @fuel-ts/errors
```

### Internal usage

```ts
import { FuelError, ErrorCodes } from "@fuel-ts/error";

export function singleImport() {
  throw new FuelError(FuelError.CODES.INVALID_URL, "Invalid URL");
}

export function multipleImports() {
  throw new FuelError(ErrorCodes.INVALID_URL, "Invalid URL");
}
```

### Test Utilities

You can use the `expectToThrowFuelError` test utility when asserting errors.

```ts
// can also be imported from `fuels` when using the umbrella package
import { expectToThrowFuelError } from "@fuel-ts/errors";

import { myFn } from "...";

describe('this and that' () => {
  const code = FuelError.CODES.INVALID_URL;

  it("should throw FuelError", async () => {
    const expected = new FuelError(code);
    await expectToThrowFuelError(() => myFn(), expected);
  });

  it("should throw something else", async () => {
    const expected = new FuelError(code);
    const fn = () => expectToThrowFuelError(() => myFn(), expected)
    await expect(fn).rejects.toThrow('Something else');
  });
})
```

### External usage

```ts
import { FuelError, Provider } from "fuels";

type Locale = "PT_BR" | "BS_BA";

const currentLocale: Locale = "PT_BR";

const i18nDict = {
  PT_BR: {
    [FuelError.CODES.INVALID_URL]: "Endereço inválido",
    [FuelError.CODES.INSUFFICIENT_BALANCE]: "Saldo insuficiente",
  },
  BS_BA: {
    [FuelError.CODES.INVALID_URL]: "Nevažeća adresa",
    [FuelError.CODES.INSUFFICIENT_BALANCE]: "Nedovoljan balans",
  },
};

function translateError(e: unknown) {
  const { code } = FuelError.parse(e);
  return i18nDict[currentLocale][code];
}

function main() {
  try {
    const p = new Provider("0004:tƨoʜlɒɔol//:qttʜ");
    console.log(p);
  } catch (e) {
    const prettyError = translateError(e);
    console.log({ prettyError });
  }
);
```

## Contributing

In order to contribute to `@fuel-ts/errors`, please see the main [fuels-ts](https://github.com/FuelLabs/fuels-ts) monorepo.

## Changelog

The `@fuel-ts/errors` changelog can be found at [CHANGELOG](./CHANGELOG.md).

## License

The primary license for `@fuel-ts/errors` is `Apache 2.0`, see [LICENSE](./LICENSE).
