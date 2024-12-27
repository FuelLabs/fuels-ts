import { Provider, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
} from '../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const assetId = await provider.getBaseAssetId();
const receiver = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);

// #region transactions-1
const tx = await sender.transfer(receiver.address, 100, assetId);
await tx.waitForResult();

const newBalance = await receiver.getBalance(await provider.getBaseAssetId());
// 100
// #endregion transactions-1
console.log('balance', newBalance.toNumber());
