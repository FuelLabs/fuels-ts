# Minted Token Asset ID

The asset ID of a token on the Fuel network is determined by two factors: a sub identifier (sub ID) and the ID of the contract that minted the token. Both are [bits256](../types/bits256) strings.

The process involves applying a SHA-256 hash algorithm to the combination of the Contract ID and the sub ID, as explained [here](https://docs.fuel.network/docs/specs/identifiers/asset/#asset-id).

Consider the following simplified token contract:

<<< @/../../docs-snippets/test/fixtures/forc-projects/token/src/main.sw#minted-token-asset-id-1{rs:line-numbers}

Imagine that this contract is already deployed and we are about to mint some coins:

<<< @/../../docs-snippets/src/guide/contracts/mint-coins.test.ts#minted-token-asset-id-2{ts:line-numbers}

Since the asset ID depends on the contract ID, which is always dynamic (unlike the sub ID, which can be set to a fixed value), the helper `getMintedAssetId` can be used to easily obtain the asset ID for a given contract ID and sub ID.
