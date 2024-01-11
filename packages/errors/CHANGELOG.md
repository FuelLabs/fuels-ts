# @fuel-ts/errors

## 0.71.1

## 0.71.0

### Minor Changes

- Add `pnpm create fuels` CLI tool, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))
- add support for TX policies, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))

## 0.70.1

## 0.70.0

### Minor Changes

- Add `pnpm create fuels` CLI tool, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1565](https://github.com/FuelLabs/fuels-ts/pull/1565))
- add support for TX policies, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1437](https://github.com/FuelLabs/fuels-ts/pull/1437))

## 0.69.1

## 0.69.0

## 0.68.0

### Patch Changes

- Improves inputs validation and adds pretty error messages, by [@arboleya](https://github.com/arboleya) (See [#1433](https://github.com/FuelLabs/fuels-ts/pull/1433))
- Remove hexlify logic on values that are not hex, by [@camsjams](https://github.com/camsjams) (See [#1454](https://github.com/FuelLabs/fuels-ts/pull/1454))

## 0.67.0

## 0.66.1

### Patch Changes

- Adjusting package manager configs, by [@arboleya](https://github.com/arboleya) (See [#1415](https://github.com/FuelLabs/fuels-ts/pull/1415))

## 0.66.0

## 0.65.0

## 0.64.1

## 0.64.0

## 0.63.0

## 0.62.0

### Minor Changes

- Reverted GraphQL subscriptions, thus removing `Provider.operations.statusChange`, by [@nedsalk](https://github.com/nedsalk) (See [#1333](https://github.com/FuelLabs/fuels-ts/pull/1333))

## 0.61.0

### Minor Changes

- Check mismatch of fuel client version and supported version: throw on major/minor mismatch, warn on patch mismatch, by [@nedsalk](https://github.com/nedsalk) (See [#1287](https://github.com/FuelLabs/fuels-ts/pull/1287))
- Improve developer experience of `fromEvmAddress` address helper function, by [@danielbate](https://github.com/danielbate) (See [#1309](https://github.com/FuelLabs/fuels-ts/pull/1309))

## 0.60.0

### Minor Changes

- purging constant MAX_GAS_PER_TX, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1272](https://github.com/FuelLabs/fuels-ts/pull/1272))

## 0.59.0

### Minor Changes

- using `FuelError` instead of `@ethersproject/logger`, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1278](https://github.com/FuelLabs/fuels-ts/pull/1278))

## 0.58.0

### Minor Changes

- Remove `chainId` from the `Predicate` constructor. You don't need to pass in `chainId` anymore since you are passing in a `provider` already, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1181](https://github.com/FuelLabs/fuels-ts/pull/1181))
- using FuelError across all packages, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1230](https://github.com/FuelLabs/fuels-ts/pull/1230))

## 0.57.0

## 0.56.1

### Patch Changes

- Simplyfing errors package and its test utility, by [@arboleya](https://github.com/arboleya) (See [#1228](https://github.com/FuelLabs/fuels-ts/pull/1228))

## 0.56.0

### Minor Changes

- forbid multicall for more than one function that returns heap types, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1217](https://github.com/FuelLabs/fuels-ts/pull/1217))

## 0.55.0

## 0.54.1

## 0.54.0

## 0.53.0
