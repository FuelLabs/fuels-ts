# `@fuel-ts/abi-typegen`

Generate TypeScript bindings for [Sway](https://github.com/fuellabs/sway) smart contracts.

See the full ABI-spec [here](https://github.com/FuelLabs/fuel-specs/blob/master/src/abi/json-abi-format.md).

# Table of contents

- [Documentation](#documentation)
- [Installation](#installation)
- [Help](#help)
- [Generating Types](#generating-types)
- [Programmatic API](#programmatic-api)
  - [Full SDK Installation](#full-sdk-installation)
- [Type's Conversion Table](#types-conversion-table)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Documentation

See [Fuels-ts Documentation](https://docs.fuel.network/docs/fuels-ts/fuels-cli/abi-typegen/)

## Installation

```sh
pnpm add @fuel-ts/abi-typegen
# or
npm add @fuel-ts/abi-typegen
```

## Help

```console
$ fuels-typegen -h

Generate Typescript from Sway ABI JSON files

Usage: fuels-typegen [options]

Options:
  -V, --version                output the version number
  -i, --inputs <path|glob...>  Input paths/globals to your ABI JSON files
  -o, --output <dir>           Directory path for generated files
  -c, --contract               Generate types for Contracts [default]
  -s, --script                 Generate types for Scripts
  -p, --predicate              Generate types for Predicates
  -S, --silent                 Omit output messages
  -h, --help                   display help for command
```

## Generating types

When using the package in a standalone fashion, its bin is prefixed with `fuels-`.

```sh
npx fuels-typegen -i ./out/debug/*-abi.json -o ./src/contracts
```

## Programmatic API

```ts
import { ProgramTypeEnum, runTypegen } from "@fuel-ts/abi-typegen";

  const cwd = process.cwd();
  const input = './abis/**-abi.json'
  const output = './types'
  const filepaths = [ './abis/a-abi.json', './abis/b-abi.json' ]
  const programType = ProgramTypeEnum.CONTRACT;

  // using input global
  await runTypegen({ cwd, input, output, programType });

  // using filepaths' array
  await runTypegen({ cwd, filepaths, output, programType });
}
```

### Full SDK Installation

Alternatively, we recommend you install the [complete SDK](https://github.com/FuelLabs/fuels-ts) using the umbrella package:

```sh
pnpm add fuels
# or
npm add fuels
```

Note that in this example we will interact with the `fuels` bin directly.

We just need to call it with the `typegen` command, and the rest feels the same.

```sh
npx fuels typegen -i ./out/debug/*-abi.json -o ./src/contracts
```

## Type's Conversion Table

The table below describes how Sway types are converted from/to Typescript.

|                Sway | Example                        |              TS:input               |              TS:output              |
| ------------------: | :----------------------------- | :---------------------------------: | :---------------------------------: |
|              **u8** | `255`                          |           `BigNumberish`            |              `number`               |
|             **u16** | `65535`                        |           `BigNumberish`            |              `number`               |
|             **u32** | `4294967295`                   |           `BigNumberish`            |              `number`               |
|             **u64** | `0xFFFFFFFFFFFFFFFF `          |           `BigNumberish`            |                `BN`                 |
|             **str** | `anything`                     |              `string`               |              `string`               |
|            **bool** | `true`                         |              `boolean`              |              `boolean`              |
|            **b256** | `0x000...`                     |              `string`               |              `string`               |
|            **b512** | `fuel1a7r...`                  |              `string`               |              `string`               |
|          **tuples** | (`MyType`, `MyType`)           |        [`MyType`, `MyType`]         |        [`MyType`, `MyType`]         |
|           **enums** | enum `MyEnum` { y: (), n: () } | `MyEnum` = `Enum`<{ y: [], n: [] }> | `MyEnum` = `Enum`<{ y: [], n: [] }> |
|         **structs** | `MyStruct` { a: u8, b: u16 }   |             `MyStruct`              |             `MyStruct`              |
|         **vectors** | Vec<`MyType`>                  |             `MyType`[]              |             `MyType`[]              |
|         **options** | Option<`MyType`>               |          `Option<MyType>`           |          `Option<MyType>`           |
| **raw untyped ptr** | `123`                          |           `BigNumberish`            |                `BN`                 |

> For more info on Sway types, click [here](https://docs.fuel.network/docs/sway/basics/built_in_types/)

## Contributing

In order to contribute to `@fuel-ts/abi-typegen`, please see the main [fuels-ts](https://github.com/FuelLabs/fuels-ts) monorepo.

## Changelog

The `@fuel-ts/abi-typegen` changelog can be found at [CHANGELOG](./CHANGELOG.md).

## License

The primary license for `@fuel-ts/abi-typegen` is `Apache 2.0`, see [LICENSE](./LICENSE).
