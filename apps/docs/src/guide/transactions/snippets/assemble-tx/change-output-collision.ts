import type { AccountCoinQuantity } from 'fuels';
import { Provider, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
} from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();
const accountA = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const accountB = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);

// #region change-output-collision
const accountCoinQuantities: AccountCoinQuantity[] = [
  {
    amount: 100,
    assetId: baseAssetId,
    account: accountA,
    changeOutputAccount: accountA,
  },
  {
    amount: 200,
    assetId: baseAssetId,
    account: accountB,
    /**
     * This will cause a CHANGE_OUTPUT_COLLISION error because the first
     * accountCoinQuantity already defines a change output for this assetId
     * to accountA.
     */
    changeOutputAccount: accountB,
  },
];
// #endregion change-output-collision

console.log('accountCoinQuantities', accountCoinQuantities);
