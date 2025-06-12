import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
} from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const accountA = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const accountB = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);
const baseAssetId = await provider.getBaseAssetId();

// #region estimate-and-fund-2
const request = new ScriptTransactionRequest();

// Add a coin output to transfer 100 base asset to accountB
request.addCoinOutput(accountB.address, 100, baseAssetId);

// Estimate and fund the request
await request.estimateAndFund(accountA);

// Send the transaction
const tx = await accountA.sendTransaction(request);
await tx.waitForResult();
// #endregion estimate-and-fund-2
