# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.4.0](https://github.com/FuelLabs/fuels-ts/compare/v0.3.0...v0.4.0) (2022-03-13)


### Bug Fixes

* abi skip empty ([#163](https://github.com/FuelLabs/fuels-ts/issues/163)) ([09c9916](https://github.com/FuelLabs/fuels-ts/commit/09c991625132376ecf406e054bb4225bf4f629d2))
* change postinstall to prepare ([#160](https://github.com/FuelLabs/fuels-ts/issues/160)) ([b156dcf](https://github.com/FuelLabs/fuels-ts/commit/b156dcfa63f8ed34b2a3d102b31fef2f8aa5df0d))
* remove empty params from types ([#164](https://github.com/FuelLabs/fuels-ts/issues/164)) ([8de80f9](https://github.com/FuelLabs/fuels-ts/commit/8de80f9ee880276d402e7c2e97c14a12ffcf9938))


### Features

* add `callStatic` methods to Contract ([#180](https://github.com/FuelLabs/fuels-ts/issues/180)) ([43d3137](https://github.com/FuelLabs/fuels-ts/commit/43d3137840d91ee178a268a8a98ed8bb3e42d845))
* add support to void return ([#181](https://github.com/FuelLabs/fuels-ts/issues/181)) ([1d991c0](https://github.com/FuelLabs/fuels-ts/commit/1d991c0ddfd819b2b3a2b399376344fa4a9579d0))
* call contract method with mutiple params ([#170](https://github.com/FuelLabs/fuels-ts/issues/170)) ([ca7da40](https://github.com/FuelLabs/fuels-ts/commit/ca7da403fdecc6ea6a2c5ffdb956f02c57622646))
* change typechain imports to fuels ([#184](https://github.com/FuelLabs/fuels-ts/issues/184)) ([2bfac73](https://github.com/FuelLabs/fuels-ts/commit/2bfac73742db4888bedacf151f1566b435f561c6))
* update abi code to support new syntax ([#169](https://github.com/FuelLabs/fuels-ts/issues/169)) ([68b9dbe](https://github.com/FuelLabs/fuels-ts/commit/68b9dbe43e8c6f193cf161e47195accd20f96ab9))





# 0.3.0 (2022-03-04)


### Bug Fixes

* move testcase to dev dependency ([#125](https://github.com/FuelLabs/fuels-ts/issues/125)) ([ca89791](https://github.com/FuelLabs/fuels-ts/commit/ca89791ccef1287f7ccc6411bf1b290fbcac4315))
* node14 uses npm7, upgrade to npm8 ([#149](https://github.com/FuelLabs/fuels-ts/issues/149)) ([66f2519](https://github.com/FuelLabs/fuels-ts/commit/66f25194e10ba926f68babdd894bb4b8f30f2f8e))
* setup-node@v2 now creates the .npmrc ([#148](https://github.com/FuelLabs/fuels-ts/issues/148)) ([f52bb15](https://github.com/FuelLabs/fuels-ts/commit/f52bb15d3575bafbfead6961fa6d61ec9794c649))
* Throttle npm whoami ([#150](https://github.com/FuelLabs/fuels-ts/issues/150)) ([60241e3](https://github.com/FuelLabs/fuels-ts/commit/60241e373567d3eb897fa213b3c6f28478db3907))


### Features

* add coin status on coins ([#129](https://github.com/FuelLabs/fuels-ts/issues/129)) ([ed80835](https://github.com/FuelLabs/fuels-ts/commit/ed808352347d5deac0a683d007632cae09df8692))
* add HDWallet implementation BIP-032 + BIP-044 ([#143](https://github.com/FuelLabs/fuels-ts/issues/143)) ([f7de3dc](https://github.com/FuelLabs/fuels-ts/commit/f7de3dc5d377682d880fa69496eaf93502c43c9e))
* add Provider.getCoinsToSpend() ([#93](https://github.com/FuelLabs/fuels-ts/issues/93)) ([4bff768](https://github.com/FuelLabs/fuels-ts/commit/4bff76855b413f10eaffa4d631b5ffb79306e767))
* add sendTransaction with signature ([#111](https://github.com/FuelLabs/fuels-ts/issues/111)) ([756d35d](https://github.com/FuelLabs/fuels-ts/commit/756d35d347d12160b18f1d93cd61211695074362))
* config provider at generate wallet ([#128](https://github.com/FuelLabs/fuels-ts/issues/128)) ([4932c81](https://github.com/FuelLabs/fuels-ts/commit/4932c8146506b0736af5748c12d904fda2673e1f))
* generate docs ([#116](https://github.com/FuelLabs/fuels-ts/issues/116)) ([84ac1c7](https://github.com/FuelLabs/fuels-ts/commit/84ac1c79c5e75bd1a39466f2d4e518c17c1304b4))
* zero out output fields on hashTransaction ([#110](https://github.com/FuelLabs/fuels-ts/issues/110)) ([b018ede](https://github.com/FuelLabs/fuels-ts/commit/b018edecf2acde4582631003074dc0742c0a52e0))
