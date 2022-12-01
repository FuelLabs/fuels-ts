[nav_order: 0]

# Generate Contract Types from ABI

See also [types](../types/).

#### Dependencies

```sh
yarn add -D fuelchain typechain-target-fuels
```

#### Generate Types

```sh
yarn exec fuelchain --target=fuels --out-dir=types abi.json
```

Note:

- `target`: will always be `fuels`
- `out-dir`: the output directory for the generated types
- `abi.json`: the relative path to the JSON file for the ABI
