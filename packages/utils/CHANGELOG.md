# @fuel-ts/utils

## 0.81.0

### Patch Changes

- 37743e8: chore: add initial `depcheck` using knip
- Updated dependencies [37743e8]
  - @fuel-ts/errors@0.81.0
  - @fuel-ts/interfaces@0.81.0

## 0.80.0

### Patch Changes

- Updated dependencies [29d5303]
  - @fuel-ts/errors@0.80.0
  - @fuel-ts/interfaces@0.80.0

## 0.79.0

### Patch Changes

- Updated dependencies [3ebb9bcd]
  - @fuel-ts/interfaces@0.79.0
  - @fuel-ts/errors@0.79.0

## 0.78.0

### Patch Changes

- @fuel-ts/errors@0.78.0
- @fuel-ts/interfaces@0.78.0

## 0.77.0

## 0.76.0

### Minor Changes

- Add the DateTime class, which allows for the conversion between common date time formats, by [@petertonysmith94](https://github.com/petertonysmith94) (See [#1627](https://github.com/FuelLabs/fuels-ts/pull/1627))

### Patch Changes

- Add method `addTransfer` to `BaseInvocationScope`, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1810](https://github.com/FuelLabs/fuels-ts/pull/1810))

## 0.75.0

### Patch Changes

- Use interal utilities for arrayify, hexlify, concat and BytesLike, by [@danielbate](https://github.com/danielbate) (See [#1775](https://github.com/FuelLabs/fuels-ts/pull/1775))

## 0.74.0

### Minor Changes

- - Updated to support`forc v0.50.0`
  - `getForcProject` now supports both `debug` and `release` builds, by [@nedsalk](https://github.com/nedsalk) (See [#1744](https://github.com/FuelLabs/fuels-ts/pull/1744))

## 0.73.0

## 0.72.0

### Minor Changes

- chore!: share single chainconfig and `launchNode` utility throughout the codebase.
  - `startFuelCore` now re-uses `launchNode` instead of having its own node-launching logic
  - `@fuel-ts/utils` now exports a `defaultChainConfig` and a `defaultConsensusKey` which is used everywhere in the source code.
  - The `chainConfig.json` file inside the `.fuel-core` folder at the root also uses the same chain config. The `run-node` script has been modified to copy over the contents of the chain config file from the utils package.
  # Breaking Changes
  - Multiple fuel-core config-related options have been removed from `LaunchNodeOptions`:
  - `chainConfigPath`
  - `consensusKey`
  - `useInMemoryDb`
  - `poaInstant`
  - The only way to pass in these config values now is through the `args` property, i.e.:
  ````ts
  const { cleanup, ip, port } = await launchNode({
  args: ["--poa-interval-period", "750ms", "--poa-instant", "false"],
  });
  ```, by [@arboleya](https://github.com/arboleya) (See [#1495](https://github.com/FuelLabs/fuels-ts/pull/1495))
  ````

### Patch Changes

- 🐞 Fixing and internalizing `findBinPath` utility, by [@arboleya](https://github.com/arboleya) (See [#1495](https://github.com/FuelLabs/fuels-ts/pull/1495))
- Remove ethers dependency from the utils package, by [@arboleya](https://github.com/arboleya) (See [#1495](https://github.com/FuelLabs/fuels-ts/pull/1495))

## 0.71.1

## 0.71.0

### Minor Changes

- Encode and decode u8 and bool as small bytes and right aligned under various conditions, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))
- Add `pnpm create fuels` CLI tool, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))
- add support for TX policies, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))

## 0.70.1

## 0.70.0

### Minor Changes

- Encode and decode u8 and bool as small bytes and right aligned under various conditions, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1437](https://github.com/FuelLabs/fuels-ts/pull/1437))
- Add `pnpm create fuels` CLI tool, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1565](https://github.com/FuelLabs/fuels-ts/pull/1565))
- add support for TX policies, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1437](https://github.com/FuelLabs/fuels-ts/pull/1437))

## 0.69.1

## 0.69.0

## 0.68.0

### Patch Changes

- - Standardizing all forc projects across all packages
  - Fixing turbo caching configs for `pretest` pipeline
  - Reducing verbosity of `pretest` pipeline, by [@arboleya](https://github.com/arboleya) (See [#1442](https://github.com/FuelLabs/fuels-ts/pull/1442))
- Introduce internal hexlify and arrayify functions, by [@danielbate](https://github.com/danielbate) (See [#1401](https://github.com/FuelLabs/fuels-ts/pull/1401))

## 0.67.0

## 0.66.1

### Patch Changes

- Adjusting package manager configs, by [@arboleya](https://github.com/arboleya) (See [#1415](https://github.com/FuelLabs/fuels-ts/pull/1415))

## 0.66.0

## 0.65.0

## 0.64.1

### Patch Changes

- `concatBytes` now accept `BytesLike` as input, by [@LuizAsFight](https://github.com/LuizAsFight) (See [#1365](https://github.com/FuelLabs/fuels-ts/pull/1365))

## 0.64.0

## 0.63.0

### Patch Changes

- refactor: purge usage of `arrayify` from ethers v5 in favor of `getBytes` from ethers v6, by [@danielbate](https://github.com/danielbate) (See [#1255](https://github.com/FuelLabs/fuels-ts/pull/1255))

## 0.62.0

## 0.61.0

## 0.60.0

## 0.59.0

## 0.58.0

### Minor Changes

- using FuelError across all packages, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1230](https://github.com/FuelLabs/fuels-ts/pull/1230))

## 0.57.0

### Patch Changes

- Replace lodash with ramda for ESM support, by [@danielbate](https://github.com/danielbate) (See [#1242](https://github.com/FuelLabs/fuels-ts/pull/1242))

## 0.56.1

## 0.56.0

## 0.55.0

### Patch Changes

- 🐞 Fix stateRoot calculation on sparse merkle tree, by [@luizstacio](https://github.com/luizstacio) (See [#1220](https://github.com/FuelLabs/fuels-ts/pull/1220))

## 0.54.1

## 0.54.0

## 0.53.0

## 0.52.0

## 0.51.0

### Minor Changes

- upgrade fuel-core to 0.20.3, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1112](https://github.com/FuelLabs/fuels-ts/pull/1112))

## 0.50.0

## 0.49.1

## 0.49.0

## 0.48.2

### Patch Changes

- Implement chunk and pad utility in predicate and contract root calculations, by [@danielbate](https://github.com/danielbate) (See [#1137](https://github.com/FuelLabs/fuels-ts/pull/1137))

## 0.48.1

## 0.48.0

## 0.47.0

## 0.46.0

### Patch Changes

- Removing `publishConfigs`, using `.dts` files with declaration maps (`.dts.map`), by [@arboleya](https://github.com/arboleya) (See [#1055](https://github.com/FuelLabs/fuels-ts/pull/1055))

## 0.45.0

## 0.44.2

## 0.44.1

### Patch Changes

- 🐞 Fixing type's configs for multi-entry packages, by [@arboleya](https://github.com/arboleya) (See [#1035](https://github.com/FuelLabs/fuels-ts/pull/1035))

## 0.44.0

## 0.43.1

## 0.43.0

## 0.42.0

### Patch Changes

- [#978](https://github.com/FuelLabs/fuels-ts/pull/978) [`b71ad9fd`](https://github.com/FuelLabs/fuels-ts/commit/b71ad9fd05f9fa478d66a18739be1a8b7956a4d4) Thanks [@arboleya](https://github.com/arboleya)! - Extracting Typegen utils (plus test utils) into a new package

## 0.42.0

### Patch Changes

- [#978](https://github.com/FuelLabs/fuels-ts/pull/978) [`b71ad9fd`](https://github.com/FuelLabs/fuels-ts/commit/b71ad9fd05f9fa478d66a18739be1a8b7956a4d4) Thanks [@arboleya](https://github.com/arboleya)! - Extracting Typegen utils (plus test utils) into a new package
