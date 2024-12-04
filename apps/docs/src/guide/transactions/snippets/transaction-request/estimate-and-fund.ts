import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ScriptSum } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// #region transaction-request-4
const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
});

const cost = await wallet.getTransactionCost(transactionRequest);

transactionRequest.gasLimit = cost.gasUsed;
transactionRequest.maxFee = cost.maxFee;

await wallet.fund(transactionRequest, cost);

await wallet.sendTransaction(transactionRequest);
// #endregion transaction-request-4
