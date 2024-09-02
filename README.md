<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/FuelLabs/fuels-ts/master/apps/docs/src/public/fuels-ts-logo-dark.png">
    <img alt="Fuels-ts SDK logo" width="400px" src="https://raw.githubusercontent.com/FuelLabs/fuels-ts/master/apps/docs/src/public/fuels-ts-logo-light.png">
</picture>

**fuels-ts** is a library for interacting with **Fuel v2**.

[![test](https://github.com/FuelLabs/fuels-ts/actions/workflows/test.yaml/badge.svg)](https://github.com/FuelLabs/fuels-ts/actions/workflows/test.yaml)
[![npm](https://img.shields.io/npm/v/fuels)](https://www.npmjs.com/package/fuels)
[![docs](https://img.shields.io/badge/docs-fuels.ts-brightgreen.svg?style=flat)](https://docs.fuel.network/docs/fuels-ts/)
[![discord](https://img.shields.io/badge/chat%20on-discord-orange?&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/xfpK4Pe)

# Resources

The [documentation](https://docs.fuel.network/docs/fuels-ts/) site is your main stop for resources.

- [Quickstart](https://docs.fuel.network/docs/intro/quickstart-contract/)
  - [Wallets](https://docs.fuel.network/docs/fuels-ts/wallets/)
  - [Contracts](https://docs.fuel.network/docs/fuels-ts/contracts/)
  - [Scripts](https://docs.fuel.network/docs/fuels-ts/scripts/)
  - [Predicates](https://docs.fuel.network/docs/fuels-ts/predicates/)
  - [ABI Typegen](https://docs.fuel.network/docs/fuels-ts/fuels-cli/abi-typegen/)
- [Contributing](https://github.com/FuelLabs/fuels-ts/blob/master/CONTRIBUTING.md)
- [The Fuel Forum](https://forum.fuel.network/)
- [The Fuel Ecosystem](#the-fuel-ecosystem)

# Install

```sh
npm install fuels --save
```

> If you are a Windows user, you will need to be running Windows Subsystem for Linux (WSL) to install and use the Fuel toolchain, including the TypeScript SDK. We don't support Windows natively at this time.

# Import

Simple example usages.

```ts
import { Wallet } from "fuels";

// Random Wallet
console.log(Wallet.generate());

// Using privateKey Wallet
console.log(new Wallet("0x0000...0000"));
```

# CLI

Fuels include some utility commands via built-in CLI tool.

Check the [docs](https://docs.fuel.network/docs/fuels-ts/) for more info.

```console
$ npm add fuels
$ npx fuels --help
Usage: fuels [options] [command]

Options:
  -D, --debug        Enables verbose logging (default: false)
  -S, --silent       Omit output messages (default: false)
  -v, --version      Output the version number
  -h, --help         Display help

Commands:
  init [options]     Create a sample `fuel.config.ts` file
  node [options]     Start a Fuel node
  dev [options]      Start a Fuel node and run build + deploy on every file change
  build [options]    Build Sway programs and generate Typescript for them
  deploy [options]   Deploy contracts to the Fuel network
  typegen [options]  Generate Typescript from Sway ABI JSON files
  versions           Check for version incompatibilities
  help [command]     Display help for command
```

# The Fuel Ecosystem

Learn more about the Fuel Ecosystem.

- [🌴 Sway](https://docs.fuel.network/docs/sway/) — The new language, empowering everyone to build reliable and efficient smart contracts
- [🧰 Forc](https://docs.fuel.network/docs/forc/) — The Fuel toolbox: _Build, deploy and manage your sway projects_
- [⚙️ Fuel Core](https://github.com/FuelLabs/fuel-core) — The new FuelVM, a blazingly fast blockchain VM
- [🔗 Fuel Specs](https://github.com/FuelLabs/fuel-specs) — The Fuel protocol specifications
- [💼 Fuels Wallet](https://github.com/FuelLabs/fuels-wallet) — The Official Fuels Wallet
- [🦀 Rust SDK](https://github.com/FuelLabs/fuels-rs) — A robust SDK in rust
- [⚡ Fuel Network](https://fuel.network/) — The project
- [📚 The Fuel Forum](https://forum.fuel.network/) — Ask questions, get updates, and contribute to a modular future

# License

The primary license for this repo is `Apache 2.0`, see [`LICENSE`](https://github.com/FuelLabs/fuels-ts/blob/master/LICENSE).
