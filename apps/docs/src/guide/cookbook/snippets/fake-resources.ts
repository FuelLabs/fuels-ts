// #region generate-fake-resources-2
import type { TransactionResultReturnDataReceipt } from 'fuels';
import {
  bn,
  Provider,
  ReceiptType,
  ScriptTransactionRequest,
  Wallet,
} from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { ReturnScript } from '../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const baseAssetId = provider.getBaseAssetId();

const transactionRequest = new ScriptTransactionRequest({
  gasLimit: bn(62_000),
  maxFee: bn(60_000),
  script: ReturnScript.bytecode,
});

const resources = wallet.generateFakeResources([
  {
    amount: bn(100_000),
    assetId: baseAssetId,
  },
]);

transactionRequest.addResources(resources);

const dryrunResult = await provider.dryRun(transactionRequest);

const returnReceipt = dryrunResult.receipts.find(
  (receipt) => receipt.type === ReceiptType.ReturnData
) as TransactionResultReturnDataReceipt;

const { data: returnedValue } = returnReceipt;
// #endregion generate-fake-resources-2

console.log('returned', bn(returnedValue).toNumber() === 1337);
