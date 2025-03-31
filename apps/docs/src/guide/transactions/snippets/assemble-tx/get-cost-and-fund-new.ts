import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const accountA = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const accountB = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const baseAssetId = await provider.getBaseAssetId();

// #region get-cost-and-fund-new
const transferAmount = 100;

const request = new ScriptTransactionRequest();
request.addCoinOutput(accountB.address, transferAmount, baseAssetId);

const { assembledRequest } = await provider.assembleTx({
  request,
  feePayerAccount: accountA,
  accountCoinQuantities: [
    {
      amount: transferAmount,
      assetId: baseAssetId,
      account: accountA,
      changeOutputAccount: accountA,
    },
  ],
});

const tx = await accountA.sendTransaction(assembledRequest);
const { isStatusSuccess } = await tx.waitForResult();

// #endregion get-cost-and-fund-new
console.log('isStatusSuccess', isStatusSuccess);
