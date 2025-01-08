import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ScriptSum } from '../../../../typegend';

// #region transaction-request-10
const provider = new Provider(LOCAL_NETWORK_URL);
const accountA = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const accountB = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
});

// Add a witness directly
// Add a witness signature directly
const signature = await accountA.signTransaction(transactionRequest);
transactionRequest.addWitness(signature);

// Or add multiple via `addAccountWitnesses`
await transactionRequest.addAccountWitnesses([accountB]);
// #endregion transaction-request-10

// #region transaction-request-11
// Get the chain ID
const chainId = await provider.getChainId();

// Get the transaction ID using the Chain ID
const transactionId = transactionRequest.getTransactionId(chainId);
// TX ID: 0x420f6...
// #endregion transaction-request-11

console.log('transactionId', transactionId);
console.log('witnesses', transactionRequest.witnesses.length === 2);
