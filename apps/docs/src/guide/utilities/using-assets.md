# Assets

We export an array of [`Asset`](DOCS_API_URL/types/_fuel_ts_account.Asset.html) objects, that can be useful when creating your dApp. The `Asset` object has useful metadata about the different assets that are available on blockchain networks (Fuel and Ethereum).

Included assets such as:

- Ethereum (ETH)
- Tether (USDT)
- USD Coin (USDC)
- Wrapped ETH (WETH)

The helper functions `getAssetFuel` and `getAssetEth` can be used to get an asset's details relative to each network. These return a combination of the asset, and network information (the return types are [`AssetFuel`](DOCS_API_URL/types/_fuel_ts_account.AssetFuel.html) and [`AssetEth`](DOCS_API_URL/types/_fuel_ts_account.AssetEth.html) respectively).

<<< @./snippets/using-assets.ts#using-assets-1{ts:line-numbers}
