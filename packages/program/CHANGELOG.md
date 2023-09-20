# Change Log

## 0.58.0

### Minor Changes

- `chainInfo` is now fetched and cached on all `Provider`s when they are initialized. With this release, you now need to initialize a `Provider` like so:
  ```ts
  const provider = await Provider.create(url);
  ```
  For the full list of breaking-changes, please see [this PR](https://github.com/FuelLabs/fuels-ts/pull/1181), by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1181](https://github.com/FuelLabs/fuels-ts/pull/1181))
- Remove `chainId` from the `Predicate` constructor. You don't need to pass in `chainId` anymore since you are passing in a `provider` already, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1181](https://github.com/FuelLabs/fuels-ts/pull/1181))
- using FuelError across all packages, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1230](https://github.com/FuelLabs/fuels-ts/pull/1230))
- purging GAS_PRICE_FACTOR and GAS_PER_BYTE constants, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1271](https://github.com/FuelLabs/fuels-ts/pull/1271))

### Patch Changes

- Increase support for vectors in predicates, by [@danielbate](https://github.com/danielbate) (See [#1247](https://github.com/FuelLabs/fuels-ts/pull/1247))

## 0.57.0

### Minor Changes

- made ScriptResultDecoderError works for dryRun calls, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1250](https://github.com/FuelLabs/fuels-ts/pull/1250))

## 0.56.1

## 0.56.0

### Minor Changes

- forbid multicall for more than one function that returns heap types, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1217](https://github.com/FuelLabs/fuels-ts/pull/1217))
- Ensure asm from wasm is initialzed, by [@camsjams](https://github.com/camsjams) (See [#1240](https://github.com/FuelLabs/fuels-ts/pull/1240))
- 🐞 Fix gas call forwarding logic, by [@camsjams](https://github.com/camsjams) (See [#1241](https://github.com/FuelLabs/fuels-ts/pull/1241))

## 0.55.0

### Minor Changes

- improve transaction api for using predicates on custom transactions, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1216](https://github.com/FuelLabs/fuels-ts/pull/1216))

## 0.54.1

### Patch Changes

- Upgrading vm/wasm libs, by [@arboleya](https://github.com/arboleya) (See [#1226](https://github.com/FuelLabs/fuels-ts/pull/1226))

## 0.54.0

## 0.53.0

### Minor Changes

- Added vector output, by [@camsjams](https://github.com/camsjams) (See [#1183](https://github.com/FuelLabs/fuels-ts/pull/1183))

## 0.52.0

## 0.51.0

### Minor Changes

- upgrade fuel-core to 0.20.3, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1112](https://github.com/FuelLabs/fuels-ts/pull/1112))

## 0.50.0

### Minor Changes

- use simulate instead of get on BaseInvocationScope class, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1179](https://github.com/FuelLabs/fuels-ts/pull/1179))
- improve transaction response, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1108](https://github.com/FuelLabs/fuels-ts/pull/1108))

## 0.49.1

## 0.49.0

## 0.48.2

### Patch Changes

- Deprecate tx funding call option as all txs require a spendable input, by [@danielbate](https://github.com/danielbate) (See [#1136](https://github.com/FuelLabs/fuels-ts/pull/1136))

## 0.48.1

## 0.48.0

## 0.47.0

### Minor Changes

- Purged codebase of old ABI format, by [@nedsalk](https://github.com/nedsalk) (See [#1094](https://github.com/FuelLabs/fuels-ts/pull/1094))
- Added improved Vector support, by [@camsjams](https://github.com/camsjams) (See [#1046](https://github.com/FuelLabs/fuels-ts/pull/1046))

## 0.46.0

### Minor Changes

- Update fuel core version to 0.19.0, by [@danielbate](https://github.com/danielbate) (See [#1085](https://github.com/FuelLabs/fuels-ts/pull/1085))
- Improve usability of `ScriptTransactionRequest` and document, by [@danielbate](https://github.com/danielbate) (See [#1072](https://github.com/FuelLabs/fuels-ts/pull/1072))

### Patch Changes

- Reshaping `forc-bin` package for publishing, by [@arboleya](https://github.com/arboleya) (See [#1073](https://github.com/FuelLabs/fuels-ts/pull/1073))
- Removing `publishConfigs`, using `.dts` files with declaration maps (`.dts.map`), by [@arboleya](https://github.com/arboleya) (See [#1055](https://github.com/FuelLabs/fuels-ts/pull/1055))

## 0.45.0

### Minor Changes

- Upgrade to fuel-core 0.18.1 and forc 0.40.1, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#986](https://github.com/FuelLabs/fuels-ts/pull/986))

### Patch Changes

- 🐞 Fixing multicall script instruction, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#986](https://github.com/FuelLabs/fuels-ts/pull/986))

## 0.44.2

## 0.44.1

### Patch Changes

- 🐞 Fixing type's configs for multi-entry packages, by [@arboleya](https://github.com/arboleya) (See [#1035](https://github.com/FuelLabs/fuels-ts/pull/1035))

## 0.44.0

### Minor Changes

- Revamping all packages configs, enabling local installation, by [@arboleya](https://github.com/arboleya) (See [#984](https://github.com/FuelLabs/fuels-ts/pull/984))

## 0.43.1

## 0.43.0

### Patch Changes

- Updated dependencies [[`7d9017d0`](https://github.com/FuelLabs/fuels-ts/commit/7d9017d03d602e6fb32c16f41b503afecfa0f901), [`0b3c342b`](https://github.com/FuelLabs/fuels-ts/commit/0b3c342b395bca48b1c274d3d99cb3fc61eef9a3)]:
  - @fuel-ts/abi-coder@0.43.0
  - @fuel-ts/providers@0.43.0
  - @fuel-ts/transactions@0.43.0
  - @fuel-ts/wallet@0.43.0
  - @fuel-ts/address@0.43.0
  - @fuel-ts/interfaces@0.43.0
  - @fuel-ts/math@0.43.0
  - @fuel-ts/versions@0.43.0

## 0.42.0

### Patch Changes

- Updated dependencies [[`5b0ce1c0`](https://github.com/FuelLabs/fuels-ts/commit/5b0ce1c03e16702b6101b1f299020d7c70e85505), [`41da3655`](https://github.com/FuelLabs/fuels-ts/commit/41da3655d8a6b7a4633e0fdd3f35622ed24bbd90), [`eda13d72`](https://github.com/FuelLabs/fuels-ts/commit/eda13d72c32f72652a34f926c4b9cf42ac36556c), [`3d1492a1`](https://github.com/FuelLabs/fuels-ts/commit/3d1492a13dee9e19aa1844098fa144680810abc2)]:
  - @fuel-ts/providers@0.42.0
  - @fuel-ts/abi-coder@0.42.0
  - @fuel-ts/versions@0.42.0
  - @fuel-ts/wallet@0.42.0
  - @fuel-ts/transactions@0.42.0
  - @fuel-ts/address@0.42.0
  - @fuel-ts/interfaces@0.42.0
  - @fuel-ts/math@0.42.0

## 0.41.0

### Patch Changes

- Updated dependencies [[`8332026a`](https://github.com/FuelLabs/fuels-ts/commit/8332026aef44dcf17ace31dfb08a3114612a2ae5), [`bf6214cc`](https://github.com/FuelLabs/fuels-ts/commit/bf6214cc2c4be227974e7d64360c01c9875c772c), [`0ff4eeab`](https://github.com/FuelLabs/fuels-ts/commit/0ff4eeab67b4c6b6b224230193ab742a3103fa1e)]:
  - @fuel-ts/providers@0.41.0
  - @fuel-ts/wallet@0.41.0
  - @fuel-ts/abi-coder@0.41.0
  - @fuel-ts/address@0.41.0
  - @fuel-ts/interfaces@0.41.0
  - @fuel-ts/math@0.41.0
  - @fuel-ts/transactions@0.41.0
  - @fuel-ts/versions@0.41.0

## 0.40.0

### Patch Changes

- Updated dependencies [[`4321ac1b`](https://github.com/FuelLabs/fuels-ts/commit/4321ac1beacce0ed2e342942ef4a3997c1d34d10), [`d0eb7a39`](https://github.com/FuelLabs/fuels-ts/commit/d0eb7a39d2d5cd59cc45fede3826a327f158d5ea)]:
  - @fuel-ts/abi-coder@0.40.0
  - @fuel-ts/providers@0.40.0
  - @fuel-ts/transactions@0.40.0
  - @fuel-ts/wallet@0.40.0
  - @fuel-ts/address@0.40.0
  - @fuel-ts/interfaces@0.40.0
  - @fuel-ts/math@0.40.0
  - @fuel-ts/versions@0.40.0

## 0.39.1

### Patch Changes

- [#904](https://github.com/FuelLabs/fuels-ts/pull/904) [`2cd4d5da`](https://github.com/FuelLabs/fuels-ts/commit/2cd4d5da582ba6a1f7889387f577b6a823b6a8c7) Thanks [@danielbate](https://github.com/danielbate)! - Remove redundant falsy provider check from getBalance function within Contract class

- Updated dependencies [[`e31f2f57`](https://github.com/FuelLabs/fuels-ts/commit/e31f2f574b5d2e334b0c55360cdc1bb273d4ac47)]:
  - @fuel-ts/address@0.39.1
  - @fuel-ts/providers@0.39.1
  - @fuel-ts/transactions@0.39.1
  - @fuel-ts/wallet@0.39.1
  - @fuel-ts/abi-coder@0.39.1
  - @fuel-ts/interfaces@0.39.1
  - @fuel-ts/math@0.39.1
  - @fuel-ts/versions@0.39.1

## 0.39.0

### Minor Changes

- [#891](https://github.com/FuelLabs/fuels-ts/pull/891) [`63c906b2`](https://github.com/FuelLabs/fuels-ts/commit/63c906b25e9cdb65e52c5d77fb85f118400fc545) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - refact(abi-coder): encode/decode data inside functionFragment
  refact(abi-coder): include function selector and signature info, also if input data is pointer type

### Patch Changes

- Updated dependencies [[`a0beaa1d`](https://github.com/FuelLabs/fuels-ts/commit/a0beaa1d45f287aa566a42602f20744c71a37b32), [`63c906b2`](https://github.com/FuelLabs/fuels-ts/commit/63c906b25e9cdb65e52c5d77fb85f118400fc545), [`0522917f`](https://github.com/FuelLabs/fuels-ts/commit/0522917f64d05d992b7607740272e4954e991472), [`a8d27dc7`](https://github.com/FuelLabs/fuels-ts/commit/a8d27dc749b4c443fd0714da12b7a75ab56da6d7)]:
  - @fuel-ts/providers@0.39.0
  - @fuel-ts/abi-coder@0.39.0
  - @fuel-ts/interfaces@0.39.0
  - @fuel-ts/wallet@0.39.0
  - @fuel-ts/transactions@0.39.0
  - @fuel-ts/address@0.39.0
  - @fuel-ts/math@0.39.0
  - @fuel-ts/versions@0.39.0

## 0.38.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/wallet@0.38.1
  - @fuel-ts/abi-coder@0.38.1
  - @fuel-ts/address@0.38.1
  - @fuel-ts/interfaces@0.38.1
  - @fuel-ts/math@0.38.1
  - @fuel-ts/providers@0.38.1
  - @fuel-ts/transactions@0.38.1
  - @fuel-ts/versions@0.38.1

## 0.38.0

### Patch Changes

- [#833](https://github.com/FuelLabs/fuels-ts/pull/833) [`0873a883`](https://github.com/FuelLabs/fuels-ts/commit/0873a883d366a4efc6653a9c30079bb713769290) Thanks [@camsjams](https://github.com/camsjams)! - Update revert decoding to find reason

- Updated dependencies [[`653c8391`](https://github.com/FuelLabs/fuels-ts/commit/653c8391ece33a8f31598ea137452dd601dc7468), [`0873a883`](https://github.com/FuelLabs/fuels-ts/commit/0873a883d366a4efc6653a9c30079bb713769290)]:
  - @fuel-ts/interfaces@0.38.0
  - @fuel-ts/providers@0.38.0
  - @fuel-ts/versions@0.38.0
  - @fuel-ts/wallet@0.38.0
  - @fuel-ts/transactions@0.38.0
  - @fuel-ts/address@0.38.0
  - @fuel-ts/abi-coder@0.38.0
  - @fuel-ts/math@0.38.0

## 0.37.1

### Patch Changes

- Updated dependencies [[`0fedaa2b`](https://github.com/FuelLabs/fuels-ts/commit/0fedaa2bccfc3d4858d7e89aef929bc1d91bca8c)]:
  - @fuel-ts/versions@0.37.1
  - @fuel-ts/abi-coder@0.37.1
  - @fuel-ts/address@0.37.1
  - @fuel-ts/providers@0.37.1
  - @fuel-ts/transactions@0.37.1
  - @fuel-ts/wallet@0.37.1
  - @fuel-ts/interfaces@0.37.1
  - @fuel-ts/math@0.37.1

## 0.37.0

### Minor Changes

- [#852](https://github.com/FuelLabs/fuels-ts/pull/852) [`deeb2d9c`](https://github.com/FuelLabs/fuels-ts/commit/deeb2d9ca304e43e36ef0db5e7b46c14f2f4e8f3) Thanks [@arboleya](https://github.com/arboleya)! - Adding multi-type resolution support [also] for legacy projects

### Patch Changes

- Updated dependencies [[`deeb2d9c`](https://github.com/FuelLabs/fuels-ts/commit/deeb2d9ca304e43e36ef0db5e7b46c14f2f4e8f3)]:
  - @fuel-ts/math@0.37.0
  - @fuel-ts/transactions@0.37.0
  - @fuel-ts/versions@0.37.0
  - @fuel-ts/wallet@0.37.0
  - @fuel-ts/abi-coder@0.37.0
  - @fuel-ts/providers@0.37.0
  - @fuel-ts/address@0.37.0
  - @fuel-ts/interfaces@0.37.0

## 0.36.0

### Minor Changes

- [#820](https://github.com/FuelLabs/fuels-ts/pull/820) [`3cb39443`](https://github.com/FuelLabs/fuels-ts/commit/3cb394431a63f5294edf7e33207214eabf439ef5) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - The `@fuel-ts/constants` package has now been deleted. ALl constants have now been moved to `<package_name>/configs` for the respective package. They are all also exported by the umbrella `fuels` package.

### Patch Changes

- [#844](https://github.com/FuelLabs/fuels-ts/pull/844) [`1de9693a`](https://github.com/FuelLabs/fuels-ts/commit/1de9693a059501243bfa7b826231fd0fff10abcd) Thanks [@arboleya](https://github.com/arboleya)! - Adding missing `tsup` settings for individual `configs` entry points

- Updated dependencies [[`1613399e`](https://github.com/FuelLabs/fuels-ts/commit/1613399e97fc3ce63cdefa00ccff938e10f9fb9a), [`d9f8c8c0`](https://github.com/FuelLabs/fuels-ts/commit/d9f8c8c0e993cc1abca19877eafd617ca0d2ee38), [`3cb39443`](https://github.com/FuelLabs/fuels-ts/commit/3cb394431a63f5294edf7e33207214eabf439ef5), [`dd7b1cab`](https://github.com/FuelLabs/fuels-ts/commit/dd7b1cab0e7c4a5234383ce6fc34f041ee6d03a9), [`1de9693a`](https://github.com/FuelLabs/fuels-ts/commit/1de9693a059501243bfa7b826231fd0fff10abcd)]:
  - @fuel-ts/abi-coder@0.36.0
  - @fuel-ts/wallet@0.36.0
  - @fuel-ts/address@0.36.0
  - @fuel-ts/math@0.36.0
  - @fuel-ts/providers@0.36.0
  - @fuel-ts/transactions@0.36.0
  - @fuel-ts/interfaces@0.36.0
  - @fuel-ts/versions@0.36.0

## 0.35.0

### Patch Changes

- [#819](https://github.com/FuelLabs/fuels-ts/pull/819) [`f4e1028a`](https://github.com/FuelLabs/fuels-ts/commit/f4e1028acd5a583d12662dd07ca0d17084a35be2) Thanks [@arboleya](https://github.com/arboleya)! - Adjusting export fields for all packages

- Updated dependencies [[`f4e1028a`](https://github.com/FuelLabs/fuels-ts/commit/f4e1028acd5a583d12662dd07ca0d17084a35be2)]:
  - @fuel-ts/abi-coder@0.35.0
  - @fuel-ts/address@0.35.0
  - @fuel-ts/constants@0.35.0
  - @fuel-ts/interfaces@0.35.0
  - @fuel-ts/math@0.35.0
  - @fuel-ts/providers@0.35.0
  - @fuel-ts/transactions@0.35.0
  - @fuel-ts/versions@0.35.0
  - @fuel-ts/wallet@0.35.0

## 0.34.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/address@0.34.1
  - @fuel-ts/wallet@0.34.1
  - @fuel-ts/abi-coder@0.34.1
  - @fuel-ts/constants@0.34.1
  - @fuel-ts/interfaces@0.34.1
  - @fuel-ts/math@0.34.1
  - @fuel-ts/providers@0.34.1
  - @fuel-ts/transactions@0.34.1
  - @fuel-ts/versions@0.34.1

## 0.34.0

### Minor Changes

- [#806](https://github.com/FuelLabs/fuels-ts/pull/806) [`ec05f27b`](https://github.com/FuelLabs/fuels-ts/commit/ec05f27bc2920b5779ffdbdb515965498881d521) Thanks [@Torres-ssf](https://github.com/Torres-ssf)! - improve receipts evaluation at callResultToScriptResult

### Patch Changes

- Updated dependencies [[`c7cb8ac2`](https://github.com/FuelLabs/fuels-ts/commit/c7cb8ac2e268b860a41d29927814c24339f8514a)]:
  - @fuel-ts/abi-coder@0.34.0
  - @fuel-ts/wallet@0.34.0
  - @fuel-ts/providers@0.34.0
  - @fuel-ts/transactions@0.34.0
  - @fuel-ts/address@0.34.0
  - @fuel-ts/constants@0.34.0
  - @fuel-ts/interfaces@0.34.0
  - @fuel-ts/math@0.34.0
  - @fuel-ts/versions@0.34.0

## 0.33.0

### Patch Changes

- Updated dependencies [[`da3bc00a`](https://github.com/FuelLabs/fuels-ts/commit/da3bc00a29e7ef8f378afdb8bfb99d962be0dce3), [`5ba6ade0`](https://github.com/FuelLabs/fuels-ts/commit/5ba6ade0c5176e97a0f9f9b16835f8dd37408313)]:
  - @fuel-ts/providers@0.33.0
  - @fuel-ts/abi-coder@0.33.0
  - @fuel-ts/wallet@0.33.0
  - @fuel-ts/transactions@0.33.0
  - @fuel-ts/address@0.33.0
  - @fuel-ts/constants@0.33.0
  - @fuel-ts/interfaces@0.33.0
  - @fuel-ts/math@0.33.0
  - @fuel-ts/versions@0.33.0
