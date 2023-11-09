# @fuel-ts/docs-snippets

## 0.67.0

### Minor Changes

- 🐞 Fixing transaction funding, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1372](https://github.com/FuelLabs/fuels-ts/pull/1372))

## 0.66.1

## 0.66.0

### Patch Changes

- Improve typegen support for String, RawSlice and Bytes, by [@danielbate](https://github.com/danielbate) (See [#1412](https://github.com/FuelLabs/fuels-ts/pull/1412))

## 0.65.0

## 0.64.1

## 0.64.0

## 0.63.0

### Patch Changes

- Add typegen support and docs for new types, by [@camsjams](https://github.com/camsjams) (See [#1342](https://github.com/FuelLabs/fuels-ts/pull/1342))
- refactor: purge usage of `arrayify` from ethers v5 in favor of `getBytes` from ethers v6, by [@danielbate](https://github.com/danielbate) (See [#1255](https://github.com/FuelLabs/fuels-ts/pull/1255))

## 0.62.0

## 0.61.0

## 0.60.0

## 0.59.0

## 0.58.0

### Minor Changes

- `chainInfo` is now fetched and cached on all `Provider`s when they are initialized. With this release, you now need to initialize a `Provider` like so:
  ```ts
  const provider = await Provider.create(url);
  ```
  For the full list of breaking-changes, please see [this PR](https://github.com/FuelLabs/fuels-ts/pull/1181), by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1181](https://github.com/FuelLabs/fuels-ts/pull/1181))
- Remove `chainId` from the `Predicate` constructor. You don't need to pass in `chainId` anymore since you are passing in a `provider` already, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1181](https://github.com/FuelLabs/fuels-ts/pull/1181))
- using FuelError across all packages, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1230](https://github.com/FuelLabs/fuels-ts/pull/1230))

## 0.57.0

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

### Minor Changes

- use simulate instead of get on BaseInvocationScope class, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1179](https://github.com/FuelLabs/fuels-ts/pull/1179))

## 0.49.1

## 0.49.0

## 0.48.2

### Patch Changes

- Deprecate tx funding call option as all txs require a spendable input, by [@danielbate](https://github.com/danielbate) (See [#1136](https://github.com/FuelLabs/fuels-ts/pull/1136))

## 0.48.1

## 0.48.0

### Patch Changes

- `NativeAssetId` has been renamed to `BaseAssetId` for better clarity and consistency with the Rust SDK, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1121](https://github.com/FuelLabs/fuels-ts/pull/1121))

## 0.47.0

## 0.46.0

### Minor Changes

- Improve usability of `ScriptTransactionRequest` and document, by [@danielbate](https://github.com/danielbate) (See [#1072](https://github.com/FuelLabs/fuels-ts/pull/1072))

### Patch Changes

- Reshaping `forc-bin` package for publishing, by [@arboleya](https://github.com/arboleya) (See [#1073](https://github.com/FuelLabs/fuels-ts/pull/1073))

## 0.45.0

### Minor Changes

- Upgrade to fuel-core 0.18.1 and forc 0.40.1, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#986](https://github.com/FuelLabs/fuels-ts/pull/986))

## 0.44.2

## 0.44.1

## 0.44.0

## 0.43.1

## 0.43.0

## 0.42.0

## 0.41.0

## 0.40.0

## 0.40.0
