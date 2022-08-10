---
layout: default
title: "Quickstart"
nav_order: -4
---

# Quickstart

## Requirements

- [Node.js v16.15.0 or latest stable](https://nodejs.org/en/). We recommend using [nvm](https://github.com/nvm-sh/nvm) to install.

## Introduction

In this tutorial we are going to;

1. 🌴 Install `forc` and the `fuel-core` locally
2. ⚡ Running a Fuel locally
3. 💻 Write & Deploy a **🌴 Sway** Contract
4. 💚 Create a Fuel DApp to interact with your Contract

You can also access the [Example App here](./examples/my-fuel-dapp).

## 🌴 Install `forc` and the `fuel-core` locally

`Forc` is similar to "npm", or "cargo" but for [**🌴 Sway**](https://fuellabs.github.io/sway). `Forc` stands for Fuel Orchestrator. Forc provides a variety of tools and commands for developers working with the Fuel ecosystem, such as scaffolding a new project, formatting, running scripts, deploying contracts, testing contracts, and more. If you're coming from a Rust background, `forc` is similar to cargo.
[read more about Forc](https://fuellabs.github.io/sway/v0.19.1/forc/index.html)

`Fuel Core` is the implementation of the `Fuel VM`. `Fuel Core` provides the ability to spin-up a `Fuel Client` locally with custom chain configs. The `Fuel Core` is also used on the live chains, but we are not going to cover it here, as we wan't to focus on development only.
[See more](https://github.com/FuelLabs/fuel-core)

### MacOS and Linux

When using `MacOS` and `Linux`. We provide a tools [`fuelup`](https://github.com/FuelLabs/fuelup) that works as toolchain manager for Fuel.

#### 1. Install `fuelup`;

```sh
curl --proto '=https' --tlsv1.2 -sSf https://fuellabs.github.io/fuelup/fuelup-init.sh | sh
```

#### 2. Install `forc & fuel-core`

```sh
fuelup toolchain install latest
```

### Windows or other OS

When using `Windows` or installing from source code we also require you to install all cargo toolchain.
[See more instructions here](https://fuellabs.github.io/sway/v0.19.1/introduction/installation.html#installing-from-source).

### Checking environment

To check if `forc` and `fuel-core` are correct installed let's run a version command;

```sh
forc --version
fuel-core --version
```

Both should return the respective versions.

## ⚡ Running a Fuel locally

When developing the best way to test is running a local node, for this we need to;

1. **Create chain configuration**: This file will have the configuration of the root state of the local node. **Like initial account balances**.
2. **Run a local node**: We are going to provide the node process the IP and PORT we want to run it with, and the path to the `chainConfig.json` file we just created.

### 1. Create chain configuration

Let's create a folder for our project.

```sh
mkdir my-fuel-dapp
```

> ⚠️ Notice: All the the commands will have the folder path relative to my-fuel-dapp, in order to know where you should execute things.

Now let's add the root chain configuration, this enables us to initialize the chain with the configs we desire, on our case
let's initialize the `initial_state` with a single known account.

> For this `tutorial` the `known account` will be following; <br />
> PublicKey: `0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d` <br />
> PrivateKey: `0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298`

Create a file `my-fuel-dapp/chainConfig.json` with the following content;

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

Notice the `initial_state` is where we configure the initial account balances. In the current config we are setting the account address `0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d` to have the initial amount `0x000000000000FFFF` and the asset_id to `0x0000000000000000000000000000000000000000000000000000000000000000` that is respective to the NativeAsset.

To learn more about `chainConfig.json`, take a look on the [`fuel-core`](https://github.com/FuelLabs/fuel-core) documentation.

### 2. Run the node

To start the local node we are going to open a new **Terminal Tab/Window**, one important fact is that the process needs to be running
all the time, if you close the terminal/window the node will automatically stop to run.

Inside `my-fuel-dapp` run;

```sh
fuel-core --ip 127.0.0.1 --port 4000 --chain ./chainConfig.json
```

You should see the following output:

```sh
INFO new_node: fuel_core::service::graph_api: 72: Binding GraphQL provider to 127.0.0.1:4000
```

#### ✨✨✨ Congrats you have a Fuel DevNode running locally ✨✨✨

<br />

## 💻 Write & Deploy a **🌴 Sway** Contract

Now we are going to;

1. **Create a simple 🌴 Sway contract**
2. **Modify and build**
3. **Deploy the contract**

### 1. Create a simple **🌴 Sway** contract

#### Initialize the **🌴 Sway** project

We are going to use `Forc` to initialize our project. As we already talk `forc` include a template tool, witch helps to create
a base structure for the project. [Learn more here](https://fuellabs.github.io/sway).

Inside a **new** path `my-fuel-dapp/contract` run;

```sh
forc init ## executes the initialization
```

Now let's **build** the contract initialized by **forc** to make sure we have everything right.

Inside `my-fuel-dapp/contract` run;

```
forc build
```

You should see something like this;

```
Compiled library "core".
Compiled library "std".
Compiled contract "contracts".
Bytecode size is 68 bytes.
```

Congrats! You build the first contract on **🌴 Sway** let's edit and deploy something cooler now.

### 2. Modify and build

Lets change our **🌴 Sway** Contract now, with a slightly more complex example. Read the comments
to help you understand the contract.

For this we are going to update and re-build our contract.

Change the file `my-fuel-dapp/contract/src/main.sw` to;

```rust
contract;

// Import the std lib from sway
use std::*;

// Initialize a storage
// Storage are the way we add persistent state to our contracts
//
// In this case create a storage with property counter and
// initialized in 0
storage {
  counter: u64 = 0,
}

// Define the interface out contract shall have
// In this case;
abi MyContract {
  // A counter method with no params that returns a number
  // and don't write on the storage
  #[storage(read)]fn counter() -> u64;
  // A increment method with a param a number that returns a number
  // and can read and write on the storage
  #[storage(read, write)]fn increment(param: u64) -> u64;
}

// The contract implementation
impl MyContract for Contract {
  #[storage(read)]fn counter() -> u64 {
    // Read and return the counter property value
    // from the contract storage
    storage.counter
  }
  #[storage(read, write)]fn increment(param: u64) -> u64 {
    // Read the counter from storage and increment with
    // the param received
    storage.counter += param;
    // Return the new storage counter value
    storage.counter
  }
}
```

Now re-build the contract to generate the new binary with changes we just made.

Inside `my-fuel-dapp/contract` run;

```
forc build
```

You should see something like this;

```
Compiled library "core".
Compiled library "std".
Compiled contract "contracts".
Bytecode size is 260 bytes.
```

### 3. Deploy the contract

To deploy the contract we just need to use the `forc` tool with some parameters to inform the node address.

Inside `my-fuel-dapp/contract` run;

```sh
forc deploy --url localhost:4000
```

You should see something like this;

```sh
  Compiled library "core".
  Compiled library "std".
  Compiled contract "contracts".
  Bytecode size is 260 bytes.
Contract id: 0xa326e3472fd4abc417ba43e369f59ea44f8325d42ba6cf71ec4b58123fd8668a
Logs:
TransactionId(HexFormatted(b3e777d3bb5c5bc15ece4e466504f4a2ecc3f5cfdc9c8affac6325ae4d64e2ae))
```

Notice a important thing here; The **`Contract id`** is the address of the deployed contract on the local fuel node, wich means in order to interact with the contract the SDK will require us to inform this **Contract ID**. In this case `0xa326e3472fd4abc417ba43e369f59ea44f8325d42ba6cf71ec4b58123fd8668a`.

#### ✨✨✨ Congrats you have deployed you first **🌴 Sway** Contract on you own local node. ✨✨✨

## 💚 Create a Fuel DApp to interact with your Contract

Now we are going to;

1. **Initialize a React project.**
2. **Install the `fuels` SDK dependencies.**
3. **Modify the App.**
4. **Run our project.**

#### 4.1 Initialize a React project.

To split better our project let's create a new folder `frontend` and initialize our project inside it.

Inside `my-fuel-dapp` run;

```sh
npx create-react-app frontend --template typescript
```

The command will generate a react app using [`Create React App`](https://create-react-app.dev/).

#### 4.2 Install the `fuels` SDK dependencies.

On this step we need to install 3 dependencies to the project;

1. `fuels`: The umbrella package that includes all the main tools; `Wallet`, `Contracts`, `Providers` and more.
2. `typechain`: Typechain is the ABI TypeScript generator.
3. `typechain-target-fuels`: The Typechain Target is the specific interpreter for the [Fuel ABI Spec](https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md).

> ABI stands for Application Binary Interface. ABI's inform the application the interface to interact with the VM, in other words, they provide info to the APP what methods a contract has, what params, types it expects, etc...

##### Install

Inside `my-fuel-dapp/frontend` run;

```sh
npm install fuels --save
npm install typechain typechain-target-fuels --save-dev
```

##### Generating contract types

To make easer to interact with contract we use `typechain` to interpret the output ABI JSON from our contract. This JSON was created on the moment we executed the `forc build` to compile our Sway Contract into binary. If you see the folder `my-fuel-dapp/contract/out` you will be able to see the ABI JSON there. If you want to learn more, read the [ABI Specs here](https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md).

Inside `my-fuel-dapp/frontend` run;

```sh
npx typechain --target=fuels --out-dir=./src/contracts ../contract/out/debug/*-abi.json
```

You should see something like this;

```sh
Successfully generated 4 typings!
```

Now you should be able to find a new folder `my-fuel-dapp/frontend/src/contracts`. This folder was auto-generated by our `typechain` command, this files abstract the work we would need to do, to create a contract instance, and also generate a complete TypeScript interface to the Contract, making easy to develop.

### 3. Modify the App.

Inside the `frontend` folder let's add a code that interact with our contract.
Read the comments to help you understand the App parts.

Change the file `my-fuel-dapp/frontend/src/App.tsx` to:

```ts
import React, { useEffect, useState } from "react";
import { Wallet } from "fuels";
import "./App.css";
// Import the contract factory from the generated folder
// from the typechain command
import { ContractsAbi__factory } from "./contracts";

// Se the Wallet Secret used on the chainConfig.json
// this enables us to have a account with initial balance
const WALLET_SECRET =
  "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
// The address of the contract deployed to our local node
// the contract id is output right after the forc deploy command
const CONTRACT_ID =
  "0xa326e3472fd4abc417ba43e369f59ea44f8325d42ba6cf71ec4b58123fd8668a";
// Create a Wallet from given secretKey in this case
// The one we configured at the chainConfig.json
const wallet = new Wallet(WALLET_SECRET);
// Connects out Contract instance to the deployed contract
// address using the given wallet.
const contract = ContractsAbi__factory.connect(CONTRACT_ID, wallet);

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    async function main() {
      // Executes the counter function to query the current contract state
      // the `.get()` is read-only, because of this it don't expand coins.
      const { value } = await contract.functions.counter().get();
      setCounter(Number(value));
    }
    main();
  }, []);

  async function increment() {
    // Creates a transactions to call the increment function passing the amount
    // we want to increment, because it creates a TX and updates the contract state
    // this requires the wallet to have enough coins to cover the costs and also
    // to sign the Transaction
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

### 4. Run your project.

Now it's time to have fun run the project on your browser;

Inside `my-fuel-dapp/frontend` run;

```sh
npm start
```

#### ✨💚✨ Congrats you have completed your first DApp on Fuel ✨💚✨

![My Fuel App Preview](./assets/my-fuel-dapp-preview.png)
