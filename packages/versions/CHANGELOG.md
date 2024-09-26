# @fuel-ts/versions

## 0.94.7

### Patch Changes

- 47b5cd3: chore: upgrade to forc `0.63.6`
- 431990d: chore: inform users if their `fuels` version is outdated
- 20d2ac2: chore: upgraded to fuel-core 0.36.0
- 80df900: chore: fix exported types
- 127ade0: chore: upgrade `forc@0.64.0`

## 0.94.6

## 0.94.5

### Patch Changes

- 942b56b: chore: upgrading `forc` to `0.63.5`
- cffa075: chore: upgrading `forc` to `0.63.4`

## 0.94.4

### Patch Changes

- b00fd02: chore: upgrade `fuel-core@0.35.0`

## 0.94.3

### Patch Changes

- b67ded2: chore: upgraded forc to `0.63.3`

## 0.94.2

### Patch Changes

- ccd94fc: chore: upgrade `fuel-core@0.34.0`

## 0.94.1

## 0.94.0

### Minor Changes

- 4c653d0: feat!: adding `abi` transpiler
- 03ac550: feat!: `fuel-core@0.32.1` and large contract deployments

### Patch Changes

- 9309598: chore: upgrade `fuel-core@0.33.0`
- 29c556d: fix: typegen reporting the correct versions

## 0.93.0

### Patch Changes

- 99794e4: chore: upgrading `forc` to `0.62.0`

## 0.92.1

## 0.92.0

### Patch Changes

- 638eae3: build(deps-dev): bump the dev-deps group with 29 updates
- 4a3c184: chore: upgrading `fuel-core` to `0.31.0`
- 44d51ee: chore: upgrading `forc` to `0.61.2`

## 0.91.0

### Patch Changes

- a9ece17: build: add support for latest node versions
- 8676a9e: chore: support `forc@0.61.1`

## 0.90.0

### Patch Changes

- e165e37: chore!: upgrade fuel core to `0.28.0`
- 81a77d3: chore: upgrading `fuel-core` to `0.29.0`
- af3202c: feat: support for `bun`
- 90e8cba: chore: upgrading `fuel-core` to `0.30.0`

## 0.89.2

## 0.89.1

### Patch Changes

- eb6460b: chore: upgrade to fuel core `0.27.0`

## 0.89.0

### Patch Changes

- 67afa32: chore!: remove built-in binaries for `forc` and `fuel-core`
- a96c1fe: chore: upgrade forc 0.60.0

## 0.88.1

## 0.88.0

## 0.87.0

## 0.86.0

### Patch Changes

- 64e9659: feat!: upgrade `forc@0.58.0` and remove `V0` encoding

## 0.85.0

## 0.84.0

### Minor Changes

- 2990edb: chore!: upgrade `fuel-core` to `0.26.0`

## 0.83.0

### Minor Changes

- 29f46ef: chore!: upgrade `forc` to `0.56.0`
- 9c3c094: chore!: upgrade `fuel-core` to `0.24.3`

### Patch Changes

- 0d75266: chore!: upgrading `forc` to `0.55.0`

## 0.82.0

## 0.81.0

### Minor Changes

- 1d92ce7: fix: runtime errors for ESM distributions

## 0.80.0

## 0.79.0

### Minor Changes

- dc1b0925: chore!: reset base `forc` version to `0.49.3` except for experimental builds

## 0.78.0

### Patch Changes

- 9df48991: fix: command `fuels version` not working

## 0.77.0

### Patch Changes

- Warn when running against unofficial `fuel-core` (e.g. nightly builds), by [@nedsalk](https://github.com/nedsalk) (See [#1855](https://github.com/FuelLabs/fuels-ts/pull/1855))

## 0.76.0

### Minor Changes

- Updated `forc` to verson `0.51.1`, by [@nedsalk](https://github.com/nedsalk) (See [#1804](https://github.com/FuelLabs/fuels-ts/pull/1804))

## 0.75.0

### Patch Changes

- Use interal utilities for arrayify, hexlify, concat and BytesLike, by [@danielbate](https://github.com/danielbate) (See [#1775](https://github.com/FuelLabs/fuels-ts/pull/1775))

## 0.74.0

### Minor Changes

- - Updated to support`forc v0.50.0`
  - `getForcProject` now supports both `debug` and `release` builds, by [@nedsalk](https://github.com/nedsalk) (See [#1744](https://github.com/FuelLabs/fuels-ts/pull/1744))

### Patch Changes

- Upgrading `fuel-core` to `0.22.1`, by [@arboleya](https://github.com/arboleya) (See [#1756](https://github.com/FuelLabs/fuels-ts/pull/1756))

## 0.73.0

### Patch Changes

- Upgrading `forc` to `0.49.2`, by [@arboleya](https://github.com/arboleya) (See [#1707](https://github.com/FuelLabs/fuels-ts/pull/1707))

## 0.72.0

### Patch Changes

- Downgrading forc back to `0.48.1`, by [@arboleya](https://github.com/arboleya) (See [#1680](https://github.com/FuelLabs/fuels-ts/pull/1680))

## 0.71.1

## 0.71.0

### Minor Changes

- Encode and decode u8 and bool as small bytes and right aligned under various conditions, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))
- Add `pnpm create fuels` CLI tool, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))
- Upgrading `fuel-core` to `0.22`, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))
- add support for TX policies, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))

## 0.70.1

## 0.70.0

### Minor Changes

- Encode and decode u8 and bool as small bytes and right aligned under various conditions, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1437](https://github.com/FuelLabs/fuels-ts/pull/1437))
- Add `pnpm create fuels` CLI tool, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1565](https://github.com/FuelLabs/fuels-ts/pull/1565))
- Upgrading `fuel-core` to `0.22`, by [@arboleya](https://github.com/arboleya) (See [#1511](https://github.com/FuelLabs/fuels-ts/pull/1511))
- add support for TX policies, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1437](https://github.com/FuelLabs/fuels-ts/pull/1437))

## 0.69.1

## 0.69.0

## 0.68.0

## 0.67.0

## 0.66.1

### Patch Changes

- Adjusting package manager configs, by [@arboleya](https://github.com/arboleya) (See [#1415](https://github.com/FuelLabs/fuels-ts/pull/1415))

## 0.66.0

## 0.65.0

### Patch Changes

- Upgrading `fuel-core` to `0.20.8`, by [@arboleya](https://github.com/arboleya) (See [#1376](https://github.com/FuelLabs/fuels-ts/pull/1376))

## 0.64.1

## 0.64.0

## 0.63.0

### Minor Changes

- upgrade fuel-core to 0.20.7, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1357](https://github.com/FuelLabs/fuels-ts/pull/1357))

## 0.62.0

## 0.61.0

### Patch Changes

- Upgrading `fuel-core` to `0.20.6`, by [@arboleya](https://github.com/arboleya) (See [#1327](https://github.com/FuelLabs/fuels-ts/pull/1327))

## 0.60.0

## 0.59.0

### Minor Changes

- Updated fuel-core to 0.20.5, by [@camsjams](https://github.com/camsjams) (See [#1284](https://github.com/FuelLabs/fuels-ts/pull/1284))

## 0.58.0

## 0.57.0

## 0.56.1

## 0.56.0

## 0.55.0

## 0.54.1

## 0.54.0

## 0.53.0

### Minor Changes

- upgrade fuel-core from 0.20.3 to 0.20.4, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1212](https://github.com/FuelLabs/fuels-ts/pull/1212))

## 0.52.0

## 0.51.0

### Minor Changes

- upgrade fuel-core to 0.20.3, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1112](https://github.com/FuelLabs/fuels-ts/pull/1112))

## 0.50.0

## 0.49.1

## 0.49.0

## 0.48.2

## 0.48.1

## 0.48.0

## 0.47.0

## 0.46.0

### Minor Changes

- Update fuel core version to 0.19.0, by [@danielbate](https://github.com/danielbate) (See [#1085](https://github.com/FuelLabs/fuels-ts/pull/1085))

### Patch Changes

- Reshaping `forc-bin` package for publishing, by [@arboleya](https://github.com/arboleya) (See [#1073](https://github.com/FuelLabs/fuels-ts/pull/1073))
- Removing `publishConfigs`, using `.dts` files with declaration maps (`.dts.map`), by [@arboleya](https://github.com/arboleya) (See [#1055](https://github.com/FuelLabs/fuels-ts/pull/1055))
- 🐞 Fix decode message for fuel-core 0.18.3, by [@luizstacio](https://github.com/luizstacio) (See [#1090](https://github.com/FuelLabs/fuels-ts/pull/1090))

## 0.45.0

### Minor Changes

- Upgrade to fuel-core 0.18.1 and forc 0.40.1, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#986](https://github.com/FuelLabs/fuels-ts/pull/986))

## 0.44.2

### Patch Changes

- Proxing bin entries to fix locally broken symlinks and re-shaping example contract into Typegen demo app, by [@arboleya](https://github.com/arboleya) (See [#1037](https://github.com/FuelLabs/fuels-ts/pull/1037))

## 0.44.1

### Patch Changes

- 🐞 Fixing type's configs for multi-entry packages, by [@arboleya](https://github.com/arboleya) (See [#1035](https://github.com/FuelLabs/fuels-ts/pull/1035))

## 0.44.0

### Minor Changes

- Revamping all packages configs, enabling local installation, by [@arboleya](https://github.com/arboleya) (See [#984](https://github.com/FuelLabs/fuels-ts/pull/984))

## 0.43.1

## 0.43.0

## 0.42.0

### Patch Changes

- [#977](https://github.com/FuelLabs/fuels-ts/pull/977) [`3d1492a1`](https://github.com/FuelLabs/fuels-ts/commit/3d1492a13dee9e19aa1844098fa144680810abc2) Thanks [@arboleya](https://github.com/arboleya)! - Streamlining local docker integration

## 0.41.0

## 0.40.0

## 0.39.1

## 0.39.0

## 0.38.1

## 0.38.0

### Minor Changes

- [#811](https://github.com/FuelLabs/fuels-ts/pull/811) [`653c8391`](https://github.com/FuelLabs/fuels-ts/commit/653c8391ece33a8f31598ea137452dd601dc7468) Thanks [@Torres-ssf](https://github.com/Torres-ssf)! - switch docs engine from jekyll to vitepress

## 0.37.1

### Patch Changes

- [#850](https://github.com/FuelLabs/fuels-ts/pull/850) [`0fedaa2b`](https://github.com/FuelLabs/fuels-ts/commit/0fedaa2bccfc3d4858d7e89aef929bc1d91bca8c) Thanks [@arboleya](https://github.com/arboleya)! - Refactoring `versions` packages so that it can be used locally, providing accurate versions for all relevant parts of the stack

## 0.37.0

### Minor Changes

- [#852](https://github.com/FuelLabs/fuels-ts/pull/852) [`deeb2d9c`](https://github.com/FuelLabs/fuels-ts/commit/deeb2d9ca304e43e36ef0db5e7b46c14f2f4e8f3) Thanks [@arboleya](https://github.com/arboleya)! - Adding multi-type resolution support [also] for legacy projects

## 0.36.0

## 0.35.0

### Patch Changes

- [#819](https://github.com/FuelLabs/fuels-ts/pull/819) [`f4e1028a`](https://github.com/FuelLabs/fuels-ts/commit/f4e1028acd5a583d12662dd07ca0d17084a35be2) Thanks [@arboleya](https://github.com/arboleya)! - Adjusting export fields for all packages

## 0.34.1

## 0.34.0

## 0.33.0

## 0.32.0

## 0.31.0

## 0.30.0

## 0.29.1

## 0.29.0

## 0.28.1

## 0.28.0

## 0.27.0

### Patch Changes

- [#658](https://github.com/FuelLabs/fuels-ts/pull/658) [`d0eb1c7`](https://github.com/FuelLabs/fuels-ts/commit/d0eb1c732f63842b8d4801456054ec3b9ccdd020) Thanks [@arboleya](https://github.com/arboleya)! - Upgrading forc to `0.32.2` and fuel-core to `0.15.1`

- [#688](https://github.com/FuelLabs/fuels-ts/pull/688) [`450bbcd`](https://github.com/FuelLabs/fuels-ts/commit/450bbcd496177a2beafb969e97e48366cf7d35e1) Thanks [@arboleya](https://github.com/arboleya)! - Refactoring and fixing broken tests

## 0.26.0

### Patch Changes

- [#668](https://github.com/FuelLabs/fuels-ts/pull/668) [`090d0bf`](https://github.com/FuelLabs/fuels-ts/commit/090d0bff2128595d3549b49bb8af3d79424e36a2) Thanks [@arboleya](https://github.com/arboleya)! - Adding node shebang to packages bin

- [#673](https://github.com/FuelLabs/fuels-ts/pull/673) [`1402861`](https://github.com/FuelLabs/fuels-ts/commit/14028619b10cac84806c4cdbaabe9c8481ae0dd5) Thanks [@arboleya](https://github.com/arboleya)! - Updating conflicting configs, fixing tests runner

## 0.25.1

### Patch Changes

- [#661](https://github.com/FuelLabs/fuels-ts/pull/661) [`9bf1d41`](https://github.com/FuelLabs/fuels-ts/commit/9bf1d4177811cb9d300849321acd9b5101128047) Thanks [@arboleya](https://github.com/arboleya)! - fixing support for packages with multi `bin` entry-points

## 0.25.0

## 0.24.2

## 0.24.1

### Patch Changes

- [#652](https://github.com/FuelLabs/fuels-ts/pull/652) [`8babcf0`](https://github.com/FuelLabs/fuels-ts/commit/8babcf02eca3fbec612d05f7a6d41dc6f340d58a) Thanks [@arboleya](https://github.com/arboleya)! - ensuring browser compatibility for the `versions` package

## 0.24.0

### Minor Changes

- [#616](https://github.com/FuelLabs/fuels-ts/pull/616) [`02ac98e`](https://github.com/FuelLabs/fuels-ts/commit/02ac98ea865e0464b132dc3f6bd21f7e1a57435a) Thanks [@arboleya](https://github.com/arboleya)! - Adding new `versions` package for exposing and managing compatibility versions of Fuel toolchain components

## 0.24.0

### Minor Changes

- [#616](https://github.com/FuelLabs/fuels-ts/pull/616) [`02ac98e`](https://github.com/FuelLabs/fuels-ts/commit/02ac98ea865e0464b132dc3f6bd21f7e1a57435a) Thanks [@arboleya](https://github.com/arboleya)! - Adding new `versions` package for exposing and managing compatibility versions of Fuel toolchain components
