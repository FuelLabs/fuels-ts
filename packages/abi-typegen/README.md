# `@fuel-ts/abi-typegen`

**@fuel-ts/abi-typegen** is a sub-module for interacting with **Fuel**.

This module is responsible for encoding and decoding the Application Binary Interface (ABI) used by most smart contracts to interoperate between other smart contracts and clients. The ABI being encoded and decoded is specified [here](https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md).

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

### Full SDK Installation

Alternatively, we recommend you install the [complete SDK](https://github.com/FuelLabs/fuels-ts) using the umbrella package:

```sh
yarn add fuels
# or
npm add fuels
```

# Type's Conversion Table

The table below describes how Sway types are converted from/to Typescript.

|                Sway | Example                        |              TS:input               |              TS:output              |
| ------------------: | :----------------------------- | :---------------------------------: | :---------------------------------: |
|              **u8** | `255`                          |           `BigNumberish`            |              `number`               |
|             **u16** | `65535`                        |           `BigNumberish`            |              `number`               |
|             **u32** | `4294967295`                   |           `BigNumberish`            |              `number`               |
|             **u64** | `1.84467E+19 `                 |           `BigNumberish`            |                `BN`                 |
|             **str** | `anything`                     |              `string`               |              `string`               |
|            **bool** | `true`                         |              `boolean`              |              `boolean`              |
|            **b256** | `0x000...`                     |              `string`               |              `string`               |
|          **tuples** | (`MyType`, `MyType`)           |        [`MyType`, `MyType`]         |        [`MyType`, `MyType`]         |
|           **enums** | enum `MyEnum` { y: (), n: () } | `MyEnum` = `Enum`<{ y: [], n: [] }> | `MyEnum` = `Enum`<{ y: [], n: [] }> |
|         **structs** | `MyStruct` { a: u8, b: u16 }   |             `MyStruct`              |             `MyStruct`              |
|         **vectors** | Vec<`MyType`>                  |             `MyType`[]              |             `MyType`[]              |
|         **vectors** | Vec<`MyType`>                  |             `MyType`[]              |             `MyType`[]              |
|         **options** | Option<`MyType`>               |          `Option<MyType>`           |          `Option<MyType>`           |
| **raw untyped ptr** | `raw untyped ptr`>             |           `BigNumberish`            |              `number`               |

<br/>

> _[NOTES]_
>
> - `TS:input` — definitions used by method **`inputs`**
>   - _this is the way we send data to contracts_
> - `TS:outputs` — definitions used by method **`outputs`**
>   - _this is the way we receive data from contracts_

## Contributing

In order to contribute to `@fuel-ts/abi-typegen`, please see the main [fuels-ts](https://github.com/FuelLabs/fuels-ts) monorepo.

## Changelog

The `@fuel-ts/abi-typegen` changelog can be found at [CHANGELOG](./CHANGELOG.md).

## License

The primary license for `@fuel-ts/abi-typegen` is `Apache 2.0`, see [LICENSE](./LICENSE).
