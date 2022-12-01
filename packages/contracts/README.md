## Contracts Scripts

Contracts Scripts creates a fater way to develop your DApp
by integrating the cycle of contract building, types generation, deployment and
contract id's configuration.

### How to use

To use Contracts Scripts you need to create a file [`contracts.config.ts`](#configuration). That contain
the paths for your contracts, the output dir for your types and a post deployment script to replace,
the contract id's inside your application.

#### Install

```sh
npm install @fuel-ts/contracts
```

#### Configuration

Create a file `contracts.config.ts` inside your project. See the example bellow.

```ts
import { writeFileSync } from "fs";
import { join } from "path";
import { createConfig } from "@fuel-ts/contracts";

export default createConfig({
  privateKey: "0x000...0000",
  deployConfig: {
    gasPrice: 1,
  },
  contracts: [
    {
      name: "CONTRACT_FOO",
      path: "./contracts/foo",
    },
    {
      name: "CONTRACT_BAR",
      path: "./contracts/bar",
    },
  ],
  types: {
    output: "./types",
  },
  onSuccess: (event) => {
    if (event.type === "deploy" || event.type === "run") {
      const filePath = join(event.path.config, "./contracts.json");
      const appConfig = event.data.reduce(
        (config, { name, contractId }) => ({
          ...config,
          [name]: contractId,
        }),
        {}
      );
      writeFileSync(filePath, JSON.stringify(appConfig, null, 2));
    }
  },
});
```

#### Executing

When executing the command `run` the script will compile your contracts, generate the types, deploy and execute the post script, in the example above, the `onSuccess` function will write the contract id's inside a file called `contracts.json`. You can import this file inside your application and use the contract id's. In the case of a front-end app using the a json file like this you will also have the advantage of live reloading or hotreloading if your current setup supports it.

```sh
contracts run
```

### Options

```sh
Usage: contracts [options] [command]

Utility to build, deploy and generate types for Sway Contracts

Options:
  -c, --config <path>  Root folder where the config file is located (default: "./")
  -h, --help           display help for command

Commands:
  build                Build sway contracts and generate type
  deploy               deploy contract to fuel network
  run                  build and deploy contracts to fuel network
  types                Generate contract types
  help [command]       display help for command
```

### Environment variables

| name          | default | description                            |
| ------------- | ------- | -------------------------------------- |
| WALLET_SECRET | empty   | Wallet secret used to deploy contracts |
