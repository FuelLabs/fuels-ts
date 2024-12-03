import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ScriptSum } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
});

// #region transaction-request-10
// Add a witness directly
const witness = await wallet.signTransaction(transactionRequest);

transactionRequest.addWitness(witness);
// #endregion transaction-request-10

// #region transaction-request-11
// Get the chain ID
const chainId = provider.getChainId();

// Get the transaction ID using the Chain ID
const transactionId = transactionRequest.getTransactionId(chainId);
// TX ID: 0x420f6...
// #endregion transaction-request-11

console.log('transactionId', transactionId);
console.log('witnesses', transactionRequest.witnesses.length === 2);
