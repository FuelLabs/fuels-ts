<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/FuelLabs/fuels-ts/master/docs/assets/fuels-ts-logo-dark.png">
    <img alt="Fuels-ts SDK logo" width="400px" src="https://raw.githubusercontent.com/FuelLabs/fuels-ts/master/docs/assets/fuels-ts-logo-light.png">
</picture>

**fuels-ts** is a library for interacting with **Fuel v2**.

[![test](https://github.com/FuelLabs/fuels-ts/actions/workflows/test.yaml/badge.svg)](https://github.com/FuelLabs/fuels-ts/actions/workflows/test.yaml)
[![npm](https://img.shields.io/npm/v/fuels)](https://www.npmjs.com/package/fuels)
[![docs](https://img.shields.io/badge/docs-fuels.ts-brightgreen.svg?style=flat)](https://fuellabs.github.io/fuels-ts/)
[![discord](https://img.shields.io/badge/chat%20on-discord-orange?&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/xfpK4Pe)

## Table of contents

- [Quickstart](https://fuellabs.github.io/fuel-docs/master/developer-quickstart.html)
- [Documentation](https://fuellabs.github.io/fuels-ts)
- [Install](#install)
- [Import](#import)
- [Interacting with Contracts](https://fuellabs.github.io/fuels-ts/guide/contracts/interacting-with-contracts.html)
- [Generate Contract Types from ABI](https://fuellabs.github.io/fuels-ts/guide/abi-typegen/generate-contract-types-from-abi.html)
  - [Using Generated Types](https://fuellabs.github.io/fuels-ts/guide/abi-typegen/using-generated-types.html)
- [Deploying Contracts](https://fuellabs.github.io/fuels-ts/guide/contracts/deploying-contracts)
- [CLI](#cli)
- [Contributing](https://github.com/FuelLabs/fuels-ts/blob/master/CONTRIBUTING.md)
- [License](#license)

## Quickstart

We recommend starting with the [Quickstart](https://fuellabs.github.io/fuel-docs/master/developer-quickstart.html) to speed-up and build your first DApp using Fuel.

- [Quickstart](https://fuellabs.github.io/fuel-docs/master/developer-quickstart.html)
- [Other example projects](https://github.com/FuelLabs/sway-applications)

## Documentation

You can find in-depth [usage and examples in our Guide](https://fuellabs.github.io/fuels-ts/guide), or deep-dive into the internals with our detailed [SDK Documentation](https://fuellabs.github.io/fuels-ts).

## The Fuel Ecosystem

Learn more about the Fuel Ecosystem.

- [🌴 Sway](https://fuellabs.github.io/sway/) the new language. Empowering everyone to build reliable and efficient smart contracts.
- [🧰 Forc](https://fuellabs.github.io/sway/v0.30.1/forc/index.html) the Fuel toolbox. Build, deploy and manage your sway projects.
- [⚙️ Fuel Core](https://github.com/FuelLabs/fuel-core) the new FuelVM, a blazingly fast blockchain VM.
- [🔗 Fuel Specs](https://github.com/FuelLabs/fuel-specs) the Fuel protocol specifications.
- [🦀 RUST SDK](https://github.com/FuelLabs/fuels-rs) a robust SDK in rust.
- [⚡ Fuel Network](https://fuel.network/) the project.

## Install

#### YARN

```sh
yarn add fuels
```

#### NPM

```sh
npm install fuels --save
```

## Import

```ts
import { Wallet } from "fuels";

// Random Wallet
console.log(Wallet.generate());

// Using privateKey Wallet
console.log(new Wallet("0x0000...0000"));
```

## CLI

Fuels include some utility commands via built-in CLI tool.

```console
$ yarn add fuels
$ yarn exec fuels -h
Usage: fuels [options] [command]

Options:
  -V, --version      output the version number
  -h, --help         display help for command

Commands:
  versions           check for version incompatibilities
  typegen [options]  generate typescript from contract abi json files
  help [command]     display help for command
```

## License

The primary license for this repo is `Apache 2.0`, see [`LICENSE`](https://github.com/FuelLabs/fuels-ts/blob/master/LICENSE).
