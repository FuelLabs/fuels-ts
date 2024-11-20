import type { Account } from 'fuels';
import {
  Provider,
  ScriptTransactionRequest,
  WalletUnlocked,
  ZeroBytes32,
} from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';
import { ScriptSum } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const witness = ZeroBytes32;

const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
});

// #region transaction-request-6
// Add a witness directly
transactionRequest.addWitness(witness);

// Add a witness using an account
const account: Account = WalletUnlocked.generate({ provider });
await transactionRequest.addAccountWitnesses(account);
// #endregion transaction-request-6

// #region transaction-request-7
// Get the chain ID
const chainId = provider.getChainId();

// Get the transaction ID using the Chain ID
const transactionId = transactionRequest.getTransactionId(chainId);
// TX ID: 0x420f6...
// #endregion transaction-request-7

console.log('transactionId', transactionId);
console.log('witnesses', transactionRequest.witnesses.length === 2);
