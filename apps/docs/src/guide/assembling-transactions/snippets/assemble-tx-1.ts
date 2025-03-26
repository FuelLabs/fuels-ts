import { bn, Provider, ScriptTransactionRequest, Wallet } from 'fuels';
import { TestAssetId } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const account = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const baseAssetId = await provider.getBaseAssetId();

// #region assemble-tx-1
const request = new ScriptTransactionRequest();

const { assembledRequest } = await provider.assembleTx({
  request,
  feePayerAccount: account,
  accountCoinQuantities: [
    {
      amount: bn(100),
      assetId: baseAssetId,
      account,
      changeOutputAccount: account,
    },
    {
      amount: bn(200),
      assetId: TestAssetId.A.value,
      account,
      changeOutputAccount: account,
    },
  ],
});
// #endregion assemble-tx-1
console.log(assembledRequest, 'assembledRequest');
