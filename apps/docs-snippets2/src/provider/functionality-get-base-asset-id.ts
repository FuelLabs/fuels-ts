// #region getBaseAssetId
import { Provider, ScriptTransactionRequest } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_ADDRESS } from '../env';

// Fetch the base asset ID using the provider
const provider = await Provider.create(LOCAL_NETWORK_URL);
const baseAssetId = provider.getBaseAssetId();
// 0x...

// Create a transaction request
const transactionRequest = new ScriptTransactionRequest();
// Use the base asset for an operation
transactionRequest.addCoinOutput(WALLET_ADDRESS, 100, baseAssetId);
// #endregion getBaseAssetId

expect(baseAssetId).toBeDefined();
