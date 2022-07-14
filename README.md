<picture>
    <source media="(prefers-color-scheme: dark)" srcset="./docs/assets/fuels-ts-logo-dark.png">
    <img alt="Fuels-ts SDK logo" width="400px" src="./docs/assets/fuels-ts-logo-light.png">
</picture>

**fuels-ts** is a library for interacting with **Fuel v2**.

[![test](https://github.com/FuelLabs/fuels-ts/actions/workflows/test.yaml/badge.svg)](https://github.com/FuelLabs/fuels-ts/actions/workflows/test.yaml)
[![npm](https://img.shields.io/npm/v/fuels)](https://www.npmjs.com/package/fuels)
[![docs](https://img.shields.io/badge/docs-fuels.ts-brightgreen.svg?style=flat)](https://fuellabs.github.io/fuels-ts/)
[![discord](https://img.shields.io/badge/chat%20on-discord-orange?&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/xfpK4Pe)

# Table of contents

- [SDK documentation](https://fuellabs.github.io/fuels-ts/)
- [Features](#features)
- [Usage](#usage)
  - [Installation](#installation)
  - [Calling Contracts](#calling-contracts)
  - [Deploying Contracts](#deploying-contracts)
  - [Generating Contract Types](#generating-contract-types)
- [Contributing](#contributing)
  - [Setup](#setup)
  - [Testing](#testing)
- [License](#license)

## Features

- [x] Deploy and call contracts
- [x] Deploy and activate predicates
- [x] Generate contract types with TypeChain
- [x] Build and send transactions
- [x] Encode/decode contract ABI
- [x] Transfer coins
- [ ] Inspect contract storage
- [x] Manage wallets
- [x] Run scripts
- [ ] Query and subscribe to events

## Usage

### Installation

```sh
yarn add fuels
# or
npm add fuels
```

### Calling Contracts

```ts
// typescript file
import { Wallet, Contract } from "fuels";
import abi from "./abi.json";

const wallet = new Wallet("0x..."); // private key with coins
const contractId = "0x...";
const contract = new Contract(contractId, abi, wallet);
const { value } = await contract.functions.foo<[string], bigint>("bar").call();

console.log(value);
```

[[READ MORE]](./packages/contract/README.md)

### Deploying Contracts

```ts
// typescript file
import { Provider, Contract } from "fuels";
import bytecode from "./bytecode.bin";

const factory = new ContractFactory(bytecode, [], wallet);
const contract = await factory.deployContract(factory);

console.log(contract);
```

### Generating Contract Types

For defined Sway types, we offer a Typechain target to generate types from an ABI file.

For Sway types, the mapping is as follows to Typescript types:

| Sway type | Typescript type                    |
| --------- | ---------------------------------- |
| u8/64     | number or BigNumber                |
| b256      | '0x'-prefixed-string or Uint8Array |
| str[]     | '0x'-prefixed-string or Uint8Array |
| struct    | Object                             |
| enum      | Enum<T>                            |
| tuple     | Array                              |

```sh
# console
yarn add -D typechain typechain-target-fuels
yarn exec typechain --target=fuels --out-dir=types abi.json
```

```ts
// typescript file
import { Provider } from "fuels";
import { MyContract__factory } from "./types";

const provider = new Provider("http://127.0.0.1:4000/graphql");

const contractId = "0x...";
const contract = MyContract__factory.connect(contractId, provider);
```

## Contributing

### Setup

```sh
git clone git@github.com:FuelLabs/fuels-ts.git
cd fuels-ts
pnpm install
pnpm build
```

### Testing

In order to run tests locally, you need `fuel-core` running as a docker container.
To do that you can run these commands in your terminal:

```sh
pnpm services:run
```

And then run tests in another terminal tab:

```sh
# run all tests
pnpm test
# run tests and get coverage
pnpm test:coverage
# run tests for a specific package
pnpm --filter @fuel-ts/contract run test
```

Or if you want to run docker and all tests serially you can do:

```sh
pnpm ci:test
```

This will run `services:run`, `test` and then `services:clean`

> Some times if you're running your tests locally using `services:run` in a separated terminal,
> maybe you need to run `services:clean` after tests to clean docker containers and volumes. Because
> this can break your tests sometimes!

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

### Steps to PR

1. Fork the fuels-ts repository and clone your fork

2. Create a new branch out of the `master` branch.

3. Make and commit your changes following the
   [commit convention](https://github.com/FuelLabs/fuels-ts/blob/master/README.md#commit-convention).
   As you develop, you can run `pnpm build` and
   `pnpm test` to make sure everything works as expected.

4. Run `pnpm changeset` to create a detailed description of your changes. This
   will be used to generate a changelog when we publish an update.
   [Learn more about Changeset](https://github.com/changesets/changesets/tree/main/packages/cli).
   Please note that you might have to run `git fetch origin master` (where
   origin will be your fork on GitHub) before `pnpm changeset` works.

> If you made minor changes like CI config, prettier, etc, you can run
> `pnpm changeset add --empty` to generate an empty changeset file to document
> your changes.

## Build and watch all packages

If you want to work locally using realtime builds, open in one terminal tab build in watch mode
on all packages from the root directory:

```sh
pnpm build:watch
```

This command you run `tsup --watch` on all packages using Turborepo

## Using linked packages

This will link all packages inside our monorepo in your `global pnpm store`, enabling you to us `fuels-ts` packages via links in
your local projects.

#### On `fuels-ts` root directory

```sh
pnpm -r exec pnpm link --global --dir ./
```

You can use [build watch](#build-and-watch-all-packages).

#### On `your project` root directory

```sh
pnpm link --global fuels
```

Or for specfic packages just use `pnpm link @fuel-ts/<pkg-name>`, ex;

```
pnpm link --global @fuel-ts/wallet
```

### Troubleshooting

If you're linking for the first time, you might need:

```sh
  pnpm setup
```

If it still have problems, you might need to setup again (As `pnpm` releases new version, the global folder structure may change)

```sh
  pnpm setup
```

## Updating Forc version

The following script will upgrade Forc to the latest version on GitHub, remove all lockfiles so the latest stdlib can be used, and rebuild all projects:

```sh
pnpm forc:update
```

After this you should run tests and fix any incompatibilities.

## License

The primary license for this repo is `Apache 2.0`, see [`LICENSE`](./LICENSE).

## FAQ

### Why is the prefix `fuels` and not `fuel`?

In order to make the SDK for Fuel feel familiar with those coming from the [ethers.js](https://github.com/ethers-io/ethers.js) ecosystem, this project opted for an `s` at the end. The `fuels-*` family of SDKs is inspired by The Ethers Project.
