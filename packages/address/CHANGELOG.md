# Change Log

## 0.61.0

### Minor Changes

- Improve developer experience of `fromEvmAddress` address helper function, by [@danielbate](https://github.com/danielbate) (See [#1309](https://github.com/FuelLabs/fuels-ts/pull/1309))

## 0.60.0

## 0.59.0

### Minor Changes

- using `FuelError` instead of `@ethersproject/logger`, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1278](https://github.com/FuelLabs/fuels-ts/pull/1278))

## 0.58.0

### Minor Changes

- using FuelError across all packages, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1230](https://github.com/FuelLabs/fuels-ts/pull/1230))

## 0.57.0

## 0.56.1

## 0.56.0

## 0.55.0

## 0.54.1

## 0.54.0

## 0.53.0

### Patch Changes

- Changed errors to FuelError, by [@nedsalk](https://github.com/nedsalk) (See [#1153](https://github.com/FuelLabs/fuels-ts/pull/1153))

## 0.52.0

## 0.51.0

## 0.50.0

## 0.49.1

## 0.49.0

### Minor Changes

- rename package keystore to crypto, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1140](https://github.com/FuelLabs/fuels-ts/pull/1140))

## 0.48.2

## 0.48.1

## 0.48.0

### Minor Changes

- `NativeAssetId` has been renamed to `BaseAssetId` for better clarity and consistency with the Rust SDK, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1121](https://github.com/FuelLabs/fuels-ts/pull/1121))

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

### Minor Changes

- Revamping all packages configs, enabling local installation, by [@arboleya](https://github.com/arboleya) (See [#984](https://github.com/FuelLabs/fuels-ts/pull/984))

## 0.43.1

### Patch Changes

- Support EVM Address type, by [@danielbate](https://github.com/danielbate) (See [#995](https://github.com/FuelLabs/fuels-ts/pull/995))

## 0.43.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/interfaces@0.43.0
  - @fuel-ts/keystore@0.43.0
  - @fuel-ts/versions@0.43.0

## 0.42.0

### Patch Changes

- Updated dependencies [[`3d1492a1`](https://github.com/FuelLabs/fuels-ts/commit/3d1492a13dee9e19aa1844098fa144680810abc2)]:
  - @fuel-ts/versions@0.42.0
  - @fuel-ts/interfaces@0.42.0
  - @fuel-ts/keystore@0.42.0

## 0.41.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/interfaces@0.41.0
  - @fuel-ts/keystore@0.41.0
  - @fuel-ts/versions@0.41.0

## 0.40.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/interfaces@0.40.0
  - @fuel-ts/keystore@0.40.0
  - @fuel-ts/versions@0.40.0

## 0.39.1

### Patch Changes

- [#911](https://github.com/FuelLabs/fuels-ts/pull/911) [`e31f2f57`](https://github.com/FuelLabs/fuels-ts/commit/e31f2f574b5d2e334b0c55360cdc1bb273d4ac47) Thanks [@arboleya](https://github.com/arboleya)! - Fixing file path for DTS file in Address package

- Updated dependencies []:
  - @fuel-ts/interfaces@0.39.1
  - @fuel-ts/keystore@0.39.1
  - @fuel-ts/versions@0.39.1

## 0.39.0

### Patch Changes

- Updated dependencies [[`63c906b2`](https://github.com/FuelLabs/fuels-ts/commit/63c906b25e9cdb65e52c5d77fb85f118400fc545)]:
  - @fuel-ts/interfaces@0.39.0
  - @fuel-ts/keystore@0.39.0
  - @fuel-ts/versions@0.39.0

## 0.38.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/interfaces@0.38.1
  - @fuel-ts/keystore@0.38.1
  - @fuel-ts/versions@0.38.1

## 0.38.0

### Patch Changes

- Updated dependencies [[`653c8391`](https://github.com/FuelLabs/fuels-ts/commit/653c8391ece33a8f31598ea137452dd601dc7468)]:
  - @fuel-ts/interfaces@0.38.0
  - @fuel-ts/versions@0.38.0
  - @fuel-ts/keystore@0.38.0

## 0.37.1

### Patch Changes

- Updated dependencies [[`0fedaa2b`](https://github.com/FuelLabs/fuels-ts/commit/0fedaa2bccfc3d4858d7e89aef929bc1d91bca8c)]:
  - @fuel-ts/versions@0.37.1
  - @fuel-ts/interfaces@0.37.1
  - @fuel-ts/keystore@0.37.1

## 0.37.0

### Patch Changes

- Updated dependencies [[`deeb2d9c`](https://github.com/FuelLabs/fuels-ts/commit/deeb2d9ca304e43e36ef0db5e7b46c14f2f4e8f3)]:
  - @fuel-ts/versions@0.37.0
  - @fuel-ts/interfaces@0.37.0
  - @fuel-ts/keystore@0.37.0

## 0.36.0

### Minor Changes

- [#820](https://github.com/FuelLabs/fuels-ts/pull/820) [`3cb39443`](https://github.com/FuelLabs/fuels-ts/commit/3cb394431a63f5294edf7e33207214eabf439ef5) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - The `@fuel-ts/constants` package has now been deleted. ALl constants have now been moved to `<package_name>/configs` for the respective package. They are all also exported by the umbrella `fuels` package.

### Patch Changes

- [#844](https://github.com/FuelLabs/fuels-ts/pull/844) [`1de9693a`](https://github.com/FuelLabs/fuels-ts/commit/1de9693a059501243bfa7b826231fd0fff10abcd) Thanks [@arboleya](https://github.com/arboleya)! - Adding missing `tsup` settings for individual `configs` entry points

- Updated dependencies []:
  - @fuel-ts/interfaces@0.36.0
  - @fuel-ts/keystore@0.36.0
  - @fuel-ts/versions@0.36.0

## 0.35.0

### Patch Changes

- [#819](https://github.com/FuelLabs/fuels-ts/pull/819) [`f4e1028a`](https://github.com/FuelLabs/fuels-ts/commit/f4e1028acd5a583d12662dd07ca0d17084a35be2) Thanks [@arboleya](https://github.com/arboleya)! - Adjusting export fields for all packages

- Updated dependencies [[`f4e1028a`](https://github.com/FuelLabs/fuels-ts/commit/f4e1028acd5a583d12662dd07ca0d17084a35be2)]:
  - @fuel-ts/interfaces@0.35.0
  - @fuel-ts/keystore@0.35.0
  - @fuel-ts/versions@0.35.0

## 0.34.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/interfaces@0.34.1
  - @fuel-ts/keystore@0.34.1
  - @fuel-ts/versions@0.34.1

## 0.34.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/interfaces@0.34.0
  - @fuel-ts/keystore@0.34.0
  - @fuel-ts/versions@0.34.0

## 0.33.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/interfaces@0.33.0
  - @fuel-ts/keystore@0.33.0
  - @fuel-ts/versions@0.33.0

## 0.32.0

### Minor Changes

- [#789](https://github.com/FuelLabs/fuels-ts/pull/789) [`66c200a1`](https://github.com/FuelLabs/fuels-ts/commit/66c200a1b4ecbef0ef8664fc01f7142364b0a1bc) Thanks [@luizstacio](https://github.com/luizstacio)! - Updating usages of BaseWalletLocked after renaming it to Account

### Patch Changes

- Updated dependencies [[`66c200a1`](https://github.com/FuelLabs/fuels-ts/commit/66c200a1b4ecbef0ef8664fc01f7142364b0a1bc)]:
  - @fuel-ts/interfaces@0.32.0
  - @fuel-ts/keystore@0.32.0
  - @fuel-ts/versions@0.32.0

## 0.31.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.31.0
  - @fuel-ts/interfaces@0.31.0
  - @fuel-ts/keystore@0.31.0
  - @fuel-ts/versions@0.31.0

## 0.30.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.30.0
  - @fuel-ts/interfaces@0.30.0
  - @fuel-ts/keystore@0.30.0
  - @fuel-ts/versions@0.30.0

## 0.29.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.29.1
  - @fuel-ts/interfaces@0.29.1
  - @fuel-ts/keystore@0.29.1
  - @fuel-ts/versions@0.29.1

## 0.29.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.29.0
  - @fuel-ts/interfaces@0.29.0
  - @fuel-ts/keystore@0.29.0
  - @fuel-ts/versions@0.29.0

## 0.28.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.28.1
  - @fuel-ts/interfaces@0.28.1
  - @fuel-ts/keystore@0.28.1
  - @fuel-ts/versions@0.28.1

## 0.28.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.28.0
  - @fuel-ts/interfaces@0.28.0
  - @fuel-ts/keystore@0.28.0
  - @fuel-ts/versions@0.28.0

## 0.27.0

### Minor Changes

- [#678](https://github.com/FuelLabs/fuels-ts/pull/678) [`8103891`](https://github.com/FuelLabs/fuels-ts/commit/8103891071145a86380a8c9bcb11132249138486) Thanks [@camsjams](https://github.com/camsjams)! - Added new helper to take unknown string and turn into address

### Patch Changes

- Updated dependencies [[`d0eb1c7`](https://github.com/FuelLabs/fuels-ts/commit/d0eb1c732f63842b8d4801456054ec3b9ccdd020), [`450bbcd`](https://github.com/FuelLabs/fuels-ts/commit/450bbcd496177a2beafb969e97e48366cf7d35e1)]:
  - @fuel-ts/versions@0.27.0
  - @fuel-ts/constants@0.27.0
  - @fuel-ts/interfaces@0.27.0
  - @fuel-ts/keystore@0.27.0

## 0.26.0

### Patch Changes

- Updated dependencies [[`090d0bf`](https://github.com/FuelLabs/fuels-ts/commit/090d0bff2128595d3549b49bb8af3d79424e36a2), [`1402861`](https://github.com/FuelLabs/fuels-ts/commit/14028619b10cac84806c4cdbaabe9c8481ae0dd5)]:
  - @fuel-ts/versions@0.26.0
  - @fuel-ts/constants@0.26.0
  - @fuel-ts/interfaces@0.26.0
  - @fuel-ts/keystore@0.26.0

## 0.25.1

### Patch Changes

- Updated dependencies [[`9bf1d41`](https://github.com/FuelLabs/fuels-ts/commit/9bf1d4177811cb9d300849321acd9b5101128047)]:
  - @fuel-ts/versions@0.25.1
  - @fuel-ts/constants@0.25.1
  - @fuel-ts/interfaces@0.25.1
  - @fuel-ts/keystore@0.25.1

## 0.25.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.25.0
  - @fuel-ts/interfaces@0.25.0
  - @fuel-ts/keystore@0.25.0
  - @fuel-ts/versions@0.25.0

## 0.24.2

### Patch Changes

- [#646](https://github.com/FuelLabs/fuels-ts/pull/646) [`fa97383`](https://github.com/FuelLabs/fuels-ts/commit/fa97383114c36ee7a204be7e7f3f974382fa1b2c) Thanks [@camsjams](https://github.com/camsjams)! - Adjust doc update timing

- Updated dependencies [[`fa97383`](https://github.com/FuelLabs/fuels-ts/commit/fa97383114c36ee7a204be7e7f3f974382fa1b2c), [`0da49d3`](https://github.com/FuelLabs/fuels-ts/commit/0da49d37f4088faf112c0e5a393c6e8a25b3aa61)]:
  - @fuel-ts/constants@0.24.2
  - @fuel-ts/interfaces@0.24.2
  - @fuel-ts/keystore@0.24.2
  - @fuel-ts/versions@0.24.2

## 0.24.1

### Patch Changes

- Updated dependencies [[`8babcf0`](https://github.com/FuelLabs/fuels-ts/commit/8babcf02eca3fbec612d05f7a6d41dc6f340d58a)]:
  - @fuel-ts/versions@0.24.1
  - @fuel-ts/constants@0.24.1
  - @fuel-ts/interfaces@0.24.1
  - @fuel-ts/keystore@0.24.1

## 0.24.0

### Minor Changes

- [#616](https://github.com/FuelLabs/fuels-ts/pull/616) [`02ac98e`](https://github.com/FuelLabs/fuels-ts/commit/02ac98ea865e0464b132dc3f6bd21f7e1a57435a) Thanks [@arboleya](https://github.com/arboleya)! - Adding new `versions` package for exposing and managing compatibility versions of Fuel toolchain components

### Patch Changes

- [#645](https://github.com/FuelLabs/fuels-ts/pull/645) [`3de5ee5`](https://github.com/FuelLabs/fuels-ts/commit/3de5ee5b07b9e0c3754bebdecd8eac49b3a79413) Thanks [@camsjams](https://github.com/camsjams)! - Add util for B256 parsing

- Updated dependencies [[`02ac98e`](https://github.com/FuelLabs/fuels-ts/commit/02ac98ea865e0464b132dc3f6bd21f7e1a57435a)]:
  - @fuel-ts/versions@0.24.0
  - @fuel-ts/constants@0.24.0
  - @fuel-ts/interfaces@0.24.0
  - @fuel-ts/keystore@0.24.0

## 0.23.0

### Patch Changes

- [#639](https://github.com/FuelLabs/fuels-ts/pull/639) [`c0a62ed`](https://github.com/FuelLabs/fuels-ts/commit/c0a62ed278d6118f1af177dc98dcdb42febd0c81) Thanks [@camsjams](https://github.com/camsjams)! - Update docs

- Updated dependencies [[`c0a62ed`](https://github.com/FuelLabs/fuels-ts/commit/c0a62ed278d6118f1af177dc98dcdb42febd0c81)]:
  - @fuel-ts/constants@0.23.0
  - @fuel-ts/interfaces@0.23.0
  - @fuel-ts/keystore@0.23.0

## 0.22.2

### Patch Changes

- [#612](https://github.com/FuelLabs/fuels-ts/pull/612) [`03b060b`](https://github.com/FuelLabs/fuels-ts/commit/03b060b51e00034a2814a0c5ed2718d5dc86533b) Thanks [@camsjams](https://github.com/camsjams)! - Added docs and improved examples

- Updated dependencies [[`03b060b`](https://github.com/FuelLabs/fuels-ts/commit/03b060b51e00034a2814a0c5ed2718d5dc86533b)]:
  - @fuel-ts/constants@0.22.2
  - @fuel-ts/interfaces@0.22.2
  - @fuel-ts/keystore@0.22.2

## 0.22.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.22.1
  - @fuel-ts/interfaces@0.22.1
  - @fuel-ts/keystore@0.22.1

## 0.22.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.22.0
  - @fuel-ts/interfaces@0.22.0
  - @fuel-ts/keystore@0.22.0

## 0.21.2

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.21.2
  - @fuel-ts/interfaces@0.21.2
  - @fuel-ts/keystore@0.21.2

## 0.21.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.21.1
  - @fuel-ts/interfaces@0.21.1
  - @fuel-ts/keystore@0.21.1

## 0.21.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.21.0
  - @fuel-ts/interfaces@0.21.0
  - @fuel-ts/keystore@0.21.0

## 0.20.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.20.0
  - @fuel-ts/interfaces@0.20.0
  - @fuel-ts/keystore@0.20.0

## 0.19.0

### Minor Changes

- [#549](https://github.com/FuelLabs/fuels-ts/pull/549) [`db8cc6b`](https://github.com/FuelLabs/fuels-ts/commit/db8cc6b49616199368463ecd69aae6b3ca0b65d0) Thanks [@QuinnLee](https://github.com/QuinnLee)! - add output variables to transactions

### Patch Changes

- Updated dependencies [[`db8cc6b`](https://github.com/FuelLabs/fuels-ts/commit/db8cc6b49616199368463ecd69aae6b3ca0b65d0)]:
  - @fuel-ts/constants@0.19.0
  - @fuel-ts/interfaces@0.19.0
  - @fuel-ts/keystore@0.19.0

## 0.18.0

### Minor Changes

- [#531](https://github.com/FuelLabs/fuels-ts/pull/531) [`6b2b812`](https://github.com/FuelLabs/fuels-ts/commit/6b2b812aecfb639c22f3bbd251f2d50f23f9cd0f) Thanks [@QuinnLee](https://github.com/QuinnLee)! - add valueOf to bn and address

### Patch Changes

- [#543](https://github.com/FuelLabs/fuels-ts/pull/543) [`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3) Thanks [@arboleya](https://github.com/arboleya)! - Updating all libraries to their latest version

- [#543](https://github.com/FuelLabs/fuels-ts/pull/543) [`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3) Thanks [@arboleya](https://github.com/arboleya)! - Upgrading outdated dependencies to latest version

- Updated dependencies [[`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3), [`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3)]:
  - @fuel-ts/keystore@0.18.0
  - @fuel-ts/constants@0.18.0
  - @fuel-ts/interfaces@0.18.0

## 0.17.0

### Minor Changes

- [#517](https://github.com/FuelLabs/fuels-ts/pull/517) [`6403076`](https://github.com/FuelLabs/fuels-ts/commit/6403076bb9fce9055b436596e23713b0e7909d87) Thanks [@QuinnLee](https://github.com/QuinnLee)! - Parse Logs and Log Data

### Patch Changes

- Updated dependencies [[`6403076`](https://github.com/FuelLabs/fuels-ts/commit/6403076bb9fce9055b436596e23713b0e7909d87)]:
  - @fuel-ts/constants@0.17.0
  - @fuel-ts/interfaces@0.17.0
  - @fuel-ts/keystore@0.17.0

## 0.16.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.16.0
  - @fuel-ts/interfaces@0.16.0
  - @fuel-ts/keystore@0.16.0

## 0.15.0

### Minor Changes

- [#502](https://github.com/FuelLabs/fuels-ts/pull/502) [`5828934`](https://github.com/FuelLabs/fuels-ts/commit/5828934ccd96cec82fc0cece0f207dafaee5b89a) Thanks [@luizstacio](https://github.com/luizstacio)! - Add toJSON for parsing values to bech32 when using JSON.stringify with Address object

### Patch Changes

- [#468](https://github.com/FuelLabs/fuels-ts/pull/468) [`7ad3d79`](https://github.com/FuelLabs/fuels-ts/commit/7ad3d79bf7a1db766912a7b3d52e4fa2e550af56) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - Refactor to use bn.js instead of bigint.

- Updated dependencies [[`5828934`](https://github.com/FuelLabs/fuels-ts/commit/5828934ccd96cec82fc0cece0f207dafaee5b89a), [`7ad3d79`](https://github.com/FuelLabs/fuels-ts/commit/7ad3d79bf7a1db766912a7b3d52e4fa2e550af56)]:
  - @fuel-ts/interfaces@0.15.0
  - @fuel-ts/constants@0.15.0
  - @fuel-ts/keystore@0.15.0

## 0.14.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.14.0
  - @fuel-ts/interfaces@0.14.0
  - @fuel-ts/keystore@0.14.0

## 0.13.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.13.0
  - @fuel-ts/interfaces@0.13.0
  - @fuel-ts/keystore@0.13.0

## 0.12.0

### Minor Changes

- [#441](https://github.com/FuelLabs/fuels-ts/pull/441) [`f3dcd27`](https://github.com/FuelLabs/fuels-ts/commit/f3dcd272dc5a237c6a8ce235a542ad804039f13b) Thanks [@camsjams](https://github.com/camsjams)! - Added support for Bech32 Address format

### Patch Changes

- Updated dependencies [[`f3dcd27`](https://github.com/FuelLabs/fuels-ts/commit/f3dcd272dc5a237c6a8ce235a542ad804039f13b)]:
  - @fuel-ts/interfaces@0.12.0
  - @fuel-ts/constants@0.12.0
  - @fuel-ts/keystore@0.12.0
