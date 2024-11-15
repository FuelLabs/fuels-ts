# Asset ID

An Asset ID can be represented using the `AssetId` type. It's definition matches the Sway standard library type being a `Struct` wrapper around an inner `Bits256` value.

<<< @/../../docs-snippets2/src/types/asset-id/intro.ts#full{ts:line-numbers}

## Using an Asset ID

You can easily use the `AssetId` type within your Sway programs. Consider the following contract that can compares and return an `AssetId`:

<<< @/../../docs-snippets2/sway/echo-asset-id/src/main.sw#asset-id-2{ts:line-numbers}

The `AssetId` struct can be passed to the contract function as follows:

<<< @/../../docs-snippets2/src/types/asset-id/using-an-asset-id-1.ts#snippet-1{ts:line-numbers}

And to validate the returned value:

<<< @/../../docs-snippets2/src/types/asset-id/using-an-asset-id-2.ts#snippet-1{ts:line-numbers}
