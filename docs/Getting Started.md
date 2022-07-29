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

### Create a folder for the project

```
mkdir dapp-on-fuel && cd dapp-on-fuel
```

#### Running a local fuel-core node

To make easier to test lets run a local Fuel Network node for this lets start;

##### Create a chainConfig.json

Create a file `chainConfig.json` on the root folder `dapp-on-fuel`.

Past the following content inside the json, this are the genesis configuration
for the fuel-core node, to know more. Take a look at: //FUEL CORE DOC//

```json
{
  "chain_name": "local_testnet",
  "block_production": "Instant",
  "parent_network": {
    "type": "LocalTest"
  },
  "initial_state": {
    "coins": [
      {
        "owner": "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d",
        "amount": "0x000000000000FFFF",
        "asset_id": "0x0000000000000000000000000000000000000000000000000000000000000000"
      }
    ]
  },
  "transaction_parameters": {
    "contract_max_size": 16777216,
    "max_inputs": 255,
    "max_outputs": 255,
    "max_witnesses": 255,
    "max_gas_per_tx": 100000000,
    "max_script_length": 1048576,
    "max_script_data_length": 1048576,
    "max_static_contracts": 255,
    "max_storage_slots": 255,
    "max_predicate_length": 1048576,
    "max_predicate_data_length": 1048576,
    "gas_price_factor": 1000000
  }
}
```

#### Start the Fuel Network Node

Now that we have the `chainConfig.json` configured we can start our local node;

```sh
fuel-core --ip 127.0.0.1 --port 4000 --chain ./chainConfig.json
```

////
//// Congrats now you have the fuel-core running on your local
////

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

### Start project with CRA

> Inside the project root folder `dapp-on-fuel`.

We are going to start a frontend using `create-react-app` and a `typescript` template.

```sh
npx create-react-app frontend --template typescript
cd frontend
```

### Start the development server

Let's start the server to start view our application

```sh
yarn start
```

It should open automatically on the browser, or just open `http://localhost:3000`.

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

Let's change it to import our contract and also create a Wallet;

```ts
import React, { useState } from "react";
import { Wallet } from "fuels";
import "./App.css";
import { ContractsAbi__factory } from "./contracts";

const WALLET_SECRET =
  "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298"; // 1
const CONTRACT_ID = "<contract_id>"; // 2

function App() {
  const wallet = new Wallet(WALLET_SECRET);
  const [counter, setCounter] = useState(0);
  const contract = ContractsAbi__factory.connect(CONTRACT_ID, wallet); // 3

  async function increment() {}

  return (
    <div className="App">
      <header className="App-header">
        <p>Counter: {counter}</p>
        <button onClick={increment}>Increment</button>
      </header>
    </div>
  );
}
```

1. The Wallet Secret also known as PrivateKey that is already fill on propose, is the same one configured on our `chainConfig.json` to start with some coins making easear to start with some coins:

```ts
"initial_state": {
  "coins": [
    {
      "owner": "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d",
      "amount": "0x000000000000FFFF",
      "asset_id": "0x0000000000000000000000000000000000000000000000000000000000000000"
    }
  ]
}
```

2. The ContractId is the address generated after deploy the contract witch we are going to do on next step.
3. The `ContractsAbi__factory` is our instance to connect to the contract with a pre-configured ABI JSON, generated on the `typechain` step. Here we execute the `connect` method, witch takes the contract id and the wallet instance, in this way the factory knows, where the contract is and witch wallet we are going to use to submit transactions.

#### Deploy the contract to the local fuel node

As we see before we need to deploy our contract in order to have a contract id, lets do this;

```sh
cd ../contracts && forc deploy --url localhost:4000
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

Notice on the log that we have our `Contract id:` let's copy the address and past on the application.

```ts
const WALLET_SECRET =
  "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
const CONTRACT_ID =
  "<0xa326e3472fd4abc417ba43e369f59ea44f8325d42ba6cf71ec4b58123fd8668a>";
```

#### Calling the contract

Now that we have deploy and setup the contract inside our application lets call the contract

```
async function increment() {
  const { value } = await contract.functions.increment(1).call();
  setCounter(Number(value));
}
```

Now back to the browser we should able to click on the button `increment` and see it going up.
Congratulations we have connect to the contract and submit our first transaction.

Now if we refresh the page we saw that the counter goes back to zero, as we don't fetch the state of
the contract. Let's add this to show the current counter amount.

```ts
import React, { useEffect, useState } from "react";
import { Wallet } from "fuels";
import "./App.css";
import { ContractsAbi__factory } from "./contracts";

const WALLET_SECRET =
  "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
const CONTRACT_ID =
  "0xa326e3472fd4abc417ba43e369f59ea44f8325d42ba6cf71ec4b58123fd8668a";
const wallet = new Wallet(WALLET_SECRET);
const contract = ContractsAbi__factory.connect(CONTRACT_ID, wallet);

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    async function main() {
      const { value } = await contract.functions.counter().get(); // 1.
      setCounter(Number(value));
    }
    main();
  }, []);

  async function increment() {
    const { value } = await contract.functions.increment(1).call();
    setCounter(Number(value));
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Counter: {counter}</p>
        <button onClick={increment}>Increment</button>
      </header>
    </div>
  );
}

export default App;
```

Now if you refresh the page now you should see that the application now starts with the current state of the counter.

Note that on item `1.` we use a different execution method `get()` this method executes a dryRun transaction, witch don't execute state changes and because that not cost coins.

/////
/// Congrats you have sucessufully create a contract, deploy it and call using fuels SDK.
/////
