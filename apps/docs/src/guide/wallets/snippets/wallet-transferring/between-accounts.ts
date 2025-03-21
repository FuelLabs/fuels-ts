// #region transferring-assets-1
import { Provider, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
} from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const destination = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);

const amountToTransfer = 500;

const response = await sender.transfer(
  destination.address,
  amountToTransfer,
  baseAssetId
);

await response.waitForResult();

// Retrieve balances
const balance = await destination.getBalance(baseAssetId);
// #endregion transferring-assets-1

console.log('new balance', balance.toNumber() >= amountToTransfer);
