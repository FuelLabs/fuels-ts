/* eslint-disable @typescript-eslint/no-non-null-assertion */
// #region using-assets-1
import type { Asset, AssetFuel } from 'fuels';
import { assets, CHAIN_IDS, getAssetFuel, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const recipient = Wallet.generate({ provider });

// Find the asset with symbol 'ETH'
const assetEth: Asset = assets.find((asset) => asset.symbol === 'ETH')!;

// Get all the metadata for ETH on Fuel Test Network
const chainId: number = CHAIN_IDS.fuel.testnet;
const assetEthOnFuel: AssetFuel = getAssetFuel(assetEth, chainId)!;

// Send a transaction (using the asset on Fuel Test Network)
const transaction = await sender.transfer(
  recipient.address,
  100,
  assetEthOnFuel.assetId
);
await transaction.waitForResult();
// #endregion using-assets-1

const { isStatusSuccess } = await transaction.waitForResult();
console.log('Transaction should be successful', isStatusSuccess);
