[nav_order: 0]

# Generating Types from ABI

## Installation

First we install `fuels` to our project:

```sh
yarn add fuels
```

## Help

A first glance at the docs:

```console
$ yarn exec fuels typegen -h

Usage: fuels typegen [options]

generate typescript from contract abi json files

Options:
  -i, --inputs <path|glob... input paths/globals to your abi json files
  -o, --output <dir>           directory path for generated files
  -c, --contract               generate code for contracts [default]
  -s, --script                 generate code for scripts
  --silent                     omit output messages
  -h, --help                   display help for command
```

## Generating Types for Contracts

We can omit the `--contract` option here; its the default:

```console
yarn exec fuels -i ./abis/*-abi.json -o ./types
```

**Notes**

- `-i`: the relative path/global to the ABI JSON file(s)
- `-o`: the output directory for the generated types
- `-c, --contract`: tells we want to generate types for contracts _(default, can be omitted)_

## Generating Types for Scripts

Note how we make use of the option `--script` in this case:

```console
yarn exec fuels -i ./abis/*-abi.json -o ./types --script
```

**Notes**

- `-s, --script`: Tells we want to generate types for scripts

---

See also:

- [Using Generated Contract Types](./using-generated-types.md#using-generated-contract-types)
- [Using Generated Script Types](./using-generated-types.md#using-generated-script-types)
