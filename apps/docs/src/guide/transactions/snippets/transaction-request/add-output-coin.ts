import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';
import { TestAssetId } from 'fuels/test-utils';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
} from '../../../../env';
import { ScriptSum } from '../../../../typegend';

// #region transaction-request-3
const provider = await Provider.create(LOCAL_NETWORK_URL);

const recipient1 = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const recipient2 = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);

const baseAssetId = provider.getBaseAssetId();
const assetA = TestAssetId.A.value;

const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
});

transactionRequest.addCoinOutput(recipient1.address, 1000, baseAssetId);
transactionRequest.addCoinOutput(recipient2.address, 500, assetA);
// #endregion transaction-request-3
