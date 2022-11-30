## SwaySwap Scripts

This package create has toolings to help integrate Sway contracts
on the SwaySwap application. It makes easier for developers to
change contracts at the same time they build a nice UI

### Execute

```sh
pnpm exec swayswap-scripts [command]
```

### Options

```sh
Usage: SwaySwap Scripts [options] [command]

Utility to build, deploy and generate types for Sway Contracts

Options:
  -h, --help      display help for command

Commands:
  build           Build sway contracts and generate type
  deploy          deploy contract to fuel network
  run             build and deploy contracts to fuel network
  help [command]  display help for command
```

### Config

```
{
  onSuccess?: (event: Event) => void;
  onFailure?: (err: unknown) => void;
  env?: {
    [key: string]: string;
  };
  types: {
    artifacts: string;
    output: string;
  };
  contracts: {
    name: string;
    path: string;
  }[];
}
```

See complete [types here](./src/types.ts).

### Environment variables

| name           | default          | description                                                                                                                                            |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| WALLET_SECRET  | empty            | Wallet secret used to deploy contracts                                                                                                                 |
| GENESIS_SECRET | empty            | Genesis secret used when WALLET_SECRET is not present it creates a new wallet and seeds values from genesis to the new wallet and deploys the contract |
| PROVIDER_URL   | fuels-ts default | Fuel network url                                                                                                                                       |
| GAS_PRICE      | 0                | Specified the gas price used to send the tx                                                                                                            |
