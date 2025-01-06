/* eslint-disable @typescript-eslint/no-unused-vars */
// #region getCoins-1
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const assetIdA =
  '0x0101010101010101010101010101010101010101010101010101010101010101';
const baseAssetId = await provider.getBaseAssetId();

// Fetches up to 100 coins that have an asset ID that is equal to the base asset ID
const { coins: coinsOnlyBaseAsset } = await provider.getCoins(
  wallet.address,
  baseAssetId
);
// [
//   { amount: bn(100), assetId: baseAssetId },
//   ...
// ]

// Fetches up to 100 coins - irrespective of the asset ID
const { coins: coinsAnyAsset } = await provider.getCoins(wallet.address);
// [
//   { amount: bn(100), assetId: baseAssetId }
//   { amount: bn(100), assetId: assetIdA }
//   ...
// ]
// #endregion getCoins-1

console.log('coinsOnlyBaseAsset', coinsOnlyBaseAsset);
console.log('coinsAnyAsset', coinsAnyAsset);
