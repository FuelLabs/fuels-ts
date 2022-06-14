# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

---


<a name="0.7.0"></a>
## [0.7.0](https://github.com/FuelLabs/fuels-ts/compare/v0.6.0...0.7.0)

> 2022-06-06

### 🐞 Bug Fixes

* Use internal random bytes function to avoid browser ESM file ([#310](https://github.com/FuelLabs/fuels-ts/issues/310))
* change import crypto to ether/random ([#297](https://github.com/FuelLabs/fuels-ts/issues/297))
* change build tasks in order to use pnpm link correctly ([#246](https://github.com/FuelLabs/fuels-ts/issues/246))

### 📃 Code Refactoring

* add turborepo, pnpm and tsup ([#238](https://github.com/FuelLabs/fuels-ts/issues/238))

### 🚀 Features

* enable utxo validation ([#278](https://github.com/FuelLabs/fuels-ts/issues/278))
* move from BigNumber to BigInt ([#266](https://github.com/FuelLabs/fuels-ts/issues/266))
* optional tx params ([#256](https://github.com/FuelLabs/fuels-ts/issues/256))


<a name="v0.6.0"></a>
## [v0.6.0](https://github.com/FuelLabs/fuels-ts/compare/v0.5.0...v0.6.0)

> 2022-04-25


<a name="v0.5.0"></a>
## [v0.5.0](https://github.com/FuelLabs/fuels-ts/compare/v0.4.0...v0.5.0)

> 2022-03-30

### 🚀 Features

* forward amount and assetId on contract call ([#199](https://github.com/FuelLabs/fuels-ts/issues/199))
* add hdwallet and mnemonic features to wallet ([#196](https://github.com/FuelLabs/fuels-ts/issues/196))


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

* move testcase to dev dependency ([#125](https://github.com/FuelLabs/fuels-ts/issues/125))

### 🚀 Features

* add HDWallet implementation BIP-032 + BIP-044 ([#143](https://github.com/FuelLabs/fuels-ts/issues/143))
* config provider at generate wallet ([#128](https://github.com/FuelLabs/fuels-ts/issues/128))
* add sendTransaction with signature ([#111](https://github.com/FuelLabs/fuels-ts/issues/111))
* zero out output fields on hashTransaction ([#110](https://github.com/FuelLabs/fuels-ts/issues/110))

