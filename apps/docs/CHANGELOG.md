# @fuel-ts/docs

## 0.43.11

## 0.43.10

## 0.43.9

## 0.43.8

## 0.43.7

## 0.43.6

## 0.43.5

### Patch Changes

- Add typegen support and docs for new types, by [@camsjams](https://github.com/camsjams) (See [#1342](https://github.com/FuelLabs/fuels-ts/pull/1342))

## 0.43.4

## 0.43.3

## 0.43.2

## 0.43.1

## 0.43.0

### Minor Changes

- `chainInfo` is now fetched and cached on all `Provider`s when they are initialized. With this release, you now need to initialize a `Provider` like so:
  ```ts
  const provider = await Provider.create(url);
  ```
  For the full list of breaking-changes, please see [this PR](https://github.com/FuelLabs/fuels-ts/pull/1181), by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1181](https://github.com/FuelLabs/fuels-ts/pull/1181))
- Remove `chainId` from the `Predicate` constructor. You don't need to pass in `chainId` anymore since you are passing in a `provider` already, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1181](https://github.com/FuelLabs/fuels-ts/pull/1181))
- using FuelError across all packages, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1230](https://github.com/FuelLabs/fuels-ts/pull/1230))

## 0.42.9

## 0.42.8

## 0.42.7

## 0.42.6

### Patch Changes

- refactor doc links, by [@sarahschwartz](https://github.com/sarahschwartz) (See [#1231](https://github.com/FuelLabs/fuels-ts/pull/1231))

## 0.42.5

## 0.42.4

## 0.42.3

## 0.42.2

## 0.42.1

## 0.42.0

### Minor Changes

- use simulate instead of get on BaseInvocationScope class, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1179](https://github.com/FuelLabs/fuels-ts/pull/1179))

### Patch Changes

- add docs CI, match docs nav names to files, by [@sarahschwartz](https://github.com/sarahschwartz) (See [#1177](https://github.com/FuelLabs/fuels-ts/pull/1177))

## 0.41.6

## 0.41.5

## 0.41.4

### Patch Changes

- Deprecate tx funding call option as all txs require a spendable input, by [@danielbate](https://github.com/danielbate) (See [#1136](https://github.com/FuelLabs/fuels-ts/pull/1136))

## 0.41.3

## 0.41.2

## 0.41.1

## 0.41.0

### Minor Changes

- Update fuel core version to 0.19.0, by [@danielbate](https://github.com/danielbate) (See [#1085](https://github.com/FuelLabs/fuels-ts/pull/1085))
- Improve usability of `ScriptTransactionRequest` and document, by [@danielbate](https://github.com/danielbate) (See [#1072](https://github.com/FuelLabs/fuels-ts/pull/1072))

## 0.40.0

### Minor Changes

- Upgrade to fuel-core 0.18.1 and forc 0.40.1, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#986](https://github.com/FuelLabs/fuels-ts/pull/986))

## 0.39.2

### Patch Changes

- Proxing bin entries to fix locally broken symlinks and re-shaping example contract into Typegen demo app, by [@arboleya](https://github.com/arboleya) (See [#1037](https://github.com/FuelLabs/fuels-ts/pull/1037))

## 0.39.1

### Patch Changes

- [#977](https://github.com/FuelLabs/fuels-ts/pull/977) [`3d1492a1`](https://github.com/FuelLabs/fuels-ts/commit/3d1492a13dee9e19aa1844098fa144680810abc2) Thanks [@arboleya](https://github.com/arboleya)! - Streamlining local docker integration

## 0.39.0

### Minor Changes

- [#953](https://github.com/FuelLabs/fuels-ts/pull/953) [`8332026a`](https://github.com/FuelLabs/fuels-ts/commit/8332026aef44dcf17ace31dfb08a3114612a2ae5) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - You can now query for a list of blocks using the `getBlocks` method on the `Provider` class.

- [#954](https://github.com/FuelLabs/fuels-ts/pull/954) [`bf6214cc`](https://github.com/FuelLabs/fuels-ts/commit/bf6214cc2c4be227974e7d64360c01c9875c772c) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - The `addMissingVariable` helper has been renamed to `estimateTxDependencies`, and some documentation around it has been added.

### Patch Changes

- [#931](https://github.com/FuelLabs/fuels-ts/pull/931) [`0ff4eeab`](https://github.com/FuelLabs/fuels-ts/commit/0ff4eeab67b4c6b6b224230193ab742a3103fa1e) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - The second param timeParameters in the produceBlocks helper was required until now. This is now an optional param, in line with the GQL API and the Rust SDK.

## 0.38.1

## 0.38.0

### Minor Changes

- [#811](https://github.com/FuelLabs/fuels-ts/pull/811) [`653c8391`](https://github.com/FuelLabs/fuels-ts/commit/653c8391ece33a8f31598ea137452dd601dc7468) Thanks [@Torres-ssf](https://github.com/Torres-ssf)! - switch docs engine from jekyll to vitepress

- [#873](https://github.com/FuelLabs/fuels-ts/pull/873) [`0456e3f8`](https://github.com/FuelLabs/fuels-ts/commit/0456e3f8e687835d0036b024973603260f45dc81) Thanks [@Torres-ssf](https://github.com/Torres-ssf)! - fix docs workspace version

## 0.38.0

### Minor Changes

- [#811](https://github.com/FuelLabs/fuels-ts/pull/811) [`653c8391`](https://github.com/FuelLabs/fuels-ts/commit/653c8391ece33a8f31598ea137452dd601dc7468) Thanks [@Torres-ssf](https://github.com/Torres-ssf)! - switch docs engine from jekyll to vitepress

- [#873](https://github.com/FuelLabs/fuels-ts/pull/873) [`0456e3f8`](https://github.com/FuelLabs/fuels-ts/commit/0456e3f8e687835d0036b024973603260f45dc81) Thanks [@Torres-ssf](https://github.com/Torres-ssf)! - fix docs workspace version
