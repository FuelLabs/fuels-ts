# Change Log

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
