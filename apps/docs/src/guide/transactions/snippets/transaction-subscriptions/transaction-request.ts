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

// Send the transaction and await it's result via the opened subscription
const result = await provider.sendTransactionAndAwaitStatus(txRequest);
// #endregion main

console.log('transactionId', result.id);
console.log('status', result.status);
console.log('receipts', result.receipts);
