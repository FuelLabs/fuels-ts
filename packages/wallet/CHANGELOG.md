# Change Log

## 0.10.0

### Minor Changes

- [#428](https://github.com/FuelLabs/fuels-ts/pull/428) [`b9cf1a3`](https://github.com/FuelLabs/fuels-ts/commit/b9cf1a3fce660b2a04adcd0b3782a27aead48762) Thanks [@luizstacio](https://github.com/luizstacio)! - Remove export transactions on provider package

### Patch Changes

- Updated dependencies [[`b9cf1a3`](https://github.com/FuelLabs/fuels-ts/commit/b9cf1a3fce660b2a04adcd0b3782a27aead48762)]:
  - @fuel-ts/hasher@0.10.0
  - @fuel-ts/providers@0.10.0
  - @fuel-ts/signer@0.10.0
  - @fuel-ts/hdwallet@0.10.0
  - @fuel-ts/constants@0.10.0
  - @fuel-ts/interfaces@0.10.0
  - @fuel-ts/math@0.10.0
  - @fuel-ts/mnemonic@0.10.0
  - @fuel-ts/transactions@0.10.0

## 0.9.0

### Patch Changes

- Updated dependencies [[`a8349b0`](https://github.com/FuelLabs/fuels-ts/commit/a8349b0bb7f78ffe982fadc740a0209b4056bf5b)]:
  - @fuel-ts/providers@0.9.0
  - @fuel-ts/hasher@0.9.0
  - @fuel-ts/signer@0.9.0
  - @fuel-ts/hdwallet@0.9.0
  - @fuel-ts/constants@0.9.0
  - @fuel-ts/interfaces@0.9.0
  - @fuel-ts/math@0.9.0
  - @fuel-ts/mnemonic@0.9.0

## 0.8.0

### Minor Changes

- [#405](https://github.com/FuelLabs/fuels-ts/pull/405) [`19dee43`](https://github.com/FuelLabs/fuels-ts/commit/19dee437f0ea2fe02a4a7f56b0b55d84279c2dc0) Thanks [@camsjams](https://github.com/camsjams)! - Bumping all packages to next minor version

### Patch Changes

- [#374](https://github.com/FuelLabs/fuels-ts/pull/374) [`0dd4870`](https://github.com/FuelLabs/fuels-ts/commit/0dd48702fd187eeebdf9f6e1882c400ee44b956e) Thanks [@camsjams](https://github.com/camsjams)! - Add readme

* [#397](https://github.com/FuelLabs/fuels-ts/pull/397) [`9ac636b`](https://github.com/FuelLabs/fuels-ts/commit/9ac636b7b1f31d2f68c55af2062b4476217ef563) Thanks [@camsjams](https://github.com/camsjams)! - fix list on fuels

* Updated dependencies [[`0dd4870`](https://github.com/FuelLabs/fuels-ts/commit/0dd48702fd187eeebdf9f6e1882c400ee44b956e), [`9ac636b`](https://github.com/FuelLabs/fuels-ts/commit/9ac636b7b1f31d2f68c55af2062b4476217ef563), [`42b6e4e`](https://github.com/FuelLabs/fuels-ts/commit/42b6e4ea9cf4de38adeb2c1bbb0668bf140d2163), [`19dee43`](https://github.com/FuelLabs/fuels-ts/commit/19dee437f0ea2fe02a4a7f56b0b55d84279c2dc0), [`03842d0`](https://github.com/FuelLabs/fuels-ts/commit/03842d010babb74e8bf88699ad842939da0d1760)]:
  - @fuel-ts/constants@0.8.0
  - @fuel-ts/hasher@0.8.0
  - @fuel-ts/hdwallet@0.8.0
  - @fuel-ts/interfaces@0.8.0
  - @fuel-ts/math@0.8.0
  - @fuel-ts/mnemonic@0.8.0
  - @fuel-ts/providers@0.8.0
  - @fuel-ts/signer@0.8.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

---

<a name="0.7.0"></a>

## [0.7.0](https://github.com/FuelLabs/fuels-ts/compare/v0.6.0...0.7.0)

> 2022-06-06

### 🐞 Bug Fixes

- Use internal random bytes function to avoid browser ESM file ([#310](https://github.com/FuelLabs/fuels-ts/issues/310))
- change import crypto to ether/random ([#297](https://github.com/FuelLabs/fuels-ts/issues/297))
- change build tasks in order to use pnpm link correctly ([#246](https://github.com/FuelLabs/fuels-ts/issues/246))

### 📃 Code Refactoring

- add turborepo, pnpm and tsup ([#238](https://github.com/FuelLabs/fuels-ts/issues/238))

### 🚀 Features

- enable utxo validation ([#278](https://github.com/FuelLabs/fuels-ts/issues/278))
- move from BigNumber to BigInt ([#266](https://github.com/FuelLabs/fuels-ts/issues/266))
- optional tx params ([#256](https://github.com/FuelLabs/fuels-ts/issues/256))

<a name="v0.6.0"></a>

## [v0.6.0](https://github.com/FuelLabs/fuels-ts/compare/v0.5.0...v0.6.0)

> 2022-04-25

<a name="v0.5.0"></a>

## [v0.5.0](https://github.com/FuelLabs/fuels-ts/compare/v0.4.0...v0.5.0)

> 2022-03-30

### 🚀 Features

- forward amount and assetId on contract call ([#199](https://github.com/FuelLabs/fuels-ts/issues/199))
- add hdwallet and mnemonic features to wallet ([#196](https://github.com/FuelLabs/fuels-ts/issues/196))

<a name="v0.4.0"></a>

## [v0.4.0](https://github.com/FuelLabs/fuels-ts/compare/v0.3.0...v0.4.0)

> 2022-03-13

<a name="v0.3.0"></a>

## [v0.3.0](https://github.com/FuelLabs/fuels-ts/compare/v0.1.0...v0.3.0)

> 2022-03-04

<a name="v0.1.0"></a>

## v0.1.0

> 2022-03-04

### 🐞 Bug Fixes

- move testcase to dev dependency ([#125](https://github.com/FuelLabs/fuels-ts/issues/125))

### 🚀 Features

- add HDWallet implementation BIP-032 + BIP-044 ([#143](https://github.com/FuelLabs/fuels-ts/issues/143))
- config provider at generate wallet ([#128](https://github.com/FuelLabs/fuels-ts/issues/128))
- add sendTransaction with signature ([#111](https://github.com/FuelLabs/fuels-ts/issues/111))
- zero out output fields on hashTransaction ([#110](https://github.com/FuelLabs/fuels-ts/issues/110))
