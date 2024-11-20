// #region transferring-assets-2
import { Provider, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
} from '../../../../env';

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

const response = await sender.sendTransaction(transactionRequest);

// The transaction id is the same one returned by the code above.
const { id } = await response.wait();
// #endregion transferring-assets-2

console.log('transactionId', id === transactionId);
