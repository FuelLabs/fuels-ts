// #region transferring-assets-3
import { bn, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY, WALLET_PVT_KEY_2 } from '../../../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const destination = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);

const amountToTransfer = 200;
const assetId = provider.getBaseAssetId();

const transactionRequest = await sender.createTransfer(
  destination.address,
  amountToTransfer,
  assetId
);

const chainId = provider.getChainId();

const transactionId = transactionRequest.getTransactionId(chainId);

/**
 * Modifying any property of the transaction request, except for the number
 * of witnesses within the ".witnesses" array, will generate a new transaction
 * hash, resulting in a different transaction ID.
 */
transactionRequest.gasLimit = bn(1000);

const response = await sender.sendTransaction(transactionRequest);

// The transaction id here is NOT the same one returned above.
const { id } = await response.wait();
// #endregion transferring-assets-3

console.log('transactionId', id !== transactionId);
