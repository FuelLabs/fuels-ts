# `@fuel-ts/abi-typegen`

Generate TypeScript bindings for [Sway](https://github.com/fuellabs/sway) smart contracts.

See the full ABI-spec [here](https://github.com/FuelLabs/fuel-specs/blob/master/src/protocol/abi/json_abi_format.md).

# Table of contents

- [Documentation](#documentation)
- [Usage](#usage)
  - [Installation](#installation)
  - [Full SDK Installation](#full-sdk-installation)
- [Type's Conversion Table](#types-conversion-table)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Documentation

See [Fuel-ts Documentation](https://fuellabs.github.io/fuels-ts/packages/fuel-ts-abi-typegen/)

## Usage

### Installation

```sh
yarn add @fuel-ts/abi-typegen
# or
npm add @fuel-ts/abi-typegen
```

### Generating types

```sh
npx typegen -i ./out/debug/*-abi.json -o ./src/contracts
```

### Full SDK Installation

Alternatively, we recommend you install the [complete SDK](https://github.com/FuelLabs/fuels-ts) using the umbrella package:

```sh
yarn add fuels
# or
npm add fuels
```

### Generating types

Then you need to prefix `typegen` command with `fuels`:

```sh
npx fuels typegen -i ./out/debug/*-abi.json -o ./src/contracts
```

# Type's Conversion Table

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
| **raw untyped ptr** | `123`                          |           `BigNumberish`            |              `number`               |

> For more info on Sway types, click [here](https://fuellabs.github.io/sway/latest/basics/index.html)

## Contributing

In order to contribute to `@fuel-ts/abi-typegen`, please see the main [fuels-ts](https://github.com/FuelLabs/fuels-ts) monorepo.

## Changelog

The `@fuel-ts/abi-typegen` changelog can be found at [CHANGELOG](./CHANGELOG.md).

## License

The primary license for `@fuel-ts/abi-typegen` is `Apache 2.0`, see [LICENSE](./LICENSE).
