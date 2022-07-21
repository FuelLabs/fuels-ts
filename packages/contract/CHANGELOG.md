# Change Log

## 0.8.0

### Minor Changes

- [#405](https://github.com/FuelLabs/fuels-ts/pull/405) [`19dee43`](https://github.com/FuelLabs/fuels-ts/commit/19dee437f0ea2fe02a4a7f56b0b55d84279c2dc0) Thanks [@camsjams](https://github.com/camsjams)! - Bumping all packages to next minor version

### Patch Changes

- [#374](https://github.com/FuelLabs/fuels-ts/pull/374) [`0dd4870`](https://github.com/FuelLabs/fuels-ts/commit/0dd48702fd187eeebdf9f6e1882c400ee44b956e) Thanks [@camsjams](https://github.com/camsjams)! - Add readme

* [#397](https://github.com/FuelLabs/fuels-ts/pull/397) [`9ac636b`](https://github.com/FuelLabs/fuels-ts/commit/9ac636b7b1f31d2f68c55af2062b4476217ef563) Thanks [@camsjams](https://github.com/camsjams)! - fix list on fuels

- [#377](https://github.com/FuelLabs/fuels-ts/pull/377) [`1585e14`](https://github.com/FuelLabs/fuels-ts/commit/1585e1485558258665613787ef6576c82d57beee) Thanks [@AlicanC](https://github.com/AlicanC)! - Add missing gas limit support to Multicall

* [#401](https://github.com/FuelLabs/fuels-ts/pull/401) [`42b6e4e`](https://github.com/FuelLabs/fuels-ts/commit/42b6e4ea9cf4de38adeb2c1bbb0668bf140d2163) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - Upgrade sway to 0.18.1

* Updated dependencies [[`0dd4870`](https://github.com/FuelLabs/fuels-ts/commit/0dd48702fd187eeebdf9f6e1882c400ee44b956e), [`9ac636b`](https://github.com/FuelLabs/fuels-ts/commit/9ac636b7b1f31d2f68c55af2062b4476217ef563), [`42b6e4e`](https://github.com/FuelLabs/fuels-ts/commit/42b6e4ea9cf4de38adeb2c1bbb0668bf140d2163), [`19dee43`](https://github.com/FuelLabs/fuels-ts/commit/19dee437f0ea2fe02a4a7f56b0b55d84279c2dc0), [`03842d0`](https://github.com/FuelLabs/fuels-ts/commit/03842d010babb74e8bf88699ad842939da0d1760)]:
  - @fuel-ts/abi-coder@0.8.0
  - @fuel-ts/constants@0.8.0
  - @fuel-ts/interfaces@0.8.0
  - @fuel-ts/keystore@0.8.0
  - @fuel-ts/math@0.8.0
  - @fuel-ts/merkle@0.8.0
  - @fuel-ts/providers@0.8.0
  - @fuel-ts/script@0.8.0
  - @fuel-ts/wallet@0.8.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

---

<a name="0.7.0"></a>

## [0.7.0](https://github.com/FuelLabs/fuels-ts/compare/v0.6.0...0.7.0)

> 2022-06-06

### 🐞 Bug Fixes

- Use internal random bytes function to avoid browser ESM file ([#310](https://github.com/FuelLabs/fuels-ts/issues/310))
- change build tasks in order to use pnpm link correctly ([#246](https://github.com/FuelLabs/fuels-ts/issues/246))

### 📃 Code Refactoring

- add turborepo, pnpm and tsup ([#238](https://github.com/FuelLabs/fuels-ts/issues/238))

### 🚀 Features

- add options on deployContract ([#307](https://github.com/FuelLabs/fuels-ts/issues/307))
- enable utxo validation ([#278](https://github.com/FuelLabs/fuels-ts/issues/278))
- improve AbiCoder ([#290](https://github.com/FuelLabs/fuels-ts/issues/290))
- move from BigNumber to BigInt ([#266](https://github.com/FuelLabs/fuels-ts/issues/266))
- add contract slots on contract deployment ([#239](https://github.com/FuelLabs/fuels-ts/issues/239))
- replace `amount`/`assetId` overrides with `forward` ([#232](https://github.com/FuelLabs/fuels-ts/issues/232))

<a name="v0.6.0"></a>

## [v0.6.0](https://github.com/FuelLabs/fuels-ts/compare/v0.5.0...v0.6.0)

> 2022-04-25

### 🚀 Features

- adds transformRequest method on contract call ([#227](https://github.com/FuelLabs/fuels-ts/issues/227))
- add variables outputs ([#224](https://github.com/FuelLabs/fuels-ts/issues/224))
- update call contract script ([#205](https://github.com/FuelLabs/fuels-ts/issues/205))

<a name="v0.5.0"></a>

## [v0.5.0](https://github.com/FuelLabs/fuels-ts/compare/v0.4.0...v0.5.0)

> 2022-03-30

### 🚀 Features

- forward amount and assetId on contract call ([#199](https://github.com/FuelLabs/fuels-ts/issues/199))

<a name="v0.4.0"></a>

## [v0.4.0](https://github.com/FuelLabs/fuels-ts/compare/v0.3.0...v0.4.0)

> 2022-03-13

### 🚀 Features

- add support to void return ([#181](https://github.com/FuelLabs/fuels-ts/issues/181))
- add `callStatic` methods to Contract ([#180](https://github.com/FuelLabs/fuels-ts/issues/180))
- update abi code to support new syntax ([#169](https://github.com/FuelLabs/fuels-ts/issues/169))

<a name="v0.3.0"></a>

## [v0.3.0](https://github.com/FuelLabs/fuels-ts/compare/v0.1.0...v0.3.0)

> 2022-03-04

<a name="v0.1.0"></a>

## v0.1.0

> 2022-03-04
