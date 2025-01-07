import {
  Provider,
  ScriptTransactionRequest,
  TransactionResponse,
  Wallet,
} from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ScriptSum } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// #region transaction-response-2
/**
 * Instantiate the transaction request using a ScriptTransactionRequest and
 * set the script main function arguments
 */
const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
});

const scriptMainFunctionArguments = [1];

transactionRequest.setData(ScriptSum.abi, scriptMainFunctionArguments);

// Fund the transaction
await transactionRequest.autoCost(wallet);

// Submit the transaction
const response = await wallet.sendTransaction(transactionRequest);

// Generate the transaction summary
const transactionSummary = await response.getTransactionSummary();
// #endregion transaction-response-2

console.log('transactionSummary', transactionSummary);

const previouslySubmittedTransactionId = response.id;

// #region transaction-response-3
// Take a transaction ID from a previous transaction
const transactionId = previouslySubmittedTransactionId;
// 0x...

// Retrieve the transaction response from the transaction ID
const transactionResponse = await TransactionResponse.create(
  transactionId,
  provider
);

// Generate the transaction summary
const summary = await transactionResponse.getTransactionSummary();
// #endregion transaction-response-3

console.log('summary', summary);
