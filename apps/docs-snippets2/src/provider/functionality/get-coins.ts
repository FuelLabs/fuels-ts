/* eslint-disable @typescript-eslint/no-unused-vars */
// #region getCoins-1
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const assetIdA =
  '0x0101010101010101010101010101010101010101010101010101010101010101';
const baseAssetId = provider.getBaseAssetId();

// Fetches up to 100 coins from baseAssetId
const { coins: coinsOnlyBaseAsset } = await provider.getCoins(
  wallet.address,
  baseAssetId
);
// [
//   { amount: bn(100), assetId: baseAssetId },
//   ...
// ]

// Fetches up to 100 coins from all assets
const { coins: coinsAnyAsset } = await provider.getCoins(wallet.address);
// [
//   { amount: bn(100), assetId: baseAssetId }
//   { amount: bn(100), assetId: assetIdA }
//   ...
// ]
// #endregion getCoins-1

// #region getCoins-2
const { coins: coinsFromWallet } = await wallet.getCoins(baseAssetId);
// [
//   { amount: bn(100), assetId: baseAssetId },
//   ...
// ]
// #endregion getCoins-2

console.log('coinsOnlyBaseAsset', coinsOnlyBaseAsset);
console.log('coinsAnyAsset', coinsAnyAsset);
console.log('coinsFromWallet', coinsFromWallet);
