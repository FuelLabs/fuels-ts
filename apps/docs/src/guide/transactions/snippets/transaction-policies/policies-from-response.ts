// #region transaction-policies-2
import type { Policy } from 'fuels';
import { Provider, Wallet, ScriptTransactionRequest, bn } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ScriptSum } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

/**
 * Instantiate the transaction request with transaction parameters
 * that will set the respective policies.
 */
const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
  gasLimit: bn(2000),
  tip: bn(10),
  witnessLimit: 900,
  maxFee: bn(2000),
});

// Set the script main function arguments
const scriptArguments = [1];
transactionRequest.setData(ScriptSum.abi, scriptArguments);

// Fund the transaction
const resources = await wallet.getResourcesToSpend([
  { amount: 1000, assetId: await provider.getBaseAssetId() },
]);

transactionRequest.addResources(resources);

// Submit the transaction and retrieve the transaction response
const tx = await wallet.sendTransaction(transactionRequest);
const response = await tx.waitForResult();
const policies: Policy[] | undefined = response.transaction.policies;

console.log('policies', policies);
// #endregion transaction-policies-2
