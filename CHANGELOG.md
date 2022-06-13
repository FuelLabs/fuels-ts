# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

---


<a name="0.7.0"></a>
## [0.7.0](https://github.com/FuelLabs/fuels-ts/compare/v0.6.0...0.7.0)

> 2022-06-10

### Docs

* add more detailed info about linked packages ([#254](https://github.com/FuelLabs/fuels-ts/issues/254))

### 🐞 Bug Fixes

* add angular-changelog and check for fuels-ts package.json ([#324](https://github.com/FuelLabs/fuels-ts/issues/324))
* return correct type on void outputs ([#325](https://github.com/FuelLabs/fuels-ts/issues/325))
* Use internal random bytes function to avoid browser ESM file ([#310](https://github.com/FuelLabs/fuels-ts/issues/310))
* use `isArray` in reduce ([#308](https://github.com/FuelLabs/fuels-ts/issues/308))
* change import crypto to ether/random ([#297](https://github.com/FuelLabs/fuels-ts/issues/297))
* npm tag on release ([#252](https://github.com/FuelLabs/fuels-ts/issues/252))
* github action for publish on master and replaces Lerna publishing ([#242](https://github.com/FuelLabs/fuels-ts/issues/242))
* change build tasks in order to use pnpm link correctly ([#246](https://github.com/FuelLabs/fuels-ts/issues/246))

### 📃 Code Refactoring

* add turborepo, pnpm and tsup ([#238](https://github.com/FuelLabs/fuels-ts/issues/238))

### 🚀 Features

* add options on deployContract ([#307](https://github.com/FuelLabs/fuels-ts/issues/307))
* support u32 on byte code length ([#298](https://github.com/FuelLabs/fuels-ts/issues/298))
* enable utxo validation ([#278](https://github.com/FuelLabs/fuels-ts/issues/278))
* improve AbiCoder ([#290](https://github.com/FuelLabs/fuels-ts/issues/290))
* move from BigNumber to BigInt ([#266](https://github.com/FuelLabs/fuels-ts/issues/266))
* optional tx params ([#256](https://github.com/FuelLabs/fuels-ts/issues/256))
* add get contract on provider ([#241](https://github.com/FuelLabs/fuels-ts/issues/241))
* add contract slots on contract deployment ([#239](https://github.com/FuelLabs/fuels-ts/issues/239))
* replace `amount`/`assetId` overrides with `forward` ([#232](https://github.com/FuelLabs/fuels-ts/issues/232))


<a name="v0.6.0"></a>
## [v0.6.0](https://github.com/FuelLabs/fuels-ts/compare/v0.5.0...v0.6.0)

> 2022-04-25

### 🐞 Bug Fixes

* export wordlist as default object ([#211](https://github.com/FuelLabs/fuels-ts/issues/211))

### 🚀 Features

* adds transformRequest method on contract call ([#227](https://github.com/FuelLabs/fuels-ts/issues/227))
* add variables outputs ([#224](https://github.com/FuelLabs/fuels-ts/issues/224))
* support abi fuel types ([#220](https://github.com/FuelLabs/fuels-ts/issues/220))
* update call contract script ([#205](https://github.com/FuelLabs/fuels-ts/issues/205))


<a name="v0.5.0"></a>
## [v0.5.0](https://github.com/FuelLabs/fuels-ts/compare/v0.4.0...v0.5.0)

> 2022-03-30

### 🐞 Bug Fixes

* set json fragment name optional ([#200](https://github.com/FuelLabs/fuels-ts/issues/200))

### 🚀 Features

* add types on contract factory generated code ([#201](https://github.com/FuelLabs/fuels-ts/issues/201))
* forward amount and assetId on contract call ([#199](https://github.com/FuelLabs/fuels-ts/issues/199))
* add hdwallet and mnemonic features to wallet ([#196](https://github.com/FuelLabs/fuels-ts/issues/196))


<a name="v0.4.0"></a>
## [v0.4.0](https://github.com/FuelLabs/fuels-ts/compare/v0.3.0...v0.4.0)

> 2022-03-13

### 🐞 Bug Fixes

* remove empty params from types ([#164](https://github.com/FuelLabs/fuels-ts/issues/164))
* abi skip empty ([#163](https://github.com/FuelLabs/fuels-ts/issues/163))
* change postinstall to prepare ([#160](https://github.com/FuelLabs/fuels-ts/issues/160))

### 🚀 Features

* change typechain imports to fuels ([#184](https://github.com/FuelLabs/fuels-ts/issues/184))
* add support to void return ([#181](https://github.com/FuelLabs/fuels-ts/issues/181))
* add `callStatic` methods to Contract ([#180](https://github.com/FuelLabs/fuels-ts/issues/180))
* call contract method with mutiple params ([#170](https://github.com/FuelLabs/fuels-ts/issues/170))
* update abi code to support new syntax ([#169](https://github.com/FuelLabs/fuels-ts/issues/169))


<a name="v0.3.0"></a>
## [v0.3.0](https://github.com/FuelLabs/fuels-ts/compare/v0.1.0...v0.3.0)

> 2022-03-04


<a name="v0.1.0"></a>
## v0.1.0

> 2022-03-04

### Docs

* generete docs ([#144](https://github.com/FuelLabs/fuels-ts/issues/144))

### 🐞 Bug Fixes

* Throttle npm whoami ([#150](https://github.com/FuelLabs/fuels-ts/issues/150))
* node14 uses npm7, upgrade to npm8 ([#149](https://github.com/FuelLabs/fuels-ts/issues/149))
* setup-node[@v2](https://github.com/v2) now creates the .npmrc ([#148](https://github.com/FuelLabs/fuels-ts/issues/148))
* move testcase to dev dependency ([#125](https://github.com/FuelLabs/fuels-ts/issues/125))

### 🚀 Features

* add HDWallet implementation BIP-032 + BIP-044 ([#143](https://github.com/FuelLabs/fuels-ts/issues/143))
* add Provider.getCoinsToSpend() ([#93](https://github.com/FuelLabs/fuels-ts/issues/93))
* add coin status on coins ([#129](https://github.com/FuelLabs/fuels-ts/issues/129))
* config provider at generate wallet ([#128](https://github.com/FuelLabs/fuels-ts/issues/128))
* generate docs ([#116](https://github.com/FuelLabs/fuels-ts/issues/116))
* add sendTransaction with signature ([#111](https://github.com/FuelLabs/fuels-ts/issues/111))
* zero out output fields on hashTransaction ([#110](https://github.com/FuelLabs/fuels-ts/issues/110))

