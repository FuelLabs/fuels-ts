// #region resubmitting-failed-transactions-1
import { Provider, Wallet } from 'fuels';
import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from 'src/env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const baseAssetId = provider.getBaseAssetId();

const transferAmount = 1000;

const transactionRequest = await wallet.createTransfer(
  wallet.address,
  transferAmount,
  baseAssetId
);

const response = await wallet.sendTransaction(transactionRequest);
// #endregion resubmitting-failed-transactions-1

// #region resubmitting-failed-transactions-2
const result = await response.waitForResult();
// #endregion resubmitting-failed-transactions-2

console.log('success', result.isStatusSuccess);
