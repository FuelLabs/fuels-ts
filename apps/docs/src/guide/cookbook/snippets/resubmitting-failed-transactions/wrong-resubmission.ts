import type { FuelError } from 'fuels';
import { bn, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const baseAssetId = provider.getBaseAssetId();
const transferAmount = 1000;

// #region resubmitting-failed-transactions-3
const transactionRequest = await wallet.createTransfer(
  wallet.address,
  transferAmount,
  baseAssetId
);

// Set the gasLimit to 0 to force revert with OutOfGas error
transactionRequest.gasLimit = bn(0);

// Transaction will be successfully submitted
const response = await wallet.sendTransaction(transactionRequest);
// let error: FuelError | undefined;
try {
  await response.waitForResult();
} catch (error) {
  if (/OutOfGas/.test((<FuelError>error).message)) {
    transactionRequest.gasLimit = bn(1000);

    // Re-submission will fail
    await wallet.sendTransaction(transactionRequest).catch((error2) => {
      console.log('error2', error2);
    });
  }
}
// #endregion resubmitting-failed-transactions-3
