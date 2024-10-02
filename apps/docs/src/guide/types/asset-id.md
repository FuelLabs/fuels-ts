# Asset ID

An Asset ID can be represented using the `AssetId` type. It's definition matches the Sway standard library type being a `Struct` wrapper around an inner `Bits256` value.

<<< @/../../docs-snippets2/src/types/asset-id.ts#asset-id-1{ts:line-numbers}

## Using an Asset ID

The `AssetId` type can be integrated with your contract calls. Consider the following contract that can compares and return an Asset ID:

<<< @/../../docs-snippets2/sway/echo-asset-id/src/main.sw#asset-id-2{ts:line-numbers}

The `AssetId` type can be used with the SDK and passed to the contract function as follows:

<<< @/../../docs-snippets2/src/types/asset-id.ts#asset-id-3{ts:line-numbers}

And to validate the returned value:

<<< @/../../docs-snippets2/src/types/asset-id.ts#asset-id-4{ts:line-numbers}

## Full Example

<<< @/../../docs-snippets2/src/types/asset-id.ts#full{ts:line-numbers}
