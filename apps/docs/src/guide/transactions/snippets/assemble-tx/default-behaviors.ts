// #region assemble-tx-default-behaviors
import { Provider, Wallet, type AccountCoinQuantity } from 'fuels';
import { TestAssetId } from 'fuels/test-utils';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
  WALLET_PVT_KEY_3,
} from '../../../../env';

// #region transaction-request-3
const provider = new Provider(LOCAL_NETWORK_URL);
const accountA = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const accountB = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);
const accountC = Wallet.fromPrivateKey(WALLET_PVT_KEY_3, provider);
const baseAssetId = await provider.getBaseAssetId();
const accountCoinQuantities: AccountCoinQuantity[] = [
  {
    amount: 100,
    assetId: baseAssetId,
    // account defaults to feePayerAccount
    // changeOutputAccount defaults to feePayerAccount
  },
  {
    amount: 200,
    assetId: TestAssetId.A.value,
    account: accountA,
    // changeOutputAccount defaults to accountA
  },
  {
    amount: 300,
    assetId: TestAssetId.B.value,
    account: accountB,
    changeOutputAccount: accountC,
    // Both account and changeOutputAccount are explicitly set
  },
];
// #endregion assemble-tx-default-behaviors

console.log('accountCoinQuantities', accountCoinQuantities);
