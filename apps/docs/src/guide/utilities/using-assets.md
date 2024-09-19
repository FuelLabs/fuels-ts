# Assets

We export an array of [`Asset`](https://docs.fuel.network/docs/fuels-ts/account/#asset) objects, that can be useful when creating your dApp. The `Asset` object has useful metadata about the different assets that are available on blockchain networks (Fuel and Ethereum).

Included assets such as:

- Ethereum (ETH)
- Tether (USDT)
- USD Coin (USDC)
- Wrapped ETH (WETH)

The helper functions `getAssetFuel` and `getAssetEth` can be used to get an assets details specific to the related network.

<<< @/../../docs-snippets/src/guide/utilities/using-assets.test.ts#using-assets-1{ts:line-numbers}
