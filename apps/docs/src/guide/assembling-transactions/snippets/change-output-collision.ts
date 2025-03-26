import type { AccountCoinQuantity } from 'fuels';
import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
} from '../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();
const accountA = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const accountB = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);

// #region change-output-collision
const request = new ScriptTransactionRequest();

// Add a change output to the transaction request
request.addChangeOutput(accountB.address, baseAssetId);

const accountCoinQuantities: AccountCoinQuantity[] = [
  {
    amount: 100,
    assetId: baseAssetId,
    account: accountA,
    // This will cause a CHANGE_OUTPUT_COLLISION error because the transaction
    // already has a change output for this assetId to accountB
    changeOutputAccount: accountA,
  },
];
// #endregion change-output-collision

console.log('accountCoinQuantities', accountCoinQuantities);
