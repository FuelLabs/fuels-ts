# Change Log

## 0.50.0

### Minor Changes

- improve transaction response, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1108](https://github.com/FuelLabs/fuels-ts/pull/1108))

## 0.49.1

## 0.49.0

### Minor Changes

- rename package keystore to crypto, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1140](https://github.com/FuelLabs/fuels-ts/pull/1140))

### Patch Changes

- 🐞 Fix predicate check on estimateTxDependencies, by [@luizstacio](https://github.com/luizstacio) (See [#1142](https://github.com/FuelLabs/fuels-ts/pull/1142))

## 0.48.2

### Patch Changes

- 🐞 Fix predicate estimation for inputs with predicate field, by [@luizstacio](https://github.com/luizstacio) (See [#1130](https://github.com/FuelLabs/fuels-ts/pull/1130))

## 0.48.1

## 0.48.0

### Minor Changes

- 🐞 Fix incorrect gasUsed and fee calculation in calculateTransactionFee function, by [@Torres-ssf](https://github.com/Torres-ssf) (See [#1102](https://github.com/FuelLabs/fuels-ts/pull/1102))

### Patch Changes

- `NativeAssetId` has been renamed to `BaseAssetId` for better clarity and consistency with the Rust SDK, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1121](https://github.com/FuelLabs/fuels-ts/pull/1121))
- 🐞 fix: override cross-fetch version to 4.0.0 (avoid ServiceWorker fetch error), by [@LuizAsFight](https://github.com/LuizAsFight) (See [#1113](https://github.com/FuelLabs/fuels-ts/pull/1113))

## 0.47.0

## 0.46.0

### Minor Changes

- Update fuel core version to 0.19.0, by [@danielbate](https://github.com/danielbate) (See [#1085](https://github.com/FuelLabs/fuels-ts/pull/1085))
- Improve usability of `ScriptTransactionRequest` and document, by [@danielbate](https://github.com/danielbate) (See [#1072](https://github.com/FuelLabs/fuels-ts/pull/1072))

### Patch Changes

- Add missing fields to getMessageProof, by [@luizstacio](https://github.com/luizstacio) (See [#1089](https://github.com/FuelLabs/fuels-ts/pull/1089))
- Removing `publishConfigs`, using `.dts` files with declaration maps (`.dts.map`), by [@arboleya](https://github.com/arboleya) (See [#1055](https://github.com/FuelLabs/fuels-ts/pull/1055))
- 🐞 Fix decode message for fuel-core 0.18.3, by [@luizstacio](https://github.com/luizstacio) (See [#1090](https://github.com/FuelLabs/fuels-ts/pull/1090))

## 0.45.0

### Minor Changes

- Upgrade to fuel-core 0.18.1 and forc 0.40.1, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#986](https://github.com/FuelLabs/fuels-ts/pull/986))

### Patch Changes

- 🐞 fix: add messageId to input message decoder, by [@LuizAsFight](https://github.com/LuizAsFight) (See [#1066](https://github.com/FuelLabs/fuels-ts/pull/1066))

## 0.44.2

## 0.44.1

## 0.44.0

### Minor Changes

- Revamping all packages configs, enabling local installation, by [@arboleya](https://github.com/arboleya) (See [#984](https://github.com/FuelLabs/fuels-ts/pull/984))

## 0.43.1

## 0.43.0

### Patch Changes

- [#1018](https://github.com/FuelLabs/fuels-ts/pull/1018) [`0b3c342b`](https://github.com/FuelLabs/fuels-ts/commit/0b3c342b395bca48b1c274d3d99cb3fc61eef9a3) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - fix: inputify should accept string for data prop (0x for instance)

- Updated dependencies [[`7d9017d0`](https://github.com/FuelLabs/fuels-ts/commit/7d9017d03d602e6fb32c16f41b503afecfa0f901)]:
  - @fuel-ts/abi-coder@0.43.0
  - @fuel-ts/transactions@0.43.0
  - @fuel-ts/address@0.43.0
  - @fuel-ts/interfaces@0.43.0
  - @fuel-ts/keystore@0.43.0
  - @fuel-ts/math@0.43.0

## 0.42.0

### Patch Changes

- [#930](https://github.com/FuelLabs/fuels-ts/pull/930) [`5b0ce1c0`](https://github.com/FuelLabs/fuels-ts/commit/5b0ce1c03e16702b6101b1f299020d7c70e85505) Thanks [@camsjams](https://github.com/camsjams)! - Added optional caching

- Updated dependencies [[`41da3655`](https://github.com/FuelLabs/fuels-ts/commit/41da3655d8a6b7a4633e0fdd3f35622ed24bbd90), [`eda13d72`](https://github.com/FuelLabs/fuels-ts/commit/eda13d72c32f72652a34f926c4b9cf42ac36556c)]:
  - @fuel-ts/abi-coder@0.42.0
  - @fuel-ts/transactions@0.42.0
  - @fuel-ts/address@0.42.0
  - @fuel-ts/interfaces@0.42.0
  - @fuel-ts/keystore@0.42.0
  - @fuel-ts/math@0.42.0

## 0.41.0

### Minor Changes

- [#953](https://github.com/FuelLabs/fuels-ts/pull/953) [`8332026a`](https://github.com/FuelLabs/fuels-ts/commit/8332026aef44dcf17ace31dfb08a3114612a2ae5) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - You can now query for a list of blocks using the `getBlocks` method on the `Provider` class.

- [#954](https://github.com/FuelLabs/fuels-ts/pull/954) [`bf6214cc`](https://github.com/FuelLabs/fuels-ts/commit/bf6214cc2c4be227974e7d64360c01c9875c772c) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - The `addMissingVariable` helper has been renamed to `estimateTxDependencies`, and some documentation around it has been added.

### Patch Changes

- [#931](https://github.com/FuelLabs/fuels-ts/pull/931) [`0ff4eeab`](https://github.com/FuelLabs/fuels-ts/commit/0ff4eeab67b4c6b6b224230193ab742a3103fa1e) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - The second param timeParameters in the produceBlocks helper was required until now. This is now an optional param, in line with the GQL API and the Rust SDK.

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.41.0
  - @fuel-ts/address@0.41.0
  - @fuel-ts/interfaces@0.41.0
  - @fuel-ts/keystore@0.41.0
  - @fuel-ts/math@0.41.0
  - @fuel-ts/transactions@0.41.0

## 0.40.0

### Patch Changes

- Updated dependencies [[`4321ac1b`](https://github.com/FuelLabs/fuels-ts/commit/4321ac1beacce0ed2e342942ef4a3997c1d34d10), [`d0eb7a39`](https://github.com/FuelLabs/fuels-ts/commit/d0eb7a39d2d5cd59cc45fede3826a327f158d5ea)]:
  - @fuel-ts/abi-coder@0.40.0
  - @fuel-ts/transactions@0.40.0
  - @fuel-ts/address@0.40.0
  - @fuel-ts/interfaces@0.40.0
  - @fuel-ts/keystore@0.40.0
  - @fuel-ts/math@0.40.0

## 0.39.1

### Patch Changes

- Updated dependencies [[`e31f2f57`](https://github.com/FuelLabs/fuels-ts/commit/e31f2f574b5d2e334b0c55360cdc1bb273d4ac47)]:
  - @fuel-ts/address@0.39.1
  - @fuel-ts/transactions@0.39.1
  - @fuel-ts/abi-coder@0.39.1
  - @fuel-ts/interfaces@0.39.1
  - @fuel-ts/keystore@0.39.1
  - @fuel-ts/math@0.39.1

## 0.39.0

### Minor Changes

- [#866](https://github.com/FuelLabs/fuels-ts/pull/866) [`0522917f`](https://github.com/FuelLabs/fuels-ts/commit/0522917f64d05d992b7607740272e4954e991472) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - You can now produce blocks with a custom timestamp using `provider.produceBlocks()`.

### Patch Changes

- [#890](https://github.com/FuelLabs/fuels-ts/pull/890) [`a0beaa1d`](https://github.com/FuelLabs/fuels-ts/commit/a0beaa1d45f287aa566a42602f20744c71a37b32) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - fix: when creating `ScriptTransactionRequest`, use `bytesOffset` from inputs (if exists)

- [#824](https://github.com/FuelLabs/fuels-ts/pull/824) [`a8d27dc7`](https://github.com/FuelLabs/fuels-ts/commit/a8d27dc749b4c443fd0714da12b7a75ab56da6d7) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - The `no-explicit-any` ESLint rule is now treated as an error. The usage of `any` has now been replaced from as many files as possible.

- Updated dependencies [[`63c906b2`](https://github.com/FuelLabs/fuels-ts/commit/63c906b25e9cdb65e52c5d77fb85f118400fc545), [`a8d27dc7`](https://github.com/FuelLabs/fuels-ts/commit/a8d27dc749b4c443fd0714da12b7a75ab56da6d7)]:
  - @fuel-ts/abi-coder@0.39.0
  - @fuel-ts/interfaces@0.39.0
  - @fuel-ts/transactions@0.39.0
  - @fuel-ts/address@0.39.0
  - @fuel-ts/keystore@0.39.0
  - @fuel-ts/math@0.39.0

## 0.38.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.38.1
  - @fuel-ts/address@0.38.1
  - @fuel-ts/interfaces@0.38.1
  - @fuel-ts/keystore@0.38.1
  - @fuel-ts/math@0.38.1
  - @fuel-ts/transactions@0.38.1

## 0.38.0

### Minor Changes

- [#811](https://github.com/FuelLabs/fuels-ts/pull/811) [`653c8391`](https://github.com/FuelLabs/fuels-ts/commit/653c8391ece33a8f31598ea137452dd601dc7468) Thanks [@Torres-ssf](https://github.com/Torres-ssf)! - switch docs engine from jekyll to vitepress

### Patch Changes

- Updated dependencies [[`653c8391`](https://github.com/FuelLabs/fuels-ts/commit/653c8391ece33a8f31598ea137452dd601dc7468), [`0873a883`](https://github.com/FuelLabs/fuels-ts/commit/0873a883d366a4efc6653a9c30079bb713769290)]:
  - @fuel-ts/interfaces@0.38.0
  - @fuel-ts/transactions@0.38.0
  - @fuel-ts/address@0.38.0
  - @fuel-ts/abi-coder@0.38.0
  - @fuel-ts/keystore@0.38.0
  - @fuel-ts/math@0.38.0

## 0.37.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.37.1
  - @fuel-ts/address@0.37.1
  - @fuel-ts/transactions@0.37.1
  - @fuel-ts/interfaces@0.37.1
  - @fuel-ts/keystore@0.37.1
  - @fuel-ts/math@0.37.1

## 0.37.0

### Patch Changes

- Updated dependencies [[`deeb2d9c`](https://github.com/FuelLabs/fuels-ts/commit/deeb2d9ca304e43e36ef0db5e7b46c14f2f4e8f3)]:
  - @fuel-ts/math@0.37.0
  - @fuel-ts/transactions@0.37.0
  - @fuel-ts/abi-coder@0.37.0
  - @fuel-ts/address@0.37.0
  - @fuel-ts/interfaces@0.37.0
  - @fuel-ts/keystore@0.37.0

## 0.36.0

### Minor Changes

- [#820](https://github.com/FuelLabs/fuels-ts/pull/820) [`3cb39443`](https://github.com/FuelLabs/fuels-ts/commit/3cb394431a63f5294edf7e33207214eabf439ef5) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - The `@fuel-ts/constants` package has now been deleted. ALl constants have now been moved to `<package_name>/configs` for the respective package. They are all also exported by the umbrella `fuels` package.

### Patch Changes

- Updated dependencies [[`1613399e`](https://github.com/FuelLabs/fuels-ts/commit/1613399e97fc3ce63cdefa00ccff938e10f9fb9a), [`3cb39443`](https://github.com/FuelLabs/fuels-ts/commit/3cb394431a63f5294edf7e33207214eabf439ef5), [`dd7b1cab`](https://github.com/FuelLabs/fuels-ts/commit/dd7b1cab0e7c4a5234383ce6fc34f041ee6d03a9), [`1de9693a`](https://github.com/FuelLabs/fuels-ts/commit/1de9693a059501243bfa7b826231fd0fff10abcd)]:
  - @fuel-ts/abi-coder@0.36.0
  - @fuel-ts/address@0.36.0
  - @fuel-ts/math@0.36.0
  - @fuel-ts/transactions@0.36.0
  - @fuel-ts/interfaces@0.36.0
  - @fuel-ts/keystore@0.36.0

## 0.35.0

### Patch Changes

- [#819](https://github.com/FuelLabs/fuels-ts/pull/819) [`f4e1028a`](https://github.com/FuelLabs/fuels-ts/commit/f4e1028acd5a583d12662dd07ca0d17084a35be2) Thanks [@arboleya](https://github.com/arboleya)! - Adjusting export fields for all packages

- Updated dependencies [[`f4e1028a`](https://github.com/FuelLabs/fuels-ts/commit/f4e1028acd5a583d12662dd07ca0d17084a35be2)]:
  - @fuel-ts/abi-coder@0.35.0
  - @fuel-ts/address@0.35.0
  - @fuel-ts/constants@0.35.0
  - @fuel-ts/interfaces@0.35.0
  - @fuel-ts/keystore@0.35.0
  - @fuel-ts/math@0.35.0
  - @fuel-ts/transactions@0.35.0

## 0.34.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/address@0.34.1
  - @fuel-ts/abi-coder@0.34.1
  - @fuel-ts/constants@0.34.1
  - @fuel-ts/interfaces@0.34.1
  - @fuel-ts/keystore@0.34.1
  - @fuel-ts/math@0.34.1
  - @fuel-ts/transactions@0.34.1

## 0.34.0

### Patch Changes

- Updated dependencies [[`c7cb8ac2`](https://github.com/FuelLabs/fuels-ts/commit/c7cb8ac2e268b860a41d29927814c24339f8514a)]:
  - @fuel-ts/abi-coder@0.34.0
  - @fuel-ts/transactions@0.34.0
  - @fuel-ts/address@0.34.0
  - @fuel-ts/constants@0.34.0
  - @fuel-ts/interfaces@0.34.0
  - @fuel-ts/keystore@0.34.0
  - @fuel-ts/math@0.34.0

## 0.33.0

### Minor Changes

- [#800](https://github.com/FuelLabs/fuels-ts/pull/800) [`da3bc00a`](https://github.com/FuelLabs/fuels-ts/commit/da3bc00a29e7ef8f378afdb8bfb99d962be0dce3) Thanks [@luizstacio](https://github.com/luizstacio)! - Upgrade fuel-core to version v0.17.3

- [#745](https://github.com/FuelLabs/fuels-ts/pull/745) [`5ba6ade0`](https://github.com/FuelLabs/fuels-ts/commit/5ba6ade0c5176e97a0f9f9b16835f8dd37408313) Thanks [@camsjams](https://github.com/camsjams)! - Add support for main args in scripts

### Patch Changes

- Updated dependencies [[`5ba6ade0`](https://github.com/FuelLabs/fuels-ts/commit/5ba6ade0c5176e97a0f9f9b16835f8dd37408313)]:
  - @fuel-ts/abi-coder@0.33.0
  - @fuel-ts/transactions@0.33.0
  - @fuel-ts/address@0.33.0
  - @fuel-ts/constants@0.33.0
  - @fuel-ts/interfaces@0.33.0
  - @fuel-ts/keystore@0.33.0
  - @fuel-ts/math@0.33.0

## 0.32.0

### Minor Changes

- [#791](https://github.com/FuelLabs/fuels-ts/pull/791) [`9943c5a7`](https://github.com/FuelLabs/fuels-ts/commit/9943c5a713f774412136513461836e50548c3e80) Thanks [@pixelcircuits](https://github.com/pixelcircuits)! - Fixed spending messages as resources

- [#794](https://github.com/FuelLabs/fuels-ts/pull/794) [`ab019648`](https://github.com/FuelLabs/fuels-ts/commit/ab019648edb9b9b84d7208d08c0b80164837661a) Thanks [@pixelcircuits](https://github.com/pixelcircuits)! - Added status to messages

- [#789](https://github.com/FuelLabs/fuels-ts/pull/789) [`66c200a1`](https://github.com/FuelLabs/fuels-ts/commit/66c200a1b4ecbef0ef8664fc01f7142364b0a1bc) Thanks [@luizstacio](https://github.com/luizstacio)! - Updating usages of BaseWalletLocked after renaming it to Account

- [#767](https://github.com/FuelLabs/fuels-ts/pull/767) [`361fa1e6`](https://github.com/FuelLabs/fuels-ts/commit/361fa1e6c2fb45bca3b5e766b2aa83e94135a544) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - `Provider` can now accept options for additional network-related configurations.

### Patch Changes

- [#758](https://github.com/FuelLabs/fuels-ts/pull/758) [`0ce7e930`](https://github.com/FuelLabs/fuels-ts/commit/0ce7e930e5af17153313990a933fcab5970ccbc6) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - Make `buildBlockExplorer` more flexible. It won't throw when not passed anything now.

- Updated dependencies [[`66c200a1`](https://github.com/FuelLabs/fuels-ts/commit/66c200a1b4ecbef0ef8664fc01f7142364b0a1bc)]:
  - @fuel-ts/address@0.32.0
  - @fuel-ts/interfaces@0.32.0
  - @fuel-ts/abi-coder@0.32.0
  - @fuel-ts/constants@0.32.0
  - @fuel-ts/keystore@0.32.0
  - @fuel-ts/math@0.32.0
  - @fuel-ts/transactions@0.32.0

## 0.31.0

### Minor Changes

- [#775](https://github.com/FuelLabs/fuels-ts/pull/775) [`3aa7ed4`](https://github.com/FuelLabs/fuels-ts/commit/3aa7ed46dec1a39e391d1672452bec9f8bc5fc4c) Thanks [@luizstacio](https://github.com/luizstacio)! - BREAKING CHANGE, update support to fuel-core v0.17.1

### Patch Changes

- Updated dependencies [[`b126037`](https://github.com/FuelLabs/fuels-ts/commit/b126037000d2005ac8de1c24372cbcdc9b2b1c83)]:
  - @fuel-ts/abi-coder@0.31.0
  - @fuel-ts/transactions@0.31.0
  - @fuel-ts/address@0.31.0
  - @fuel-ts/constants@0.31.0
  - @fuel-ts/interfaces@0.31.0
  - @fuel-ts/keystore@0.31.0
  - @fuel-ts/math@0.31.0

## 0.30.0

### Minor Changes

- [#712](https://github.com/FuelLabs/fuels-ts/pull/712) [`f521146`](https://github.com/FuelLabs/fuels-ts/commit/f521146c328a7fb2c98679ec3f0c9aa6df2f684f) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - Add `getBalance` method for contracts and `getContractBalance` method for providers

### Patch Changes

- [#766](https://github.com/FuelLabs/fuels-ts/pull/766) [`dcdfea0`](https://github.com/FuelLabs/fuels-ts/commit/dcdfea0f480998537b6c9aee7b06fda25c7ec531) Thanks [@luizstacio](https://github.com/luizstacio)! - Fix JSON stringify/parse for transaction request

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.30.0
  - @fuel-ts/address@0.30.0
  - @fuel-ts/constants@0.30.0
  - @fuel-ts/interfaces@0.30.0
  - @fuel-ts/keystore@0.30.0
  - @fuel-ts/math@0.30.0
  - @fuel-ts/transactions@0.30.0

## 0.29.1

### Patch Changes

- [#733](https://github.com/FuelLabs/fuels-ts/pull/733) [`8af203d`](https://github.com/FuelLabs/fuels-ts/commit/8af203d41ebf4aa84082ad160b05fdc45cdf68ed) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - Add helper params to `buildBlockExplorerUrl`

- Updated dependencies [[`609d5f0`](https://github.com/FuelLabs/fuels-ts/commit/609d5f052e5c1e7f2a73a619ac49a76605812c51)]:
  - @fuel-ts/math@0.29.1
  - @fuel-ts/abi-coder@0.29.1
  - @fuel-ts/transactions@0.29.1
  - @fuel-ts/address@0.29.1
  - @fuel-ts/constants@0.29.1
  - @fuel-ts/interfaces@0.29.1
  - @fuel-ts/keystore@0.29.1

## 0.29.0

### Patch Changes

- Updated dependencies [[`5a08f80`](https://github.com/FuelLabs/fuels-ts/commit/5a08f80f408aff842403814c6cf444932b2afa0a)]:
  - @fuel-ts/abi-coder@0.29.0
  - @fuel-ts/transactions@0.29.0
  - @fuel-ts/address@0.29.0
  - @fuel-ts/constants@0.29.0
  - @fuel-ts/interfaces@0.29.0
  - @fuel-ts/keystore@0.29.0
  - @fuel-ts/math@0.29.0

## 0.28.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.28.1
  - @fuel-ts/address@0.28.1
  - @fuel-ts/constants@0.28.1
  - @fuel-ts/interfaces@0.28.1
  - @fuel-ts/keystore@0.28.1
  - @fuel-ts/math@0.28.1
  - @fuel-ts/transactions@0.28.1

## 0.28.0

### Minor Changes

- [#704](https://github.com/FuelLabs/fuels-ts/pull/704) [`605293d`](https://github.com/FuelLabs/fuels-ts/commit/605293d276b6ab24347c65d717e6bdf57d92b95b) Thanks [@luizstacio](https://github.com/luizstacio)! - Add connect method to provider enabling update network url

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.28.0
  - @fuel-ts/address@0.28.0
  - @fuel-ts/constants@0.28.0
  - @fuel-ts/interfaces@0.28.0
  - @fuel-ts/keystore@0.28.0
  - @fuel-ts/math@0.28.0
  - @fuel-ts/transactions@0.28.0

## 0.27.0

### Patch Changes

- [#658](https://github.com/FuelLabs/fuels-ts/pull/658) [`d0eb1c7`](https://github.com/FuelLabs/fuels-ts/commit/d0eb1c732f63842b8d4801456054ec3b9ccdd020) Thanks [@arboleya](https://github.com/arboleya)! - Upgrading forc to `0.32.2` and fuel-core to `0.15.1`

- Updated dependencies [[`8103891`](https://github.com/FuelLabs/fuels-ts/commit/8103891071145a86380a8c9bcb11132249138486)]:
  - @fuel-ts/address@0.27.0
  - @fuel-ts/abi-coder@0.27.0
  - @fuel-ts/transactions@0.27.0
  - @fuel-ts/constants@0.27.0
  - @fuel-ts/interfaces@0.27.0
  - @fuel-ts/keystore@0.27.0
  - @fuel-ts/math@0.27.0

## 0.26.0

### Minor Changes

- [#681](https://github.com/FuelLabs/fuels-ts/pull/681) [`8c106af`](https://github.com/FuelLabs/fuels-ts/commit/8c106aff52d244d415162c20c4f049b37ba2f54a) Thanks [@pixelcircuits](https://github.com/pixelcircuits)! - corrected comparison of byteslike and strings

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.26.0
  - @fuel-ts/address@0.26.0
  - @fuel-ts/transactions@0.26.0
  - @fuel-ts/constants@0.26.0
  - @fuel-ts/interfaces@0.26.0
  - @fuel-ts/keystore@0.26.0
  - @fuel-ts/math@0.26.0

## 0.25.1

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.25.1
  - @fuel-ts/address@0.25.1
  - @fuel-ts/transactions@0.25.1
  - @fuel-ts/constants@0.25.1
  - @fuel-ts/interfaces@0.25.1
  - @fuel-ts/keystore@0.25.1
  - @fuel-ts/math@0.25.1

## 0.25.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.25.0
  - @fuel-ts/address@0.25.0
  - @fuel-ts/constants@0.25.0
  - @fuel-ts/interfaces@0.25.0
  - @fuel-ts/keystore@0.25.0
  - @fuel-ts/math@0.25.0
  - @fuel-ts/transactions@0.25.0

## 0.24.2

### Patch Changes

- [#646](https://github.com/FuelLabs/fuels-ts/pull/646) [`fa97383`](https://github.com/FuelLabs/fuels-ts/commit/fa97383114c36ee7a204be7e7f3f974382fa1b2c) Thanks [@camsjams](https://github.com/camsjams)! - Adjust doc update timing

- Updated dependencies [[`fa97383`](https://github.com/FuelLabs/fuels-ts/commit/fa97383114c36ee7a204be7e7f3f974382fa1b2c), [`0da49d3`](https://github.com/FuelLabs/fuels-ts/commit/0da49d37f4088faf112c0e5a393c6e8a25b3aa61)]:
  - @fuel-ts/abi-coder@0.24.2
  - @fuel-ts/address@0.24.2
  - @fuel-ts/constants@0.24.2
  - @fuel-ts/interfaces@0.24.2
  - @fuel-ts/keystore@0.24.2
  - @fuel-ts/math@0.24.2
  - @fuel-ts/transactions@0.24.2

## 0.24.1

### Patch Changes

- [#653](https://github.com/FuelLabs/fuels-ts/pull/653) [`410b11a`](https://github.com/FuelLabs/fuels-ts/commit/410b11a79d8963dfb3706fd12877c46ca58b63b4) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - Expose more info about chain in provider.getChain method

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.24.1
  - @fuel-ts/address@0.24.1
  - @fuel-ts/transactions@0.24.1
  - @fuel-ts/constants@0.24.1
  - @fuel-ts/interfaces@0.24.1
  - @fuel-ts/keystore@0.24.1
  - @fuel-ts/math@0.24.1

## 0.24.0

### Minor Changes

- [#616](https://github.com/FuelLabs/fuels-ts/pull/616) [`02ac98e`](https://github.com/FuelLabs/fuels-ts/commit/02ac98ea865e0464b132dc3f6bd21f7e1a57435a) Thanks [@arboleya](https://github.com/arboleya)! - Adding new `versions` package for exposing and managing compatibility versions of Fuel toolchain components

### Patch Changes

- [#620](https://github.com/FuelLabs/fuels-ts/pull/620) [`a732538`](https://github.com/FuelLabs/fuels-ts/commit/a732538062de5b83b4dec1e6ef654257e62498bd) Thanks [@Dhaiwat10](https://github.com/Dhaiwat10)! - Add buildBlockExplorerUrl utility function

- Updated dependencies [[`02ac98e`](https://github.com/FuelLabs/fuels-ts/commit/02ac98ea865e0464b132dc3f6bd21f7e1a57435a), [`3de5ee5`](https://github.com/FuelLabs/fuels-ts/commit/3de5ee5b07b9e0c3754bebdecd8eac49b3a79413)]:
  - @fuel-ts/abi-coder@0.24.0
  - @fuel-ts/address@0.24.0
  - @fuel-ts/transactions@0.24.0
  - @fuel-ts/constants@0.24.0
  - @fuel-ts/interfaces@0.24.0
  - @fuel-ts/keystore@0.24.0
  - @fuel-ts/math@0.24.0

## 0.23.0

### Patch Changes

- [#639](https://github.com/FuelLabs/fuels-ts/pull/639) [`c0a62ed`](https://github.com/FuelLabs/fuels-ts/commit/c0a62ed278d6118f1af177dc98dcdb42febd0c81) Thanks [@camsjams](https://github.com/camsjams)! - Update docs

- Updated dependencies [[`c0a62ed`](https://github.com/FuelLabs/fuels-ts/commit/c0a62ed278d6118f1af177dc98dcdb42febd0c81), [`8888e79`](https://github.com/FuelLabs/fuels-ts/commit/8888e79bcd7740a0c85298862bd59981bc6755b3)]:
  - @fuel-ts/abi-coder@0.23.0
  - @fuel-ts/address@0.23.0
  - @fuel-ts/constants@0.23.0
  - @fuel-ts/interfaces@0.23.0
  - @fuel-ts/keystore@0.23.0
  - @fuel-ts/math@0.23.0
  - @fuel-ts/transactions@0.23.0

## 0.22.2

### Patch Changes

- [#612](https://github.com/FuelLabs/fuels-ts/pull/612) [`03b060b`](https://github.com/FuelLabs/fuels-ts/commit/03b060b51e00034a2814a0c5ed2718d5dc86533b) Thanks [@camsjams](https://github.com/camsjams)! - Added docs and improved examples

- Updated dependencies [[`03b060b`](https://github.com/FuelLabs/fuels-ts/commit/03b060b51e00034a2814a0c5ed2718d5dc86533b)]:
  - @fuel-ts/abi-coder@0.22.2
  - @fuel-ts/address@0.22.2
  - @fuel-ts/constants@0.22.2
  - @fuel-ts/interfaces@0.22.2
  - @fuel-ts/keystore@0.22.2
  - @fuel-ts/math@0.22.2
  - @fuel-ts/transactions@0.22.2

## 0.22.1

### Patch Changes

- Updated dependencies [[`58d9fa0`](https://github.com/FuelLabs/fuels-ts/commit/58d9fa032a6cb3478bca4a93523b21cc184fbc9e)]:
  - @fuel-ts/abi-coder@0.22.1
  - @fuel-ts/transactions@0.22.1
  - @fuel-ts/address@0.22.1
  - @fuel-ts/constants@0.22.1
  - @fuel-ts/interfaces@0.22.1
  - @fuel-ts/keystore@0.22.1
  - @fuel-ts/math@0.22.1

## 0.22.0

### Minor Changes

- [#618](https://github.com/FuelLabs/fuels-ts/pull/618) [`563ecc5`](https://github.com/FuelLabs/fuels-ts/commit/563ecc5dcce054619e56ca04c8c9e2514dd40e98) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - include decoded transaction in #fetch method response

- [#613](https://github.com/FuelLabs/fuels-ts/pull/613) [`aacc9c6`](https://github.com/FuelLabs/fuels-ts/commit/aacc9c669939cc6a0e93d417885f2c1246117504) Thanks [@QuinnLee](https://github.com/QuinnLee)! - Remove addCoins and addCoin

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.22.0
  - @fuel-ts/address@0.22.0
  - @fuel-ts/constants@0.22.0
  - @fuel-ts/interfaces@0.22.0
  - @fuel-ts/keystore@0.22.0
  - @fuel-ts/math@0.22.0
  - @fuel-ts/transactions@0.22.0

## 0.21.2

### Patch Changes

- Updated dependencies [[`b5629ff`](https://github.com/FuelLabs/fuels-ts/commit/b5629ffadf0d705c50095d0ffd10cfd5a4e1da22)]:
  - @fuel-ts/transactions@0.21.2
  - @fuel-ts/abi-coder@0.21.2
  - @fuel-ts/address@0.21.2
  - @fuel-ts/constants@0.21.2
  - @fuel-ts/interfaces@0.21.2
  - @fuel-ts/keystore@0.21.2
  - @fuel-ts/math@0.21.2

## 0.21.1

### Patch Changes

- [#604](https://github.com/FuelLabs/fuels-ts/pull/604) [`90dc675`](https://github.com/FuelLabs/fuels-ts/commit/90dc6757b6abd25a7fb8220d9e2a5abcbdff6d8d) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - Add support for Mint transaction

- [#608](https://github.com/FuelLabs/fuels-ts/pull/608) [`141ecdd`](https://github.com/FuelLabs/fuels-ts/commit/141ecddc198a39e35f2363a13f7498543536bf75) Thanks [@arboleya](https://github.com/arboleya)! - Use raw ABI on `_abi` property for Factory classes

- Updated dependencies [[`90dc675`](https://github.com/FuelLabs/fuels-ts/commit/90dc6757b6abd25a7fb8220d9e2a5abcbdff6d8d), [`141ecdd`](https://github.com/FuelLabs/fuels-ts/commit/141ecddc198a39e35f2363a13f7498543536bf75)]:
  - @fuel-ts/transactions@0.21.1
  - @fuel-ts/abi-coder@0.21.1
  - @fuel-ts/address@0.21.1
  - @fuel-ts/constants@0.21.1
  - @fuel-ts/interfaces@0.21.1
  - @fuel-ts/keystore@0.21.1
  - @fuel-ts/math@0.21.1

## 0.21.0

### Minor Changes

- [#587](https://github.com/FuelLabs/fuels-ts/pull/587) [`eaa3549`](https://github.com/FuelLabs/fuels-ts/commit/eaa35492631f2e37f06b623105068da0de6f331e) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - include gas/fee info in TransactionResponse

- [#583](https://github.com/FuelLabs/fuels-ts/pull/583) [`897888e`](https://github.com/FuelLabs/fuels-ts/commit/897888e08fcc3e6e533429ddd14cd2273e049e15) Thanks [@QuinnLee](https://github.com/QuinnLee)! - add contractIds if missing

### Patch Changes

- [#589](https://github.com/FuelLabs/fuels-ts/pull/589) [`d44de76`](https://github.com/FuelLabs/fuels-ts/commit/d44de76bdde4d566e0bac6e872adc6e6f29f0bee) Thanks [@camsjams](https://github.com/camsjams)! - Use resources for fund

- Updated dependencies [[`897888e`](https://github.com/FuelLabs/fuels-ts/commit/897888e08fcc3e6e533429ddd14cd2273e049e15)]:
  - @fuel-ts/transactions@0.21.0
  - @fuel-ts/abi-coder@0.21.0
  - @fuel-ts/address@0.21.0
  - @fuel-ts/constants@0.21.0
  - @fuel-ts/interfaces@0.21.0
  - @fuel-ts/keystore@0.21.0
  - @fuel-ts/math@0.21.0

## 0.20.0

### Minor Changes

- [#576](https://github.com/FuelLabs/fuels-ts/pull/576) [`56c17bc`](https://github.com/FuelLabs/fuels-ts/commit/56c17bcd77676348e401599870348bf0ede18fb3) Thanks [@pixelcircuits](https://github.com/pixelcircuits)! - Added fuelBlockSpend to getMessages results

### Patch Changes

- [#577](https://github.com/FuelLabs/fuels-ts/pull/577) [`5ee7642`](https://github.com/FuelLabs/fuels-ts/commit/5ee76427ae75d95aa4cb8698fdc4aadc90bfe01e) Thanks [@camsjams](https://github.com/camsjams)! - Add message proof helper

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.20.0
  - @fuel-ts/address@0.20.0
  - @fuel-ts/constants@0.20.0
  - @fuel-ts/interfaces@0.20.0
  - @fuel-ts/keystore@0.20.0
  - @fuel-ts/math@0.20.0
  - @fuel-ts/transactions@0.20.0

## 0.19.0

### Minor Changes

- [#561](https://github.com/FuelLabs/fuels-ts/pull/561) [`0e91213`](https://github.com/FuelLabs/fuels-ts/commit/0e91213e54b39d2de7a358912c85d7c32c5dde6d) Thanks [@luizstacio](https://github.com/luizstacio)! - Split Wallet in public and private wallets and enable contracts to use BasicWallet

- [#564](https://github.com/FuelLabs/fuels-ts/pull/564) [`63aa038`](https://github.com/FuelLabs/fuels-ts/commit/63aa038052d0aac1dc1f66a9852fd55771713be6) Thanks [@pixelcircuits](https://github.com/pixelcircuits)! - Added withdraw function to wallet

- [#549](https://github.com/FuelLabs/fuels-ts/pull/549) [`db8cc6b`](https://github.com/FuelLabs/fuels-ts/commit/db8cc6b49616199368463ecd69aae6b3ca0b65d0) Thanks [@QuinnLee](https://github.com/QuinnLee)! - add output variables to transactions

### Patch Changes

- [#563](https://github.com/FuelLabs/fuels-ts/pull/563) [`2a98c1e`](https://github.com/FuelLabs/fuels-ts/commit/2a98c1e455765fbfe5775bd4d706571705083f3e) Thanks [@luizstacio](https://github.com/luizstacio)! - update fuel version

- Updated dependencies [[`eebb0bd`](https://github.com/FuelLabs/fuels-ts/commit/eebb0bd90c14a39ddfb3498422613125687a088d), [`5a9d07b`](https://github.com/FuelLabs/fuels-ts/commit/5a9d07b4ceaa91b8d9e948e0c4c3c105cd621df0), [`ec83b17`](https://github.com/FuelLabs/fuels-ts/commit/ec83b17a1bcb3d1277911471d3515df3643e6280), [`db8cc6b`](https://github.com/FuelLabs/fuels-ts/commit/db8cc6b49616199368463ecd69aae6b3ca0b65d0), [`2a98c1e`](https://github.com/FuelLabs/fuels-ts/commit/2a98c1e455765fbfe5775bd4d706571705083f3e), [`bdfa9d6`](https://github.com/FuelLabs/fuels-ts/commit/bdfa9d6e453a9c47177b19f2811265d740fc4ac4)]:
  - @fuel-ts/transactions@0.19.0
  - @fuel-ts/math@0.19.0
  - @fuel-ts/abi-coder@0.19.0
  - @fuel-ts/address@0.19.0
  - @fuel-ts/constants@0.19.0
  - @fuel-ts/interfaces@0.19.0
  - @fuel-ts/keystore@0.19.0

## 0.18.0

### Patch Changes

- [#543](https://github.com/FuelLabs/fuels-ts/pull/543) [`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3) Thanks [@arboleya](https://github.com/arboleya)! - Updating all libraries to their latest version

- [#540](https://github.com/FuelLabs/fuels-ts/pull/540) [`1eb0256`](https://github.com/FuelLabs/fuels-ts/commit/1eb02569008292621cd69647bc78044df6ec3103) Thanks [@camsjams](https://github.com/camsjams)! - Updated fuel core version and migrated to new graphql

- [#543](https://github.com/FuelLabs/fuels-ts/pull/543) [`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3) Thanks [@arboleya](https://github.com/arboleya)! - Upgrading outdated dependencies to latest version

- [#541](https://github.com/FuelLabs/fuels-ts/pull/541) [`d58f72a`](https://github.com/FuelLabs/fuels-ts/commit/d58f72a08f623fa40ff215b3b567105d9f8d872c) Thanks [@arboleya](https://github.com/arboleya)! - Upgrading `graphql-request` package

- Updated dependencies [[`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3), [`6b2b812`](https://github.com/FuelLabs/fuels-ts/commit/6b2b812aecfb639c22f3bbd251f2d50f23f9cd0f), [`fecd78b`](https://github.com/FuelLabs/fuels-ts/commit/fecd78bec8a6a9077bd3494369345461da3934a3)]:
  - @fuel-ts/abi-coder@0.18.0
  - @fuel-ts/address@0.18.0
  - @fuel-ts/keystore@0.18.0
  - @fuel-ts/math@0.18.0
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
  - @fuel-ts/transactions@0.17.0
  - @fuel-ts/abi-coder@0.17.0
  - @fuel-ts/address@0.17.0
  - @fuel-ts/constants@0.17.0
  - @fuel-ts/interfaces@0.17.0
  - @fuel-ts/keystore@0.17.0

## 0.16.0

### Patch Changes

- Updated dependencies [[`27224b9`](https://github.com/FuelLabs/fuels-ts/commit/27224b997a4ec86473fc19868550c788638fa2ce)]:
  - @fuel-ts/transactions@0.16.0
  - @fuel-ts/abi-coder@0.16.0
  - @fuel-ts/address@0.16.0
  - @fuel-ts/constants@0.16.0
  - @fuel-ts/interfaces@0.16.0
  - @fuel-ts/keystore@0.16.0
  - @fuel-ts/math@0.16.0

## 0.15.0

### Patch Changes

- [#497](https://github.com/FuelLabs/fuels-ts/pull/497) [`63583aa`](https://github.com/FuelLabs/fuels-ts/commit/63583aa6e8b5b5417bdc0c0ae3bc15eec7735e43) Thanks [@camsjams](https://github.com/camsjams)! - Added vec support

- [#468](https://github.com/FuelLabs/fuels-ts/pull/468) [`7ad3d79`](https://github.com/FuelLabs/fuels-ts/commit/7ad3d79bf7a1db766912a7b3d52e4fa2e550af56) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - Refactor to use bn.js instead of bigint.

- Updated dependencies [[`5828934`](https://github.com/FuelLabs/fuels-ts/commit/5828934ccd96cec82fc0cece0f207dafaee5b89a), [`63583aa`](https://github.com/FuelLabs/fuels-ts/commit/63583aa6e8b5b5417bdc0c0ae3bc15eec7735e43), [`7ad3d79`](https://github.com/FuelLabs/fuels-ts/commit/7ad3d79bf7a1db766912a7b3d52e4fa2e550af56), [`f3c7273`](https://github.com/FuelLabs/fuels-ts/commit/f3c7273d946979e628b178ba808b8fc1598105bb), [`9d0ad53`](https://github.com/FuelLabs/fuels-ts/commit/9d0ad5392b2dae83b13041999435c08e07e935a3)]:
  - @fuel-ts/address@0.15.0
  - @fuel-ts/interfaces@0.15.0
  - @fuel-ts/abi-coder@0.15.0
  - @fuel-ts/constants@0.15.0
  - @fuel-ts/math@0.15.0
  - @fuel-ts/transactions@0.15.0
  - @fuel-ts/keystore@0.15.0

## 0.14.0

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/abi-coder@0.14.0
  - @fuel-ts/address@0.14.0
  - @fuel-ts/constants@0.14.0
  - @fuel-ts/interfaces@0.14.0
  - @fuel-ts/keystore@0.14.0
  - @fuel-ts/math@0.14.0
  - @fuel-ts/transactions@0.14.0

## 0.13.0

### Minor Changes

- [#458](https://github.com/FuelLabs/fuels-ts/pull/458) [`9190cee`](https://github.com/FuelLabs/fuels-ts/commit/9190cee45529b6c3fcffb2a12b1ef6319b2b39df) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - Upgrade compatibility to fuel-core v0.10.1

* [#472](https://github.com/FuelLabs/fuels-ts/pull/472) [`5d4d6ce`](https://github.com/FuelLabs/fuels-ts/commit/5d4d6ce7fa1a23deae3f41be94c9fe2ee9851772) Thanks [@QuinnLee](https://github.com/QuinnLee)! - Add `excludeId` to getCoinsToSpend

### Patch Changes

- Updated dependencies [[`745e65b`](https://github.com/FuelLabs/fuels-ts/commit/745e65bc563ab8cace6f73e2715a6eaaae93fda5), [`9190cee`](https://github.com/FuelLabs/fuels-ts/commit/9190cee45529b6c3fcffb2a12b1ef6319b2b39df), [`dfb2612`](https://github.com/FuelLabs/fuels-ts/commit/dfb261222c17cf6f158f475d91b3414996300066)]:
  - @fuel-ts/abi-coder@0.13.0
  - @fuel-ts/transactions@0.13.0
  - @fuel-ts/address@0.13.0
  - @fuel-ts/constants@0.13.0
  - @fuel-ts/interfaces@0.13.0
  - @fuel-ts/keystore@0.13.0
  - @fuel-ts/math@0.13.0

## 0.12.0

### Minor Changes

- [#441](https://github.com/FuelLabs/fuels-ts/pull/441) [`f3dcd27`](https://github.com/FuelLabs/fuels-ts/commit/f3dcd272dc5a237c6a8ce235a542ad804039f13b) Thanks [@camsjams](https://github.com/camsjams)! - Added support for Bech32 Address format

### Patch Changes

- Updated dependencies [[`f3dcd27`](https://github.com/FuelLabs/fuels-ts/commit/f3dcd272dc5a237c6a8ce235a542ad804039f13b)]:
  - @fuel-ts/abi-coder@0.12.0
  - @fuel-ts/address@0.12.0
  - @fuel-ts/interfaces@0.12.0
  - @fuel-ts/transactions@0.12.0
  - @fuel-ts/constants@0.12.0
  - @fuel-ts/keystore@0.12.0
  - @fuel-ts/math@0.12.0

## 0.11.0

### Patch Changes

- [#437](https://github.com/FuelLabs/fuels-ts/pull/437) [`b2f1c66`](https://github.com/FuelLabs/fuels-ts/commit/b2f1c665b8d75f635edb4b75691abc9ebf6850b5) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - - Fixed linking packages to inside `node_modules` folder
  - Remove old Lerna config
- Updated dependencies [[`b2f1c66`](https://github.com/FuelLabs/fuels-ts/commit/b2f1c665b8d75f635edb4b75691abc9ebf6850b5)]:
  - @fuel-ts/constants@0.11.0
  - @fuel-ts/interfaces@0.11.0
  - @fuel-ts/keystore@0.11.0
  - @fuel-ts/math@0.11.0
  - @fuel-ts/transactions@0.11.0

## 0.10.0

### Minor Changes

- [#428](https://github.com/FuelLabs/fuels-ts/pull/428) [`b9cf1a3`](https://github.com/FuelLabs/fuels-ts/commit/b9cf1a3fce660b2a04adcd0b3782a27aead48762) Thanks [@luizstacio](https://github.com/luizstacio)! - Remove export transactions on provider package

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.10.0
  - @fuel-ts/interfaces@0.10.0
  - @fuel-ts/keystore@0.10.0
  - @fuel-ts/math@0.10.0
  - @fuel-ts/transactions@0.10.0

## 0.9.0

### Minor Changes

- [#400](https://github.com/FuelLabs/fuels-ts/pull/400) [`a8349b0`](https://github.com/FuelLabs/fuels-ts/commit/a8349b0bb7f78ffe982fadc740a0209b4056bf5b) Thanks [@luizstacio](https://github.com/luizstacio)! - Retrieve transaction cost on provider API

### Patch Changes

- Updated dependencies []:
  - @fuel-ts/constants@0.9.0
  - @fuel-ts/interfaces@0.9.0
  - @fuel-ts/keystore@0.9.0
  - @fuel-ts/math@0.9.0
  - @fuel-ts/transactions@0.9.0

## 0.8.0

### Minor Changes

- [#405](https://github.com/FuelLabs/fuels-ts/pull/405) [`19dee43`](https://github.com/FuelLabs/fuels-ts/commit/19dee437f0ea2fe02a4a7f56b0b55d84279c2dc0) Thanks [@camsjams](https://github.com/camsjams)! - Bumping all packages to next minor version

* [#378](https://github.com/FuelLabs/fuels-ts/pull/378) [`03842d0`](https://github.com/FuelLabs/fuels-ts/commit/03842d010babb74e8bf88699ad842939da0d1760) Thanks [@luizstacio](https://github.com/luizstacio)! - Add retrieve node information

### Patch Changes

- [#374](https://github.com/FuelLabs/fuels-ts/pull/374) [`0dd4870`](https://github.com/FuelLabs/fuels-ts/commit/0dd48702fd187eeebdf9f6e1882c400ee44b956e) Thanks [@camsjams](https://github.com/camsjams)! - Add readme

* [#397](https://github.com/FuelLabs/fuels-ts/pull/397) [`9ac636b`](https://github.com/FuelLabs/fuels-ts/commit/9ac636b7b1f31d2f68c55af2062b4476217ef563) Thanks [@camsjams](https://github.com/camsjams)! - fix list on fuels

- [#401](https://github.com/FuelLabs/fuels-ts/pull/401) [`42b6e4e`](https://github.com/FuelLabs/fuels-ts/commit/42b6e4ea9cf4de38adeb2c1bbb0668bf140d2163) Thanks [@LuizAsFight](https://github.com/LuizAsFight)! - Upgrade sway to 0.18.1

- Updated dependencies [[`0dd4870`](https://github.com/FuelLabs/fuels-ts/commit/0dd48702fd187eeebdf9f6e1882c400ee44b956e), [`9ac636b`](https://github.com/FuelLabs/fuels-ts/commit/9ac636b7b1f31d2f68c55af2062b4476217ef563), [`19dee43`](https://github.com/FuelLabs/fuels-ts/commit/19dee437f0ea2fe02a4a7f56b0b55d84279c2dc0)]:
  - @fuel-ts/constants@0.8.0
  - @fuel-ts/interfaces@0.8.0
  - @fuel-ts/keystore@0.8.0
  - @fuel-ts/math@0.8.0
  - @fuel-ts/transactions@0.8.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

---

<a name="0.7.0"></a>

## [0.7.0](https://github.com/FuelLabs/fuels-ts/compare/v0.6.0...0.7.0)

> 2022-06-03

### 🐞 Bug Fixes

- Use internal random bytes function to avoid browser ESM file ([#310](https://github.com/FuelLabs/fuels-ts/issues/310))
- change build tasks in order to use pnpm link correctly ([#246](https://github.com/FuelLabs/fuels-ts/issues/246))

### 📃 Code Refactoring

- add turborepo, pnpm and tsup ([#238](https://github.com/FuelLabs/fuels-ts/issues/238))

### 🚀 Features

- enable utxo validation ([#278](https://github.com/FuelLabs/fuels-ts/issues/278))
- improve AbiCoder ([#290](https://github.com/FuelLabs/fuels-ts/issues/290))
- move from BigNumber to BigInt ([#266](https://github.com/FuelLabs/fuels-ts/issues/266))
- add get contract on provider ([#241](https://github.com/FuelLabs/fuels-ts/issues/241))
- add contract slots on contract deployment ([#239](https://github.com/FuelLabs/fuels-ts/issues/239))

<a name="v0.6.0"></a>

## [v0.6.0](https://github.com/FuelLabs/fuels-ts/compare/v0.5.0...v0.6.0)

> 2022-04-25

### 🚀 Features

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

### 🐞 Bug Fixes

- change postinstall to prepare ([#160](https://github.com/FuelLabs/fuels-ts/issues/160))

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

### 🚀 Features

- add Provider.getCoinsToSpend() ([#93](https://github.com/FuelLabs/fuels-ts/issues/93))
- add coin status on coins ([#129](https://github.com/FuelLabs/fuels-ts/issues/129))
