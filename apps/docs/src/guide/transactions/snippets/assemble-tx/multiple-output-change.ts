import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
} from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();
const accountA = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const accountB = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);
const transferAmount = 100;

const request = new ScriptTransactionRequest();

request.addCoinOutput(accountB.address, transferAmount, baseAssetId);

// #region multiple-output-change
const { assembledRequest } = await provider.assembleTx({
  request,
  feePayerAccount: accountA,
  accountCoinQuantities: [
    {
      amount: transferAmount,
      assetId: baseAssetId,
      account: accountB,
      /**
       * accountB will receive the change. Although it is explicitly set here,
       * if it were not set, it would default to the account property,
       * which in this case is also accountB.
       */
      changeOutputAccount: accountB,
    },
  ],
});
// #endregion multiple-output-change

const submit = await accountA.sendTransaction(assembledRequest);
await submit.waitForResult();

console.log('assembledRequest', assembledRequest);
