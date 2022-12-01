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
  build           Build Sway contracts and generate types
  deploy          Deploy contract to fuel network
  run             Build Sway contracts, generate types and deploy contracts to fuel network
  help [command]  display help for command
```

### Config

```
{
  onSuccess?: (event: Event) => void;
  onFailure?: (err: unknown) => void;
  privateKey?: string;
  providerUrl?: string;
  deployConfig?: {
    gasLimit?: number;
    gasPrice?: number;
  };
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
    deployConfig?: {
      gasLimit?: number;
      gasPrice?: number;
    };
  }[];
}
```

See complete [types here](./src/types.ts).

### Environment variables

| name          | default | description                            |
| ------------- | ------- | -------------------------------------- |
| WALLET_SECRET | empty   | Wallet secret used to deploy contracts |
