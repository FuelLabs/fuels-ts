# Minted Token Asset ID

The asset ID of a token on the Fuel network is determined by two factors:

- The ID of the contract that minted the token,
- A sub-identifier (Sub ID)

> Both of which are [bits256](../types/bits256.md) strings.

The process involves applying a SHA-256 hash algorithm to the combination of the Contract ID and the Sub ID, to derive an Asset ID - as explained [here](https://docs.fuel.network/docs/specs/identifiers/asset/#asset-id).

Consider the following simplified token contract:

<<< @/../../docs/sway/token/src/main.sw#minted-token-asset-id-1{rs:line-numbers}

Imagine that this contract is already deployed and we are about to mint some coins:

<<< @./snippets/utilities/minted-token-asset-id.ts#minted-token-asset-id-2{ts:line-numbers}

## Obtaining the Asset ID

Since the asset ID depends on the contract ID, which is always dynamic (unlike the sub ID, which can be set to a fixed value), the helper `getMintedAssetId` can be used to easily obtain the asset ID for a given contract ID and sub ID.

## Create Asset Id

The SDK provides a helper named `createAssetId` which takes the contract ID and sub ID as parameters. This helper internally calls `getMintedAssetId` and returns the Sway native parameter [AssetId](https://docs.fuel.network/docs/fuels-ts/interfaces/#assetid), ready to be used in a Sway program invocation:

<<< @./snippets/utilities/create-asset-id.ts#create-asset-id-1{ts:line-numbers}
