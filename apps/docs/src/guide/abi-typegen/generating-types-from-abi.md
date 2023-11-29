# Generating Types from ABI

## Installation

First we install `fuels` to our project:

```console
pnpm add fuels
```

## Help

A first glance at the docs:

```console
$ pnpm fuels typegen -h

Usage: fuels typegen [options]

generate typescript from contract abi json files

Options:
  -i, --inputs <path|glob... input paths/globals to your ABI JSON files
  -o, --output <dir>           directory path for generated files
  -c, --contract               generate code for contracts [default]
  -s, --script                 generate code for scripts
  --silent                     omit output messages
  -h, --help                   display help for command
```

## Generating Types for Contracts

You can generate types for a Sway contract using the command below:

<!-- This section should have the command to generate types for a Sway contract -->
<!-- gen_types:example:start -->

```console
pnpm fuels typegen -i ./abis/*-abi.json -o ./types
```

<!-- gen_types:example:end -->

<!-- This section should explain the flags used in the typegen command -->
<!-- flags:example:start -->

The path after the input flag `-i` should point to the file ending in `-abi.json` produced when the contract was built.

The path after the output flag `-o` will be the the output directory for the generated types.

You can omit the `--contract` option here since it's the default.

<!-- flags:example:end -->

## Generating Types for Scripts

To generate types for a Sway script, use the `--script` flag:

```console
pnpm fuels typegen -i ./abis/*-abi.json -o ./types --script
```

## Generating Types for Predicates

To generate types for a Sway predicate, use the `--predicate` flag:

```console
pnpm fuels typegen -i ./abis/*-abi.json -o ./types --predicate
```

---

See also:

- [Using Generated Contract Types](./using-generated-types.md#using-generated-contract-types)
- [Using Generated Script Types](./using-generated-types.md#using-generated-script-types)
- [Using Generated Predicate Types](./using-generated-types.md#using-generated-predicate-types)
