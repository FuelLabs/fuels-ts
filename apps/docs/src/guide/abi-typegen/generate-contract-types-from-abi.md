# Generate Contract Types from ABI

See also [types](../types/).

#### Dependencies

```sh
yarn add fuels
```

#### Generate Types

```sh
yarn exec fuels -i ./abis/*-abi.json -o ./types
```

Note:

- `-i`: the relative path/global to the ABI JSON file(s)
- `-o`: the output directory for the generated types
