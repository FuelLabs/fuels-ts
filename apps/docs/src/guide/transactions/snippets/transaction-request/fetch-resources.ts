import type { CoinQuantity } from 'fuels';
import { bn, Provider, ScriptTransactionRequest, Wallet } from 'fuels';
import { TestAssetId } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ScriptSum } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// #region transaction-request-5
// Instantiate the transaction request
const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
});

const baseAssetId = provider.getBaseAssetId();
const assetA = TestAssetId.A.value;

// Define the quantities to fetch
const quantities: CoinQuantity[] = [
  {
    amount: bn(10000),
    assetId: baseAssetId,
  },
  {
    amount: bn(100),
    assetId: assetA,
  },
];

// Fetching resources
const resources = await wallet.getResourcesToSpend(quantities);

// Adding resources (coins or messages)
transactionRequest.addResources(resources);
// #endregion transaction-request-5
