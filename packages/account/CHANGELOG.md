# Change Log

## 0.94.2

### Patch Changes

- 3b59f1f: fix: avoid potential race-condition in fuel connectors init
- ccd94fc: chore: upgrade `fuel-core@0.34.0`
- Updated dependencies [01e2f0e]
- Updated dependencies [ccd94fc]
- Updated dependencies [986a247]
  - @fuel-ts/utils@0.94.2
  - @fuel-ts/versions@0.94.2
  - @fuel-ts/abi-coder@0.94.2
  - @fuel-ts/address@0.94.2
  - @fuel-ts/crypto@0.94.2
  - @fuel-ts/hasher@0.94.2
  - @fuel-ts/transactions@0.94.2
  - @fuel-ts/errors@0.94.2
  - @fuel-ts/merkle@0.94.2
  - @fuel-ts/math@0.94.2
  - @fuel-ts/interfaces@0.94.2

## 0.94.1

### Patch Changes

- Updated dependencies [9bba305]
  - @fuel-ts/utils@0.94.1
  - @fuel-ts/abi-coder@0.94.1
  - @fuel-ts/address@0.94.1
  - @fuel-ts/crypto@0.94.1
  - @fuel-ts/hasher@0.94.1
  - @fuel-ts/transactions@0.94.1
  - @fuel-ts/merkle@0.94.1
  - @fuel-ts/errors@0.94.1
  - @fuel-ts/interfaces@0.94.1
  - @fuel-ts/math@0.94.1
  - @fuel-ts/versions@0.94.1

## 0.94.0

### Minor Changes

- c7e01b4: feat!: consider message on resources cache
- 799db38: feat!: prettify `typegen` api
- 7f50d40: feat!: read malleable fields from transaction status on subscription
- 56018e3: chore!: deprecate `FUEL_NETWORK_URL` and `LOCAL_NETWORK_URL`
- 5e8a087: chore!: integrate `launchTestNode` in remaining packages
- 80cb187: fix!: assembly process for account transfer operation
- bbd794a: chore!: wrap subscriptions in promise
- 03ac550: feat!: `fuel-core@0.32.1` and large contract deployments

### Patch Changes

- 26cb189: chore: refactor helpers related to transaction operations
- 9309598: chore: upgrade `fuel-core@0.33.0`
- d875416: build(deps): bump type-fest from 4.19.0 to 4.24.0
- 2a8cb38: fix: avoid re-add fake resources at `Account.getTransactionCost`
- 0110fd8: chore: handle exceeding maximum inputs when funding a transaction
- c7104da: fix: transaction revert error
- 2be4a5e: chore: improve node incompatibility warning
- f6b12bd: fix: gas price estimation test flakiness
- a467d54: fix: `Account.createTransfer` return type
- 896add9: chore: default TestMessage to be spendable
- 751d638: chore: switching `Error` to `FuelError`
- 1d2abd7: chore: add validation for TX max outputs exceeded
- fc39124: fix: return correct operations from coin and message inputs
- b0c161f: feat: add randomUUID into `fuel-ts/crypto`
- 25efc03: chore!: renamed `AssetId` to `TestAssetId`
- Updated dependencies [9309598]
- Updated dependencies [d875416]
- Updated dependencies [84dfdc5]
- Updated dependencies [29c556d]
- Updated dependencies [0110fd8]
- Updated dependencies [4c653d0]
- Updated dependencies [95e7108]
- Updated dependencies [751d638]
- Updated dependencies [1e93dac]
- Updated dependencies [1d2abd7]
- Updated dependencies [a056da3]
- Updated dependencies [9c07b00]
- Updated dependencies [03ac550]
- Updated dependencies [b0c161f]
  - @fuel-ts/versions@0.94.0
  - @fuel-ts/abi-coder@0.94.0
  - @fuel-ts/transactions@0.94.0
  - @fuel-ts/errors@0.94.0
  - @fuel-ts/utils@0.94.0
  - @fuel-ts/crypto@0.94.0
  - @fuel-ts/address@0.94.0
  - @fuel-ts/math@0.94.0
  - @fuel-ts/hasher@0.94.0
  - @fuel-ts/merkle@0.94.0
  - @fuel-ts/interfaces@0.94.0

## 0.93.0

### Minor Changes

- ad0a081: chore!: remove `awaitExecution` functionality
- d4c4e55: chore!: refactored the `getTransactionCost` method
- f3453b9: feat!: deploy contract validation

### Patch Changes

- 6b3df9d: build(deps): bump ramda and @types/ramda
- c99f56b: docs: added connector documentation
- 16ee1bf: chore: cache UTXOs by default upon TX submission
- Updated dependencies [99794e4]
- Updated dependencies [d4c4e55]
- Updated dependencies [f3453b9]
  - @fuel-ts/versions@0.93.0
  - @fuel-ts/interfaces@0.93.0
  - @fuel-ts/transactions@0.93.0
  - @fuel-ts/errors@0.93.0
  - @fuel-ts/utils@0.93.0
  - @fuel-ts/abi-coder@0.93.0
  - @fuel-ts/address@0.93.0
  - @fuel-ts/crypto@0.93.0
  - @fuel-ts/hasher@0.93.0
  - @fuel-ts/math@0.93.0
  - @fuel-ts/merkle@0.93.0

## 0.92.1

### Patch Changes

- c62ae85: build(deps): bump @fuels/vm-asm from 0.54.0 to 0.55.0
  - @fuel-ts/abi-coder@0.92.1
  - @fuel-ts/address@0.92.1
  - @fuel-ts/crypto@0.92.1
  - @fuel-ts/errors@0.92.1
  - @fuel-ts/hasher@0.92.1
  - @fuel-ts/interfaces@0.92.1
  - @fuel-ts/math@0.92.1
  - @fuel-ts/merkle@0.92.1
  - @fuel-ts/transactions@0.92.1
  - @fuel-ts/utils@0.92.1
  - @fuel-ts/versions@0.92.1

## 0.92.0

### Minor Changes

- 98dbfbb: fix!: `launchNode.cleanup` not killing node in last test of test group
- 17bd929: feat!: made `deployContract` a non-blocking call
- aa7e656: feat!: implement pagination for `Account` methods

### Patch Changes

- d0b5446: chore: fix repetitive words
- 369feef: build(deps): bump the deps group with 2 updates
- 638eae3: build(deps-dev): bump the dev-deps group with 29 updates
- 4a3c184: chore: upgrading `fuel-core` to `0.31.0`
- Updated dependencies [638eae3]
- Updated dependencies [4a3c184]
- Updated dependencies [44d51ee]
  - @fuel-ts/versions@0.92.0
  - @fuel-ts/crypto@0.92.0
  - @fuel-ts/errors@0.92.0
  - @fuel-ts/utils@0.92.0
  - @fuel-ts/abi-coder@0.92.0
  - @fuel-ts/address@0.92.0
  - @fuel-ts/hasher@0.92.0
  - @fuel-ts/math@0.92.0
  - @fuel-ts/transactions@0.92.0
  - @fuel-ts/merkle@0.92.0
  - @fuel-ts/interfaces@0.92.0

## 0.91.0

### Minor Changes

- 7befc6a: fix!: stop piping into `process.stdout/stderr` and use `console.log`

### Patch Changes

- ab1f8bf: build(deps-dev): bump @graphql-codegen/typescript-\*
- a9ece17: build: add support for latest node versions
- 34f1ac7: chore: add browser testing infrastructure
- eec0806: chore: add `UNKNOWN` error code
- 3be2251: build(deps-dev): bump prettier from 3.0.3 to 3.3.2
- 6d63732: fix: sync chain config schema
- Updated dependencies [a9ece17]
- Updated dependencies [eec0806]
- Updated dependencies [3be2251]
- Updated dependencies [8676a9e]
- Updated dependencies [dddde62]
- Updated dependencies [6d63732]
  - @fuel-ts/transactions@0.91.0
  - @fuel-ts/interfaces@0.91.0
  - @fuel-ts/abi-coder@0.91.0
  - @fuel-ts/versions@0.91.0
  - @fuel-ts/address@0.91.0
  - @fuel-ts/crypto@0.91.0
  - @fuel-ts/errors@0.91.0
  - @fuel-ts/hasher@0.91.0
  - @fuel-ts/merkle@0.91.0
  - @fuel-ts/utils@0.91.0
  - @fuel-ts/math@0.91.0

## 0.90.0

### Minor Changes

- bb5a123: feat!: add `launchTestNode` utility
- e165e37: chore!: upgrade fuel core to `0.28.0`
- 69c3e51: chore!: rename Provider `call` to `dryRun`
- 41dc617: fix!: updated chain assets, removed `beta-5` network

### Patch Changes

- b1dbe42: feat: implement `generateFakeResources` on `Account` class
- 3db38af: chore: add test to validate mint transactions serialization
- 81a77d3: chore: upgrading `fuel-core` to `0.29.0`
- 038d1f1: fix: type declarations for `@fuel-ts/account/test-utils`
- 90e8cba: chore: upgrading `fuel-core` to `0.30.0`
- Updated dependencies [bb5a123]
- Updated dependencies [e165e37]
- Updated dependencies [1b9fb19]
- Updated dependencies [1beab0e]
- Updated dependencies [439d0dc]
- Updated dependencies [81a77d3]
- Updated dependencies [436f040]
- Updated dependencies [af3202c]
- Updated dependencies [90e8cba]
- Updated dependencies [be92daf]
  - @fuel-ts/utils@0.90.0
  - @fuel-ts/versions@0.90.0
  - @fuel-ts/abi-coder@0.90.0
  - @fuel-ts/address@0.90.0
  - @fuel-ts/crypto@0.90.0
  - @fuel-ts/hasher@0.90.0
  - @fuel-ts/transactions@0.90.0
  - @fuel-ts/errors@0.90.0
  - @fuel-ts/merkle@0.90.0
  - @fuel-ts/math@0.90.0
  - @fuel-ts/interfaces@0.90.0

## 0.89.2

### Patch Changes

- 78c2d73: fix: update testnet URL
  - @fuel-ts/abi-coder@0.89.2
  - @fuel-ts/address@0.89.2
  - @fuel-ts/crypto@0.89.2
  - @fuel-ts/errors@0.89.2
  - @fuel-ts/hasher@0.89.2
  - @fuel-ts/interfaces@0.89.2
  - @fuel-ts/math@0.89.2
  - @fuel-ts/merkle@0.89.2
  - @fuel-ts/transactions@0.89.2
  - @fuel-ts/utils@0.89.2
  - @fuel-ts/versions@0.89.2

## 0.89.1

### Patch Changes

- eb6460b: chore: upgrade to fuel core `0.27.0`
- Updated dependencies [eb6460b]
  - @fuel-ts/versions@0.89.1
  - @fuel-ts/utils@0.89.1
  - @fuel-ts/errors@0.89.1
  - @fuel-ts/abi-coder@0.89.1
  - @fuel-ts/address@0.89.1
  - @fuel-ts/crypto@0.89.1
  - @fuel-ts/hasher@0.89.1
  - @fuel-ts/transactions@0.89.1
  - @fuel-ts/math@0.89.1
  - @fuel-ts/merkle@0.89.1
  - @fuel-ts/interfaces@0.89.1

## 0.89.0

### Minor Changes

- 0b53b85: feat!: pass base asset ID for withdrawals
- 7c08593: feat!: transfer for multiple addresses

### Patch Changes

- 67afa32: chore!: remove built-in binaries for `forc` and `fuel-core`
- 3b27bac: fix: add `predicateData` to predicate resources and inputs
- Updated dependencies [5a6ca46]
- Updated dependencies [67afa32]
- Updated dependencies [f83502e]
- Updated dependencies [af3c143]
- Updated dependencies [685829b]
- Updated dependencies [83bbb7f]
- Updated dependencies [a96c1fe]
- Updated dependencies [f76aa57]
  - @fuel-ts/utils@0.89.0
  - @fuel-ts/versions@0.89.0
  - @fuel-ts/abi-coder@0.89.0
  - @fuel-ts/transactions@0.89.0
  - @fuel-ts/address@0.89.0
  - @fuel-ts/crypto@0.89.0
  - @fuel-ts/hasher@0.89.0
  - @fuel-ts/errors@0.89.0
  - @fuel-ts/merkle@0.89.0
  - @fuel-ts/math@0.89.0
  - @fuel-ts/interfaces@0.89.0

## 0.88.1

### Patch Changes

- Updated dependencies [64b90a9]
  - @fuel-ts/abi-coder@0.88.1
  - @fuel-ts/transactions@0.88.1
  - @fuel-ts/address@0.88.1
  - @fuel-ts/crypto@0.88.1
  - @fuel-ts/errors@0.88.1
  - @fuel-ts/hasher@0.88.1
  - @fuel-ts/interfaces@0.88.1
  - @fuel-ts/math@0.88.1
  - @fuel-ts/merkle@0.88.1
  - @fuel-ts/utils@0.88.1
  - @fuel-ts/versions@0.88.1

## 0.88.0

### Minor Changes

- 3f86778: chore!: update testnet URLs
- 60337b5: chore!: update `forc` to `0.59.0`

### Patch Changes

- d5116ce: fix: validate status from estimation dry-run
- Updated dependencies [60337b5]
- Updated dependencies [0b8e1a8]
  - @fuel-ts/abi-coder@0.88.0
  - @fuel-ts/transactions@0.88.0
  - @fuel-ts/address@0.88.0
  - @fuel-ts/crypto@0.88.0
  - @fuel-ts/errors@0.88.0
  - @fuel-ts/hasher@0.88.0
  - @fuel-ts/interfaces@0.88.0
  - @fuel-ts/math@0.88.0
  - @fuel-ts/merkle@0.88.0
  - @fuel-ts/utils@0.88.0
  - @fuel-ts/versions@0.88.0

## 0.87.0

### Patch Changes

- Updated dependencies [0da455a]
  - @fuel-ts/abi-coder@0.87.0
  - @fuel-ts/transactions@0.87.0
  - @fuel-ts/address@0.87.0
  - @fuel-ts/crypto@0.87.0
  - @fuel-ts/errors@0.87.0
  - @fuel-ts/hasher@0.87.0
  - @fuel-ts/interfaces@0.87.0
  - @fuel-ts/math@0.87.0
  - @fuel-ts/merkle@0.87.0
  - @fuel-ts/utils@0.87.0
  - @fuel-ts/versions@0.87.0

## 0.86.0

### Minor Changes

- ee969d3: fix!: avoid add witnesses for predicates
- 64e9659: feat!: upgrade `forc@0.58.0` and remove `V0` encoding

### Patch Changes

- 316c757: fix: internalize `ethers` functionality and remove dependency
- 0651a5f: chore: remove `ethers` from `abi-coder`
- Updated dependencies [316c757]
- Updated dependencies [16196b6]
- Updated dependencies [0651a5f]
- Updated dependencies [64e9659]
  - @fuel-ts/crypto@0.86.0
  - @fuel-ts/utils@0.86.0
  - @fuel-ts/errors@0.86.0
  - @fuel-ts/abi-coder@0.86.0
  - @fuel-ts/transactions@0.86.0
  - @fuel-ts/versions@0.86.0
  - @fuel-ts/address@0.86.0
  - @fuel-ts/hasher@0.86.0
  - @fuel-ts/math@0.86.0
  - @fuel-ts/merkle@0.86.0
  - @fuel-ts/interfaces@0.86.0

## 0.85.0

### Minor Changes

- fb0e12f: chore!: remove `__typename` from GraphQL types

### Patch Changes

- 9bc893b: fix: avoid overriding user `gasLimit` and `maxFee` inputs
- 1115ade: fix: added CDN path for icon assets
- f7eacb4: chore: warn on fuel client version incompatibility
- Updated dependencies [f7eacb4]
  - @fuel-ts/errors@0.85.0
  - @fuel-ts/abi-coder@0.85.0
  - @fuel-ts/address@0.85.0
  - @fuel-ts/crypto@0.85.0
  - @fuel-ts/math@0.85.0
  - @fuel-ts/transactions@0.85.0
  - @fuel-ts/utils@0.85.0
  - @fuel-ts/hasher@0.85.0
  - @fuel-ts/merkle@0.85.0
  - @fuel-ts/interfaces@0.85.0
  - @fuel-ts/versions@0.85.0

## 0.84.0

### Minor Changes

- 2990edb: chore!: upgrade `fuel-core` to `0.26.0`
- 214f9fc: fix!: deprecate getNetwork from `account`

### Patch Changes

- 86543ed: build: update deps
- 4aca0b8: feat: add `getMessageByNonce` to `Provider`
- 6231f7a: docs: updated inconsistent `@fuel-ts/account` README
- 2dd75b9: fix: handling optional policies
- 506f788: fix: throw proper error for not enough resources to cover fee
- Updated dependencies [2990edb]
  - @fuel-ts/transactions@0.84.0
  - @fuel-ts/versions@0.84.0
  - @fuel-ts/utils@0.84.0
  - @fuel-ts/errors@0.84.0
  - @fuel-ts/abi-coder@0.84.0
  - @fuel-ts/address@0.84.0
  - @fuel-ts/crypto@0.84.0
  - @fuel-ts/hasher@0.84.0
  - @fuel-ts/math@0.84.0
  - @fuel-ts/merkle@0.84.0
  - @fuel-ts/interfaces@0.84.0

## 0.83.0

### Minor Changes

- 9c3c094: chore!: upgrade `fuel-core` to `0.24.3`
- b026feb: feat!: fetch base asset ID from chain

### Patch Changes

- 60be295: chore: ajusting some tests
- Updated dependencies [3d2e5c4]
- Updated dependencies [29f46ef]
- Updated dependencies [9c3c094]
- Updated dependencies [b026feb]
- Updated dependencies [0d75266]
  - @fuel-ts/abi-coder@0.83.0
  - @fuel-ts/versions@0.83.0
  - @fuel-ts/utils@0.83.0
  - @fuel-ts/transactions@0.83.0
  - @fuel-ts/interfaces@0.83.0
  - @fuel-ts/errors@0.83.0
  - @fuel-ts/address@0.83.0
  - @fuel-ts/crypto@0.83.0
  - @fuel-ts/hasher@0.83.0
  - @fuel-ts/math@0.83.0
  - @fuel-ts/merkle@0.83.0

## 0.82.0

### Patch Changes

- Updated dependencies [1c8d8bf]
  - @fuel-ts/abi-coder@0.82.0
  - @fuel-ts/transactions@0.82.0
  - @fuel-ts/address@0.82.0
  - @fuel-ts/crypto@0.82.0
  - @fuel-ts/errors@0.82.0
  - @fuel-ts/hasher@0.82.0
  - @fuel-ts/interfaces@0.82.0
  - @fuel-ts/math@0.82.0
  - @fuel-ts/merkle@0.82.0
  - @fuel-ts/utils@0.82.0
  - @fuel-ts/versions@0.82.0

## 0.81.0

### Patch Changes

- 37743e8: chore: add initial `depcheck` using knip
- 3c0aacc: feat: generalize subscription event parsing
- Updated dependencies [1d92ce7]
- Updated dependencies [37743e8]
- Updated dependencies [124099b]
  - @fuel-ts/versions@0.81.0
  - @fuel-ts/abi-coder@0.81.0
  - @fuel-ts/address@0.81.0
  - @fuel-ts/errors@0.81.0
  - @fuel-ts/hasher@0.81.0
  - @fuel-ts/merkle@0.81.0
  - @fuel-ts/utils@0.81.0
  - @fuel-ts/math@0.81.0
  - @fuel-ts/transactions@0.81.0
  - @fuel-ts/crypto@0.81.0
  - @fuel-ts/interfaces@0.81.0

## 0.80.0

### Minor Changes

- 29d5303: chore!: enhance TX error handling and message formatting
- 29d5303: fix!: fee estimation for multicall
- 29d5303: chore: removed `predicateDataBytes` from the `Predicate` class
- 29d5303: docs: upgrade testnet documentation

### Patch Changes

- Updated dependencies [29d5303]
- Updated dependencies [29d5303]
- Updated dependencies [29d5303]
- Updated dependencies [29d5303]
- Updated dependencies [29d5303]
- Updated dependencies [29d5303]
- Updated dependencies [29d5303]
  - @fuel-ts/abi-coder@0.80.0
  - @fuel-ts/transactions@0.80.0
  - @fuel-ts/errors@0.80.0
  - @fuel-ts/address@0.80.0
  - @fuel-ts/crypto@0.80.0
  - @fuel-ts/math@0.80.0
  - @fuel-ts/utils@0.80.0
  - @fuel-ts/hasher@0.80.0
  - @fuel-ts/merkle@0.80.0
  - @fuel-ts/fuel-core@0.80.0
  - @fuel-ts/interfaces@0.80.0
  - @fuel-ts/versions@0.80.0

## 0.79.0

### Minor Changes

- 3ebb9bcd: chore!: remove `externalLoggedTypes` from `Interface` class

### Patch Changes

- df882f14: feat: decode logs from TXs submitted outside `BaseInvocationScope`
- Updated dependencies [3ebb9bcd]
- Updated dependencies [dc1b0925]
  - @fuel-ts/abi-coder@0.79.0
  - @fuel-ts/interfaces@0.79.0
  - @fuel-ts/versions@0.79.0
  - @fuel-ts/transactions@0.79.0
  - @fuel-ts/address@0.79.0
  - @fuel-ts/hasher@0.79.0
  - @fuel-ts/merkle@0.79.0
  - @fuel-ts/utils@0.79.0
  - @fuel-ts/errors@0.79.0
  - @fuel-ts/crypto@0.79.0
  - @fuel-ts/math@0.79.0
  - @fuel-ts/fuel-core@0.79.0

## 0.78.0

### Minor Changes

- fabb7a89: feat!: improve signing DX

### Patch Changes

- Updated dependencies [9df48991]
  - @fuel-ts/versions@0.78.0
  - @fuel-ts/abi-coder@0.78.0
  - @fuel-ts/address@0.78.0
  - @fuel-ts/errors@0.78.0
  - @fuel-ts/transactions@0.78.0
  - @fuel-ts/hasher@0.78.0
  - @fuel-ts/crypto@0.78.0
  - @fuel-ts/math@0.78.0
  - @fuel-ts/utils@0.78.0
  - @fuel-ts/merkle@0.78.0
  - @fuel-ts/fuel-core@0.78.0
  - @fuel-ts/interfaces@0.78.0

## 0.77.0

### Minor Changes

- - Rename Asset type `Fuel` to `NetworkFuel`
  - Rename Asset type `Ethereum` to `NetworkEthereum`
  - Exporting Asset types, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1877](https://github.com/FuelLabs/fuels-ts/pull/1877))
- !feat: accept predicate data on the `Predicate` constructor
  This is a _BREAKING_ change since the API for the `Predicate` constructor has changed:
  ```ts
  // old API
  const predicate = new Predicate(
    bytecode,
    provider,
    abi,
    configurableConstants,
  );
  // new API
  const predicate = new Predicate({
    bytecode,
    abi, // optional
    provider,
    inputData, // optional
    configurableConstants, // optional
  });
  ```
  Notice how the `Predicate` constructor now accepts an _object_ with the following properties:
  - `bytecode`: The bytecode of the predicate.
  - `abi`: The JSON ABI of the predicate (optional).
  - `provider`: The provider for interacting with the predicate.
  - `inputData`: The predicate input data (optional).
  - `configurableConstants`: The configurable constants for the predicate (optional).
    This change was made with readability and ease-of-use in mind, since having too many arguments in a 'flat' constructor can be confusing. Consider a scenario where you want to create a Predicate with configurables but no input data:
  ```ts
  const predicate = new Predicate(
    bytecode,
    provider,
    abi,
    undefined,
    configurableConstants,
  );
  ```
  In this case, you would have to pass `undefined` as the `inputData` argument, which is not ideal. By using the object-based constructor, you can now pass an object with the properties you want to set, and the constructor will handle the rest:
  ```ts
  const predicate = new Predicate({
    bytecode,
    abi,
    provider,
    configurableConstants,
  });
  ```
  The `setData` method has been removed. If you want to pass in the predicate data _after_ instantiating the `Predicate` or if you want to use a different data than the one passed in the constructor, you will have to create a new `Predicate` instance, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1826](https://github.com/FuelLabs/fuels-ts/pull/1826))
- Added `requestMiddleware` to `ProviderOptions` as a way to allow the user the modification of each fetch call's request, by [@nedsalk](https://github.com/nedsalk) (See [#1822](https://github.com/FuelLabs/fuels-ts/pull/1822))

### Patch Changes

- Add try/catch block when parsing GraphQL stream data response, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1839](https://github.com/FuelLabs/fuels-ts/pull/1839))
- Migrate implementations of `sha256`, `keccak` and `scrypt` to `@noble/hashes`, by [@danielbate](https://github.com/danielbate) (See [#1786](https://github.com/FuelLabs/fuels-ts/pull/1786))
- 🐞 fix: disallow transferring <= 0 amounts, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1827](https://github.com/FuelLabs/fuels-ts/pull/1827))
- - Handling `SqueezedOut` status update when calling `submitAndAwait` subscription at `Provider.sendTransaction`
  - Handling `SqueezedOut` status update when calling statusChange subscrition at `TransactionResponse.waitForResult`, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1829](https://github.com/FuelLabs/fuels-ts/pull/1829))

## 0.76.0

### Minor Changes

- Add the DateTime class, which allows for the conversion between common date time formats, by [@petertonysmith94](https://github.com/petertonysmith94) (See [#1627](https://github.com/FuelLabs/fuels-ts/pull/1627))

### Patch Changes

- Add method `addTransfer` to `BaseInvocationScope`, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1810](https://github.com/FuelLabs/fuels-ts/pull/1810))

## 0.75.0

### Minor Changes

- - Add `outputVariables` and `missingContractIds` to the return of `estimateTxDependencies`
  - Removed `estimatedOutputs` from return of `getTransactionCost`
  - Add `outputVariables` and `missingContractIds` to the return of `getTransactionCost`
  - Avoid reassigning `inputs` and `outputs` from the estimated TX at `BaseInvocationScope`, by [@Torres-ssf](https://github.com/Torres-ssf) (See [`4bee7751`](https://github.com/FuelLabs/fuels-ts/commit/4bee7751f89c88f5e623c676b157b4a4a515b09b))
- - For a contract call, reduced the number of dry run calls before the call from 4 to 1
  - For a contract simulation, reduced the number of dry run calls before the simulation from 3 to 1
  - For a transfer from an account, reduced the number of dry run calls from 2 to 1
  - Optimized predicate estimation so that there are no calls to the node if all predicates in a transaction have been estimated
  - `Predicate.estimateTxDependencies` now returns receipts which are used for the purposes of the optimizations mentioned above
  - `BaseInvocationScope.fundWithRequiredCoins` now calculates the `fee` parameter internally so it was removed from the function signature, by [@nedsalk](https://github.com/nedsalk) (See [#1767](https://github.com/FuelLabs/fuels-ts/pull/1767))
- 🐞 fix assemble of transfer operations, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1787](https://github.com/FuelLabs/fuels-ts/pull/1787))

### Patch Changes

- exports InvocationCallResult, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1765](https://github.com/FuelLabs/fuels-ts/pull/1765))
- 🐞 Fixed subscriptions hanging when not closed by user even after connection is closed, by [@nedsalk](https://github.com/nedsalk) (See [#1793](https://github.com/FuelLabs/fuels-ts/pull/1793))
- Use interal utilities for arrayify, hexlify, concat and BytesLike, by [@danielbate](https://github.com/danielbate) (See [#1775](https://github.com/FuelLabs/fuels-ts/pull/1775))
- ✨ feat: migrate over @fuels/assets package into the TS SDK, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1747](https://github.com/FuelLabs/fuels-ts/pull/1747))
- remove unused connectors types, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1792](https://github.com/FuelLabs/fuels-ts/pull/1792))

## 0.74.0

### Minor Changes

- remove provider from WalletManager specific types, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1723](https://github.com/FuelLabs/fuels-ts/pull/1723))
- restructure Account related packages, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1675](https://github.com/FuelLabs/fuels-ts/pull/1675))

### Patch Changes

- remove additional dryrun call, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1731](https://github.com/FuelLabs/fuels-ts/pull/1731))
- made fundWithFakeUtxos accepts resources owner address, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1750](https://github.com/FuelLabs/fuels-ts/pull/1750))
- implement wallet connectors, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1699](https://github.com/FuelLabs/fuels-ts/pull/1699))
- Upgrading `fuel-core` to `0.22.1`, by [@arboleya](https://github.com/arboleya) (See [#1756](https://github.com/FuelLabs/fuels-ts/pull/1756))

## 0.73.0

## 0.72.0

### Minor Changes

- - Transaction execution can now be await with the `{awaitExecution: true}` option on `Provider.sendTransaction`
  - Added same functionality to accounts (unlocked wallet, predicate)
  - `BaseInvocationScope` internally now uses `{awaitExecution: true}` to reduce amount of network calls, by [@arboleya](https://github.com/arboleya) (See [#1495](https://github.com/FuelLabs/fuels-ts/pull/1495))
- Made provider argument optional for wallet instantiation, by [@arboleya](https://github.com/arboleya) (See [#1495](https://github.com/FuelLabs/fuels-ts/pull/1495))
- accepting string as address instead of only AbstractAddress, by [@arboleya](https://github.com/arboleya) (See [#1495](https://github.com/FuelLabs/fuels-ts/pull/1495))
- chore!: share single chainconfig and `launchNode` utility throughout the codebase.
  - `startFuelCore` now re-uses `launchNode` instead of having its own node-launching logic
  - `@fuel-ts/utils` now exports a `defaultChainConfig` and a `defaultConsensusKey` which is used everywhere in the source code.
  - The `chainConfig.json` file inside the `.fuel-core` folder at the root also uses the same chain config. The `run-node` script has been modified to copy over the contents of the chain config file from the utils package.
  # Breaking Changes
  - Multiple fuel-core config-related options have been removed from `LaunchNodeOptions`:
  - `chainConfigPath`
  - `consensusKey`
  - `useInMemoryDb`
  - `poaInstant`
  - The only way to pass in these config values now is through the `args` property, i.e.:
  ````ts
  const { cleanup, ip, port } = await launchNode({
  args: ["--poa-interval-period", "750ms", "--poa-instant", "false"],
  });
  ```, by [@arboleya](https://github.com/arboleya) (See [#1495](https://github.com/FuelLabs/fuels-ts/pull/1495))
  ````

## 0.71.1

## 0.71.0

### Minor Changes

- add method to hash tx on TransactionRequest classes, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))
- Add `pnpm create fuels` CLI tool, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))
- ensure estimated fee values returned by getTransactionCost are never 0, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))
- 🐞 fix Account fund and Provider fundWithFakeUtxos, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))
- add support for TX policies, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))

## 0.70.1

## 0.70.0

### Minor Changes

- add method to hash tx on TransactionRequest classes, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1485](https://github.com/FuelLabs/fuels-ts/pull/1485))
- Add `pnpm create fuels` CLI tool, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1565](https://github.com/FuelLabs/fuels-ts/pull/1565))
- ensure estimated fee values returned by getTransactionCost are never 0, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1523](https://github.com/FuelLabs/fuels-ts/pull/1523))
- 🐞 fix Account fund and Provider fundWithFakeUtxos, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1531](https://github.com/FuelLabs/fuels-ts/pull/1531))
- add support for TX policies, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1437](https://github.com/FuelLabs/fuels-ts/pull/1437))

## 0.69.1

## 0.69.0

## 0.68.0

### Patch Changes

- New helper method `Predicate.getTransferTxId`, which lets you calculate the transaction ID for a Predicate.transfer transaction, before actually sending it, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1467](https://github.com/FuelLabs/fuels-ts/pull/1467))

## 0.67.0

### Minor Changes

- 🐞 Fixing transaction funding, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1372](https://github.com/FuelLabs/fuels-ts/pull/1372))

## 0.66.1

### Patch Changes

- Adjusting package manager configs, by [@arboleya](https://github.com/arboleya) (See [#1415](https://github.com/FuelLabs/fuels-ts/pull/1415))

## 0.66.0

### Minor Changes

- 🐞 fix transferToContract for amounts higher than u16, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1395](https://github.com/FuelLabs/fuels-ts/pull/1395))

## 0.65.0

### Patch Changes

- 🐞 Fixed usage of process, by [@camsjams](https://github.com/camsjams) (See [#1378](https://github.com/FuelLabs/fuels-ts/pull/1378))

## 0.64.1

## 0.64.0

### Minor Changes

- Added support for integration testing on live node, by [@camsjams](https://github.com/camsjams) (See [#1324](https://github.com/FuelLabs/fuels-ts/pull/1324))

## 0.63.0

### Patch Changes

- refactor: purge usage of `arrayify` from ethers v5 in favor of `getBytes` from ethers v6, by [@danielbate](https://github.com/danielbate) (See [#1255](https://github.com/FuelLabs/fuels-ts/pull/1255))

## 0.62.0

## 0.61.0

### Patch Changes

- 🐞 fix: launchNode will create a GENESIS_KEY if not already set, by [@dmihal](https://github.com/dmihal) (See [#1305](https://github.com/FuelLabs/fuels-ts/pull/1305))

## 0.60.0

### Minor Changes

- purging constant MAX_GAS_PER_TX, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1272](https://github.com/FuelLabs/fuels-ts/pull/1272))

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
- purging GAS_PRICE_FACTOR and GAS_PER_BYTE constants, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1271](https://github.com/FuelLabs/fuels-ts/pull/1271))

### Patch Changes

- Only attempt to kill process if pid is defined for `launchNodeAndGetWallets`, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1266](https://github.com/FuelLabs/fuels-ts/pull/1266))
- Add and export explicit return types for `launchNodeAndGetWallets` and `launchNode`, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1267](https://github.com/FuelLabs/fuels-ts/pull/1267))

## 0.57.0

## 0.56.1

### Patch Changes

- Awaiting for WASM initialization inside wallet utility, by [@arboleya](https://github.com/arboleya) (See [#1243](https://github.com/FuelLabs/fuels-ts/pull/1243))

## 0.56.0

## 0.55.0

### Minor Changes

- improve transaction api for using predicates on custom transactions, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1216](https://github.com/FuelLabs/fuels-ts/pull/1216))

### Patch Changes

- Add `launchNodeAndGetWallets` test utility function, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1204](https://github.com/FuelLabs/fuels-ts/pull/1204))

## 0.54.1

### Patch Changes

- Upgrading vm/wasm libs, by [@arboleya](https://github.com/arboleya) (See [#1226](https://github.com/FuelLabs/fuels-ts/pull/1226))

## 0.54.0

## 0.53.0

## 0.52.0

## 0.51.0

## 0.50.0

### Minor Changes

- support encrypt and decrypt json wallets, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1041](https://github.com/FuelLabs/fuels-ts/pull/1041))

### Patch Changes

- Adding WASM integration for `@fuels/vm-asm`, by [@camsjams](https://github.com/camsjams) (See [#1164](https://github.com/FuelLabs/fuels-ts/pull/1164))

## 0.49.1

## 0.49.0

### Minor Changes

- rename package keystore to crypto, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1140](https://github.com/FuelLabs/fuels-ts/pull/1140))

## 0.48.2

## 0.48.1

## 0.48.0

### Patch Changes

- Adding WASM integration for `@fuels/vm-asm`, by [@arboleya](https://github.com/arboleya) (See [#1080](https://github.com/FuelLabs/fuels-ts/pull/1080))
- `NativeAssetId` has been renamed to `BaseAssetId` for better clarity and consistency with the Rust SDK, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1121](https://github.com/FuelLabs/fuels-ts/pull/1121))

## 0.47.0

## 0.46.0

### Minor Changes

- Improve usability of `ScriptTransactionRequest` and document, by [@danielbate](https://github.com/danielbate) (See [#1072](https://github.com/FuelLabs/fuels-ts/pull/1072))
- Added functionality for transferring assets to contracts, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1061](https://github.com/FuelLabs/fuels-ts/pull/1061))

### Patch Changes

- Removing `publishConfigs`, using `.dts` files with declaration maps (`.dts.map`), by [@arboleya](https://github.com/arboleya) (See [#1055](https://github.com/FuelLabs/fuels-ts/pull/1055))

## 0.45.0

### Minor Changes

- Upgrade to fuel-core 0.18.1 and forc 0.40.1, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#986](https://github.com/FuelLabs/fuels-ts/pull/986))

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
  - @fuel-ts/hasher@0.43.0
  - @fuel-ts/signer@0.43.0
  - @fuel-ts/hdwallet@0.43.0
  - @fuel-ts/address@0.43.0
  - @fuel-ts/interfaces@0.43.0
  - @fuel-ts/math@0.43.0
  - @fuel-ts/mnemonic@0.43.0

## 0.42.0

### Patch Changes

- Updated dependencies [[`5b0ce1c0`](https://github.com/FuelLabs/fuels-ts/commit/5b0ce1c03e16702b6101b1f299020d7c70e85505), [`41da3655`](https://github.com/FuelLabs/fuels-ts/commit/41da3655d8a6b7a4633e0fdd3f35622ed24bbd90), [`eda13d72`](https://github.com/FuelLabs/fuels-ts/commit/eda13d72c32f72652a34f926c4b9cf42ac36556c)]:
  - @fuel-ts/providers@0.42.0
  - @fuel-ts/abi-coder@0.42.0
  - @fuel-ts/hasher@0.42.0
  - @fuel-ts/transactions@0.42.0
  - @fuel-ts/address@0.42.0
  - @fuel-ts/signer@0.42.0
  - @fuel-ts/hdwallet@0.42.0
  - @fuel-ts/interfaces@0.42.0
  - @fuel-ts/math@0.42.0
  - @fuel-ts/mnemonic@0.42.0

## 0.41.0

### Minor Changes

- [#954](https://github.com/FuelLabs/fuels-ts/pull/954) [`bf6214cc`](https://github.com/FuelLabs/fuels-ts/commit/bf6214cc2c4be227974e7d64360c01c9875c772c) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - The `addMissingVariable` helper has been renamed to `estimateTxDependencies`, and some documentation around it has been added.

### Patch Changes

- Updated dependencies [[`8332026a`](https://github.com/FuelLabs/fuels-ts/commit/8332026aef44dcf17ace31dfb08a3114612a2ae5), [`bf6214cc`](https://github.com/FuelLabs/fuels-ts/commit/bf6214cc2c4be227974e7d64360c01c9875c772c), [`0ff4eeab`](https://github.com/FuelLabs/fuels-ts/commit/0ff4eeab67b4c6b6b224230193ab742a3103fa1e)]:
  - @fuel-ts/providers@0.41.0
  - @fuel-ts/hasher@0.41.0
  - @fuel-ts/signer@0.41.0
  - @fuel-ts/hdwallet@0.41.0
  - @fuel-ts/abi-coder@0.41.0
  - @fuel-ts/address@0.41.0
  - @fuel-ts/interfaces@0.41.0
  - @fuel-ts/math@0.41.0
  - @fuel-ts/mnemonic@0.41.0
  - @fuel-ts/transactions@0.41.0

## 0.40.0

### Patch Changes

- Updated dependencies [[`4321ac1b`](https://github.com/FuelLabs/fuels-ts/commit/4321ac1beacce0ed2e342942ef4a3997c1d34d10), [`d0eb7a39`](https://github.com/FuelLabs/fuels-ts/commit/d0eb7a39d2d5cd59cc45fede3826a327f158d5ea)]:
  - @fuel-ts/abi-coder@0.40.0
  - @fuel-ts/providers@0.40.0
  - @fuel-ts/transactions@0.40.0
  - @fuel-ts/hasher@0.40.0
  - @fuel-ts/signer@0.40.0
  - @fuel-ts/hdwallet@0.40.0
  - @fuel-ts/address@0.40.0
  - @fuel-ts/interfaces@0.40.0
  - @fuel-ts/math@0.40.0
  - @fuel-ts/mnemonic@0.40.0

## 0.39.1

### Patch Changes

- Updated dependencies [[`e31f2f57`](https://github.com/FuelLabs/fuels-ts/commit/e31f2f574b5d2e334b0c55360cdc1bb273d4ac47)]:
  - @fuel-ts/address@0.39.1
  - @fuel-ts/hasher@0.39.1
  - @fuel-ts/providers@0.39.1
  - @fuel-ts/signer@0.39.1
  - @fuel-ts/transactions@0.39.1
  - @fuel-ts/hdwallet@0.39.1
  - @fuel-ts/abi-coder@0.39.1
  - @fuel-ts/interfaces@0.39.1
  - @fuel-ts/math@0.39.1
  - @fuel-ts/mnemonic@0.39.1

## 0.39.0

### Patch Changes

- [#824](https://github.com/FuelLabs/fuels-ts/pull/824) [`a8d27dc7`](https://github.com/FuelLabs/fuels-ts/commit/a8d27dc749b4c443fd0714da12b7a75ab56da6d7) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - The `no-explicit-any` ESLint rule is now treated as an error. The usage of `any` has now been replaced from as many files as possible.

- Updated dependencies [[`a0beaa1d`](https://github.com/FuelLabs/fuels-ts/commit/a0beaa1d45f287aa566a42602f20744c71a37b32), [`63c906b2`](https://github.com/FuelLabs/fuels-ts/commit/63c906b25e9cdb65e52c5d77fb85f118400fc545), [`0522917f`](https://github.com/FuelLabs/fuels-ts/commit/0522917f64d05d992b7607740272e4954e991472), [`a8d27dc7`](https://github.com/FuelLabs/fuels-ts/commit/a8d27dc749b4c443fd0714da12b7a75ab56da6d7)]:
  - @fuel-ts/providers@0.39.0
  - @fuel-ts/abi-coder@0.39.0
  - @fuel-ts/interfaces@0.39.0
  - @fuel-ts/hasher@0.39.0
  - @fuel-ts/transactions@0.39.0
  - @fuel-ts/address@0.39.0
  - @fuel-ts/signer@0.39.0
  - @fuel-ts/hdwallet@0.39.0
  - @fuel-ts/math@0.39.0
  - @fuel-ts/mnemonic@0.39.0

## 0.38.1

### Patch Changes

- Updated dependencies [[`771844de`](https://github.com/FuelLabs/fuels-ts/commit/771844de1bb27d3e88f5a45f9ac6e32adfbf50e3)]:
  - @fuel-ts/signer@0.38.1
  - @fuel-ts/hdwallet@0.38.1
  - @fuel-ts/abi-coder@0.38.1
  - @fuel-ts/address@0.38.1
  - @fuel-ts/hasher@0.38.1
  - @fuel-ts/interfaces@0.38.1
  - @fuel-ts/math@0.38.1
  - @fuel-ts/mnemonic@0.38.1
  - @fuel-ts/providers@0.38.1
  - @fuel-ts/transactions@0.38.1

## 0.38.0

### Minor Changes

- [#811](https://github.com/FuelLabs/fuels-ts/pull/811) [`653c8391`](https://github.com/FuelLabs/fuels-ts/commit/653c8391ece33a8f31598ea137452dd601dc7468) Thanks [@Torres-ssf](https://github.com/Torres-ssf)! - switch docs engine from jekyll to vitepress

### Patch Changes

- Updated dependencies [[`653c8391`](https://github.com/FuelLabs/fuels-ts/commit/653c8391ece33a8f31598ea137452dd601dc7468), [`0873a883`](https://github.com/FuelLabs/fuels-ts/commit/0873a883d366a4efc6653a9c30079bb713769290)]:
  - @fuel-ts/interfaces@0.38.0
  - @fuel-ts/providers@0.38.0
  - @fuel-ts/transactions@0.38.0
  - @fuel-ts/address@0.38.0
  - @fuel-ts/hasher@0.38.0
  - @fuel-ts/abi-coder@0.38.0
  - @fuel-ts/signer@0.38.0
  - @fuel-ts/hdwallet@0.38.0
  - @fuel-ts/math@0.38.0
  - @fuel-ts/mnemonic@0.38.0

## 0.37.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.37.1
  - @fuel-ts/address@0.37.1
  - @fuel-ts/providers@0.37.1
  - @fuel-ts/transactions@0.37.1
  - @fuel-ts/hasher@0.37.1
  - @fuel-ts/signer@0.37.1
  - @fuel-ts/hdwallet@0.37.1
  - @fuel-ts/interfaces@0.37.1
  - @fuel-ts/math@0.37.1
  - @fuel-ts/mnemonic@0.37.1

## 0.37.0

### Minor Changes

- [#852](https://github.com/FuelLabs/fuels-ts/pull/852) [`deeb2d9c`](https://github.com/FuelLabs/fuels-ts/commit/deeb2d9ca304e43e36ef0db5e7b46c14f2f4e8f3) Thanks [@arboleya](https://github.com/arboleya)! - Adding multi-type resolution support [also] for legacy projects

### Patch Changes

- Updated dependencies [[`deeb2d9c`](https://github.com/FuelLabs/fuels-ts/commit/deeb2d9ca304e43e36ef0db5e7b46c14f2f4e8f3)]:
  - @fuel-ts/math@0.37.0
  - @fuel-ts/transactions@0.37.0
  - @fuel-ts/abi-coder@0.37.0
  - @fuel-ts/hasher@0.37.0
  - @fuel-ts/hdwallet@0.37.0
  - @fuel-ts/providers@0.37.0
  - @fuel-ts/signer@0.37.0
  - @fuel-ts/address@0.37.0
  - @fuel-ts/interfaces@0.37.0
  - @fuel-ts/mnemonic@0.37.0

## 0.36.0

### Minor Changes

- [#820](https://github.com/FuelLabs/fuels-ts/pull/820) [`3cb39443`](https://github.com/FuelLabs/fuels-ts/commit/3cb394431a63f5294edf7e33207214eabf439ef5) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - The `@fuel-ts/constants` package has now been deleted. ALl constants have now been moved to `<package_name>/configs` for the respective package. They are all also exported by the umbrella `fuels` package.

### Patch Changes

- [#847](https://github.com/FuelLabs/fuels-ts/pull/847) [`d9f8c8c0`](https://github.com/FuelLabs/fuels-ts/commit/d9f8c8c0e993cc1abca19877eafd617ca0d2ee38) Thanks [@arboleya](https://github.com/arboleya)! - Adjusting constants evaluation by removing usage of `process.env`

- [#844](https://github.com/FuelLabs/fuels-ts/pull/844) [`1de9693a`](https://github.com/FuelLabs/fuels-ts/commit/1de9693a059501243bfa7b826231fd0fff10abcd) Thanks [@arboleya](https://github.com/arboleya)! - Adding missing `tsup` settings for individual `configs` entry points

- Updated dependencies [[`1613399e`](https://github.com/FuelLabs/fuels-ts/commit/1613399e97fc3ce63cdefa00ccff938e10f9fb9a), [`3cb39443`](https://github.com/FuelLabs/fuels-ts/commit/3cb394431a63f5294edf7e33207214eabf439ef5), [`dd7b1cab`](https://github.com/FuelLabs/fuels-ts/commit/dd7b1cab0e7c4a5234383ce6fc34f041ee6d03a9), [`1de9693a`](https://github.com/FuelLabs/fuels-ts/commit/1de9693a059501243bfa7b826231fd0fff10abcd)]:
  - @fuel-ts/abi-coder@0.36.0
  - @fuel-ts/address@0.36.0
  - @fuel-ts/hasher@0.36.0
  - @fuel-ts/math@0.36.0
  - @fuel-ts/providers@0.36.0
  - @fuel-ts/transactions@0.36.0
  - @fuel-ts/signer@0.36.0
  - @fuel-ts/hdwallet@0.36.0
  - @fuel-ts/interfaces@0.36.0
  - @fuel-ts/mnemonic@0.36.0

## 0.35.0

### Patch Changes

- [#819](https://github.com/FuelLabs/fuels-ts/pull/819) [`f4e1028a`](https://github.com/FuelLabs/fuels-ts/commit/f4e1028acd5a583d12662dd07ca0d17084a35be2) Thanks [@arboleya](https://github.com/arboleya)! - Adjusting export fields for all packages

- Updated dependencies [[`f4e1028a`](https://github.com/FuelLabs/fuels-ts/commit/f4e1028acd5a583d12662dd07ca0d17084a35be2)]:
  - @fuel-ts/abi-coder@0.35.0
  - @fuel-ts/address@0.35.0
  - @fuel-ts/constants@0.35.0
  - @fuel-ts/hasher@0.35.0
  - @fuel-ts/hdwallet@0.35.0
  - @fuel-ts/interfaces@0.35.0
  - @fuel-ts/math@0.35.0
  - @fuel-ts/mnemonic@0.35.0
  - @fuel-ts/providers@0.35.0
  - @fuel-ts/signer@0.35.0
  - @fuel-ts/transactions@0.35.0

## 0.34.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/address@0.34.1
  - @fuel-ts/hasher@0.34.1
  - @fuel-ts/signer@0.34.1
  - @fuel-ts/abi-coder@0.34.1
  - @fuel-ts/constants@0.34.1
  - @fuel-ts/hdwallet@0.34.1
  - @fuel-ts/interfaces@0.34.1
  - @fuel-ts/math@0.34.1
  - @fuel-ts/mnemonic@0.34.1
  - @fuel-ts/providers@0.34.1
  - @fuel-ts/transactions@0.34.1

## 0.34.0

### Patch Changes

- Updated dependencies [[`5454ca3b`](https://github.com/FuelLabs/fuels-ts/commit/5454ca3b616401fda051962129b1d8a221e3139d), [`c7cb8ac2`](https://github.com/FuelLabs/fuels-ts/commit/c7cb8ac2e268b860a41d29927814c24339f8514a)]:
  - @fuel-ts/mnemonic@0.34.0
  - @fuel-ts/abi-coder@0.34.0
  - @fuel-ts/hdwallet@0.34.0
  - @fuel-ts/providers@0.34.0
  - @fuel-ts/transactions@0.34.0
  - @fuel-ts/hasher@0.34.0
  - @fuel-ts/signer@0.34.0
  - @fuel-ts/address@0.34.0
  - @fuel-ts/constants@0.34.0
  - @fuel-ts/interfaces@0.34.0
  - @fuel-ts/math@0.34.0

## 0.33.0

### Patch Changes

- Updated dependencies [[`da3bc00a`](https://github.com/FuelLabs/fuels-ts/commit/da3bc00a29e7ef8f378afdb8bfb99d962be0dce3), [`5ba6ade0`](https://github.com/FuelLabs/fuels-ts/commit/5ba6ade0c5176e97a0f9f9b16835f8dd37408313)]:
  - @fuel-ts/providers@0.33.0
  - @fuel-ts/abi-coder@0.33.0
  - @fuel-ts/hasher@0.33.0
  - @fuel-ts/transactions@0.33.0
  - @fuel-ts/signer@0.33.0
  - @fuel-ts/hdwallet@0.33.0
  - @fuel-ts/address@0.33.0
  - @fuel-ts/constants@0.33.0
  - @fuel-ts/interfaces@0.33.0
  - @fuel-ts/math@0.33.0
  - @fuel-ts/mnemonic@0.33.0

## 0.32.0

### Minor Changes

- [#789](https://github.com/FuelLabs/fuels-ts/pull/789) [`66c200a1`](https://github.com/FuelLabs/fuels-ts/commit/66c200a1b4ecbef0ef8664fc01f7142364b0a1bc) Thanks [@luizstacio](https://github.com/luizstacio)! - Renaming BaseWalletLocked class to Account while abstracting common code.

### Patch Changes

- Updated dependencies [[`9943c5a7`](https://github.com/FuelLabs/fuels-ts/commit/9943c5a713f774412136513461836e50548c3e80), [`ab019648`](https://github.com/FuelLabs/fuels-ts/commit/ab019648edb9b9b84d7208d08c0b80164837661a), [`66c200a1`](https://github.com/FuelLabs/fuels-ts/commit/66c200a1b4ecbef0ef8664fc01f7142364b0a1bc), [`361fa1e6`](https://github.com/FuelLabs/fuels-ts/commit/361fa1e6c2fb45bca3b5e766b2aa83e94135a544), [`0ce7e930`](https://github.com/FuelLabs/fuels-ts/commit/0ce7e930e5af17153313990a933fcab5970ccbc6)]:
  - @fuel-ts/providers@0.32.0
  - @fuel-ts/address@0.32.0
  - @fuel-ts/interfaces@0.32.0
  - @fuel-ts/hasher@0.32.0
  - @fuel-ts/signer@0.32.0
  - @fuel-ts/hdwallet@0.32.0
  - @fuel-ts/abi-coder@0.32.0
  - @fuel-ts/constants@0.32.0
  - @fuel-ts/math@0.32.0
  - @fuel-ts/mnemonic@0.32.0
  - @fuel-ts/transactions@0.32.0

## 0.31.0

### Minor Changes

- [#775](https://github.com/FuelLabs/fuels-ts/pull/775) [`3aa7ed4`](https://github.com/FuelLabs/fuels-ts/commit/3aa7ed46dec1a39e391d1672452bec9f8bc5fc4c) Thanks [@luizstacio](https://github.com/luizstacio)! - BREAKING CHANGE, update support to fuel-core v0.17.1

### Patch Changes

- Updated dependencies [[`b126037`](https://github.com/FuelLabs/fuels-ts/commit/b126037000d2005ac8de1c24372cbcdc9b2b1c83), [`3aa7ed4`](https://github.com/FuelLabs/fuels-ts/commit/3aa7ed46dec1a39e391d1672452bec9f8bc5fc4c)]:
  - @fuel-ts/abi-coder@0.31.0
  - @fuel-ts/providers@0.31.0
  - @fuel-ts/transactions@0.31.0
  - @fuel-ts/hasher@0.31.0
  - @fuel-ts/signer@0.31.0
  - @fuel-ts/hdwallet@0.31.0
  - @fuel-ts/address@0.31.0
  - @fuel-ts/constants@0.31.0
  - @fuel-ts/interfaces@0.31.0
  - @fuel-ts/math@0.31.0
  - @fuel-ts/mnemonic@0.31.0

## 0.30.0

### Patch Changes

- Updated dependencies [[`dcdfea0`](https://github.com/FuelLabs/fuels-ts/commit/dcdfea0f480998537b6c9aee7b06fda25c7ec531), [`f521146`](https://github.com/FuelLabs/fuels-ts/commit/f521146c328a7fb2c98679ec3f0c9aa6df2f684f)]:
  - @fuel-ts/providers@0.30.0
  - @fuel-ts/hasher@0.30.0
  - @fuel-ts/signer@0.30.0
  - @fuel-ts/hdwallet@0.30.0
  - @fuel-ts/abi-coder@0.30.0
  - @fuel-ts/address@0.30.0
  - @fuel-ts/constants@0.30.0
  - @fuel-ts/interfaces@0.30.0
  - @fuel-ts/math@0.30.0
  - @fuel-ts/mnemonic@0.30.0
  - @fuel-ts/transactions@0.30.0

## 0.29.1

### Patch Changes

- [#736](https://github.com/FuelLabs/fuels-ts/pull/736) [`7d3416d`](https://github.com/FuelLabs/fuels-ts/commit/7d3416d5631c124bf7d89e5451bc206f0d93dc2a) Thanks [@luizstacio](https://github.com/luizstacio)! - Fix transfer and withdrawToBaseLayer to correct calculate amounts + fee

- Updated dependencies [[`cac1901`](https://github.com/FuelLabs/fuels-ts/commit/cac1901cbc5851751eaa5ef6380a436e33789e8a), [`8af203d`](https://github.com/FuelLabs/fuels-ts/commit/8af203d41ebf4aa84082ad160b05fdc45cdf68ed), [`609d5f0`](https://github.com/FuelLabs/fuels-ts/commit/609d5f052e5c1e7f2a73a619ac49a76605812c51)]:
  - @fuel-ts/mnemonic@0.29.1
  - @fuel-ts/providers@0.29.1
  - @fuel-ts/math@0.29.1
  - @fuel-ts/hdwallet@0.29.1
  - @fuel-ts/hasher@0.29.1
  - @fuel-ts/abi-coder@0.29.1
  - @fuel-ts/signer@0.29.1
  - @fuel-ts/transactions@0.29.1
  - @fuel-ts/address@0.29.1
  - @fuel-ts/constants@0.29.1
  - @fuel-ts/interfaces@0.29.1

## 0.29.0

### Patch Changes

- [#709](https://github.com/FuelLabs/fuels-ts/pull/709) [`52e62e4`](https://github.com/FuelLabs/fuels-ts/commit/52e62e4d7c19f5f45e54b1d23d89b6f4bfff4a42) Thanks [@arboleya](https://github.com/arboleya)! - Segregating exported library and test utilities

- Updated dependencies [[`c81396b`](https://github.com/FuelLabs/fuels-ts/commit/c81396bf3300e5aa2d0e0355877526c7357e0c90), [`5a08f80`](https://github.com/FuelLabs/fuels-ts/commit/5a08f80f408aff842403814c6cf444932b2afa0a)]:
  - @fuel-ts/mnemonic@0.29.0
  - @fuel-ts/abi-coder@0.29.0
  - @fuel-ts/hdwallet@0.29.0
  - @fuel-ts/providers@0.29.0
  - @fuel-ts/transactions@0.29.0
  - @fuel-ts/hasher@0.29.0
  - @fuel-ts/signer@0.29.0
  - @fuel-ts/address@0.29.0
  - @fuel-ts/constants@0.29.0
  - @fuel-ts/interfaces@0.29.0
  - @fuel-ts/math@0.29.0

## 0.28.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.28.1
  - @fuel-ts/address@0.28.1
  - @fuel-ts/constants@0.28.1
  - @fuel-ts/hasher@0.28.1
  - @fuel-ts/hdwallet@0.28.1
  - @fuel-ts/interfaces@0.28.1
  - @fuel-ts/math@0.28.1
  - @fuel-ts/mnemonic@0.28.1
  - @fuel-ts/providers@0.28.1
  - @fuel-ts/signer@0.28.1
  - @fuel-ts/transactions@0.28.1

## 0.28.0

### Minor Changes

- [#704](https://github.com/FuelLabs/fuels-ts/pull/704) [`605293d`](https://github.com/FuelLabs/fuels-ts/commit/605293d276b6ab24347c65d717e6bdf57d92b95b) Thanks [@luizstacio](https://github.com/luizstacio)! - Add connect method to provider enabling update network url

### Patch Changes

- Updated dependencies [[`605293d`](https://github.com/FuelLabs/fuels-ts/commit/605293d276b6ab24347c65d717e6bdf57d92b95b)]:
  - @fuel-ts/providers@0.28.0
  - @fuel-ts/hasher@0.28.0
  - @fuel-ts/signer@0.28.0
  - @fuel-ts/hdwallet@0.28.0
  - @fuel-ts/abi-coder@0.28.0
  - @fuel-ts/address@0.28.0
  - @fuel-ts/constants@0.28.0
  - @fuel-ts/interfaces@0.28.0
  - @fuel-ts/math@0.28.0
  - @fuel-ts/mnemonic@0.28.0
  - @fuel-ts/transactions@0.28.0

## 0.27.0

### Patch Changes

- Updated dependencies [[`8103891`](https://github.com/FuelLabs/fuels-ts/commit/8103891071145a86380a8c9bcb11132249138486), [`d0eb1c7`](https://github.com/FuelLabs/fuels-ts/commit/d0eb1c732f63842b8d4801456054ec3b9ccdd020)]:
  - @fuel-ts/address@0.27.0
  - @fuel-ts/providers@0.27.0
  - @fuel-ts/signer@0.27.0
  - @fuel-ts/hasher@0.27.0
  - @fuel-ts/abi-coder@0.27.0
  - @fuel-ts/hdwallet@0.27.0
  - @fuel-ts/transactions@0.27.0
  - @fuel-ts/constants@0.27.0
  - @fuel-ts/interfaces@0.27.0
  - @fuel-ts/math@0.27.0
  - @fuel-ts/mnemonic@0.27.0

## 0.26.0

### Patch Changes

- Updated dependencies [[`8c106af`](https://github.com/FuelLabs/fuels-ts/commit/8c106aff52d244d415162c20c4f049b37ba2f54a)]:
  - @fuel-ts/providers@0.26.0
  - @fuel-ts/abi-coder@0.26.0
  - @fuel-ts/address@0.26.0
  - @fuel-ts/hasher@0.26.0
  - @fuel-ts/transactions@0.26.0
  - @fuel-ts/signer@0.26.0
  - @fuel-ts/hdwallet@0.26.0
  - @fuel-ts/constants@0.26.0
  - @fuel-ts/interfaces@0.26.0
  - @fuel-ts/math@0.26.0
  - @fuel-ts/mnemonic@0.26.0

## 0.25.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.25.1
  - @fuel-ts/address@0.25.1
  - @fuel-ts/providers@0.25.1
  - @fuel-ts/transactions@0.25.1
  - @fuel-ts/signer@0.25.1
  - @fuel-ts/hasher@0.25.1
  - @fuel-ts/hdwallet@0.25.1
  - @fuel-ts/constants@0.25.1
  - @fuel-ts/interfaces@0.25.1
  - @fuel-ts/math@0.25.1
  - @fuel-ts/mnemonic@0.25.1

## 0.25.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.25.0
  - @fuel-ts/address@0.25.0
  - @fuel-ts/constants@0.25.0
  - @fuel-ts/hasher@0.25.0
  - @fuel-ts/hdwallet@0.25.0
  - @fuel-ts/interfaces@0.25.0
  - @fuel-ts/math@0.25.0
  - @fuel-ts/mnemonic@0.25.0
  - @fuel-ts/providers@0.25.0
  - @fuel-ts/signer@0.25.0
  - @fuel-ts/transactions@0.25.0

## 0.24.2

### Patch Changes

- [#646](https://github.com/FuelLabs/fuels-ts/pull/646) [`fa97383`](https://github.com/FuelLabs/fuels-ts/commit/fa97383114c36ee7a204be7e7f3f974382fa1b2c) Thanks [@camsjams](https://github.com/camsjams)! - Adjust doc update timing

- Updated dependencies [[`fa97383`](https://github.com/FuelLabs/fuels-ts/commit/fa97383114c36ee7a204be7e7f3f974382fa1b2c), [`0da49d3`](https://github.com/FuelLabs/fuels-ts/commit/0da49d37f4088faf112c0e5a393c6e8a25b3aa61)]:
  - @fuel-ts/abi-coder@0.24.2
  - @fuel-ts/address@0.24.2
  - @fuel-ts/constants@0.24.2
  - @fuel-ts/hasher@0.24.2
  - @fuel-ts/hdwallet@0.24.2
  - @fuel-ts/interfaces@0.24.2
  - @fuel-ts/math@0.24.2
  - @fuel-ts/mnemonic@0.24.2
  - @fuel-ts/providers@0.24.2
  - @fuel-ts/signer@0.24.2
  - @fuel-ts/transactions@0.24.2

## 0.24.1

### Patch Changes

- Updated dependencies [[`410b11a`](https://github.com/FuelLabs/fuels-ts/commit/410b11a79d8963dfb3706fd12877c46ca58b63b4)]:
  - @fuel-ts/providers@0.24.1
  - @fuel-ts/abi-coder@0.24.1
  - @fuel-ts/address@0.24.1
  - @fuel-ts/hasher@0.24.1
  - @fuel-ts/transactions@0.24.1
  - @fuel-ts/signer@0.24.1
  - @fuel-ts/hdwallet@0.24.1
  - @fuel-ts/constants@0.24.1
  - @fuel-ts/interfaces@0.24.1
  - @fuel-ts/math@0.24.1
  - @fuel-ts/mnemonic@0.24.1

## 0.24.0

### Minor Changes

- [#642](https://github.com/FuelLabs/fuels-ts/pull/642) [`9c9fae0`](https://github.com/FuelLabs/fuels-ts/commit/9c9fae05668912afea1dfbe4339a9cdddba1513a) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - Accept custom provider in wallet generation functions like `fromSeed`

### Patch Changes

- Updated dependencies [[`a732538`](https://github.com/FuelLabs/fuels-ts/commit/a732538062de5b83b4dec1e6ef654257e62498bd), [`02ac98e`](https://github.com/FuelLabs/fuels-ts/commit/02ac98ea865e0464b132dc3f6bd21f7e1a57435a), [`3de5ee5`](https://github.com/FuelLabs/fuels-ts/commit/3de5ee5b07b9e0c3754bebdecd8eac49b3a79413)]:
  - @fuel-ts/providers@0.24.0
  - @fuel-ts/abi-coder@0.24.0
  - @fuel-ts/address@0.24.0
  - @fuel-ts/hasher@0.24.0
  - @fuel-ts/transactions@0.24.0
  - @fuel-ts/signer@0.24.0
  - @fuel-ts/hdwallet@0.24.0
  - @fuel-ts/constants@0.24.0
  - @fuel-ts/interfaces@0.24.0
  - @fuel-ts/math@0.24.0
  - @fuel-ts/mnemonic@0.24.0

## 0.23.0

### Patch Changes

- [#639](https://github.com/FuelLabs/fuels-ts/pull/639) [`c0a62ed`](https://github.com/FuelLabs/fuels-ts/commit/c0a62ed278d6118f1af177dc98dcdb42febd0c81) Thanks [@camsjams](https://github.com/camsjams)! - Update docs

- Updated dependencies [[`c0a62ed`](https://github.com/FuelLabs/fuels-ts/commit/c0a62ed278d6118f1af177dc98dcdb42febd0c81), [`8888e79`](https://github.com/FuelLabs/fuels-ts/commit/8888e79bcd7740a0c85298862bd59981bc6755b3)]:
  - @fuel-ts/abi-coder@0.23.0
  - @fuel-ts/address@0.23.0
  - @fuel-ts/constants@0.23.0
  - @fuel-ts/hasher@0.23.0
  - @fuel-ts/hdwallet@0.23.0
  - @fuel-ts/interfaces@0.23.0
  - @fuel-ts/math@0.23.0
  - @fuel-ts/mnemonic@0.23.0
  - @fuel-ts/providers@0.23.0
  - @fuel-ts/signer@0.23.0
  - @fuel-ts/transactions@0.23.0

## 0.22.2

### Patch Changes

- [#612](https://github.com/FuelLabs/fuels-ts/pull/612) [`03b060b`](https://github.com/FuelLabs/fuels-ts/commit/03b060b51e00034a2814a0c5ed2718d5dc86533b) Thanks [@camsjams](https://github.com/camsjams)! - Added docs and improved examples

- Updated dependencies [[`03b060b`](https://github.com/FuelLabs/fuels-ts/commit/03b060b51e00034a2814a0c5ed2718d5dc86533b)]:
  - @fuel-ts/abi-coder@0.22.2
  - @fuel-ts/address@0.22.2
  - @fuel-ts/constants@0.22.2
  - @fuel-ts/hasher@0.22.2
  - @fuel-ts/hdwallet@0.22.2
  - @fuel-ts/interfaces@0.22.2
  - @fuel-ts/math@0.22.2
  - @fuel-ts/mnemonic@0.22.2
  - @fuel-ts/providers@0.22.2
  - @fuel-ts/signer@0.22.2
  - @fuel-ts/transactions@0.22.2

## 0.22.1

### Patch Changes

- Updated dependencies [[`58d9fa0`](https://github.com/FuelLabs/fuels-ts/commit/58d9fa032a6cb3478bca4a93523b21cc184fbc9e)]:
  - @fuel-ts/abi-coder@0.22.1
  - @fuel-ts/providers@0.22.1
  - @fuel-ts/transactions@0.22.1
  - @fuel-ts/hasher@0.22.1
  - @fuel-ts/signer@0.22.1
  - @fuel-ts/hdwallet@0.22.1
  - @fuel-ts/address@0.22.1
  - @fuel-ts/constants@0.22.1
  - @fuel-ts/interfaces@0.22.1
  - @fuel-ts/math@0.22.1
  - @fuel-ts/mnemonic@0.22.1

## 0.22.0

### Patch Changes

- Updated dependencies [[`563ecc5`](https://github.com/FuelLabs/fuels-ts/commit/563ecc5dcce054619e56ca04c8c9e2514dd40e98), [`aacc9c6`](https://github.com/FuelLabs/fuels-ts/commit/aacc9c669939cc6a0e93d417885f2c1246117504)]:
  - @fuel-ts/providers@0.22.0
  - @fuel-ts/hasher@0.22.0
  - @fuel-ts/signer@0.22.0
  - @fuel-ts/hdwallet@0.22.0
  - @fuel-ts/abi-coder@0.22.0
  - @fuel-ts/address@0.22.0
  - @fuel-ts/constants@0.22.0
  - @fuel-ts/interfaces@0.22.0
  - @fuel-ts/math@0.22.0
  - @fuel-ts/mnemonic@0.22.0
  - @fuel-ts/transactions@0.22.0

## 0.21.2

### Patch Changes

- Updated dependencies [[`b5629ff`](https://github.com/FuelLabs/fuels-ts/commit/b5629ffadf0d705c50095d0ffd10cfd5a4e1da22)]:
  - @fuel-ts/transactions@0.21.2
  - @fuel-ts/hasher@0.21.2
  - @fuel-ts/providers@0.21.2
  - @fuel-ts/signer@0.21.2
  - @fuel-ts/hdwallet@0.21.2
  - @fuel-ts/abi-coder@0.21.2
  - @fuel-ts/address@0.21.2
  - @fuel-ts/constants@0.21.2
  - @fuel-ts/interfaces@0.21.2
  - @fuel-ts/math@0.21.2
  - @fuel-ts/mnemonic@0.21.2

## 0.21.1

### Patch Changes

- Updated dependencies [[`90dc675`](https://github.com/FuelLabs/fuels-ts/commit/90dc6757b6abd25a7fb8220d9e2a5abcbdff6d8d), [`141ecdd`](https://github.com/FuelLabs/fuels-ts/commit/141ecddc198a39e35f2363a13f7498543536bf75)]:
  - @fuel-ts/providers@0.21.1
  - @fuel-ts/transactions@0.21.1
  - @fuel-ts/hasher@0.21.1
  - @fuel-ts/signer@0.21.1
  - @fuel-ts/hdwallet@0.21.1
  - @fuel-ts/abi-coder@0.21.1
  - @fuel-ts/address@0.21.1
  - @fuel-ts/constants@0.21.1
  - @fuel-ts/interfaces@0.21.1
  - @fuel-ts/math@0.21.1
  - @fuel-ts/mnemonic@0.21.1

## 0.21.0

### Minor Changes

- [#583](https://github.com/FuelLabs/fuels-ts/pull/583) [`897888e`](https://github.com/FuelLabs/fuels-ts/commit/897888e08fcc3e6e533429ddd14cd2273e049e15) Thanks [@QuinnLee](https://github.com/QuinnLee)! - add contractIds if missing

### Patch Changes

- [#589](https://github.com/FuelLabs/fuels-ts/pull/589) [`d44de76`](https://github.com/FuelLabs/fuels-ts/commit/d44de76bdde4d566e0bac6e872adc6e6f29f0bee) Thanks [@camsjams](https://github.com/camsjams)! - Use resources for fund

- Updated dependencies [[`d44de76`](https://github.com/FuelLabs/fuels-ts/commit/d44de76bdde4d566e0bac6e872adc6e6f29f0bee), [`eaa3549`](https://github.com/FuelLabs/fuels-ts/commit/eaa35492631f2e37f06b623105068da0de6f331e), [`897888e`](https://github.com/FuelLabs/fuels-ts/commit/897888e08fcc3e6e533429ddd14cd2273e049e15)]:
  - @fuel-ts/providers@0.21.0
  - @fuel-ts/transactions@0.21.0
  - @fuel-ts/hasher@0.21.0
  - @fuel-ts/signer@0.21.0
  - @fuel-ts/hdwallet@0.21.0
  - @fuel-ts/abi-coder@0.21.0
  - @fuel-ts/address@0.21.0
  - @fuel-ts/constants@0.21.0
  - @fuel-ts/interfaces@0.21.0
  - @fuel-ts/math@0.21.0
  - @fuel-ts/mnemonic@0.21.0

## 0.20.0

### Patch Changes

- [#577](https://github.com/FuelLabs/fuels-ts/pull/577) [`5ee7642`](https://github.com/FuelLabs/fuels-ts/commit/5ee76427ae75d95aa4cb8698fdc4aadc90bfe01e) Thanks [@camsjams](https://github.com/camsjams)! - Add message proof helper

- Updated dependencies [[`56c17bc`](https://github.com/FuelLabs/fuels-ts/commit/56c17bcd77676348e401599870348bf0ede18fb3), [`5ee7642`](https://github.com/FuelLabs/fuels-ts/commit/5ee76427ae75d95aa4cb8698fdc4aadc90bfe01e)]:
  - @fuel-ts/providers@0.20.0
  - @fuel-ts/hasher@0.20.0
  - @fuel-ts/signer@0.20.0
  - @fuel-ts/hdwallet@0.20.0
  - @fuel-ts/abi-coder@0.20.0
  - @fuel-ts/address@0.20.0
  - @fuel-ts/constants@0.20.0
  - @fuel-ts/interfaces@0.20.0
  - @fuel-ts/math@0.20.0
  - @fuel-ts/mnemonic@0.20.0
  - @fuel-ts/transactions@0.20.0

## 0.19.0

### Minor Changes

- [#561](https://github.com/FuelLabs/fuels-ts/pull/561) [`0e91213`](https://github.com/FuelLabs/fuels-ts/commit/0e91213e54b39d2de7a358912c85d7c32c5dde6d) Thanks [@luizstacio](https://github.com/luizstacio)! - Split Wallet in public and private wallets and enable contracts to use BasicWallet

- [#564](https://github.com/FuelLabs/fuels-ts/pull/564) [`63aa038`](https://github.com/FuelLabs/fuels-ts/commit/63aa038052d0aac1dc1f66a9852fd55771713be6) Thanks [@pixelcircuits](https://github.com/pixelcircuits)! - Added withdraw function to wallet

- [#549](https://github.com/FuelLabs/fuels-ts/pull/549) [`db8cc6b`](https://github.com/FuelLabs/fuels-ts/commit/db8cc6b49616199368463ecd69aae6b3ca0b65d0) Thanks [@QuinnLee](https://github.com/QuinnLee)! - add output variables to transactions

- [#552](https://github.com/FuelLabs/fuels-ts/pull/552) [`fcacb06`](https://github.com/FuelLabs/fuels-ts/commit/fcacb06a006367381d05c85bb83fa7bf2fa485a5) Thanks [@luizstacio](https://github.com/luizstacio)! - Change sign methods to be async

### Patch Changes

- [#563](https://github.com/FuelLabs/fuels-ts/pull/563) [`2a98c1e`](https://github.com/FuelLabs/fuels-ts/commit/2a98c1e455765fbfe5775bd4d706571705083f3e) Thanks [@luizstacio](https://github.com/luizstacio)! - update fuel version

- Updated dependencies [[`eebb0bd`](https://github.com/FuelLabs/fuels-ts/commit/eebb0bd90c14a39ddfb3498422613125687a088d), [`5a9d07b`](https://github.com/FuelLabs/fuels-ts/commit/5a9d07b4ceaa91b8d9e948e0c4c3c105cd621df0), [`0e91213`](https://github.com/FuelLabs/fuels-ts/commit/0e91213e54b39d2de7a358912c85d7c32c5dde6d), [`63aa038`](https://github.com/FuelLabs/fuels-ts/commit/63aa038052d0aac1dc1f66a9852fd55771713be6), [`ec83b17`](https://github.com/FuelLabs/fuels-ts/commit/ec83b17a1bcb3d1277911471d3515df3643e6280), [`db8cc6b`](https://github.com/FuelLabs/fuels-ts/commit/db8cc6b49616199368463ecd69aae6b3ca0b65d0), [`2a98c1e`](https://github.com/FuelLabs/fuels-ts/commit/2a98c1e455765fbfe5775bd4d706571705083f3e), [`bdfa9d6`](https://github.com/FuelLabs/fuels-ts/commit/bdfa9d6e453a9c47177b19f2811265d740fc4ac4)]:
  - @fuel-ts/transactions@0.19.0
  - @fuel-ts/providers@0.19.0
  - @fuel-ts/math@0.19.0
  - @fuel-ts/abi-coder@0.19.0
  - @fuel-ts/address@0.19.0
  - @fuel-ts/constants@0.19.0
  - @fuel-ts/hasher@0.19.0
  - @fuel-ts/hdwallet@0.19.0
  - @fuel-ts/interfaces@0.19.0
  - @fuel-ts/mnemonic@0.19.0
  - @fuel-ts/signer@0.19.0

## 0.18.0

### Patch Changes

- [#543](https://github.com/FuelLabs/fuels-ts/pull/543) [`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3) Thanks [@arboleya](https://github.com/arboleya)! - Updating all libraries to their latest version

- [#540](https://github.com/FuelLabs/fuels-ts/pull/540) [`1eb0256`](https://github.com/FuelLabs/fuels-ts/commit/1eb02569008292621cd69647bc78044df6ec3103) Thanks [@camsjams](https://github.com/camsjams)! - Updated fuel core version and migrated to new graphql

- [#543](https://github.com/FuelLabs/fuels-ts/pull/543) [`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3) Thanks [@arboleya](https://github.com/arboleya)! - Upgrading outdated dependencies to latest version

- Updated dependencies [[`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3), [`1eb0256`](https://github.com/FuelLabs/fuels-ts/commit/1eb02569008292621cd69647bc78044df6ec3103), [`6b2b812`](https://github.com/FuelLabs/fuels-ts/commit/6b2b812aecfb639c22f3bbd251f2d50f23f9cd0f), [`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3), [`d58f72a`](https://github.com/FuelLabs/fuels-ts/commit/d58f72a08f623fa40ff215b3b567105d9f8d872c)]:
  - @fuel-ts/abi-coder@0.18.0
  - @fuel-ts/hasher@0.18.0
  - @fuel-ts/hdwallet@0.18.0
  - @fuel-ts/math@0.18.0
  - @fuel-ts/mnemonic@0.18.0
  - @fuel-ts/providers@0.18.0
  - @fuel-ts/signer@0.18.0
  - @fuel-ts/transactions@0.18.0
  - @fuel-ts/constants@0.18.0
  - @fuel-ts/interfaces@0.18.0

## 0.17.0

### Minor Changes

- [#517](https://github.com/FuelLabs/fuels-ts/pull/517) [`6403076`](https://github.com/FuelLabs/fuels-ts/commit/6403076bb9fce9055b436596e23713b0e7909d87) Thanks [@QuinnLee](https://github.com/QuinnLee)! - Parse Logs and Log Data

### Patch Changes

- [#515](https://github.com/FuelLabs/fuels-ts/pull/515) [`fa83fcd`](https://github.com/FuelLabs/fuels-ts/commit/fa83fcd0c90ddb95bc397ab2675a5ad759b94f82) Thanks [@camsjams](https://github.com/camsjams)! - Added message support

- Updated dependencies [[`f106a78`](https://github.com/FuelLabs/fuels-ts/commit/f106a78e816045e3bdb6bff0b9bceec871009091), [`fa83fcd`](https://github.com/FuelLabs/fuels-ts/commit/fa83fcd0c90ddb95bc397ab2675a5ad759b94f82), [`658b065`](https://github.com/FuelLabs/fuels-ts/commit/658b06538389a6ad3310a739a1bf60311c1e3343), [`6403076`](https://github.com/FuelLabs/fuels-ts/commit/6403076bb9fce9055b436596e23713b0e7909d87)]:
  - @fuel-ts/math@0.17.0
  - @fuel-ts/providers@0.17.0
  - @fuel-ts/transactions@0.17.0
  - @fuel-ts/abi-coder@0.17.0
  - @fuel-ts/constants@0.17.0
  - @fuel-ts/hasher@0.17.0
  - @fuel-ts/hdwallet@0.17.0
  - @fuel-ts/interfaces@0.17.0
  - @fuel-ts/mnemonic@0.17.0
  - @fuel-ts/signer@0.17.0

## 0.16.0

### Patch Changes

- Updated dependencies [[`27224b9`](https://github.com/FuelLabs/fuels-ts/commit/27224b997a4ec86473fc19868550c788638fa2ce)]:
  - @fuel-ts/transactions@0.16.0
  - @fuel-ts/hasher@0.16.0
  - @fuel-ts/providers@0.16.0
  - @fuel-ts/signer@0.16.0
  - @fuel-ts/hdwallet@0.16.0
  - @fuel-ts/abi-coder@0.16.0
  - @fuel-ts/constants@0.16.0
  - @fuel-ts/interfaces@0.16.0
  - @fuel-ts/math@0.16.0
  - @fuel-ts/mnemonic@0.16.0

## 0.15.0

### Patch Changes

- [#468](https://github.com/FuelLabs/fuels-ts/pull/468) [`7ad3d79`](https://github.com/FuelLabs/fuels-ts/commit/7ad3d79bf7a1db766912a7b3d52e4fa2e550af56) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - Refactor to use bn.js instead of bigint.

- Updated dependencies [[`5828934`](https://github.com/FuelLabs/fuels-ts/commit/5828934ccd96cec82fc0cece0f207dafaee5b89a), [`63583aa`](https://github.com/FuelLabs/fuels-ts/commit/63583aa6e8b5b5417bdc0c0ae3bc15eec7735e43), [`7ad3d79`](https://github.com/FuelLabs/fuels-ts/commit/7ad3d79bf7a1db766912a7b3d52e4fa2e550af56), [`f3c7273`](https://github.com/FuelLabs/fuels-ts/commit/f3c7273d946979e628b178ba808b8fc1598105bb), [`9d0ad53`](https://github.com/FuelLabs/fuels-ts/commit/9d0ad5392b2dae83b13041999435c08e07e935a3)]:
  - @fuel-ts/interfaces@0.15.0
  - @fuel-ts/abi-coder@0.15.0
  - @fuel-ts/providers@0.15.0
  - @fuel-ts/constants@0.15.0
  - @fuel-ts/hasher@0.15.0
  - @fuel-ts/hdwallet@0.15.0
  - @fuel-ts/math@0.15.0
  - @fuel-ts/signer@0.15.0
  - @fuel-ts/transactions@0.15.0
  - @fuel-ts/mnemonic@0.15.0

## 0.14.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.14.0
  - @fuel-ts/constants@0.14.0
  - @fuel-ts/hasher@0.14.0
  - @fuel-ts/hdwallet@0.14.0
  - @fuel-ts/interfaces@0.14.0
  - @fuel-ts/math@0.14.0
  - @fuel-ts/mnemonic@0.14.0
  - @fuel-ts/providers@0.14.0
  - @fuel-ts/signer@0.14.0
  - @fuel-ts/transactions@0.14.0

## 0.13.0

### Minor Changes

- [#458](https://github.com/FuelLabs/fuels-ts/pull/458) [`9190cee`](https://github.com/FuelLabs/fuels-ts/commit/9190cee45529b6c3fcffb2a12b1ef6319b2b39df) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - Upgrade compatibility to fuel-core v0.10.1

* [#472](https://github.com/FuelLabs/fuels-ts/pull/472) [`5d4d6ce`](https://github.com/FuelLabs/fuels-ts/commit/5d4d6ce7fa1a23deae3f41be94c9fe2ee9851772) Thanks [@QuinnLee](https://github.com/QuinnLee)! - Add `excludeId` to getCoinsToSpend

### Patch Changes

- Updated dependencies [[`745e65b`](https://github.com/FuelLabs/fuels-ts/commit/745e65bc563ab8cace6f73e2715a6eaaae93fda5), [`9190cee`](https://github.com/FuelLabs/fuels-ts/commit/9190cee45529b6c3fcffb2a12b1ef6319b2b39df), [`5d4d6ce`](https://github.com/FuelLabs/fuels-ts/commit/5d4d6ce7fa1a23deae3f41be94c9fe2ee9851772), [`dfb2612`](https://github.com/FuelLabs/fuels-ts/commit/dfb261222c17cf6f158f475d91b3414996300066)]:
  - @fuel-ts/abi-coder@0.13.0
  - @fuel-ts/providers@0.13.0
  - @fuel-ts/transactions@0.13.0
  - @fuel-ts/hasher@0.13.0
  - @fuel-ts/signer@0.13.0
  - @fuel-ts/hdwallet@0.13.0
  - @fuel-ts/constants@0.13.0
  - @fuel-ts/interfaces@0.13.0
  - @fuel-ts/math@0.13.0
  - @fuel-ts/mnemonic@0.13.0

## 0.12.0

### Minor Changes

- [#441](https://github.com/FuelLabs/fuels-ts/pull/441) [`f3dcd27`](https://github.com/FuelLabs/fuels-ts/commit/f3dcd272dc5a237c6a8ce235a542ad804039f13b) Thanks [@camsjams](https://github.com/camsjams)! - Added support for Bech32 Address format

### Patch Changes

- Updated dependencies [[`f3dcd27`](https://github.com/FuelLabs/fuels-ts/commit/f3dcd272dc5a237c6a8ce235a542ad804039f13b)]:
  - @fuel-ts/abi-coder@0.12.0
  - @fuel-ts/interfaces@0.12.0
  - @fuel-ts/providers@0.12.0
  - @fuel-ts/signer@0.12.0
  - @fuel-ts/transactions@0.12.0
  - @fuel-ts/hasher@0.12.0
  - @fuel-ts/hdwallet@0.12.0
  - @fuel-ts/constants@0.12.0
  - @fuel-ts/math@0.12.0
  - @fuel-ts/mnemonic@0.12.0

## 0.11.0

### Patch Changes

- [#437](https://github.com/FuelLabs/fuels-ts/pull/437) [`b2f1c66`](https://github.com/FuelLabs/fuels-ts/commit/b2f1c665b8d75f635edb4b75691abc9ebf6850b5) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - - Fixed linking packages to inside `node_modules` folder
  - Remove old Lerna config
- Updated dependencies [[`b2f1c66`](https://github.com/FuelLabs/fuels-ts/commit/b2f1c665b8d75f635edb4b75691abc9ebf6850b5)]:
  - @fuel-ts/constants@0.11.0
  - @fuel-ts/hasher@0.11.0
  - @fuel-ts/hdwallet@0.11.0
  - @fuel-ts/interfaces@0.11.0
  - @fuel-ts/math@0.11.0
  - @fuel-ts/mnemonic@0.11.0
  - @fuel-ts/providers@0.11.0
  - @fuel-ts/signer@0.11.0
  - @fuel-ts/transactions@0.11.0

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
