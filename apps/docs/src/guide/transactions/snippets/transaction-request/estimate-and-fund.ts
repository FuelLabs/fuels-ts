import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ScriptSum } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// #region estimate-and-fund
const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
});

await transactionRequest.estimateAndFund(wallet);

await wallet.sendTransaction(transactionRequest);
// #endregion estimate-and-fund
