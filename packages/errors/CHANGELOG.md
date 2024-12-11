# @fuel-ts/errors

## 0.97.1

### Patch Changes

- 27e8808: chore: deprecate bech32 addresses
- Updated dependencies [165c49c]
  - @fuel-ts/versions@0.97.1

## 0.97.0

### Patch Changes

- 9dba357: chore: upgrading `fuel-core` to `0.40.0`
- Updated dependencies [9dba357]
- Updated dependencies [4e057d5]
- Updated dependencies [7c162de]
  - @fuel-ts/versions@0.97.0

## 0.96.1

### Patch Changes

- Updated dependencies [eb3b6c9]
  - @fuel-ts/versions@0.96.1

## 0.96.0

### Patch Changes

- @fuel-ts/versions@0.96.0

## 0.95.0

### Patch Changes

- Updated dependencies [d4e839f]
- Updated dependencies [95a9650]
- Updated dependencies [735bb1c]
  - @fuel-ts/versions@0.95.0

## 0.94.9

### Patch Changes

- Updated dependencies [c2f0599]
  - @fuel-ts/versions@0.94.9

## 0.94.8

### Patch Changes

- @fuel-ts/versions@0.94.8

## 0.94.7

### Patch Changes

- 80df900: chore: fix exported types
- Updated dependencies [47b5cd3]
- Updated dependencies [431990d]
- Updated dependencies [20d2ac2]
- Updated dependencies [80df900]
- Updated dependencies [127ade0]
  - @fuel-ts/versions@0.94.7

## 0.94.6

### Patch Changes

- aef7282: feat: `provider.url` now returns auth url
  - @fuel-ts/versions@0.94.6

## 0.94.5

### Patch Changes

- Updated dependencies [942b56b]
- Updated dependencies [cffa075]
  - @fuel-ts/versions@0.94.5

## 0.94.4

### Patch Changes

- a059ea1: feat: map 'not enough coins' error
- 482bbf0: chore: removed redundant crypto functionality
- Updated dependencies [b00fd02]
  - @fuel-ts/versions@0.94.4

## 0.94.3

### Patch Changes

- Updated dependencies [b67ded2]
  - @fuel-ts/versions@0.94.3

## 0.94.2

### Patch Changes

- Updated dependencies [ccd94fc]
  - @fuel-ts/versions@0.94.2

## 0.94.1

### Patch Changes

- @fuel-ts/versions@0.94.1

## 0.94.0

### Minor Changes

- 03ac550: feat!: `fuel-core@0.32.1` and large contract deployments

### Patch Changes

- 0110fd8: chore: handle exceeding maximum inputs when funding a transaction
- 1d2abd7: chore: add validation for TX max outputs exceeded
- Updated dependencies [9309598]
- Updated dependencies [29c556d]
- Updated dependencies [4c653d0]
- Updated dependencies [03ac550]
  - @fuel-ts/versions@0.94.0

## 0.93.0

### Minor Changes

- f3453b9: feat!: deploy contract validation

### Patch Changes

- Updated dependencies [99794e4]
  - @fuel-ts/versions@0.93.0

## 0.92.1

### Patch Changes

- @fuel-ts/versions@0.92.1

## 0.92.0

### Patch Changes

- Updated dependencies [638eae3]
- Updated dependencies [4a3c184]
- Updated dependencies [44d51ee]
  - @fuel-ts/versions@0.92.0

## 0.91.0

### Patch Changes

- a9ece17: build: add support for latest node versions
- eec0806: chore: add `UNKNOWN` error code
- dddde62: docs: merge error related pages
- Updated dependencies [a9ece17]
- Updated dependencies [8676a9e]
  - @fuel-ts/versions@0.91.0

## 0.90.0

### Patch Changes

- Updated dependencies [e165e37]
- Updated dependencies [81a77d3]
- Updated dependencies [af3202c]
- Updated dependencies [90e8cba]
  - @fuel-ts/versions@0.90.0

## 0.89.2

### Patch Changes

- @fuel-ts/versions@0.89.2

## 0.89.1

### Patch Changes

- Updated dependencies [eb6460b]
  - @fuel-ts/versions@0.89.1

## 0.89.0

### Patch Changes

- Updated dependencies [67afa32]
- Updated dependencies [a96c1fe]
  - @fuel-ts/versions@0.89.0

## 0.88.1

### Patch Changes

- @fuel-ts/versions@0.88.1

## 0.88.0

### Patch Changes

- @fuel-ts/versions@0.88.0

## 0.87.0

### Patch Changes

- @fuel-ts/versions@0.87.0

## 0.86.0

### Patch Changes

- 316c757: fix: internalize `ethers` functionality and remove dependency
- Updated dependencies [64e9659]
  - @fuel-ts/versions@0.86.0

## 0.85.0

### Patch Changes

- f7eacb4: chore: warn on fuel client version incompatibility
  - @fuel-ts/versions@0.85.0

## 0.84.0

### Patch Changes

- Updated dependencies [2990edb]
  - @fuel-ts/versions@0.84.0

## 0.83.0

### Minor Changes

- 9c3c094: chore!: upgrade `fuel-core` to `0.24.3`

### Patch Changes

- Updated dependencies [29f46ef]
- Updated dependencies [9c3c094]
- Updated dependencies [0d75266]
  - @fuel-ts/versions@0.83.0

## 0.82.0

### Patch Changes

- @fuel-ts/versions@0.82.0

## 0.81.0

### Patch Changes

- 37743e8: chore: add initial `depcheck` using knip
- Updated dependencies [1d92ce7]
  - @fuel-ts/versions@0.81.0

## 0.80.0

### Minor Changes

- 29d5303: chore: remove redundant error codes

### Patch Changes

- @fuel-ts/versions@0.80.0

## 0.79.0

### Patch Changes

- Updated dependencies [dc1b0925]
  - @fuel-ts/versions@0.79.0

## 0.78.0

### Patch Changes

- Updated dependencies [9df48991]
  - @fuel-ts/versions@0.78.0

## 0.77.0

### Patch Changes

- Add try/catch block when parsing GraphQL stream data response, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1839](https://github.com/FuelLabs/fuels-ts/pull/1839))
- Migrate implementations of `sha256`, `keccak` and `scrypt` to `@noble/hashes`, by [@danielbate](https://github.com/danielbate) (See [#1786](https://github.com/FuelLabs/fuels-ts/pull/1786))
- 🐞 fix: disallow transferring <= 0 amounts, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1827](https://github.com/FuelLabs/fuels-ts/pull/1827))
- - Handling `SqueezedOut` status update when calling `submitAndAwait` subscription at `Provider.sendTransaction`
  - Handling `SqueezedOut` status update when calling statusChange subscrition at `TransactionResponse.waitForResult`, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1829](https://github.com/FuelLabs/fuels-ts/pull/1829))

## 0.76.0

## 0.75.0

### Minor Changes

- Introduce the v1 encoding scheme and use correct file naming conventions for `@fuel-ts/abi-coder`, by [@danielbate](https://github.com/danielbate) (See [#1780](https://github.com/FuelLabs/fuels-ts/pull/1780))

### Patch Changes

- exports InvocationCallResult, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1765](https://github.com/FuelLabs/fuels-ts/pull/1765))
- Use interal utilities for arrayify, hexlify, concat and BytesLike, by [@danielbate](https://github.com/danielbate) (See [#1775](https://github.com/FuelLabs/fuels-ts/pull/1775))

## 0.74.0

### Minor Changes

- restructure Account related packages, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1675](https://github.com/FuelLabs/fuels-ts/pull/1675))

## 0.73.0

## 0.72.0

### Patch Changes

- Implemented GraphQL subscriptions, by [@arboleya](https://github.com/arboleya) (See [#1495](https://github.com/FuelLabs/fuels-ts/pull/1495))

## 0.71.1

## 0.71.0

### Minor Changes

- Add `pnpm create fuels` CLI tool, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))
- add support for TX policies, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))

## 0.70.1

## 0.70.0

### Minor Changes

- Add `pnpm create fuels` CLI tool, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1565](https://github.com/FuelLabs/fuels-ts/pull/1565))
- add support for TX policies, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1437](https://github.com/FuelLabs/fuels-ts/pull/1437))

## 0.69.1

## 0.69.0

## 0.68.0

### Patch Changes

- Improves inputs validation and adds pretty error messages, by [@arboleya](https://github.com/arboleya) (See [#1433](https://github.com/FuelLabs/fuels-ts/pull/1433))
- Remove hexlify logic on values that are not hex, by [@camsjams](https://github.com/camsjams) (See [#1454](https://github.com/FuelLabs/fuels-ts/pull/1454))

## 0.67.0

## 0.66.1

### Patch Changes

- Adjusting package manager configs, by [@arboleya](https://github.com/arboleya) (See [#1415](https://github.com/FuelLabs/fuels-ts/pull/1415))

## 0.66.0

## 0.65.0

## 0.64.1

## 0.64.0

## 0.63.0

## 0.62.0

### Minor Changes

- Reverted GraphQL subscriptions, thus removing `Provider.operations.statusChange`, by [@nedsalk](https://github.com/nedsalk) (See [#1333](https://github.com/FuelLabs/fuels-ts/pull/1333))

## 0.61.0

### Minor Changes

- Check mismatch of fuel client version and supported version: throw on major/minor mismatch, warn on patch mismatch, by [@nedsalk](https://github.com/nedsalk) (See [#1287](https://github.com/FuelLabs/fuels-ts/pull/1287))
- Improve developer experience of `fromEvmAddress` address helper function, by [@danielbate](https://github.com/danielbate) (See [#1309](https://github.com/FuelLabs/fuels-ts/pull/1309))

## 0.60.0

### Minor Changes

- purging constant MAX_GAS_PER_TX, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1272](https://github.com/FuelLabs/fuels-ts/pull/1272))

## 0.59.0

### Minor Changes

- using `FuelError` instead of `@ethersproject/logger`, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1278](https://github.com/FuelLabs/fuels-ts/pull/1278))

## 0.58.0

### Minor Changes

- Remove `chainId` from the `Predicate` constructor. You don't need to pass in `chainId` anymore since you are passing in a `provider` already, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1181](https://github.com/FuelLabs/fuels-ts/pull/1181))
- using FuelError across all packages, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1230](https://github.com/FuelLabs/fuels-ts/pull/1230))

## 0.57.0

## 0.56.1

### Patch Changes

- Simplyfing errors package and its test utility, by [@arboleya](https://github.com/arboleya) (See [#1228](https://github.com/FuelLabs/fuels-ts/pull/1228))

## 0.56.0

### Minor Changes

- forbid multicall for more than one function that returns heap types, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1217](https://github.com/FuelLabs/fuels-ts/pull/1217))

## 0.55.0

## 0.54.1

## 0.54.0

## 0.53.0
