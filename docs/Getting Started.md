---
layout: default
title: Getting started
nav_order: 0
---

## Introduction

This SDK is the easy and more complete way to connect your DApp into the Fuel Network. With this SDK,
you can create a Wallet, set the network URL, send transactions, call contracts and more.

Fuel Network is the fastest modular execution layer. To start playing with the SDK you should consider
read our Sway book to get familiar with the core components of the stack, like;

- Fuel Core
- Sway Language and Compiler

Follow the our Getting Started tutorial to a quick start!

## Getting Started

### Introduction

On this Getting Started we are going to install the requirements, initialize a simple contract project,
generate the types for this contract and call contract methods.

> :warning: It's also possible to install all components locally for quick start we chose to go with docker
> You can install other components later as you feel comfortable.

### Requirements

- [Node.js v16.15.0 or latest stable](https://nodejs.org/en/). We recommend using [nvm](https://github.com/nvm-sh/nvm) to install.
- [Docker v0.8.2 or latest stable](https://docs.docker.com/get-docker/)

### Creating a simple contract in Sway

Lets create a very simple project to start interacting with before deploy

#### Installing toolchain

```

```

### Create a folder for the project

```
mkdir dapp-on-fuel && cd dapp-on-fuel
```

### Creating the sway contract

Let's create a folder for the contracts

```
mkdir contracts && cd contracts
```

Inside the folder we can start a forc project. This will initialize a very simple structure with the `main.sw` wich contains
the contract in Swap.

```sh
forc init
```

This command will generate a simple structure with;

- src: where we are going to write our contract logic
- tests: where you can write tests directly in rust `we are going to ignore this for now`.
- Forc.lock: this works like npm-lock but for forc
- Cargo.toml: this includes the libs for the rust sdk `we are going to ignore this for now`.

#### Writing the contract

Open the file `src/main.sw`. You should see the following content

```rust
contract;

abi MyContract {
    fn test_function() -> bool;
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }
}
```

Lets change it to look like a counter, with some storage, to
make a bit easer to visualize a start.

```rust
contract;

storage {
  counter: u64 = 0,
}

abi MyContract {
  fn counter() -> u64;
  fn increment(param: u64) -> u64;
}

impl MyContract for Contract {
  #[storage(read)]
  fn counter() -> u64 {
    storage.counter
  }
  #[storage(read, write)]
  fn increment(param: u64) -> u64 {
    storage.counter += param;
    storage.counter
  }
}
```

Not that we have the code done, lets build and deploy our contract to the local node.

#### Build the contract

Now that we have a contract

```sh
forc build
```

You should see a output like this;

```sh
  Compiled library "core".
  Compiled library "std".
  Compiled contract "contracts".
  Bytecode size is 260 bytes.
```

Now you should be able to see a new folder called `out`.
This folder contains the binary of the contract and also
the `ABI JSON`.

- The Binary are going to be deploy to the node.
- The `ABI JSON` are going to be used to connect our app with the contract.

To learn more about this check [here].

#### Deploy the contract to the local fuel node

Now we are going to deploy the contract to your local node;

```sh
forc deploy --url localhost:4000
```

You should see a output like this;

```sh
  Compiled library "core".
  Compiled library "std".
  Compiled contract "contracts".
  Bytecode size is 260 bytes.
Contract id: 0xa326e3472fd4abc417ba43e369f59ea44f8325d42ba6cf71ec4b58123fd8668a
Logs:
TransactionId(HexFormatted(b3e777d3bb5c5bc15ece4e466504f4a2ecc3f5cfdc9c8affac6325ae4d64e2ae))
```

> :warning: We are going to copy the `Contract id` to a `.env` file, to use on the DApp after.

```sh
echo 0xa326e3472fd4abc417ba43e369f59ea44f8325d42ba6cf71ec4b58123fd8668a >> ../.env
```

/////
/// Congrats you have create and deploy the contract, now lets setup this contract on the DApp
/////

### Start project with CRA

> Inside the project root folder `dapp-on-fuel`.

We are going to start a frontend using `create-react-app` and a `typescript` template.

```sh
npx create-react-app frontend --template typescript
cd frontend
```

### Install fuels SDK

Install fuels-ts SDK dependencies to the project;

- `fuels`: the main SDK
- `typechain`: an ABI -> TypeScript generator
- `typechain-target-fuels`: the code generator used for convert fuels ABI to TypeScript

```sh
npm install fuels typechain typechain-target-fuels --save
```

### Generating the contract types

On this step we are going to execute `typechain` to generate the types from the `ABI` resultant from the
contract build we made before on the step #####setep where we build#####

```sh
npx typechain --target=fuels --out-dir=./src/contracts ../contracts/out/debug/*-abi.json
```

You should see the following output

```sh
Successfully generated 4 typings!
```

Also a new folder `src/contracts` was generated inside the folder. We have;

- factories: this folder contains a ready to use typed contract #magic emoji#.
- ContractsAbi.d.ts: this file contains the type representation of our contract.
- index.ts: the file that exports in a easy way to import on the App

### Importing the contract

We are now 80% on the way to have contract running, let's add the imports and change a bit the
react files to have a better looking good app.

Open `src/App.tsx`;

You file should look like this;

```ts
import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

Let's change it to import out contract and cleanup code;

```sh

```

### Calling the contract

## License

The primary license for this repo is `Apache 2.0`, see [`LICENSE`](./LICENSE).

refs/heads/changeset-release/master
