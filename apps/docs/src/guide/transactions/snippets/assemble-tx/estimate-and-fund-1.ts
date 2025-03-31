import { bn, Provider, ScriptTransactionRequest, Wallet } from 'fuels';
import { TestAssetId } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const account = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const baseAssetId = await provider.getBaseAssetId();

const signatureCallback = async (request: ScriptTransactionRequest) =>
  Promise.resolve(request);

// #region estimate-and-fund-1
const request = new ScriptTransactionRequest();

await request.estimateAndFund(account, {
  signatureCallback,
  quantities: [
    {
      amount: bn(100),
      assetId: baseAssetId,
    },
    {
      amount: bn(200),
      assetId: TestAssetId.A.value,
    },
  ],
});
// #endregion estimate-and-fund-1


const { assembledRequest } = await provider.assembleTx({
  request,
  feePayerAccount: account,
});

const tx = await account.sendTransaction(assembledRequest);
const { isStatusSuccess } = await tx.waitForResult();
console.log('isStatusSuccess', isStatusSuccess);
