// #region sendTransaction
import { bn, Provider, ScriptTransactionRequest } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../env';
import { SimplePredicate } from '../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const predicate = new SimplePredicate({
  provider,
});

// Instantiate the transaction request.
const transactionRequest = new ScriptTransactionRequest({
  gasLimit: 2000,
  maxFee: bn(0),
});

// Get the resources available to send from the predicate.
const predicateCoins = await predicate.getResourcesToSpend([
  { amount: 2000, assetId: provider.getBaseAssetId() },
]);

// Add the predicate input and resources.
transactionRequest.addResources(predicateCoins);

// Send the transaction using the predicate
const result = await predicate.sendTransaction(transactionRequest);

await result.waitForResult();
// #endregion sendTransaction

const { isStatusSuccess } = await result.waitForResult();

console.log('Send transaction to be successful', isStatusSuccess);
