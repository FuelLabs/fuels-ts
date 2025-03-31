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

// #region estimate-and-fund-new
const request = new ScriptTransactionRequest();

// Add a coin output to transfer 100 base asset to accountB
request.addCoinOutput(accountB.address, 100, baseAssetId);

const { assembledRequest } = await provider.assembleTx({
  request,
  feePayerAccount: accountA,
  accountCoinQuantities: [
    {
      amount: 100,
      assetId: baseAssetId,
      account: accountA,
      changeOutputAccount: accountA,
    },
  ],
});

const tx = await accountA.sendTransaction(assembledRequest);
await tx.waitForResult();
// #endregion estimate-and-fund-new
