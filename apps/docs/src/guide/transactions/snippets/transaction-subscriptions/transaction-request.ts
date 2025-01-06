import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const recipient = Wallet.generate();

// #region main
// Create a new transaction request
const txRequest = new ScriptTransactionRequest();
txRequest.addCoinOutput(recipient.address, 1_000, provider.getBaseAssetId());

// Fund the transaction
await txRequest.autoCost(wallet);

// Sign the transaction
const txSignature = await wallet.signTransaction(txRequest);
txRequest.updateWitnessByOwner(wallet.address, txSignature);

// Submit the transaction and subscribe to its result which includes
// the processed transaction ID, its status and receipts
const { id, status, receipts } =
  await provider.sendTransactionAndAwaitStatus(txRequest);
// #endregion main

console.log('transactionId', id);
console.log('status', status);
console.log('receipts', receipts);
