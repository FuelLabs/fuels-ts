![Fuels-ts SDK logo](./docs/assets/fuels-ts-logo.png)

**fuels-ts** is a library for interacting with **Fuel v2**.

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
- [x] Generate contract types with TypeChain
- [x] Build and send transactions
- [x] Encode/decode contract ABI
- [ ] Transfer coins
- [ ] Inspect contract storage
- [ ] Manage wallets
- [ ] Run scripts
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
import { Provider, Contract } from "fuels";
import abi from "./abi.json";

const provider = new Provider("http://127.0.0.1:4000/graphql");

const contractId = "0x...";
const contract = new Contract(contractId, abi, provider);
const result = await contract.functions.foo("bar");
```

### Deploying Contracts

```ts
// typescript file
import { Provider, Contract } from "fuels";
import bytecode from "./bytecode.bin";

const provider = new Provider("http://127.0.0.1:4000/graphql");

const { contractId } = await provider.submitContract(bytecode);
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
pnpm ci:tests
```

This will run `services:run`, `tests` and then `services:clean`

> Some times if you're running your tests locally using `services:run` in a separated terminal,
> maybe you need to run `services:clean` after tests to clean docker containers and volumes. Because
> this can break your tests sometimes!

## Build and watch all packages

If you want to work locally using realtime builds, open in one terminal tab build in watch mode
on all packages from the root directory:

```sh
$ pnpm build:watch
```

This command you run `tsup --watch` on all packages using Turborepo

### Local links using `pnpm link`

If you want to use local links for development purposes, you can execute this command in the root
of the directory:

```sh
$ pnpm -r exec pnpm link --global --dir ./
```

This will link all packages inside our monorepo in your global pnpm store, then iside the package
you want to use the linked package, just run:

```sh
$ pnpm link --global <pkg-name>
```

## License

The primary license for this repo is `Apache 2.0`, see [`LICENSE`](./LICENSE).
