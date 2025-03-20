import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ScriptSum } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// #region estimate-and-fund
const transferAmount = 1000;

const request = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
});

const baseAssetId = await provider.getBaseAssetId();

request.addCoinOutput(wallet.address, transferAmount, baseAssetId);

const { assembledRequest } = await provider.assembleTx({
  request,
  feePayerAccount: wallet,
  accountCoinQuantities: [
    {
      amount: transferAmount,
      assetId: baseAssetId,
      account: wallet,
      changeOutputAccount: wallet,
    },
  ],
});

await wallet.sendTransaction(assembledRequest);
// #endregion estimate-and-fund
