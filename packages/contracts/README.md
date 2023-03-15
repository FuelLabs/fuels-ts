## Contracts Scripts

Contracts Scripts creates a fater way to develop your DApp
by integrating the cycle of contract building, types generation, deployment and
contract id's configuration.

### How to use

To use Contracts Scripts you need to create a file [`fuels.config.ts`](#configuration). That contain
the paths for your contracts, the output dir for your types and a post deployment script to replace,
the contract id's inside your application.

#### Install

```sh
npm install @fuel-ts/contracts
```

#### Configuration

Create a file `fuels.config.ts` inside your project. See the example bellow.

```ts
import { createConfig } from "@fuel-ts/contracts";

export default createConfig({
  privateKey: "0x000...0000",
  deployConfig: {
    gasPrice: 1,
  },
  contracts: ["./contracts/foo", "./contracts/bar"],
  output: "./types",
});
```

If you are using workpaces you can also levarage it on the contracts configuration;

```ts
import { createConfig } from "@fuel-ts/contracts";

export default createConfig({
  privateKey: "0x000...0000",
  deployConfig: {
    gasPrice: 1,
  },
  workspace: "./contracts",
  output: "./types",
});
```

#### Other configuration options

The contracts configuration also has the following features, that can help you with complex deployment setups.

| name           | description                                                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| onSuccess      | A hook that is called right after the command is executed successfully                                                                  |
| onFailure      | A hook that is called if the command fail for any reason                                                                                |
| deployConfig() | Deploy can be a function enabling to customize deployOptions for each contract or create depencies based on previous deployed contracts |

Example with all props:

```ts
import { createConfig } from "@fuel-ts/contracts";

export default createConfig({
  privateKey: "0x000...0000",
  deployConfig: async (options) => {
    // In the case of two contracts been deployed and the second one depends on the first one
    // you can use the contracts object to get the contract id's
    // You could also query some data from another remote place.
    const contract = options.contracts.find(
      (c) => c.name === "<my contract deployed name>"
    );

    if (!contract) {
      throw new Error("Contract not found!");
    }

    return {
      gasPrice: 1,
      storageSlots: [
        {
          name: "0x000....0000", // Storage slot to initialize with the previous contract id,
          value: contract.contractId,
        },
      ],
    };
  },
  workspace: "./contracts",
  output: "./types",
  onSuccess: (event) => {
    console.log(event);
  },
  onFailure: (err) => {
    console.log(err);
  },
});
```

#### Executing

When executing the command `run` the script will compile your contracts, generate the types, deploy and save the contract ids inside the output folder with the name `contracts.json`. You can import this file inside your application and use the contract id's. In the case of a front-end app with this you can take advantage of live reloading or hotreloading if your current setup supports it.

```sh
fuels-contracts run
```

### Options

```sh
Usage: fuels-contracts [options] [command]

Utility to build, deploy and generate types for Sway Contracts

Options:
  -p, --path <path>  Root folder where the config file is located (default: "./")
  -h, --help           display help for command

Commands:
  build                Build sway contracts using forc
  types                Generate contract types
  deploy               deploy contract to fuel network
  run                  build, deploy contracts and generate types
  help [command]       display help for command
```

### Environment variables

| name          | default | description                            |
| ------------- | ------- | -------------------------------------- |
| WALLET_SECRET | empty   | Wallet secret used to deploy contracts |

### Using programatically

You can also use the contracts scripts programatically. See the example bellow.

```ts
import { run } from "@fuels-ts/contracts";

run({
  privateKey: "0x000...0000",
  deployConfig: {
    gasPrice: 1,
  },
  workspace: "/root/contracts",
  contracts: ["/root/contracts/foo", "/root/contracts/bar"],
  output: "/root/types",
}); // config options;
```
