# Change Log

## 0.49.0

### Minor Changes

- rename package keystore to crypto, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1140](https://github.com/FuelLabs/fuels-ts/pull/1140))

## 0.48.2

## 0.48.1

### Patch Changes

- ✨ feat: add helper method "getTypeById" to Abi Interface, by [@LuizAsFight](https://github.com/LuizAsFight) (See [#1123](https://github.com/FuelLabs/fuels-ts/pull/1123))

## 0.48.0

## 0.47.0

### Minor Changes

- Purged codebase of old ABI format, by [@nedsalk](https://github.com/nedsalk) (See [#1094](https://github.com/FuelLabs/fuels-ts/pull/1094))
- Added improved Vector support, by [@camsjams](https://github.com/camsjams) (See [#1046](https://github.com/FuelLabs/fuels-ts/pull/1046))

## 0.46.0

### Patch Changes

- Removing `publishConfigs`, using `.dts` files with declaration maps (`.dts.map`), by [@arboleya](https://github.com/arboleya) (See [#1055](https://github.com/FuelLabs/fuels-ts/pull/1055))

## 0.45.0

### Minor Changes

- Upgrade to fuel-core 0.18.1 and forc 0.40.1, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#986](https://github.com/FuelLabs/fuels-ts/pull/986))

## 0.44.2

## 0.44.1

## 0.44.0

### Minor Changes

- Revamping all packages configs, enabling local installation, by [@arboleya](https://github.com/arboleya) (See [#984](https://github.com/FuelLabs/fuels-ts/pull/984))

## 0.43.1

## 0.43.0

### Minor Changes

- [#988](https://github.com/FuelLabs/fuels-ts/pull/988) [`7d9017d0`](https://github.com/FuelLabs/fuels-ts/commit/7d9017d03d602e6fb32c16f41b503afecfa0f901) Thanks [@danielbate](https://github.com/danielbate)! - ABI coder will throw when encoding a string with a value legnth mismatch

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/keystore@0.43.0
  - @fuel-ts/math@0.43.0
  - @fuel-ts/versions@0.43.0

## 0.42.0

### Minor Changes

- [#991](https://github.com/FuelLabs/fuels-ts/pull/991) [`eda13d72`](https://github.com/FuelLabs/fuels-ts/commit/eda13d72c32f72652a34f926c4b9cf42ac36556c) Thanks [@Torres-ssf](https://github.com/Torres-ssf)! - support configurable constants for contracts

### Patch Changes

- [#971](https://github.com/FuelLabs/fuels-ts/pull/971) [`41da3655`](https://github.com/FuelLabs/fuels-ts/commit/41da3655d8a6b7a4633e0fdd3f35622ed24bbd90) Thanks [@danielbate](https://github.com/danielbate)! - Remove redundant return statement from vec decode function

- Updated dependencies [[`3d1492a1`](https://github.com/FuelLabs/fuels-ts/commit/3d1492a13dee9e19aa1844098fa144680810abc2)]:
  - @fuel-ts/versions@0.42.0
  - @fuel-ts/keystore@0.42.0
  - @fuel-ts/math@0.42.0

## 0.41.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/keystore@0.41.0
  - @fuel-ts/math@0.41.0
  - @fuel-ts/versions@0.41.0

## 0.40.0

### Minor Changes

- [#880](https://github.com/FuelLabs/fuels-ts/pull/880) [`4321ac1b`](https://github.com/FuelLabs/fuels-ts/commit/4321ac1beacce0ed2e342942ef4a3997c1d34d10) Thanks [@camsjams](https://github.com/camsjams)! - Added improved enum support using TypeScript enums

- [#910](https://github.com/FuelLabs/fuels-ts/pull/910) [`d0eb7a39`](https://github.com/FuelLabs/fuels-ts/commit/d0eb7a39d2d5cd59cc45fede3826a327f158d5ea) Thanks [@camsjams](https://github.com/camsjams)! - Fix vector inputs when the first item is not a vector

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/keystore@0.40.0
  - @fuel-ts/math@0.40.0
  - @fuel-ts/versions@0.40.0

## 0.39.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/keystore@0.39.1
  - @fuel-ts/math@0.39.1
  - @fuel-ts/versions@0.39.1

## 0.39.0

### Minor Changes

- [#891](https://github.com/FuelLabs/fuels-ts/pull/891) [`63c906b2`](https://github.com/FuelLabs/fuels-ts/commit/63c906b25e9cdb65e52c5d77fb85f118400fc545) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - refact(abi-coder): encode/decode data inside functionFragment
  refact(abi-coder): include function selector and signature info, also if input data is pointer type

### Patch Changes

- [#824](https://github.com/FuelLabs/fuels-ts/pull/824) [`a8d27dc7`](https://github.com/FuelLabs/fuels-ts/commit/a8d27dc749b4c443fd0714da12b7a75ab56da6d7) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - The `no-explicit-any` ESLint rule is now treated as an error. The usage of `any` has now been replaced from as many files as possible.

- Updated dependencies []:
  - @fuel-ts/keystore@0.39.0
  - @fuel-ts/math@0.39.0
  - @fuel-ts/versions@0.39.0

## 0.38.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.38.1
  - @fuel-ts/versions@0.38.1

## 0.38.0

### Patch Changes

- Updated dependencies [[`653c8391`](https://github.com/FuelLabs/fuels-ts/commit/653c8391ece33a8f31598ea137452dd601dc7468)]:
  - @fuel-ts/versions@0.38.0
  - @fuel-ts/math@0.38.0

## 0.37.1

### Patch Changes

- Updated dependencies [[`0fedaa2b`](https://github.com/FuelLabs/fuels-ts/commit/0fedaa2bccfc3d4858d7e89aef929bc1d91bca8c)]:
  - @fuel-ts/versions@0.37.1
  - @fuel-ts/math@0.37.1

## 0.37.0

### Patch Changes

- Updated dependencies [[`deeb2d9c`](https://github.com/FuelLabs/fuels-ts/commit/deeb2d9ca304e43e36ef0db5e7b46c14f2f4e8f3)]:
  - @fuel-ts/math@0.37.0
  - @fuel-ts/versions@0.37.0

## 0.36.0

### Minor Changes

- [#839](https://github.com/FuelLabs/fuels-ts/pull/839) [`1613399e`](https://github.com/FuelLabs/fuels-ts/commit/1613399e97fc3ce63cdefa00ccff938e10f9fb9a) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - The `B256` and `B512` ABI coders and typegen were expecting incorrect Sway types. This has now been fixed.

### Patch Changes

- [#812](https://github.com/FuelLabs/fuels-ts/pull/812) [`dd7b1cab`](https://github.com/FuelLabs/fuels-ts/commit/dd7b1cab0e7c4a5234383ce6fc34f041ee6d03a9) Thanks [@camsjams](https://github.com/camsjams)! - Adjust to support vector output

- Updated dependencies [[`3cb39443`](https://github.com/FuelLabs/fuels-ts/commit/3cb394431a63f5294edf7e33207214eabf439ef5), [`1de9693a`](https://github.com/FuelLabs/fuels-ts/commit/1de9693a059501243bfa7b826231fd0fff10abcd)]:
  - @fuel-ts/math@0.36.0
  - @fuel-ts/versions@0.36.0

## 0.35.0

### Patch Changes

- [#819](https://github.com/FuelLabs/fuels-ts/pull/819) [`f4e1028a`](https://github.com/FuelLabs/fuels-ts/commit/f4e1028acd5a583d12662dd07ca0d17084a35be2) Thanks [@arboleya](https://github.com/arboleya)! - Adjusting export fields for all packages

- Updated dependencies [[`f4e1028a`](https://github.com/FuelLabs/fuels-ts/commit/f4e1028acd5a583d12662dd07ca0d17084a35be2)]:
  - @fuel-ts/math@0.35.0
  - @fuel-ts/versions@0.35.0

## 0.34.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.34.1
  - @fuel-ts/versions@0.34.1

## 0.34.0

### Minor Changes

- [#763](https://github.com/FuelLabs/fuels-ts/pull/763) [`c7cb8ac2`](https://github.com/FuelLabs/fuels-ts/commit/c7cb8ac2e268b860a41d29927814c24339f8514a) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - Methods without the #[payable] annotation will not accept coins now

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.34.0
  - @fuel-ts/versions@0.34.0

## 0.33.0

### Minor Changes

- [#745](https://github.com/FuelLabs/fuels-ts/pull/745) [`5ba6ade0`](https://github.com/FuelLabs/fuels-ts/commit/5ba6ade0c5176e97a0f9f9b16835f8dd37408313) Thanks [@camsjams](https://github.com/camsjams)! - Add support for main args in scripts

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.33.0
  - @fuel-ts/versions@0.33.0

## 0.32.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.32.0
  - @fuel-ts/versions@0.32.0

## 0.31.0

### Patch Changes

- [#762](https://github.com/FuelLabs/fuels-ts/pull/762) [`b126037`](https://github.com/FuelLabs/fuels-ts/commit/b126037000d2005ac8de1c24372cbcdc9b2b1c83) Thanks [@danielbate](https://github.com/danielbate)! - Increase test coverage of B512Coder and coverage for missing throw conditions for coders

- Updated dependencies []:
  - @fuel-ts/math@0.31.0
  - @fuel-ts/versions@0.31.0

## 0.30.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.30.0
  - @fuel-ts/versions@0.30.0

## 0.29.1

### Patch Changes

- Updated dependencies [[`609d5f0`](https://github.com/FuelLabs/fuels-ts/commit/609d5f052e5c1e7f2a73a619ac49a76605812c51)]:
  - @fuel-ts/math@0.29.1
  - @fuel-ts/versions@0.29.1

## 0.29.0

### Minor Changes

- [#720](https://github.com/FuelLabs/fuels-ts/pull/720) [`5a08f80`](https://github.com/FuelLabs/fuels-ts/commit/5a08f80f408aff842403814c6cf444932b2afa0a) Thanks [@camsjams](https://github.com/camsjams)! - Adjust contract interface to parse logs from external contracts - breaking change for adding contracts to a call

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.29.0
  - @fuel-ts/versions@0.29.0

## 0.28.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.28.1
  - @fuel-ts/versions@0.28.1

## 0.28.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.28.0
  - @fuel-ts/versions@0.28.0

## 0.27.0

### Patch Changes

- Updated dependencies [[`d0eb1c7`](https://github.com/FuelLabs/fuels-ts/commit/d0eb1c732f63842b8d4801456054ec3b9ccdd020), [`450bbcd`](https://github.com/FuelLabs/fuels-ts/commit/450bbcd496177a2beafb969e97e48366cf7d35e1)]:
  - @fuel-ts/versions@0.27.0
  - @fuel-ts/math@0.27.0

## 0.26.0

### Patch Changes

- Updated dependencies [[`090d0bf`](https://github.com/FuelLabs/fuels-ts/commit/090d0bff2128595d3549b49bb8af3d79424e36a2), [`1402861`](https://github.com/FuelLabs/fuels-ts/commit/14028619b10cac84806c4cdbaabe9c8481ae0dd5)]:
  - @fuel-ts/versions@0.26.0
  - @fuel-ts/math@0.26.0

## 0.25.1

### Patch Changes

- Updated dependencies [[`9bf1d41`](https://github.com/FuelLabs/fuels-ts/commit/9bf1d4177811cb9d300849321acd9b5101128047)]:
  - @fuel-ts/versions@0.25.1
  - @fuel-ts/math@0.25.1

## 0.25.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.25.0
  - @fuel-ts/versions@0.25.0

## 0.24.2

### Patch Changes

- [#646](https://github.com/FuelLabs/fuels-ts/pull/646) [`fa97383`](https://github.com/FuelLabs/fuels-ts/commit/fa97383114c36ee7a204be7e7f3f974382fa1b2c) Thanks [@camsjams](https://github.com/camsjams)! - Adjust doc update timing

- Updated dependencies [[`fa97383`](https://github.com/FuelLabs/fuels-ts/commit/fa97383114c36ee7a204be7e7f3f974382fa1b2c)]:
  - @fuel-ts/math@0.24.2
  - @fuel-ts/versions@0.24.2

## 0.24.1

### Patch Changes

- Updated dependencies [[`8babcf0`](https://github.com/FuelLabs/fuels-ts/commit/8babcf02eca3fbec612d05f7a6d41dc6f340d58a)]:
  - @fuel-ts/versions@0.24.1
  - @fuel-ts/math@0.24.1

## 0.24.0

### Minor Changes

- [#616](https://github.com/FuelLabs/fuels-ts/pull/616) [`02ac98e`](https://github.com/FuelLabs/fuels-ts/commit/02ac98ea865e0464b132dc3f6bd21f7e1a57435a) Thanks [@arboleya](https://github.com/arboleya)! - Adding new `versions` package for exposing and managing compatibility versions of Fuel toolchain components

### Patch Changes

- Updated dependencies [[`02ac98e`](https://github.com/FuelLabs/fuels-ts/commit/02ac98ea865e0464b132dc3f6bd21f7e1a57435a)]:
  - @fuel-ts/versions@0.24.0
  - @fuel-ts/math@0.24.0

## 0.23.0

### Patch Changes

- [#639](https://github.com/FuelLabs/fuels-ts/pull/639) [`c0a62ed`](https://github.com/FuelLabs/fuels-ts/commit/c0a62ed278d6118f1af177dc98dcdb42febd0c81) Thanks [@camsjams](https://github.com/camsjams)! - Update docs

- Updated dependencies [[`c0a62ed`](https://github.com/FuelLabs/fuels-ts/commit/c0a62ed278d6118f1af177dc98dcdb42febd0c81), [`8888e79`](https://github.com/FuelLabs/fuels-ts/commit/8888e79bcd7740a0c85298862bd59981bc6755b3)]:
  - @fuel-ts/math@0.23.0

## 0.22.2

### Patch Changes

- [#612](https://github.com/FuelLabs/fuels-ts/pull/612) [`03b060b`](https://github.com/FuelLabs/fuels-ts/commit/03b060b51e00034a2814a0c5ed2718d5dc86533b) Thanks [@camsjams](https://github.com/camsjams)! - Added docs and improved examples

- Updated dependencies [[`03b060b`](https://github.com/FuelLabs/fuels-ts/commit/03b060b51e00034a2814a0c5ed2718d5dc86533b)]:
  - @fuel-ts/math@0.22.2

## 0.22.1

### Patch Changes

- [#632](https://github.com/FuelLabs/fuels-ts/pull/632) [`58d9fa0`](https://github.com/FuelLabs/fuels-ts/commit/58d9fa032a6cb3478bca4a93523b21cc184fbc9e) Thanks [@camsjams](https://github.com/camsjams)! - improved logging and normalized data

- Updated dependencies []:
  - @fuel-ts/math@0.22.1

## 0.22.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.22.0

## 0.21.2

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.21.2

## 0.21.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.21.1

## 0.21.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.21.0

## 0.20.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.20.0

## 0.19.0

### Minor Changes

- [#549](https://github.com/FuelLabs/fuels-ts/pull/549) [`db8cc6b`](https://github.com/FuelLabs/fuels-ts/commit/db8cc6b49616199368463ecd69aae6b3ca0b65d0) Thanks [@QuinnLee](https://github.com/QuinnLee)! - add output variables to transactions

### Patch Changes

- [#565](https://github.com/FuelLabs/fuels-ts/pull/565) [`bdfa9d6`](https://github.com/FuelLabs/fuels-ts/commit/bdfa9d6e453a9c47177b19f2811265d740fc4ac4) Thanks [@segfault-magnet](https://github.com/segfault-magnet)! - Adapted to forc v0.28.0+ with respect to vectors now using an untyped raw ptr instead of a u64 for the vec ptr.

- Updated dependencies [[`ec83b17`](https://github.com/FuelLabs/fuels-ts/commit/ec83b17a1bcb3d1277911471d3515df3643e6280), [`db8cc6b`](https://github.com/FuelLabs/fuels-ts/commit/db8cc6b49616199368463ecd69aae6b3ca0b65d0)]:
  - @fuel-ts/math@0.19.0

## 0.18.0

### Patch Changes

- [#543](https://github.com/FuelLabs/fuels-ts/pull/543) [`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3) Thanks [@arboleya](https://github.com/arboleya)! - Updating all libraries to their latest version

- [#543](https://github.com/FuelLabs/fuels-ts/pull/543) [`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3) Thanks [@arboleya](https://github.com/arboleya)! - Upgrading outdated dependencies to latest version

- Updated dependencies [[`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3), [`6b2b812`](https://github.com/FuelLabs/fuels-ts/commit/6b2b812aecfb639c22f3bbd251f2d50f23f9cd0f), [`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3)]:
  - @fuel-ts/math@0.18.0

## 0.17.0

### Minor Changes

- [#517](https://github.com/FuelLabs/fuels-ts/pull/517) [`6403076`](https://github.com/FuelLabs/fuels-ts/commit/6403076bb9fce9055b436596e23713b0e7909d87) Thanks [@QuinnLee](https://github.com/QuinnLee)! - Parse Logs and Log Data

### Patch Changes

- Updated dependencies [[`f106a78`](https://github.com/FuelLabs/fuels-ts/commit/f106a78e816045e3bdb6bff0b9bceec871009091), [`658b065`](https://github.com/FuelLabs/fuels-ts/commit/658b06538389a6ad3310a739a1bf60311c1e3343), [`6403076`](https://github.com/FuelLabs/fuels-ts/commit/6403076bb9fce9055b436596e23713b0e7909d87)]:
  - @fuel-ts/math@0.17.0

## 0.16.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.16.0

## 0.15.0

### Minor Changes

- [#495](https://github.com/FuelLabs/fuels-ts/pull/495) [`f3c7273`](https://github.com/FuelLabs/fuels-ts/commit/f3c7273d946979e628b178ba808b8fc1598105bb) Thanks [@luizstacio](https://github.com/luizstacio)! - Fix exports and imports

### Patch Changes

- [#497](https://github.com/FuelLabs/fuels-ts/pull/497) [`63583aa`](https://github.com/FuelLabs/fuels-ts/commit/63583aa6e8b5b5417bdc0c0ae3bc15eec7735e43) Thanks [@camsjams](https://github.com/camsjams)! - Added vec support

- [#468](https://github.com/FuelLabs/fuels-ts/pull/468) [`7ad3d79`](https://github.com/FuelLabs/fuels-ts/commit/7ad3d79bf7a1db766912a7b3d52e4fa2e550af56) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - Refactor to use bn.js instead of bigint.

- Updated dependencies [[`7ad3d79`](https://github.com/FuelLabs/fuels-ts/commit/7ad3d79bf7a1db766912a7b3d52e4fa2e550af56)]:
  - @fuel-ts/math@0.15.0

## 0.14.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.14.0

## 0.13.0

### Minor Changes

- [#466](https://github.com/FuelLabs/fuels-ts/pull/466) [`745e65b`](https://github.com/FuelLabs/fuels-ts/commit/745e65bc563ab8cace6f73e2715a6eaaae93fda5) Thanks [@luizstacio](https://github.com/luizstacio)! - Add support to flat abi on interface

* [#458](https://github.com/FuelLabs/fuels-ts/pull/458) [`9190cee`](https://github.com/FuelLabs/fuels-ts/commit/9190cee45529b6c3fcffb2a12b1ef6319b2b39df) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - Upgrade compatibility to fuel-core v0.10.1

### Patch Changes

- [#471](https://github.com/FuelLabs/fuels-ts/pull/471) [`dfb2612`](https://github.com/FuelLabs/fuels-ts/commit/dfb261222c17cf6f158f475d91b3414996300066) Thanks [@camsjams](https://github.com/camsjams)! - add option type improvement

- Updated dependencies []:
  - @fuel-ts/math@0.13.0

## 0.12.0

### Minor Changes

- [#441](https://github.com/FuelLabs/fuels-ts/pull/441) [`f3dcd27`](https://github.com/FuelLabs/fuels-ts/commit/f3dcd272dc5a237c6a8ce235a542ad804039f13b) Thanks [@camsjams](https://github.com/camsjams)! - Added support for Bech32 Address format

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.12.0

## 0.11.0

### Minor Changes

- [#419](https://github.com/FuelLabs/fuels-ts/pull/419) [`212d51c`](https://github.com/FuelLabs/fuels-ts/commit/212d51c3e6b1eea5c874f435ea8d50320cd870a1) Thanks [@QuinnLee](https://github.com/QuinnLee)! - Update interface to handle array and enum contract arguments

### Patch Changes

- [#437](https://github.com/FuelLabs/fuels-ts/pull/437) [`b2f1c66`](https://github.com/FuelLabs/fuels-ts/commit/b2f1c665b8d75f635edb4b75691abc9ebf6850b5) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - - Fixed linking packages to inside `node_modules` folder
  - Remove old Lerna config

* [#418](https://github.com/FuelLabs/fuels-ts/pull/418) [`3cb7332`](https://github.com/FuelLabs/fuels-ts/commit/3cb733212e09d32a21e235c4e46006efd77eca41) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - - Add support to `typeArguments` in JSON ABI (implemented in sway 0.18)
  - Created our own ParamType as fuel abi is getting more and more different from ETH abi. -> Inspired by `@ethersproject/abi (v5.6.4) - src.ts/fragments.ts`
  - Add support to use Arrays of Structs in contract method arguments - ABI
* Updated dependencies [[`b2f1c66`](https://github.com/FuelLabs/fuels-ts/commit/b2f1c665b8d75f635edb4b75691abc9ebf6850b5)]:
  - @fuel-ts/math@0.11.0

## 0.10.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.10.0

## 0.9.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/math@0.9.0

## 0.8.0

### Minor Changes

- [#405](https://github.com/FuelLabs/fuels-ts/pull/405) [`19dee43`](https://github.com/FuelLabs/fuels-ts/commit/19dee437f0ea2fe02a4a7f56b0b55d84279c2dc0) Thanks [@camsjams](https://github.com/camsjams)! - Bumping all packages to next minor version

### Patch Changes

- [#374](https://github.com/FuelLabs/fuels-ts/pull/374) [`0dd4870`](https://github.com/FuelLabs/fuels-ts/commit/0dd48702fd187eeebdf9f6e1882c400ee44b956e) Thanks [@camsjams](https://github.com/camsjams)! - Add readme

* [#397](https://github.com/FuelLabs/fuels-ts/pull/397) [`9ac636b`](https://github.com/FuelLabs/fuels-ts/commit/9ac636b7b1f31d2f68c55af2062b4476217ef563) Thanks [@camsjams](https://github.com/camsjams)! - fix list on fuels

* Updated dependencies [[`0dd4870`](https://github.com/FuelLabs/fuels-ts/commit/0dd48702fd187eeebdf9f6e1882c400ee44b956e), [`9ac636b`](https://github.com/FuelLabs/fuels-ts/commit/9ac636b7b1f31d2f68c55af2062b4476217ef563), [`19dee43`](https://github.com/FuelLabs/fuels-ts/commit/19dee437f0ea2fe02a4a7f56b0b55d84279c2dc0)]:
  - @fuel-ts/math@0.8.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

---

<a name="0.7.0"></a>

## [0.7.0](https://github.com/FuelLabs/fuels-ts/compare/v0.6.0...0.7.0)

> 2022-06-02

### 🐞 Bug Fixes

- change build tasks in order to use pnpm link correctly ([#246](https://github.com/FuelLabs/fuels-ts/issues/246))

### 📃 Code Refactoring

- add turborepo, pnpm and tsup ([#238](https://github.com/FuelLabs/fuels-ts/issues/238))

### 🚀 Features

- improve AbiCoder ([#290](https://github.com/FuelLabs/fuels-ts/issues/290))
- move from BigNumber to BigInt ([#266](https://github.com/FuelLabs/fuels-ts/issues/266))

<a name="v0.6.0"></a>

## [v0.6.0](https://github.com/FuelLabs/fuels-ts/compare/v0.5.0...v0.6.0)

> 2022-04-25

### 🚀 Features

- support abi fuel types ([#220](https://github.com/FuelLabs/fuels-ts/issues/220))

<a name="v0.5.0"></a>

## [v0.5.0](https://github.com/FuelLabs/fuels-ts/compare/v0.4.0...v0.5.0)

> 2022-03-30

### 🐞 Bug Fixes

- set json fragment name optional ([#200](https://github.com/FuelLabs/fuels-ts/issues/200))

### 🚀 Features

- add types on contract factory generated code ([#201](https://github.com/FuelLabs/fuels-ts/issues/201))

<a name="v0.4.0"></a>

## [v0.4.0](https://github.com/FuelLabs/fuels-ts/compare/v0.3.0...v0.4.0)

> 2022-03-13

### 🐞 Bug Fixes

- abi skip empty ([#163](https://github.com/FuelLabs/fuels-ts/issues/163))

### 🚀 Features

- add support to void return ([#181](https://github.com/FuelLabs/fuels-ts/issues/181))
- call contract method with mutiple params ([#170](https://github.com/FuelLabs/fuels-ts/issues/170))
- update abi code to support new syntax ([#169](https://github.com/FuelLabs/fuels-ts/issues/169))

<a name="v0.3.0"></a>

## [v0.3.0](https://github.com/FuelLabs/fuels-ts/compare/v0.1.0...v0.3.0)

> 2022-03-04

<a name="v0.1.0"></a>

## v0.1.0

> 2022-03-04
