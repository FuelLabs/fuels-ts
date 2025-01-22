<script setup>
  import { data } from '../../versions.data'
  const { fuels } = data
</script>

# Generating Types from ABI

## Installation

First we install `fuels` to our project:

```console-vue
pnpm add fuels@{{fuels}}
```

## Help

A first glance at the docs:

```console
$ pnpm fuels typegen -h

Usage: fuels typegen [options]

Generate Typescript from Sway ABI JSON files

Options:
  -i, --inputs <path|glob...>  Input paths/globals to your ABI JSON files
  -o, --output <dir>           Directory path for generated files
  -S, --silent                 Omit output messages
  -h, --help                   Display help
```

## Generating Types

You can generate types for a Sway program using the command below:

<!-- This section should have the command to generate types for a Sway program -->
<!-- gen_types:example:start -->

```console
pnpm fuels typegen -i ./abis/*-abi.json -o ./types
```

<!-- gen_types:example:end -->

<!-- This section should explain the flags used in the typegen command -->
<!-- flags:example:start -->

The path after the input flag `-i` should point to the file ending in `-abi.json` produced when the Sway program was built.

- For scripts and predicates, you'll need the bytecode of the program to be in the same folder for the command to work.
- For contracts, the command will work without the bytecode but the corresponding `ContractFactory` file won't be generated as factories need the bytecode to operate.

The path after the output flag `-o` will be the output directory for the generated types.

<!-- flags:example:end -->

---

See also:

- [Using Generated Contract Types](./using-generated-types.md#contract)
- [Using Generated Script Types](./using-generated-types.md#script)
- [Using Generated Predicate Types](./using-generated-types.md#predicate)
