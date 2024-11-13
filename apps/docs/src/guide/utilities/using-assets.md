# Assets

We export an array of [`Asset`](https://docs.fuel.network/docs/fuels-ts/account/#asset) objects, that can be useful when creating your dApp. The `Asset` object has useful metadata about the different assets that are available on blockchain networks (Fuel and Ethereum).

Included assets such as:

- Ethereum (ETH)
- Tether (USDT)
- USD Coin (USDC)
- Wrapped ETH (WETH)

The helper functions `getAssetFuel` and `getAssetEth` can be used to get an asset's details relative to each network. These return a combination of the asset, and network information (the return types are [`AssetFuel`](../../api/Account/index.md#assetfuel) and [`AssetEth`](../../api/Account/index.md#asseteth) respectively).

<<< @/../../docs-snippets2/src/utilities/using-assets.ts#using-assets-1{ts:line-numbers}
