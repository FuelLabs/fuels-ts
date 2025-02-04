# Asset API

The Asset API is a RESTful API that allows you to query the assets on the Fuel blockchain. We allow for querying the Asset API on both the Mainnet and Testnet.

|         | Endpoint                                      |
| ------- | --------------------------------------------- |
| Mainnet | https://mainnet-explorer.fuel.network         |
| Testnet | https://explorer-indexer-testnet.fuel.network |

For more information about the API, please refer to the [Wiki](https://github.com/FuelLabs/fuel-explorer/wiki/Assets-API#) page.

## Asset by ID

We can request information about an asset by its asset ID, using the `getAssetById` function. This will leverage the endpoint `/assets/<assetId>` to fetch the asset information.

<<< @./snippets/asset-api/asset-by-id.ts#full{ts:line-numbers}

By default, we will request the asset information for `mainnet`. If you want to request the asset information from other networks, you can pass the `network` parameter (this is the same for the [`getAssetsByOwner`](#assets-by-owner) function).

<<< @./snippets/asset-api/asset-by-id.ts#testnet{ts:line-numbers}

## Assets by Owner

We can request information about an asset by its owner, using the `getAssetsByOwner` function. This will leverage the endpoint `/accounts/<owner>/assets` to fetch the asset information.

<<< @./snippets/asset-api/assets-by-owner.ts#full{ts:line-numbers}

You can change the pagination parameters to fetch more assets (up to 100 assets per request).

<<< @./snippets/asset-api/assets-by-owner.ts#pagination{ts:line-numbers}
